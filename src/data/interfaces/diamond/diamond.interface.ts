import { DIAMOND_ORIGIN } from "../../../utils/app-enumeration";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Diamond shape types from VDB
 */
export type TVDBShape =
  | "Briolette"
  | "Eurocut"
  | "Flanders"
  | "Half Moon"
  | "Kite"
  | "Old Miner"
  | "Bullet"
  | "Hexagonal"
  | "Lozenge"
  | "Tapered Bullet"
  | "Octagonal"
  | "Triangle"
  | "Rose Cut"
  | "Radiant"
  | "Ideal Oval"
  | "Ideal Square"
  | "Square Emerald"
  | "Sig81"
  | "Cushion Modified Brilliant"
  | "Pear"
  | "Ideal Cushion"
  | "Asscher"
  | "Pentagonal"
  | "Star"
  | "Trapezoid"
  | "Cushion"
  | "Trilliant"
  | "Marquise"
  | "Baguette"
  | "Heart"
  | "Shield"
  | "Tapered Baguette"
  | "Round"
  | "Oval"
  | "Emerald"
  | "Princess"
  | "Square"
  | "Ideal Heart"
  | "Other";

/**
 * Diamond clarity grades
 */
export type TVDBClarity =
  | "FL"
  | "IF"
  | "VVS1"
  | "VVS2"
  | "VS1"
  | "VS2"
  | "SI1"
  | "SI2"
  | "SI3"
  | "SI"
  | "VS"
  | "VS-SI"
  | "VVS"
  | "I1"
  | "I2"
  | "I3";

/**
 * Diamond cut grades
 */
export type TVDBCut = "Ideal" | "Excellent" | "Very Good" | "Good" | "Fair" | "Poor";

/**
 * Diamond symmetry grades
 */
export type TVDBSymmetry =
  | "Ideal"
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Fair"
  | "Poor";

/**
 * Diamond polish grades
 */
export type TVDBPolish =
  | "Ideal"
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Fair"
  | "Poor";

/**
 * Available sorting options for diamond queries
 */
export type TVDBSorting =
  | "discount_percent"
  | "price_per_carat"
  | "total_sales_price"
  | "meas_ratio"
  | "meas_length"
  | "shape"
  | "size"
  | "color"
  | "clarity"
  | "cut"
  | "polish"
  | "symmetry"
  | "fluor_intensity"
  | "depth_percent"
  | "table_percent"
  | "lab";

// ============================================================================
// LOCATION & VENDOR INTERFACES
// ============================================================================

/**
 * VDB vendor location information
 */
export interface TVDBLocation {
  id: number;
  location_name: string;
  street_address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  contact_person: string;
  contact_email: string;
  mobile_phone: string;
  office_phone: string;
  website: string;
  vendor_id: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
  contact_iphone: string;
  mobile_phone_country_code: string;
  contact_phone_country_code: string;
  contact_iphone_country_code: string;
  contact_whatsapp: string;
  contact_whatsapp_country_code: string;
}

/**
 * Vendor information embedded in diamond data
 */
interface IVendorInfo {
  vendor_name: string;
  vendor_phone: string;
  vendor_mobile_phone: string;
  vendor_email: string;
  contact_person: string;
  vendor_street_address: string;
  vendor_city: string;
  vendor_state: string;
  vendor_country: string;
  vendor_zip_code: string;
  vendor_iphone: string;
  vendor_accepts_memo: boolean;
  vendor_three_d_settings: null;
}

// ============================================================================
// DIAMOND MEASUREMENT & PHYSICAL PROPERTIES
// ============================================================================

/**
 * Diamond measurement data
 */
interface IDiamondMeasurements {
  meas_length: string;
  meas_width: string;
  meas_depth: string;
  meas_ratio: null | string;
  measurement: string;
  depth_percent: string;
  table_percent: string;
  crown_height: string;
  crown_angle: string;
  pavilion_depth: string;
  pavilion_angle: string;
}

/**
 * Diamond girdle information
 */
