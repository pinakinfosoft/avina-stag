// Load environment variables
require("dotenv").config({ path: ".env" });

// ============================================================================
// STATIC CONFIGURATION - Constants that don't change
// ============================================================================

/**
 * Static application configuration
 * These values are hardcoded and don't come from environment variables
 */
export const STATIC_CONFIG = {
  // OTP Configuration
  OTP: {
    GENERATE_DIGITS: 6,
  },

  // Invoice Configuration
  INVOICE: {
    NUMBER_DIGIT: 6,
  },

  // Default Values
  DEFAULTS: {
    PORT: "3000",
    SEQUELIZE_DIALECT: "postgres",
    SSL_UNAUTHORIZED: "false",
    PRODUCT_BULK_UPLOAD_FILE_SIZE: 10, // MB
    PRODUCT_BULK_UPLOAD_ZIP_SIZE: 10, // MB
  },
} as const;

// Export static values for backward compatibility
export const OTP_GENERATE_DIGITS = STATIC_CONFIG.OTP.GENERATE_DIGITS;
export const INVOICE_NUMBER_DIGIT = STATIC_CONFIG.INVOICE.NUMBER_DIGIT;

// ============================================================================
// SERVER CONFIGURATION
// ============================================================================

export const PROCESS_ENVIRONMENT = process.env.PROCESS_ENVIRONMENT;
export const PORT = process.env.PORT || STATIC_CONFIG.DEFAULTS.PORT;
export const SECURE_COMMUNICATION = process.env.SECURE_COMMUNICATION;
export const APP_NAME = process.env.APP_NAME;

// ============================================================================
// AUTHENTICATION & SECURITY
// ============================================================================

export const PUBLIC_AUTHORIZATION_TOKEN = process.env.PUBLIC_AUTHORIZATION_TOKEN;
export const PUBLIC_AUTHORIZATION_KEY = process.env.PUBLIC_AUTHORIZATION_KEY;
export const CRYPTO_JS_KEY = process.env.CRYPTO_JS_KEY;
export const CRYPTO_JS_IV = process.env.CRYPTO_JS_IV;
export const ENCRYPT_DECRYPT_IV = process.env.ENCRYPT_DECRYPT_IV;
export const ENCRYPT_DECRYPT_KEY = process.env.ENCRYPT_DECRYPT_KEY;
export const PAYMENT_METHOD_SECRET_KEY = process.env.PAYMENT_METHOD_SECRET_KEY;

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

export const DB_NAME = process.env.DB_NAME;
export const DB_USER_NAME = process.env.DB_USER_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const SEQUELIZE_DIALECT =
  process.env.SEQUELIZE_DIALECT || STATIC_CONFIG.DEFAULTS.SEQUELIZE_DIALECT;
export const SSL_UNAUTHORIZED =
  process.env.SSL_UNAUTHORIZED || STATIC_CONFIG.DEFAULTS.SSL_UNAUTHORIZED;

// ============================================================================
// AWS S3 CONFIGURATION
// ============================================================================

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

// ============================================================================
// EMAIL/SMTP CONFIGURATION
// ============================================================================

export const MAIL_USER_NAME = process.env.MAIL_USER_NAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_SECURE = process.env.MAIL_SECURE;
export const MAIL_FROM = process.env.MAIL_FROM;
export const MAIL_SERVICE = process.env.MAIL_SERVICE;
export const MAIL_TEMPLATE_LOGO_IMAGE_PATH =
  process.env.MAIL_TEMPLATE_LOGO_IMAGE_PATH;
export const DEV_DEFAULT_RECIPIENT = process.env.DEV_DEFAULT_RECIPIENT;

// ============================================================================
// FILE STORAGE PATHS
// ============================================================================

export const STORE_TEMP_IMAGE_PATH = process.env.STORE_TEMP_IMAGE_PATH;
export const STORE_TEMP_FILE_PATH = process.env.STORE_TEMP_FILE_PATH;
export const STORE_TEMP_VIDEO_PATH = process.env.STORE_TEMP_VIDEO_PATH;
export const PRODUCT_CSV_FOLDER_PATH = process.env.PRODUCT_CSV_FOLDER_PATH;
export const IMAGE_PATH = process.env.IMAGE_PATH;

// ============================================================================
// FRONTEND & URLS
// ============================================================================

export const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL;
export const RESET_PASSWORD_PATH = process.env.RESET_PASSWORD_PATH;

// ============================================================================
// WOOCOMMERCE CONFIGURATION
// ============================================================================

export const WOO_COMMERCE_URL = process.env.WOO_COMMERCE_URL;
export const WOO_COMMERCE_CONSUMER_KEY = process.env.WOO_COMMERCE_CONSUMER_KEY;
export const WOO_COMMERCE_CONSUMER_SECRET =
  process.env.WOO_COMMERCE_CONSUMER_SECRET;

// ============================================================================
// VALIGARA API CONFIGURATION
// ============================================================================

