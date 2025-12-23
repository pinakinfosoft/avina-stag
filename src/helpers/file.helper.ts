import fs from "fs";
import path from "path";
import sharp from "sharp";
import { TImageType } from "../data/types/common/common.type";
import {
  ALLOW_FILE_CONVERT_TO_WEBP_MIME_TYPE,
  IMAGE_TYPE_LOCATION,
} from "../utils/app-constants";
import { DEFAULT_STATUS_CODE_SUCCESS } from "../utils/app-messages";
import {
  generateRandomString,
  resSuccess,
  resUnknownError,
} from "../utils/shared-functions";
import { s3UploadObject } from "./s3-client.helper";
import { TResponseReturn } from "../data/interfaces/common/common.interface";
import dbContext from "../config/db-context";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Client/Company ID type
 */
type ClientId = number | string | null;

/**
 * File upload options
 */
interface IFileUploadOptions {
  /** Convert image to WebP format if supported */
  convertToWebp?: boolean;
  
  /** WebP quality (0-100) */
  webpQuality?: number;
  
  /** Preserve original file name */
  preserveOriginalName?: boolean;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a sanitized filename with random string
 * Replaces spaces and special characters, adds random string, preserves extension
 * @param fileName - Original filename
 * @returns Sanitized filename with random string
 */
const createFileName = (fileName: string): string => {
  const imagePath = fileName
    .replace(/\s|\(|\)/g, "_")
    .replace(/\.[^/.]+$/, "");
  const ext = path.extname(fileName);

  return `${imagePath.toLowerCase()}-${generateRandomString(32)}${ext}`;
};

/**
 * Builds destination path
 * @param destinationFolder - Destination folder path
 * @param fileName - File name
 * @returns Full destination path
 */
const buildDestinationPath = (
  destinationFolder: string,
  fileName: string
): string => {
  return `${destinationFolder}/${fileName}`;
};

/**
 * Converts image buffer to WebP format
 * @param buffer - Image buffer
 * @param quality - WebP quality (0-100), default 50
 * @returns WebP image buffer
 */
const convertToWebP = async (
  buffer: Buffer,
  quality: number = 50
): Promise<Buffer> => {
  return sharp(buffer).webp({ quality }).toBuffer();
};

/**
 * Gets file extension prefix (path without extension)
 * @param filePath - Full file path
 * @returns Path without extension
 */
const getFileExtensionPrefix = (filePath: string): string => {
  const lastDotIndex = filePath.lastIndexOf(".");
  return lastDotIndex >= 0
    ? filePath.substring(0, lastDotIndex)
    : filePath;
};

/**
 * Checks if file should be converted to WebP
 * @param mimetype - File MIME type
 * @returns True if file should be converted to WebP
 */
const shouldConvertToWebP = (mimetype: string): boolean => {
  return ALLOW_FILE_CONVERT_TO_WEBP_MIME_TYPE.includes(mimetype);
};

// ============================================================================
// FOLDER OPERATIONS
// ============================================================================

/**
 * Creates folder structure if it doesn't exist
 * Recursively creates all parent directories
 * @param folderPath - Path to create (can be nested)
 */
export const createFolderIfNot = (folderPath: string): void => {
  if (!folderPath) {
    throw new Error("folderPath is required");
  }
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// ============================================================================
// FILE MOVEMENT OPERATIONS
// ============================================================================

/**
 * Moves a file from source to destination based on image type
 * @param fileName - Name of the file to move
 * @param sourcePath - Source directory path
 * @param type - Image type for determining destination
 * @returns Response with destination path or error
 */
export const moveFileByType = (
  fileName: string,
  sourcePath: string,
  type: TImageType
): TResponseReturn => {
  try {
    const destinationPath = `${IMAGE_TYPE_LOCATION[type]}/${fileName}`;
    createFolderIfNot(IMAGE_TYPE_LOCATION[type]);

    fs.renameSync(`${sourcePath}/${fileName}`, destinationPath);
    return resSuccess({ data: destinationPath });
  } catch (error) {
    return resUnknownError({ data: error });
  }
};

/**
 * Moves a file to a specific location
 * @param fileName - Name of the file to move
 * @param sourcePath - Source directory path
 * @param destinationFolder - Destination folder path
 * @param originalname - Original filename
 * @returns Response with destination path or error
 */
export const moveFileToLocation = (
  fileName: string,
  sourcePath: string,
  destinationFolder: string,
  originalname: string
): TResponseReturn => {
  try {
    const destinationPath = buildDestinationPath(
      destinationFolder,
      originalname
    );

    createFolderIfNot(destinationFolder);
    fs.renameSync(`${sourcePath}/${fileName}`, destinationPath);

    return resSuccess({ data: destinationPath });
  } catch (error) {
    return resUnknownError({ data: error });
  }
};

// ============================================================================
// S3 UPLOAD OPERATIONS
// ============================================================================

/**
 * Uploads file to S3 with optional WebP conversion
 * Uses the single global database connection instance
 * @param fileBuffer - File buffer
 * @param destinationPath - S3 destination path
 * @param mimetype - File MIME type
 * @param clientId - Client/Company ID
 * @param options - Upload options
 * @returns Response with destination path or error
 */
const uploadFileToS3 = async (
  fileBuffer: Buffer,
  destinationPath: string,
  mimetype: string,
  options: IFileUploadOptions = {}
): Promise<TResponseReturn> => {
  const { convertToWebp = true, webpQuality = 50 } = options;

  try {
    // Convert to WebP if needed
    if (convertToWebp && shouldConvertToWebP(mimetype)) {
      const webpBuffer = await convertToWebP(fileBuffer, webpQuality);
      const webpPath = `${getFileExtensionPrefix(destinationPath)}.webp`;

      const uploadResult = await s3UploadObject(
        dbContext,
        webpBuffer,
        webpPath,
        "image/webp",
      );

      if (uploadResult.code !== DEFAULT_STATUS_CODE_SUCCESS) {
        return uploadResult;
      }

      return resSuccess({ data: webpPath });
    }

    // Upload original file
    const uploadResult = await s3UploadObject(
      dbContext,
      fileBuffer,
      destinationPath,
      mimetype,
    );

    if (uploadResult.code !== DEFAULT_STATUS_CODE_SUCCESS) {
      return uploadResult;
    }

    return resSuccess({ data: destinationPath });
  } catch (error) {
    return resUnknownError({ data: error });
  }
};

/**
 * Moves file to S3 by image type with optional WebP conversion
 * Uses the single global database connection instance
 * @param file - Multer file object
 * @param type - Image type for determining destination
 * @param clientId - Client/Company ID
 * @returns Response with destination path or error
 */
export const moveFileToS3ByType = async (
  file: Express.Multer.File,
  type: TImageType,
): Promise<TResponseReturn> => {
  const fileName = createFileName(file.originalname);
  const destinationPath = buildDestinationPath(
    IMAGE_TYPE_LOCATION[type],
    fileName
  );

  return uploadFileToS3(
    file.buffer,
    destinationPath,
    file.mimetype,
  );
};

/**
 * Moves file to S3 by custom destination folder with optional WebP conversion
 * Uses the single global database connection instance
 * @param file - Multer file object
 * @param destinationFolder - Destination folder path
 * @param clientId - Client/Company ID
 * @returns Response with destination path or error
 */
export const moveFileToS3ByTypeAndLocation = async (
  file: Express.Multer.File,
  destinationFolder: string,
): Promise<TResponseReturn> => {
  const destinationPath = buildDestinationPath(
    destinationFolder,
    file.originalname
  );

  return uploadFileToS3(
    file.buffer,
    destinationPath,
    file.mimetype
  );
};

/**
 * Moves original file to S3 without WebP conversion
 * Uses the single global database connection instance
 * @param file - Multer file object
 * @param destinationFolder - Destination folder path
 * @returns Response with destination path or error
 */
export const moveOriginalFileToS3ByTypeAndLocation = async (
  file: Express.Multer.File,
  destinationFolder: string,
  clientId: ClientId
): Promise<TResponseReturn> => {
  const destinationPath = buildDestinationPath(
    destinationFolder,
    file.originalname
  );

  return uploadFileToS3(
    file.buffer,
    destinationPath,
    file.mimetype,
    { convertToWebp: false }
  );
};