interface IDiamondGirdle {
  girdle_min: string;
  girdle_max: string;
  girdle_condition: string;
  girdle_percent: null;
  girdle_open: null;
}

/**
 * Diamond culet information
 */
interface IDiamondCulet {
  culet_size: string;
  culet_condition: null;
}

/**
 * Diamond fluorescence information
 */
interface IDiamondFluorescence {
  fluor_color: null;
  fluor_intensity: string;
}

/**
 * Diamond inclusion details
 */
interface IDiamondInclusions {
  eye_clean: string;
  inclusion_black: string;
  inclusion_center: string;
  inclusion_open: null;
  color_inclusion: null;
  table_inclusion: null;
  table_open: null;
  crown_open: null;
  pavallion_open: null;
  location_of_black: null;
  inclusion_pattern: null;
}

// ============================================================================
// DIAMOND QUALITY GRADES
// ============================================================================

/**
 * Diamond quality grades (cut, color, clarity, etc.)
 */
interface IDiamondQualityGrades {
  shape: string;
  shape_long: string;
  shape_short: string;
  color: string;
  min_color: number;
  max_color: number;
  clarity: string;
  clarity_long: string;
  clarity_short: string;
  cut: string;
  cut_long: string;
  cut_short: string;
  polish: string;
  polish_long: string;
  polish_short: string;
  symmetry: string;
  symmetry_long: string;
  symmetry_short: string;
  lab: string;
  lab_long: string;
  lab_short: string;
}

/**
 * Fancy color diamond properties
 */
interface IDiamondFancyColor {
  fancy_color_dominant_color: null;
  fancy_color_secondary_color: null;
  fancy_color_overtone: null;
  fancy_color_intensity: null;
  fancy_color_long: null;
  fancy_color_short: null;
  fancy_color_intensity_long: null;
  fancy_color_intensity_short: null;
  fancy_color_overtone_long: null;
  fancy_color_overtone_short: null;
  is_fancy: boolean;
}

/**
 * Diamond quality characteristics
 */
interface IDiamondQualityCharacteristics {
  hearts_and_arrows: string;
  laser_inscription: string;
  star_length: string;
  shade: string;
  milky: string;
  bgm: string;
  quality: string;
  tinge: null;
  luster: null;
  surface_graining: null;
  internal_graining: null;
  indented_natural: null;
  intensity_black_code: null;
  natts_code: null;
}

// ============================================================================
// DIAMOND PRICING INTERFACES
// ============================================================================

/**
 * Diamond pricing information
 */
interface IDiamondPricing {
  total_sales_price: string;
  price_per_carat: string;
  rapnet_price: string;
  live_rapa_rate: string;
  csv_discount: string;
  calculated_disc_perc: string;
  markup_price: string;
  markup_price_per_carat: string;
  base_price_per_carat: string;
  base_price: string;
  cash_price: null;
  cash_discount: null;
  discount_percent: null;
  sell_price: null;
  retail_price: null;
  special_price: null;
  currency_code: null;
  currency_symbol: null;
  total_sales_price_in_currency: null;
  currency_exchange_rate: null;
  original_ppc: null;
  original_tsp: null;
  group_original_tsp: null;
  group_original_ppc: null;
  group_original_discount: null;
  hide_price_per_carat: null;
  hide_total_sales_price: null;
}

// ============================================================================
// DIAMOND CERTIFICATION INTERFACES
// ============================================================================

/**
 * Diamond certification information
 */
interface IDiamondCertification {
  cert_num: string;
  cert_url: string;
  has_cert_file: boolean;
  cert_comment: null;
  cert_updated_at: null;
  certification: null;
  certificate_date: null;
  cert_source: null;
  cert_source_url: null;
  s3_cert: {
    url: null;
  };
  masked_cert_url: string;
  certification_details: {
    icon: null;
    logo: null;
    additional_text: null;
  };
}

// ============================================================================
// DIAMOND MEDIA INTERFACES
// ============================================================================

/**
 * Diamond image information
 */
