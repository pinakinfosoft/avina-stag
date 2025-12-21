import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommandInput,
  GetObjectCommandInput,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
// Note: Install @aws-sdk/lib-storage for multipart uploads: npm install @aws-sdk/lib-storage
// Note: Install @aws-sdk/s3-request-presigner for presigned URLs: npm install @aws-sdk/s3-request-presigner
let Upload: any;
let getSignedUrl: any;

try {
  // Try to import multipart upload (optional dependency)
  const libStorage = require("@aws-sdk/lib-storage");
  Upload = libStorage.Upload;
} catch (e) {
  // Multipart upload not available, will use standard upload
  console.warn("@aws-sdk/lib-storage not installed. Multipart uploads disabled.");
}

try {
  // Try to import presigner (optional dependency)
  const presigner = require("@aws-sdk/s3-request-presigner");
  getSignedUrl = presigner.getSignedUrl;
} catch (e) {
  // Presigner not available
  console.warn("@aws-sdk/s3-request-presigner not installed. Presigned URLs disabled.");
}
import {
  getLocalDate,
  getWebSettingData,
  resSuccess,
  resUnknownError,
} from "../utils/shared-functions";
import {
  DEFAULT_STATUS_CODE_ERROR,
  DEFAULT_STATUS_CODE_SUCCESS,
} from "../utils/app-messages";
import { saveS3LogsToFile } from "./log.hepler";
import { TResponseReturn } from "../data/interfaces/common/common.interface";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Database connection type (can be Sequelize instance or similar)
 */
type DatabaseConnection = unknown;

/**
 * Client/Company ID type
 */
type ClientId = number | string | null;

/**
 * S3 configuration data from database
 */
interface IS3ConfigData {
  s3_bucket_name?: string;
  s3_bucket_region?: string;
  s3_bucket_access_key?: string;
  s3_bucket_secret_access_key?: string;
}

/**
 * S3 service method enumeration
 */
enum S3ServiceMethods {
  PutObjectCommand = 1,
  GetObjectCommand = 2,
  DeleteObjectCommand = 3,
}

/**
 * S3 upload options
 */
interface IS3UploadOptions {
  /** Use multipart upload for large files (default: true) */
  useMultipart?: boolean;
  
  /** Multipart upload threshold in bytes (default: 5MB) */
  multipartThreshold?: number;
  
  /** Part size for multipart upload in bytes (default: 5MB) */
  partSize?: number;
  
  /** Number of concurrent parts for multipart upload (default: 4) */
  queueSize?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default multipart upload threshold (5MB)
 * Files larger than this will use multipart upload
 */
const DEFAULT_MULTIPART_THRESHOLD = 5 * 1024 * 1024; // 5MB

/**
 * Default part size for multipart upload (5MB)
 */
const DEFAULT_PART_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Default queue size for concurrent multipart uploads
 */
const DEFAULT_QUEUE_SIZE = 4;

/**
 * S3 service method mapping
 */
const S3_SERVICE_METHOD_MAP = new Map<number, any>([
  [S3ServiceMethods.PutObjectCommand, PutObjectCommand],
  [S3ServiceMethods.GetObjectCommand, GetObjectCommand],
  [S3ServiceMethods.DeleteObjectCommand, DeleteObjectCommand],
]);

/**
 * S3 service method label mapping
 */
const S3_SERVICE_METHOD_LABEL_MAP = new Map<number, string>([
  [S3ServiceMethods.PutObjectCommand, "PutObjectCommand"],
  [S3ServiceMethods.GetObjectCommand, "GetObjectCommand"],
  [S3ServiceMethods.DeleteObjectCommand, "DeleteObjectCommand"],
]);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================



/**
 * Creates and configures S3 client
 * @param configData - S3 configuration data
 * @returns Configured S3 client
 */
const createS3Client = (): S3Client => {
  return new S3Client({
    region:  process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
  });
};

/**
 * Converts stream to string (base64 encoded)
 * @param stream - Readable stream
 * @returns Base64 encoded string
 */
const streamToString = async (stream: NodeJS.ReadableStream): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("base64"))
    );
  });

/**
 * Executes S3 request and logs the operation
 * @param s3ServiceMethod - S3 service method enum
 * @param payload - S3 command payload
 * @returns Response with S3 operation result
 */
