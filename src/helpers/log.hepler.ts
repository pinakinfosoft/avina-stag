import fs from "fs";
import path from "path";
import { IServerLog, IS3Log } from "../data/interfaces/logs/log.interface";
import { getLogSaveDateFormat, parseData } from "../utils/shared-functions";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Base directory for log files
 */
const LOGS_BASE_DIR = "./logs";

/**
 * Server logs directory
 */
const SERVER_LOGS_DIR = path.join(LOGS_BASE_DIR, "server-logs");

/**
 * S3 logs directory
 */
const S3_LOGS_DIR = path.join(LOGS_BASE_DIR, "aws-s3");

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Ensures a directory exists, creating it if necessary
 * @param dirPath - Directory path to ensure exists
 * @throws Error if directory creation fails
 */
const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Formats log data object to string representation
 * @param data - Data object to format
 * @returns Formatted string or empty string if data is invalid
 */
const formatLogData = (
  data: Record<string, unknown> | null | undefined
): string => {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return "";
  }
  return parseData(data);
};

/**
 * Writes log entry to file asynchronously
 * @param filePath - Full path to log file
 * @param logEntry - Log entry string to write
 * @returns Promise that resolves when write is complete
 * @throws Error if write fails
 */
const writeLogToFile = (filePath: string, logEntry: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, logEntry, { flag: "a" }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Builds log entry string from log fields
 * @param fields - Array of log field strings
 * @returns Formatted log entry string
 */
const buildLogEntry = (fields: string[]): string => {
  return fields.join(" | ") + "\n";
};

// ============================================================================
// SERVER LOG FUNCTIONS
// ============================================================================

/**
 * Saves server log entry to file
 * Logs are organized by date and hour in the format: YYYY-MM-DD/HH00.log
 * @param log - Server log data
 * @returns Promise that resolves when log is saved
 * 
 * @example
 * ```typescript
 * await saveServerLogs({
 *   requestTime: new Date(),
 *   url: '/api/users',
 *   action: 'getUsers',
 *   body: { page: 1 },
 *   responseTime: new Date(),
 *   response: { data: [] }
 * });
 * ```
 */
export const saveServerLogs = async (log: IServerLog): Promise<void> => {
  try {
    const { requestTime, url, action, body, responseTime, response } = log;

    const logFields = [
      `Request Time: ${requestTime}`,
      `URL: ${url}`,
      `Action: ${action}`,
      `Body: ${formatLogData(body)}`,
      `Response Time: ${responseTime}`,
      `Response: ${formatLogData(response)}`,
    ];

    const logEntry = buildLogEntry(logFields);
    const saveDate = getLogSaveDateFormat(requestTime);
    const dateDir = path.join(SERVER_LOGS_DIR, saveDate.date);

    // Ensure directory exists
    ensureDirectoryExists(dateDir);

    // Build file path
    const filePath = path.join(dateDir, `${saveDate.hour}00.log`);

    // Write log entry
    await writeLogToFile(filePath, logEntry);
  } catch (error) {
    // Log error to console but don't throw to prevent breaking the application
    console.error("Failed to save server log:", error);
  }
};

/**
 * Saves server log entry to file (synchronous version)
 * Use this if you need synchronous logging (not recommended for production)
 * @param log - Server log data
 */
export const saveServerLogsSync = (log: IServerLog): void => {
  try {
    const { requestTime, url, action, body, responseTime, response } = log;

    const logFields = [
      `Request Time: ${requestTime}`,
      `URL: ${url}`,
      `Action: ${action}`,
      `Body: ${formatLogData(body)}`,
      `Response Time: ${responseTime}`,
      `Response: ${formatLogData(response)}`,
    ];

    const logEntry = buildLogEntry(logFields);
    const saveDate = getLogSaveDateFormat(requestTime);
    const dateDir = path.join(SERVER_LOGS_DIR, saveDate.date);

    // Ensure directory exists
    ensureDirectoryExists(dateDir);

    // Build file path
    const filePath = path.join(dateDir, `${saveDate.hour}00.log`);

    // Write log entry synchronously
    fs.writeFileSync(filePath, logEntry, { flag: "a" });
  } catch (error) {
    console.error("Failed to save server log:", error);
  }
};

// ============================================================================
// S3 LOG FUNCTIONS
// ============================================================================

/**
 * Saves S3 operation log entry to file
 * Logs are organized by date in the format: YYYY-MM-DD.log
 * @param requestTime - Timestamp when the S3 operation was initiated
 * @param S3ServiceMethodLabel - S3 service method label/name
 * @param methodPayload - Method payload/parameters
 * @param responseTime - Timestamp when the S3 operation completed
 * @param response - Response from S3 operation
 * @returns Promise that resolves when log is saved
 * 
 * @example
 * ```typescript
 * await saveS3LogsToFile(
 *   new Date(),
 *   'uploadFile',
 *   { bucket: 'my-bucket', key: 'file.jpg' },
 *   new Date(),
 *   { success: true }
 * );
 * ```
 */
export const saveS3LogsToFile = async (
  requestTime: Date,
  S3ServiceMethodLabel: string,
  methodPayload: Record<string, unknown> | null,
  responseTime: Date,
  response: Record<string, unknown> | null
): Promise<void> => {
  try {
    const logFields = [
      `Request Time: ${requestTime}`,
      `Method: ${S3ServiceMethodLabel}`,
      `Payload: ${formatLogData(methodPayload)}`,
      `Response Time: ${responseTime}`,
      `Response: ${formatLogData(response)}`,
    ];

    const logEntry = buildLogEntry(logFields);
    const saveDate = getLogSaveDateFormat(requestTime);

    // Ensure directory exists
    ensureDirectoryExists(S3_LOGS_DIR);

    // Build file path
    const filePath = path.join(S3_LOGS_DIR, `${saveDate.date}.log`);

    // Write log entry
    await writeLogToFile(filePath, logEntry);
  } catch (error) {
    console.error("Failed to save S3 log:", error);
  }
};

/**
 * Saves S3 operation log entry to file using IS3Log interface
 * Alternative function signature for better type safety
 * @param log - S3 log data object
 * @returns Promise that resolves when log is saved
 * 
 * @example
 * ```typescript
 * await saveS3LogsToFileFromObject({
 *   requestTime: new Date(),
 *   S3ServiceMethodLabel: 'uploadFile',
 *   methodPayload: { bucket: 'my-bucket', key: 'file.jpg' },
 *   responseTime: new Date(),
 *   response: { success: true }
 * });
 * ```
 */
export const saveS3LogsToFileFromObject = async (log: IS3Log): Promise<void> => {
  return saveS3LogsToFile(
    log.requestTime,
    log.S3ServiceMethodLabel,
    log.methodPayload,
    log.responseTime,
    log.response
  );
};

/**
 * Saves S3 operation log entry to file (synchronous version)
 * Use this if you need synchronous logging (not recommended for production)
 * @param requestTime - Timestamp when the S3 operation was initiated
 * @param S3ServiceMethodLabel - S3 service method label/name
 * @param methodPayload - Method payload/parameters
 * @param responseTime - Timestamp when the S3 operation completed
 * @param response - Response from S3 operation
 */
export const saveS3LogsToFileSync = (
  requestTime: Date,
  S3ServiceMethodLabel: string,
  methodPayload: Record<string, unknown> | null,
  responseTime: Date,
  response: Record<string, unknown> | null
): void => {
  try {
    const logFields = [
      `Request Time: ${requestTime}`,
      `Method: ${S3ServiceMethodLabel}`,
      `Payload: ${formatLogData(methodPayload)}`,
      `Response Time: ${responseTime}`,
      `Response: ${formatLogData(response)}`,
    ];

    const logEntry = buildLogEntry(logFields);
    const saveDate = getLogSaveDateFormat(requestTime);

    // Ensure directory exists
    ensureDirectoryExists(S3_LOGS_DIR);

    // Build file path
    const filePath = path.join(S3_LOGS_DIR, `${saveDate.date}.log`);

    // Write log entry synchronously
    fs.writeFileSync(filePath, logEntry, { flag: "a" });
  } catch (error) {
    console.error("Failed to save S3 log:", error);
  }
};