interface IDiamondImages {
  image_url: string;
  image_thumb_url: string;
  masked_image_url: string;
  has_image_file: boolean;
  image_source: null;
  image_source_url: null;
  image_bad_http_status: boolean;
  image_check_ran_at: null;
  is_thumb_resized: boolean;
  gdrive_image_url: null;
  s3_image: {
    url: null;
    thumb: {
      url: null;
    };
  };
  image_urls: {
    image_url: string;
    sequence: number;
  }[];
}

/**
 * Diamond video information
 */
interface IDiamondVideos {
  video_url: string;
  masked_video_url: string;
  video_type: string;
  video_support: string;
  has_video: boolean;
  video_source: null;
  video_source_url: null;
  bad_video_content: boolean;
  video_bad_http_status: boolean;
  video_check_ran_at: null;
  gdrive_video_url: null;
  s3_video: {
    url: null;
  };
  oscillating_video: boolean;
  whitelisted_video: boolean;
  transcoding_job: null;
  transcoding_status: null;
  transcoded_video_data: null;
  transcoded_video_url: null;
  orbital_source_url: null;
  orbital_url: null;
}

// ============================================================================
// DIAMOND INVENTORY & AVAILABILITY
// ============================================================================

/**
 * Diamond inventory and availability information
 */
interface IDiamondInventory {
  diamond_id: number;
  on_hand: number;
  available: number;
  quantity: number | null;
  remaining_quantity_count: number | null;
  stock_num: string;
  original_stock_num: null;
  scrambled_stock_num: null;
  master_stock_number: null;
  stock_status: null;
  status: string;
  status_updated_at: null;
  availability_change_date: null;
  max_quantity: null;
  custom_availability_stone_status: null;
}

// ============================================================================
// DIAMOND METADATA & CONFIGURATION
// ============================================================================

/**
 * Diamond metadata and configuration fields
 */
interface IDiamondMetadata {
  id: number;
  vendor_id: number;
  city: string;
  state: string;
  country: string;
  country_of_origin: null;
  treatment: string;
  treatment_notes: null;
  data_integrity: boolean;
  sort_priority: number;
  master_diamond_id: null;
  mount_price: null;
  short_title: string;
  long_title: string;
  sub_title: string;
  sub_title_description: string;
  comments: string;
  item_comment: string;
  supplier_specific_comment: string;
  supplier_comments: null;
  item_tag: null;
  tags: null;
  key_to_symbol: string;
  data: Record<string, unknown>;
  source_errors: Record<string, unknown>;
  validation_errors: Record<string, unknown>;
  additional_attributes: Record<string, unknown>;
  bad_fields: unknown[];
  has_bad_data: boolean;
  created_at: string;
  updated_at: string;
  last_updated_at: string;
  new_arrival_date: null;
  price_date: null;
}

/**
 * Diamond configuration fields
 */
interface IDiamondConfigFields {
  config_field_1: null;
  config_field_2: null;
  config_field_3: null;
  config_field_4: null;
  config_field_5: null;
  config_field_6: null;
  config_field_7: null;
  config_field_8: null;
  config_field_9: null;
  config_field_10: null;
}

/**
 * Diamond product and jewelry information
 */
interface IDiamondProductInfo {
  jewelry_style: null;
  jewelry_type: null;
  jewelry_description: null;
  jewelry_stock_num: null;
  product_title: null;
  product_description: null;
  metal: null;
  metals: null;
  metal_carat: null;
  mount: null;
  mount_description: string;
  total_stones: null;
  is_separable: boolean;
  is_customizable: null;
  engravable: boolean;
  parent_id: null;
  is_master_product: null;
  is_linked_pair: boolean;
  pair: null;
  pairinfo: null;
  pair_stock_num: null;
  brand: string;
  group: null;
  group_logo_url: null;
  tier: null;
}

/**
 * Diamond center stone information
 */
interface IDiamondCenterStone {
  center_type: null;
  center_gem_type: null;
  center_shape: null;
  center_color: null;
  center_clarity: null;
  center_fancy_color_dominant_color: null;
  center_fancy_color_intensity: null;
  center_fluor_intensity: null;
  center_lab: null;
  center_cert_num: null;
  center_treatment: null;
  center_total_stones: null;
  center_size: null;
  center_meas_depth: null;
  center_meas_length: null;
  center_meas_width: null;
  center_meas_ratio: null;
  center_polish: null;
  center_symmetry: null;
  center_cut: null;
  center_depth_percent: null;
  center_table_percent: null;
  center_pair: null;
}