const executeS3Request = async (
  s3ServiceMethod: S3ServiceMethods,
  payload: PutObjectCommandInput | GetObjectCommandInput | DeleteObjectCommandInput
): Promise<TResponseReturn> => {
  const s3Client = createS3Client();

  const requestTime = getLocalDate();
  let result: TResponseReturn;

  try {
    const MethodClass = S3_SERVICE_METHOD_MAP.get(s3ServiceMethod);
    if (!MethodClass) {
      throw new Error(`Unknown S3 service method: ${s3ServiceMethod}`);
    }

    const s3Response = await s3Client.send(new MethodClass(payload));
    result = resSuccess({ data: s3Response });
  } catch (error) {
    result = resUnknownError({ data: error });
  }

  const responseTime = getLocalDate();
  const methodLabel = S3_SERVICE_METHOD_LABEL_MAP.get(s3ServiceMethod) || "Unknown";

  // Log S3 operation (exclude body from logs for PutObjectCommand)
  const logPayload: Record<string, unknown> =
    s3ServiceMethod === S3ServiceMethods.PutObjectCommand
      ? { ...payload, Body: "" }
      : { ...payload };

  saveS3LogsToFile(
    requestTime,
    methodLabel,
    logPayload,
    responseTime,
    result.code === DEFAULT_STATUS_CODE_ERROR ? result.data : "success"
  );

  return result;
};

// ============================================================================
// S3 UPLOAD FUNCTIONS
// ============================================================================

/**
 * Uploads file to S3 using multipart upload for large files
 * Automatically uses multipart upload for files larger than threshold
 * @param dbConnection - Database connection
 * @param file - File buffer or stream
 * @param filePath - S3 destination path (key)
 * @param mimetype - File MIME type
 * @param clientId - Client/Company ID
 * @param options - Upload options
 * @returns Response with upload result
 * 
 * @example
 * ```typescript
 * const result = await s3UploadObject(
 *   dbConnection,
 *   fileBuffer,
 *   'images/photo.jpg',
 *   'image/jpeg',
 *   clientId,
 *   { useMultipart: true, multipartThreshold: 10 * 1024 * 1024 }
 * );
 * ```
 */
export const s3UploadObject = async (
  dbConnection: DatabaseConnection,
  file: Buffer | Uint8Array | string | NodeJS.ReadableStream,
  filePath: string,
  mimetype: string,
  options: IS3UploadOptions = {}
): Promise<TResponseReturn> => {
  const {
    useMultipart = true,
    multipartThreshold = DEFAULT_MULTIPART_THRESHOLD,
    partSize = DEFAULT_PART_SIZE,
    queueSize = DEFAULT_QUEUE_SIZE,
  } = options;

  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    return resUnknownError({
      data: new Error("S3 bucket name is not configured"),
    });
  }

  const s3Client = createS3Client();
  const requestTime = getLocalDate();

  try {
    // Determine file size
    const fileSize =
      Buffer.isBuffer(file)
        ? file.length
        : file instanceof Uint8Array
        ? file.length
        : typeof file === "string"
        ? Buffer.byteLength(file)
        : null;

    // Use multipart upload for large files (if Upload class is available)
    if (
      useMultipart &&
      Upload &&
      fileSize !== null &&
      fileSize > multipartThreshold
    ) {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucketName,
          Key: filePath,
          Body: file,
          ContentType: mimetype,
        },
        partSize: partSize,
        queueSize: queueSize,
      });

      const result = await upload.done();
      const responseTime = getLocalDate();

      saveS3LogsToFile(
        requestTime,
        "PutObjectCommand (Multipart)",
        { Bucket: bucketName, Key: filePath, Body: "", ContentType: mimetype } as Record<string, unknown>,
        responseTime,
        { message: "success" } as Record<string, unknown>
      );

      return resSuccess({ data: result });
    } else {
      // Use standard PutObject for smaller files
      return executeS3Request(
        S3ServiceMethods.PutObjectCommand,
        {
          Bucket: bucketName,
          Key: filePath,
          Body: file as Buffer | Uint8Array | string,
          ContentType: mimetype,
        } as PutObjectCommandInput,
      );
    }
  } catch (error) {
    const responseTime = getLocalDate();
    saveS3LogsToFile(
      requestTime,
      "PutObjectCommand",
      { Bucket: bucketName, Key: filePath, Body: "", ContentType: mimetype } as Record<string, unknown>,
      responseTime,
      error as Record<string, unknown>
    );

    return resUnknownError({ data: error });
  }
};

// ============================================================================
// S3 DELETE FUNCTIONS
// ============================================================================

/**
 * Removes an object from S3
 * @param dbConnection - Database connection
 * @param key - S3 object key (path)
 * @param clientId - Client/Company ID
 * @returns Response with delete result
 * 
 * @example
 * ```typescript
 * const result = await s3RemoveObject(
 *   dbConnection,
 *   'images/photo.jpg',
 *   clientId
 * );
 * ```
 */