export const VALIGARA_API_URL = process.env.VALIGARA_API_URL;
export const VALIGARA_API_ACCESS_KEY = process.env.VALIGARA_API_ACCESS_KEY;

// ============================================================================
// PAYMENT GATEWAY CONFIGURATION
// ============================================================================

// Razorpay
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

// PayPal
export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
export const PAYPAL_SECRET_ID = process.env.NEXT_PUBLIC_PAYPAL_SECRET_ID;

// Stripe
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Affirm
export const AFFIRM_TRANSACTION_API_URL = process.env.AFFIRM_TRANSACTION_API_URL;
export const AFFIRM_PUBLIC_API_KEY = process.env.AFFIRM_PUBLIC_API_KEY;
export const AFFIRM_PRIVATE_API_KEY = process.env.AFFIRM_PRIVATE_API_KEY;

// Payment Currency
export const PAYMENT_CURRENCY_CODE = process.env.PAYMENT_CURRENCY_CODE;

// ============================================================================
// WHATSAPP CONFIGURATION
// ============================================================================

export const WHATSAPP_SEND_MESSAGE_API = process.env.WHATSAPP_SEND_MESSAGE_API;
export const WHATSAPP_SEND_MESSAGE_API_TOKEN =
  process.env.WHATSAPP_SEND_MESSAGE_API_TOKEN;
export const SEND_OTP_IN_WHATSAPP = process.env.SEND_OTP_IN_WHATSAPP;

// ============================================================================
// PRODUCT BULK UPLOAD CONFIGURATION
// ============================================================================

export const PRODUCT_BULK_UPLOAD_FILE_MIMETYPE =
  process.env.PRODUCT_BULK_UPLOAD_FILE_MIMETYPE;
export const PRODUCT_BULK_UPLOAD_ZIP_MIMETYPE =
  process.env.PRODUCT_BULK_UPLOAD_ZIP_MIMETYPE;
export const PRODUCT_BULK_UPLOAD_FILE_SIZE = process.env
  .PRODUCT_BULK_UPLOAD_FILE_SIZE
  ? Number(process.env.PRODUCT_BULK_UPLOAD_FILE_SIZE)
  : STATIC_CONFIG.DEFAULTS.PRODUCT_BULK_UPLOAD_FILE_SIZE;
export const PRODUCT_BULK_UPLOAD_ZIP_SIZE = process.env
  .PRODUCT_BULK_UPLOAD_ZIP_SIZE
  ? Number(process.env.PRODUCT_BULK_UPLOAD_ZIP_SIZE)
  : STATIC_CONFIG.DEFAULTS.PRODUCT_BULK_UPLOAD_ZIP_SIZE;
export const PRODUCT_BULK_UPLOAD_BATCH_SIZE =
  process.env.PRODUCT_BULK_UPLOAD_BATCH_SIZE;

// ============================================================================
// COMPANY & ORGANIZATION CONFIGURATION
// ============================================================================

export const COMPANY_INFO_KEY = process.env.COMPANY_INFO_KEY;
export const COMPANY_NUMBER = process.env.NEXT_PUBLIC_COMPANY_NUMBER;
export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_LOGO;
export const ORGANIZATION_ID = process.env.ORGANIZATION_ID;

// ============================================================================
// CURRENCY & PRICING CONFIGURATION
// ============================================================================

export const APP_CURRENCY = process.env.NEXT_PUBLIC_APP_CURRENCY;
export const APP_CURRENCY_SYMBOL_CODE_FOR_HTML =
  process.env.APP_CURRENCY_SYMBOL_CODE_FOR_HTML;
export const PRICE_FORMULA_LOCALE = process.env.PRICE_FORMULA_LOCALE;

// ============================================================================
// ORDER CONFIGURATION
// ============================================================================

export const ORDER_NUMBER_IDENTITY = process.env.NEXT_PUBLIC_ORDER_NUMBER_IDENTITY;
export const ALLOW_OUT_OF_STOCK_ORDERS = process.env.ALLOW_OUT_OF_STOCK_ORDERS;

// ============================================================================
// DIAMOND API CONFIGURATION
// ============================================================================

// VDB API
export const VDB_API_HOST = process.env.VDB_API_HOST;
export const VDB_API_ENDPOINT_DIAMONDS =
  process.env.VDB_API_ENDPOINT_DIAMONDS;
export const VDB_TOKEN = process.env.VDB_TOKEN;
export const VDB_API_KEY = process.env.VDB_API_KEY;

// Rapnet API
export const RAPNET_API_HOST = process.env.RAPNET_API_HOST;
export const RAPNET_API_ENDPOINT_DIAMONDS =
  process.env.RAPNET_API_ENDPOINT_DIAMONDS;
export const RAPNET_API_TOKEN = process.env.RAPNET_API_TOKEN;

// ============================================================================
// INVOICE CONFIGURATION
// ============================================================================

export const INVOICE_LOGO_IMAGE_BASE64 =
  process.env.NEXT_PUBLIC_INVOICE_LOGO_IMAGE_BASE64;