/**
 * Diamond side stone information
 */
interface IDiamondSideStone {
  side_stone_type: null;
  side_stone_gem_type: null;
  side_stone_total_stones: null;
  side_stone_size: null;
  side_stone_shape: null;
  side_stone_color: null;
  side_stone_clarity: null;
  side_stone_fancy_color_dominant_color: null;
  side_stone_fancy_color_intensity: null;
}

/**
 * Diamond parcel and grouping information
 */
interface IDiamondParcelInfo {
  parcel_stones: null;
  parcel_avg_weight: null;
  parcel_carat_range_from: null;
  parcel_carat_range_to: null;
  carat_group: null;
  carat_group_seq_no: null;
}

/**
 * Diamond search and display information
 */
interface IDiamondSearchInfo {
  custom_search_text: null;
  visibility: string;
  hidden: boolean;
  flagged: null;
  previewable: string;
  disable_price_negotiation: null;
  custom_sort_order: null;
  layout: null;
  diamond_category: null;
  diamond_type: null;
  supported_shapes: null;
  type: string;
}

/**
 * Diamond sequence and sorting information
 */
interface IDiamondSequences {
  lab_sequence_no: null;
  shape_sequence_no: null;
  color_sequence_no: null;
  clarity_sequence_no: null;
  original_stone_no: null;
  lab_sync_status: boolean;
}

/**
 * Diamond sustainability and certification
 */
interface IDiamondSustainability {
  scs_sustainable: null;
  scs_climate_neutral: null;
  sustainability: null;
}

/**
 * Diamond auction information
 */
interface IDiamondAuction {
  incremental_bid_amount: null;
  starting_bid: null;
}

/**
 * Diamond 3D and media information
 */
interface IDiamond3DMedia {
  three_d_enabled: boolean;
  three_d_media: null;
}

/**
 * Diamond S3 and upload information
 */
interface IDiamondS3Info {
  s3_direct_upload_url: Record<string, unknown>;
}

/**
 * Diamond display labels (long/short forms)
 */
interface IDiamondDisplayLabels {
  fluorescence_intensity_long: string;
  fluorescence_intensity_short: string;
  culet_size_long: string;
  culet_size_short: string;
  girdle_min_long: string;
  girdle_min_short: string;
  girdle_max_long: string;
  girdle_max_short: string;
}

/**
 * Diamond size and carat information
 */
interface IDiamondSize {
  size: string;
  setting_supported_carat_from: null;
  setting_supported_carat_to: null;
}

/**
 * Diamond growth and origin information
 */
interface IDiamondGrowth {
  lab_grown: boolean;
  growth_type: null;
}

/**
 * Diamond ownership and history
 */
interface IDiamondOwnership {
  ownership: null;
  owner_info: null;
  history: null;
}

/**
 * Diamond price variant information
 */
interface IDiamondPriceVariant {
  price_variant: null;
  dor: null;
  fm: null;
}

/**
 * Diamond estimated delivery
 */
interface IDiamondDelivery {
  estimated_delivery: null;
}

/**
 * Diamond stone detail URL
 */
interface IDiamondUrls {
  stone_detail_url: null;
}

/**
 * Diamond sub-type information
 */
interface IDiamondSubType {
  sub_type: null;
}

// ============================================================================
// MAIN VDB DIAMOND INTERFACE
// ============================================================================

/**
 * Complete VDB diamond data structure
 * This interface combines all diamond-related information from the VDB API
 */
