import { Transaction } from "sequelize";
import { TAttributeType, TBitFieldValue } from "../../types/common/common.type";

// ============================================================================
// RESPONSE & API INTERFACES
// ============================================================================

/**
 * Standard API response structure
 */
export interface TResponseReturn {
  code: number;
  status: string;
  message: string;
  data: any; // Using any for flexibility with various response data types
}

// ============================================================================
// PAGINATION INTERFACES
// ============================================================================

/**
 * Base pagination query parameters
 */
export interface IQueryPagination {
  per_page_rows: number;
  current_page: number;
  order_by: string;
  sort_by: string;
  is_active?: TBitFieldValue;
  total_pages: number;
  total_items: number;
  search_text: string;
}

/**
 * Banner-specific pagination query parameters
 */
export interface IBannerQueryPagination extends IQueryPagination {
  is_active?: TBitFieldValue;
}

// ============================================================================
// PERMISSION & ACCESS INTERFACES
// ============================================================================

/**
 * Role-based permission access configuration
 */
export interface IRolePermissionAccess {
  id_menu_item: number;
  access: number[];
}

// ============================================================================
// PRODUCT ATTRIBUTE INTERFACES
// ============================================================================

/**
 * Payload for validating product attribute values
 */
export interface IPayloadValidateProductAttributeValue {
  attribute_type: TAttributeType;
  id_attribute_value: number;
}

// ============================================================================
// PRODUCT METAL INTERFACES
// ============================================================================

/**
 * Base interface for product metal data
 */
interface IBaseProductMetal {
  id: number;
  id_product: number;
  id_metal: number;
  metal_weight: number;
  retail_price: number | null;
  compare_price: number | null;
  price: number | null;
  quantity: number;
  band_metal_weight: number;
  is_deleted: boolean | null;
}

/**
 * Product metal options configuration
 */
export interface IProductMetalOptions {
  id: number;
  id_product: number;
  id_metal_group: number;
  metal_weight: number;
  is_default: string;
}

/**
 * Product metal data for gold products
 */
export interface IProductMetalGoldData extends IBaseProductMetal {
  id_metal_tone: number[];
  id_karat: number;
}

/**
 * Product metal data for silver products
 */
export interface IProductMetalSilverData extends IBaseProductMetal {
  id_metal_tone: number[];
}

/**
 * Product variant metal data with additional variant-specific fields
 */
export interface IProductVariantMetalData {
  id: number;
  id_size: number | null;
  id_length: number | null;
  id_metal: number | null;
  id_karat: number | null;
  quantity: number;
  side_dia_weight: number | null;
  side_dia_count: number | null;
  id_metal_tone: number[] | null;
  metal_weight: number | null;
  compare_price: number | null;
  is_deleted: boolean | null;
  retail_price: number | null;
  center_diamond_price?: number;
  metal_tone?: number[] | null;
  band_metal_price: number;
  band_metal_weight: number;
}

// ============================================================================
// PRODUCT DIAMOND INTERFACES
// ============================================================================

/**
 * Product diamond options configuration
 */
export interface IProductDiamondOptions {
  id: number;
  id_product: number;
  id_diamond_group: number;
  id_type: number;
  id_setting: number;
  weight: number;
  count: number;
  is_default: string;
}

// ============================================================================
// PRODUCT SAVE PAYLOAD INTERFACES
// ============================================================================

/**
 * Base interface for product save payloads with transaction
 */
interface IBaseProductSavePayload {
  idProduct: number;
  idAppUser: number;
  trn: Transaction;
}

/**
 * Payload for saving product metal options
 */
export interface ISaveProductMetalOptionsPayload extends IBaseProductSavePayload {
  productMetalOptions: IProductMetalOptions[];
}

/**
 * Payload for saving setting style type
 */
export interface ISaveSettingStyleTypePayload extends IBaseProductSavePayload {
  settingStyleType: number[];
  oldSettingStyleType: string;
}

/**
 * Payload for saving product diamond options
 */
export interface ISaveProductDiamondOptionsPayload
  extends IBaseProductSavePayload {
  productDiamondOptions: IProductDiamondOptions[];
}

/**
 * Payload for saving product size
 */
export interface ISaveProductSizePayload extends IBaseProductSavePayload {
  size: number[];
  oldSize: string;
}

/**
 * Payload for saving product length
 */
export interface ISaveProductLengthPayload extends IBaseProductSavePayload {
  length: number[];
  oldLength: string;
}

// ============================================================================
// PRODUCT CATEGORY INTERFACES
// ============================================================================

/**
 * Product category structure
 */
export interface IProductCategory {
  id: number;
  id_category: number;
  id_sub_category?: number;
  id_sub_sub_category?: number;
}

// ============================================================================
// PRODUCT VALIDATION PAYLOAD INTERFACES
// ============================================================================

/**
 * Base interface for product validation payloads
 */
interface IBaseProductValidationPayload {
  oldValue: string;
}

/**
 * Payload for validating product tags
 */
export interface IValidateProductTagPayload {
  tag: number[];
  oldTag: string;
}

/**
 * Payload for validating product collections
 */
export interface IValidateProductCollectionPayload {
  collection: number[];
  oldCollection: string;
}

/**
 * Payload for validating product sizes
 */
export interface IValidateProductSizePayload {
  size: number[];
  oldSize: string;
}

/**
 * Payload for validating product lengths
 */
export interface IValidateProductLengthPayload {
  length: number[];
  oldLength: string;
}

/**
 * Payload for validating diamond shapes
 */
export interface IValidateDiamondShapesPayload {
  shapes: number[];
  oldShapes: string;
}

/**
 * Payload for validating product categories
 */
export interface IValidateProductCategoryPayload {
  categories: IProductCategory[];
  id_product: number | null;
}

// ============================================================================
// METAL RATE INTERFACES
// ============================================================================

/**
 * Metal rate configuration
 */
export interface IMetalRate {
  id_metal: number;
  rate: number;
  formula: number;
}

/**
 * Metal group rate configuration
 */
export interface IMetalGroupRate {
  id_metal_config: number;
  rate: number;
}
