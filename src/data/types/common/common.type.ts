import { TResponseReturn } from "../../interfaces/common/common.interface";

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * User type values
 * Maps to USER_TYPE enum:
 * - 1: Administrator
 * - 2: BusinessUser
 * - 3: Customer (not included in this type, check if needed)
 * - 4: Guest (not included in this type, check if needed)
 * - 5: (Legacy/Unused)
 * - 6: SuperAdmin
 */
export type TUserType = 1 | 2 | 6 | 5;

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Response payload interface for TResponse function
 */
export interface IResponsePayload {
  /** HTTP status code */
  code?: number;
  
  /** Response status string */
  status?: string;
  
  /** Response message */
  message?: string;
  
  /** Response data (can be any type) */
  data?: any; // Using any for flexibility with various response data types
}

/**
 * Response function type
 * Function that accepts optional response payload and returns TResponseReturn
 */
export type TResponse = (payload?: IResponsePayload) => TResponseReturn;

// ============================================================================
// IMAGE TYPES
// ============================================================================

/**
 * Image type values (1-45)
 * Maps to IMAGE_TYPE enum values:
 * - 1: banner
 * - 2: product_promotion
 * - 3: testimonial
 * - 4: category
 * - 5: customer
 * - 6: diamondShape
 * - 7: gemstones
 * - 8: heads
 * - 9: shanks
 * - 10: settingType
 * - 11: goldKT
 * - 12: metalTone
 * - 13: homeAbout
 * - 14: profile
 * - 15: headerLogo
 * - 16: footerLogo
 * - 17: DiamondGroup
 * - 18: blog
 * - 19: sideSetting
 * - 20: caratSize
 * - 21: ConfigProduct
 * - 22: OurStory
 * - 23: BirthstoneProduct
 * - 24: FaviconImage
 * - 25: jewelry_section
 * - 26: diamond_section
 * - 27: ProductModel
 * - 28: templateThree
 * - 29: MegaMenu
 * - 30: hookType
 * - 31: templateSix
 * - 32: aboutUs
 * - 33: templateSeven
 * - 34: ThemeProvider
 * - 35: loaderImage
 * - 36: mailTemplateLogo
 * - 37: defaultImage
 * - 38: pageNotFoundImage
 * - 39: shareImage
 * - 40: Configurator
 * - 41: productNotFound
 * - 42: orderNotFound
 * - 43: Master
 * - 44: templateFour
 * - 45: templateEight
 */
export type TImageType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45;

// ============================================================================
// BIT FIELD TYPES
// ============================================================================

/**
 * Bit field value type
 * Used for boolean-like fields stored as strings in database
 * - "0": false
 * - "1": true
 */
export type TBitFieldValue = "0" | "1";

// ============================================================================
// ATTRIBUTE TYPES
// ============================================================================

/**
 * Attribute type values (1-14)
 * Used for product attribute classification
 */
export type TAttributeType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Converts bit field value to boolean
 */
export type TBitToBoolean<T extends TBitFieldValue> = T extends "1" ? true : false;

/**
 * Converts boolean to bit field value
 */
export type TBooleanToBit<T extends boolean> = T extends true ? "1" : "0";

/**
 * Makes all properties of T optional recursively
 */
export type TDeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? TDeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties of T required recursively
 */
export type TDeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? TDeepRequired<T[P]> : T[P];
};

/**
 * Extracts the return type of a function
 */
export type TReturnType<T extends (...args: any[]) => any> = ReturnType<T>;

/**
 * Extracts the parameter types of a function
 */
export type TParameters<T extends (...args: any[]) => any> = Parameters<T>;