export interface TVDBDiamond
  extends IDiamondMeasurements,
    IDiamondGirdle,
    IDiamondCulet,
    IDiamondFluorescence,
    IDiamondInclusions,
    IDiamondQualityGrades,
    IDiamondFancyColor,
    IDiamondQualityCharacteristics,
    IDiamondPricing,
    IDiamondCertification,
    IDiamondImages,
    IDiamondVideos,
    IDiamondInventory,
    IDiamondMetadata,
    IDiamondConfigFields,
    IDiamondProductInfo,
    IDiamondCenterStone,
    IDiamondSideStone,
    IDiamondParcelInfo,
    IDiamondSearchInfo,
    IDiamondSequences,
    IDiamondSustainability,
    IDiamondAuction,
    IDiamond3DMedia,
    IDiamondS3Info,
    IDiamondDisplayLabels,
    IDiamondSize,
    IDiamondGrowth,
    IDiamondOwnership,
    IDiamondPriceVariant,
    IDiamondDelivery,
    IDiamondUrls,
    IDiamondSubType,
    IVendorInfo {
  // Additional direct properties
  locations: TVDBLocation[];
  media: null;
  jbt_detail: null;
}

// ============================================================================
// RAPNET DIAMOND INTERFACE
// ============================================================================

/**
 * Rapnet diamond data structure
 */
export type TRapnetDiamond = {
  sarine_file: null;
  total_purchase_price: number;
  city: string;
  country: string;
  diamond_id: number;
  shape: string;
  size: number;
  color: string;
  fancy_color_dominant_color: string;
  fancy_color_secondary_color: string;
  fancy_color_overtone: string;
  fancy_color_intensity: string;
  clarity: string;
  cut: string;
  symmetry: string;
  polish: string;
  depth_percent: number;
  table_percent: number;
  meas_length: number;
  meas_width: number;
  meas_depth: number;
  girdle_min: string;
  girdle_max: string;
  girdle_condition: string;
  culet_size: string;
  culet_condition: string;
  fluor_color: string;
  fluor_intensity: string;
  has_cert_file: boolean;
  lab: string;
  currency_code: string;
  currency_symbol: string;
  cert_num: string;
  stock_num: string;
  video_url: string;
  has_video: boolean;
  eye_clean: string;
  has_image_file: boolean;
  has_sarineloupe: boolean;
  image_file: string;
  total_sales_price: number;
  total_sales_price_in_currency: number;
  ratio: null;
  is_bgm: boolean;
};

// ============================================================================
// DIAMOND FILTER INTERFACE
// ============================================================================

/**
 * Filter parameters for diamond queries
 */
export interface IDiamondFilter {
  current_page: number;
  per_page_rows: number;
  sort_by?: string; // shape, price, carat, cut, color, clarity
  order_by?: string;
  shape?: string; // TVDBShape
  min_carat?: number;
  max_carat?: number;
  diamond_origin?: DIAMOND_ORIGIN;
  min_price?: number;
  max_price?: number;
  color_from?: string; // D-Z
  color_to?: string; // D-Z
  clarity_from?: string; // TVDBClarity
  clarity_to?: string; // TVDBClarity
  cut_from?: string; // TVDBCut
  cut_to?: string; // TVDBCut
  h_a?: string;
  report?: string;
  min_lw_ratio?: number;
  max_lw_ratio?: number;
  fluorescence_intensity?: string;
  polish_from?: string;
  polish_to?: string;
  symmetry_from?: string;
  symmetry_to?: string;
  min_table?: string;
  max_table?: string;
  min_depth?: string;
  max_depth?: string;
}

// ============================================================================
// DIAMOND RESPONSE INTERFACE
// ============================================================================

/**
 * Simplified diamond response structure for API responses
 */
export interface IDiamondResponse {
  id: string;
  shape: string;
  price: string;
  carat: string;
  cut: string;
  color: string;
  clarity: string;
  image_url: string;
  video_url: string;
  other_images_url: string[];
  lw: null | string;
  fluor: string;
  symmetry: string;
  table: string;
  measurement_length: string;
  measurement_width: string;
  measurement_depth: string;
  culet: string;
  polish: string;
  girdle: string;
  depth: string;
  report: string;
  stock_number: string;
  diamond_origin: string;
  certificate_url: string;
  quantity: number | null;
  remaining_quantity_count: number | null;
}