export const s3RemoveObject = async (
  key: string,
): Promise<TResponseReturn> => {
  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    return resUnknownError({
      data: new Error("S3 bucket name is not configured"),
    });
  }

  return executeS3Request(
    S3ServiceMethods.DeleteObjectCommand,
    {
      Bucket: bucketName,
      Key: key,
    }
  );
};

// ============================================================================
// S3 GET FUNCTIONS
// ============================================================================

/**
 * Gets an image object from S3 and returns as base64 buffer
 * @param dbConnection - Database connection
 * @param key - S3 object key (path)
 * @returns Base64 encoded image buffer
 * 
 * @example
 * ```typescript
 * const imageBuffer = await s3GetImageObject(
 *   dbConnection,
 *   'images/photo.jpg',
 *   clientId
 * );
 * ```
 */
export const s3GetImageObject = async (
  dbConnection: DatabaseConnection,
  key: string,
  clientId: ClientId
): Promise<Buffer> => {
  const bucketName =
    process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is not configured");
  }

  const result = await executeS3Request(
    S3ServiceMethods.GetObjectCommand,
    {
      Bucket: bucketName,
      Key: key,
    },
  );

  if (result.code !== DEFAULT_STATUS_CODE_SUCCESS) {
    throw new Error(result.message || "Failed to get S3 object");
  }

  // Extract body from result
  const s3Response = result.data as { Body?: NodeJS.ReadableStream };
  if (!s3Response?.Body) {
    throw new Error("S3 object body is missing");
  }

  const base64String = await streamToString(s3Response.Body);
  return Buffer.from(base64String, "base64");
};

// ============================================================================
// S3 LIST FUNCTIONS
// ============================================================================

/**
 * Lists objects in S3 bucket with given prefix
 * @param dbConnection - Database connection
 * @param prefix - S3 key prefix to filter objects
 * @returns Array of object keys (paths)
 * 
 * @example
 * ```typescript
 * const objects = await s3ListObjects(
 *   dbConnection,
 *   'images/',
 *   clientId
 * );
 * ```
 */
export const s3ListObjects = async (
  dbConnection: DatabaseConnection,
  prefix: string,
  clientId: ClientId
): Promise<string[]> => {
  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is not configured");
  }

  const s3Client = createS3Client();

  try {
    const payload = {
      Bucket: bucketName,
      Prefix: prefix,
      Delimiter: "/",
    };

    const result = await s3Client.send(new ListObjectsV2Command(payload));

    if (!result.Contents || result.Contents.length === 0) {
      return [];
    }

    // Replace special characters in keys
    return result.Contents.map((file) =>
      file.Key ? file.Key.replace(/ # /g, "+%23+") : ""
    ).filter((key) => key !== "");
  } catch (error) {
    throw new Error(`Failed to list S3 objects: ${error}`);
  }
};

// ============================================================================
// S3 PRESIGNED URL FUNCTIONS
// ============================================================================

/**
 * Generates a presigned URL for S3 object upload
 * Useful for direct client-side uploads
 * Requires @aws-sdk/s3-request-presigner package
 * @param dbConnection - Database connection
 * @param key - S3 object key (path)
 * @param mimetype - File MIME type
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Presigned URL string
 * 
 * @example
 * ```typescript
 * const url = await s3GetPresignedUploadUrl(
 *   dbConnection,
 *   'uploads/file.pdf',
 *   'application/pdf',
 *   clientId,
 *   3600
 * );
 * ```
 */
export const s3GetPresignedUploadUrl = async (
  dbConnection: DatabaseConnection,
  key: string,
  mimetype: string,
  clientId: ClientId,
  expiresIn: number = 3600
): Promise<string> => {
  if (!getSignedUrl) {
    throw new Error(
      "@aws-sdk/s3-request-presigner is not installed. Please install it to use presigned URLs."
    );
  }

  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is not configured");
  }

  const s3Client = createS3Client();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: mimetype,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Generates a presigned URL for S3 object download
 * Requires @aws-sdk/s3-request-presigner package
 * @param dbConnection - Database connection
 * @param key - S3 object key (path)
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Presigned URL string
 * 
 * @example
 * ```typescript
 * const url = await s3GetPresignedDownloadUrl(
 *   dbConnection,
 *   'images/photo.jpg',
 *   clientId,
 *   3600
 * );
 * ```
 */
export const s3GetPresignedDownloadUrl = async (
  dbConnection: DatabaseConnection,
  key: string,
  clientId: ClientId,
  expiresIn: number = 3600
): Promise<string> => {
  if (!getSignedUrl) {
    throw new Error(
      "@aws-sdk/s3-request-presigner is not installed. Please install it to use presigned URLs."
    );
  }

  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is not configured");
  }

  const s3Client = createS3Client();

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};
