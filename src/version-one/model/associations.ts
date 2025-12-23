import { Action } from "./action.model";
import { AppUser } from "./app-user.model";
import { CartProducts } from "./cart-product.model";
import { CategoryData } from "./category.model";
import { CompanyInfo } from "./companyinfo.model";
import { ConfigOrdersDetails } from "./config-order-details.model";
import { CouponData } from "./coupon.model";
import { CustomerUser } from "./customer-user.model";
import { Enquiries } from "./enquiries.model";
import { FAQData } from "./faq-question-answer.model";
import { HomeAboutMain } from "./home-about/home-about-main.model";
import { HomeAboutSub } from "./home-about/home-about-sub.model";
import { Image } from "./image.model";
import { Invoices } from "./invoices.model";
import { LooseDiamondGroupMasters } from "./loose-diamond-group-master.model";
import { ClarityData } from "./master/attributes/clarity.model";
import { Colors } from "./master/attributes/colors.model";
import { CutsData } from "./master/attributes/cuts.model";
import { DiamondGroupMaster } from "./master/attributes/diamond-group-master.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { StoneData } from "./master/attributes/gemstones.model";
import { HeadsData } from "./master/attributes/heads.model";
import { HookTypeData } from "./master/attributes/hook-type.model";
import { LengthData } from "./master/attributes/item-length.model";
import { SizeData } from "./master/attributes/item-size.model";
import { GoldKarat } from "./master/attributes/metal/gold-karat.model";
import { MetalMaster } from "./master/attributes/metal/metal-master.model";
import { MetalTone } from "./master/attributes/metal/metalTone.model";
import { MMSizeData } from "./master/attributes/mmSize.model";
import { SettingTypeData } from "./master/attributes/settingType.model";
import { ShanksData } from "./master/attributes/shanks.model";
import { SideSettingStyles } from "./master/attributes/side-setting-styles.model";
import { BrandData } from "./master/attributes/brands.model";
import { CurrencyData } from "./master/currency.model";
import { MegaMenuAttributes } from "./mega-menu/mega_menu_attributes.model";
import { MegaMenus } from "./mega-menu/mega_menu.model";
import { MenuItem } from "./menu-items.model";
import { MetaDataDetails } from "./metadata-details.model";
import { OfferDetails } from "./offer-discount/offer-detail.model";
import { Offers } from "./offer-discount/offer.model";
import { OrdersDetails } from "./order-details.model";
import { OrderTransaction } from "./order-transaction.model";
import { Orders } from "./order.model";
import { OurStory } from "./our-stories.model";
import { PageData } from "./pages.model";
import { ProductWish } from "./produc-wish-list.model";
import { Product } from "./product.model";
import { ProductAttributeValue } from "./product-attribute-value.model";
import { ProductCategory } from "./product-category.model";
import { ProductDiamondOption } from "./product-diamond-option.model";
import { ProductImage } from "./product-image.model";
import { ProductMetalOption } from "./product-metal-option.model";
import { ProductReview } from "./product-review.model";
import { ProductVideo } from "./product-video.model";
import { ReviewImages } from "./review-images.model";
import { Role } from "./role.model";
import { RoleApiPermission } from "./role-api-permission.model";
import { RolePermission } from "./role-permission.model";
import { RolePermissionAccess } from "./role-permission-access.model";
import { StoreAddress } from "./store-address.model";
import { StudConfigProduct } from "./stud-config-product.model";
import { StudDiamonds } from "./stud-diamonds.model";
import { TemplateEightData } from "./template-eight.model";
import { TestimonialData } from "./testimonial.model";
import { CountryData } from "./master/country.model";
import { OfferEligibleCustomers } from "./offer-discount/offers-eligible-customer.model";
import { BusinessUser } from "./business-user.model";
import { AboutUsData } from "./about-us.model";
import { ActivityLogs } from "./activity-logs.model";
import { UserAddress } from "./address.model";
import { StateData } from "./master/state.model";
import { CityData } from "./master/city.model";
import { BlogsData } from "./blogs.model";
import { BlogCategoryData } from "./blog-category.model";
import { ProductEnquiries } from "./product-enquiry.model";
import { DiamondCaratSize } from "./master/attributes/caratSize.model";
import { StudMetal } from "./stud-metals.model";
import { Collection } from "./master/attributes/collection.model";
import { StaticPageData } from "./static_page.model";
import { SieveSizeData } from "./master/attributes/seiveSize.model";
import { Master } from "./master/master.model";

export const setupAssociations = () => {
  // Product Associations
  Product.belongsTo(Product, { foreignKey: "parent_id", as: "parent_product" });
  Product.belongsTo(BrandData, { foreignKey: "id_brand", as: "brands" });
  Product.hasMany(ProductImage, { foreignKey: "id_product", as: "product_images" });
  Product.hasMany(ProductVideo, { foreignKey: "id_product", as: "product_videos" });
  Product.hasMany(ProductReview, { foreignKey: "product_id", as: "product_Review" });
  Product.hasMany(ProductEnquiries, { foreignKey: "product_id", as: "product_enquiry" });
  Product.hasMany(ProductMetalOption, { foreignKey: "id_product", as: "PMO" });
  Product.hasMany(ProductDiamondOption, { foreignKey: "id_product", as: "PDO" });
  Product.hasMany(ProductAttributeValue, { foreignKey: "id_product", as: "PAV" });
  Product.hasMany(OrdersDetails, { foreignKey: "product_id", as: "product_image" });
  Product.hasMany(CartProducts, { foreignKey: "product_id", as: "product_cart" });
  Product.hasMany(ProductCategory, { foreignKey: "id_product", as: "product_categories" });

  // Product Image Associations
  ProductImage.belongsTo(Product, { foreignKey: "id_product", as: "product" });
  ProductImage.belongsTo(MetalTone, { foreignKey: "id_metal_tone", as: "metal_tones" });

  // Product Video Associations
  ProductVideo.belongsTo(Product, { foreignKey: "id_product", as: "product" });

  // Product Review Associations
  ProductReview.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  ProductReview.hasMany(ReviewImages, { foreignKey: "review_id", as: "product_images" });

  // Product Enquiries Associations
  ProductEnquiries.belongsTo(Product, { foreignKey: "product_id", as: "product" });

  // Product Metal Option Associations
  ProductMetalOption.belongsTo(Product, { foreignKey: "id_product", as: "product" });
  ProductMetalOption.belongsTo(MetalMaster, { foreignKey: "id_metal", as: "metal_master" });
  ProductMetalOption.belongsTo(GoldKarat, { foreignKey: "id_karat", as: "metal_karat" });
  ProductMetalOption.belongsTo(SizeData, { foreignKey: "id_size", as: "item_size" });
  ProductMetalOption.belongsTo(LengthData, { foreignKey: "id_length", as: "item_length" });
  ProductMetalOption.belongsTo(MetalTone, { foreignKey: "id_m_tone", as: "metal_tone" });

  // Product Diamond Option Associations
  ProductDiamondOption.belongsTo(Product, { foreignKey: "id_product", as: "product" });
  ProductDiamondOption.belongsTo(SettingTypeData, { foreignKey: "id_setting", as: "setting" });
  ProductDiamondOption.belongsTo(DiamondGroupMaster, { foreignKey: "id_diamond_group", as: "rate" });
  ProductDiamondOption.belongsTo(StoneData, { foreignKey: "id_stone", as: "p_d_stone" });
  ProductDiamondOption.belongsTo(DiamondShape, { foreignKey: "id_shape", as: "p_d_shape" });
  ProductDiamondOption.belongsTo(Colors, { foreignKey: "id_color", as: "p_d_color" });
  ProductDiamondOption.belongsTo(ClarityData, { foreignKey: "id_clarity", as: "p_d_clarity" });
  ProductDiamondOption.belongsTo(MMSizeData, { foreignKey: "id_mm_size", as: "p_d_mm_size" });
  ProductDiamondOption.belongsTo(CutsData, { foreignKey: "id_cut", as: "p_d_cut" });

  // Product Category Associations
  ProductCategory.belongsTo(Product, { foreignKey: "id_product", as: "product" });
  ProductCategory.belongsTo(CategoryData, { foreignKey: "id_category", as: "category" });
  ProductCategory.belongsTo(CategoryData, { foreignKey: "id_sub_category", as: "sub_category" });
  ProductCategory.belongsTo(CategoryData, { foreignKey: "id_sub_sub_category", as: "sub_sub_category" });

  // Product Attribute Value Associations
  ProductAttributeValue.belongsTo(Product, { foreignKey: "id_product" });

  // Product Wishlist Associations
  ProductWish.hasOne(SizeData, { as: "size", foreignKey: "id", sourceKey: "id_size" });
  ProductWish.hasOne(LengthData, { as: "length", foreignKey: "id", sourceKey: "id_length" });
  ProductWish.hasOne(MetalMaster, { as: "metal", foreignKey: "id", sourceKey: "id_metal" });
  ProductWish.hasOne(GoldKarat, { as: "karat", foreignKey: "id", sourceKey: "id_karat" });
  ProductWish.hasOne(MetalTone, { as: "metal_tone", foreignKey: "id", sourceKey: "id_metal_tone" });
  ProductWish.hasOne(MetalTone, { as: "head_metal_tone", foreignKey: "id", sourceKey: "id_head_metal_tone" });
  ProductWish.hasOne(MetalTone, { as: "shank_metal_tone", foreignKey: "id", sourceKey: "id_shank_metal_tone" });
  ProductWish.hasOne(MetalTone, { as: "band_metal_tone", foreignKey: "id", sourceKey: "id_band_metal_tone" });
  ProductWish.hasOne(CustomerUser, { as: "user", foreignKey: "id_app_user", sourceKey: "user_id" });

  // Cart Products Associations
  CartProducts.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  CartProducts.belongsTo(AppUser, { foreignKey: "user_id", as: "users" });

  // Order Associations
  Orders.belongsTo(CouponData, { foreignKey: "coupon_id", as: "coupon" });
  Orders.belongsTo(CurrencyData, { foreignKey: "currency_id", as: "currency" });
  Orders.belongsTo(StoreAddress, { foreignKey: "pickup_store_id", as: "store_address" });
  Orders.hasMany(OrdersDetails, { foreignKey: "order_id", as: "order" });
  Orders.hasMany(ConfigOrdersDetails, { foreignKey: "order_id", as: "config_order" });
  Orders.hasOne(Invoices, { as: "invoice", foreignKey: "order_id" });

  // Order Details Associations
  OrdersDetails.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  OrdersDetails.belongsTo(Orders, { foreignKey: "order_id", as: "product_order" });

  // Config Order Details Associations
  ConfigOrdersDetails.belongsTo(Orders, { foreignKey: "order_id", as: "config_product_order" });

  // Invoices Associations
  Invoices.hasOne(Orders, { as: "order_invoice", foreignKey: "id", sourceKey: "order_id" });
  Invoices.hasOne(OrderTransaction, { as: "order_transaction", foreignKey: "id", sourceKey: "transaction_id" });

  // Store Address Associations
  StoreAddress.hasMany(Orders, { foreignKey: "pickup_store_id", as: "store_address" });

  // Role Associations
  Role.hasMany(AppUser, { foreignKey: "id_role", as: "role_app_user" });
  Role.hasMany(RolePermission, { foreignKey: "id_role", as: "RP" });

  // Role Permission Associations
  MenuItem.hasMany(RolePermission, { foreignKey: "id_menu_item", as: "RP" });
  RolePermission.belongsTo(Role, { foreignKey: "id_role", as: "role" });
  RolePermission.belongsTo(MenuItem, { foreignKey: "id_menu_item", as: "menu_item" });
  RolePermission.hasMany(RolePermissionAccess, { foreignKey: "id_role_permission", as: "RPA" });

  // Role Permission Access Associations
  RolePermissionAccess.belongsTo(RolePermission, { foreignKey: "id_role_permission", as: "RP" });
  RolePermissionAccess.belongsTo(Action, { foreignKey: "id_action", as: "action" });
  Action.hasMany(RolePermissionAccess, { foreignKey: "id_action" });

  // Role API Permission Associations
  RoleApiPermission.belongsTo(MenuItem, { as: "rap", foreignKey: "id_menu_item" });
  MenuItem.hasMany(RoleApiPermission, { as: "rap", foreignKey: "id_menu_item" });
  RoleApiPermission.belongsTo(Action, { as: "action", foreignKey: "id_action" });
  Action.hasMany(RoleApiPermission, { as: "action", foreignKey: "id_action" });

  // App User Associations
  AppUser.belongsTo(Role, { foreignKey: "id_role", as: "role" });
  AppUser.hasMany(CartProducts, { foreignKey: "user_id", as: "users_details" });
  AppUser.hasOne(CustomerUser, { foreignKey: "id_app_user", as: "customer_user" });
  AppUser.hasOne(BusinessUser, { foreignKey: "id_app_user", as: "business_users" });

  // Customer User Associations
  CustomerUser.belongsTo(AppUser, { as: "app_user", foreignKey: "id_app_user" });
  CustomerUser.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });
  CustomerUser.hasOne(CountryData, { as: "country", foreignKey: "id", sourceKey: "country_id" });

  // Business User Associations
  BusinessUser.belongsTo(AppUser, { foreignKey: "id_app_user", as: "b_app_user" });
  BusinessUser.belongsTo(Image, { foreignKey: "id_image", as: "b_image" });

  // Stud Config Product Associations
  StudConfigProduct.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "center_dia_mm_size" });
  StudConfigProduct.belongsTo(DiamondShape, { as: "dia_shape", foreignKey: "center_dia_shape" });
  StudConfigProduct.belongsTo(DiamondCaratSize, { as: "dia_wt", foreignKey: "center_dia_wt" });
  StudConfigProduct.belongsTo(HeadsData, { as: "setting", foreignKey: "setting_type" });
  StudConfigProduct.belongsTo(SideSettingStyles, { as: "huggies", foreignKey: "huggies_setting_type" });

  // Stud Metal Associations
  StudMetal.belongsTo(StudConfigProduct, { as: "stud_config_product", foreignKey: "stud_id" });
  StudMetal.belongsTo(MetalMaster, { as: "metal", foreignKey: "metal_id" });
  StudMetal.belongsTo(GoldKarat, { as: "karat", foreignKey: "karat_id" });

  // Stud Diamonds Associations
  StudDiamonds.belongsTo(StudConfigProduct, { as: "stud_config_product", foreignKey: "stud_id" });
  StudDiamonds.belongsTo(DiamondShape, { as: "shape", foreignKey: "dia_shape" });
  StudDiamonds.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "dia_mm_size" });

  // Mega Menu Associations
  MegaMenus.hasMany(MegaMenuAttributes, { foreignKey: "id_menu", as: "mega_menu_attributes" });

  // Mega Menu Attributes Associations
  MegaMenuAttributes.belongsTo(MegaMenus, { foreignKey: "id_menu", as: "mega_menu" });
  MegaMenuAttributes.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });
  MegaMenuAttributes.hasOne(CategoryData, { as: "category", foreignKey: "id", sourceKey: "id_category" });
  MegaMenuAttributes.hasOne(Collection, { as: "collection", foreignKey: "id", sourceKey: "id_collection" });
  MegaMenuAttributes.hasOne(SettingTypeData, { as: "setting_type", foreignKey: "id", sourceKey: "id_setting_type" });
  MegaMenuAttributes.hasOne(DiamondShape, { as: "diamond_shape", foreignKey: "id", sourceKey: "id_diamond_shape" });
  MegaMenuAttributes.hasOne(BrandData, { as: "brand", foreignKey: "id", sourceKey: "id_brand" });
  MegaMenuAttributes.hasOne(MetalMaster, { as: "metal", foreignKey: "id", sourceKey: "id_metal" });
  MegaMenuAttributes.hasOne(MetalTone, { as: "metal_tone", foreignKey: "id", sourceKey: "id_metal_tone" });
  MegaMenuAttributes.hasOne(StaticPageData, { as: "static_page", foreignKey: "id", sourceKey: "id_static_page" });
  MegaMenuAttributes.hasOne(PageData, { as: "page", foreignKey: "id", sourceKey: "id_page" });

  // Offers Associations
  Offers.hasMany(OfferDetails, { foreignKey: "offer_id", as: "offer_details" });
  Offers.hasMany(OfferEligibleCustomers, { foreignKey: "offer_id", as: "offer_eligible_customers" });

  // Offer Details Associations
  OfferDetails.belongsTo(Offers, { foreignKey: "offer_id", as: "offer" });

  // Offer Eligible Customers Associations
  OfferEligibleCustomers.belongsTo(Offers, { foreignKey: "offer_id", as: "offer" });

  // Diamond Group Master Associations
  DiamondGroupMaster.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });
  DiamondGroupMaster.hasOne(StoneData, { as: "stones", foreignKey: "id", sourceKey: "id_stone" });
  DiamondGroupMaster.hasOne(MMSizeData, { as: "mm_size", foreignKey: "id", sourceKey: "id_mm_size" });
  DiamondGroupMaster.hasOne(ClarityData, { as: "clarity", foreignKey: "id", sourceKey: "id_clarity" });
  DiamondGroupMaster.hasOne(Colors, { as: "colors", foreignKey: "id", sourceKey: "id_color" });
  DiamondGroupMaster.hasOne(CutsData, { as: "cuts", foreignKey: "id", sourceKey: "id_cuts" });
  DiamondGroupMaster.hasOne(DiamondCaratSize, { as: "carats", foreignKey: "id", sourceKey: "id_carat" });
  DiamondGroupMaster.hasOne(SieveSizeData, { as: "seive_size", foreignKey: "id", sourceKey: "id_seive_size" });
  DiamondGroupMaster.belongsTo(DiamondShape, { foreignKey: "id_shape", as: "shapes" });
  DiamondGroupMaster.hasMany(ProductDiamondOption, { foreignKey: "id_diamond_group", as: "PDO" });

  // Loose Diamond Group Master Associations
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "availability", as: "availability_master" });
  LooseDiamondGroupMasters.belongsTo(StoneData, { foreignKey: "stone", as: "stone_master" });
  LooseDiamondGroupMasters.belongsTo(DiamondShape, { foreignKey: "shape", as: "shape_master" });
  LooseDiamondGroupMasters.belongsTo(Colors, { foreignKey: "color", as: "color_master" });
  LooseDiamondGroupMasters.belongsTo(ClarityData, { foreignKey: "clarity", as: "clarity_master" });
  LooseDiamondGroupMasters.belongsTo(CutsData, { foreignKey: "cut_grade", as: "cut_grade_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "polish", as: "polish_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "symmetry", as: "symmetry_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "fluorescence_intensity", as: "fluorescence_intensity_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "fluorescence_color", as: "fluorescence_color_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "lab", as: "lab_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "fancy_color", as: "fancy_color_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "fancy_color_intensity", as: "fancy_color_intensity_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "fancy_color_overtone", as: "fancy_color_overtone_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "girdle_thin", as: "girdle_thin_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "girdle_thick", as: "girdle_thick_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "girdle_condition", as: "girdle_condition_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "culet_condition", as: "culet_condition_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "laser_inscription", as: "laser_inscription_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "cert_comment", as: "cert_comment_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "country", as: "country_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "state", as: "state_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "city", as: "city_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "time_to_location", as: "time_to_location_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "parcel_stone", as: "parcel_stone_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "trade_show", as: "trade_show_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "shade", as: "shade_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "center_inclusion", as: "center_inclusion_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "black_inclusion", as: "black_inclusion_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "h_a", as: "h_a_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "bgm", as: "bgm_master" });
  LooseDiamondGroupMasters.belongsTo(Master, { foreignKey: "growth_type", as: "growth_type_master" });
  LooseDiamondGroupMasters.belongsTo(BrandData, { foreignKey: "brand", as: "brand_master" });

  // Currency Associations
  CurrencyData.hasMany(Orders, { foreignKey: "currency_id", as: "orders_currency" });

  // Setting Type Associations
  SettingTypeData.hasOne(Image, { as: "setting_type_image", foreignKey: "id", sourceKey: "id_image" });
  SettingTypeData.hasMany(ProductDiamondOption, { foreignKey: "id_setting", as: "PDO" });

  // MM Size Associations
  MMSizeData.hasMany(ProductDiamondOption, { foreignKey: "id_mm_size", as: "PDO" });

  // Metal Tone Associations
  MetalTone.hasOne(Image, { as: "metal_tone_image", foreignKey: "id", sourceKey: "id_image" });
  MetalTone.hasMany(ProductMetalOption, { foreignKey: "id_m_tone", as: "PMO" });
  MetalTone.hasMany(ProductImage, { foreignKey: "id_metal_tone", as: "product_images" });

  // Metal Master Associations
  MetalMaster.hasMany(ProductMetalOption, { foreignKey: "id_metal", as: "PMO" });

  // Diamond Shape Associations
  DiamondShape.hasOne(Image, { as: "diamond_shape_image", foreignKey: "id", sourceKey: "id_image" });
  DiamondShape.hasMany(ProductDiamondOption, { foreignKey: "id_shape", as: "PDO" });
  DiamondShape.hasMany(DiamondGroupMaster, { foreignKey: "id_shape", as: "diamond_shapes" });

  // Gold Karat Associations
  GoldKarat.belongsTo(MetalMaster, { as: "metals", foreignKey: "id" });
  GoldKarat.hasOne(Image, { as: "karat_image", foreignKey: "id", sourceKey: "id_image" });
  GoldKarat.hasMany(ProductMetalOption, { foreignKey: "id_karat", as: "PMO" });

  // Length Data Associations
  LengthData.hasMany(ProductMetalOption, { foreignKey: "id_length", as: "PMO" });

  // Stone Data Associations
  StoneData.hasOne(Image, { as: "stone_image", foreignKey: "id", sourceKey: "id_image" });
  StoneData.hasMany(ProductDiamondOption, { foreignKey: "id_stone", as: "PDO" });

  // Clarity Data Associations
  ClarityData.hasMany(ProductDiamondOption, { foreignKey: "id_clarity", as: "PDO" });

  // Colors Associations
  Colors.hasMany(ProductDiamondOption, { foreignKey: "id_color", as: "PDO" });

  // Cuts Data Associations
  CutsData.hasMany(ProductDiamondOption, { foreignKey: "id_cut", as: "PDO" });

  // Diamond Carat Size Associations
  DiamondCaratSize.hasOne(Image, { as: "diamond_carat_image", foreignKey: "id", sourceKey: "id_image" });

  // Collection Associations
  Collection.belongsTo(CategoryData, { foreignKey: "id_category", as: "category" });

  // Heads Data Associations
  HeadsData.hasOne(Image, { as: "head_image", foreignKey: "id", sourceKey: "id_image" });

  // Hook Type Data Associations
  HookTypeData.hasOne(Image, { as: "hook_type_image", foreignKey: "id", sourceKey: "id_image" });

  // Review Images Associations
  ReviewImages.belongsTo(ProductReview, { foreignKey: "review_id", as: "product" });

  // Testimonial Data Associations
  TestimonialData.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });

  // MetaData Details Associations
  MetaDataDetails.belongsTo(PageData, { foreignKey: "id_page", as: "page" });

  // Our Story Associations
  OurStory.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });

  // Template Eight Associations
  TemplateEightData.hasOne(Image, { as: "eight_title_image", foreignKey: "id", sourceKey: "id_title_image" });

  // Menu Item Associations
  MenuItem.belongsTo(MenuItem, { as: "parent_menu", foreignKey: "id_parent_menu" });

  // Master Associations
  Master.belongsTo(Image, { foreignKey: "id_image", as: "image" });

  // Size Data Associations
  SizeData.hasMany(ProductMetalOption, { foreignKey: "id_size", as: "PMO" });
  SizeData.hasOne(ProductWish, { as: "product_wish_list_size", foreignKey: "id" });

  // Shanks Data Associations
  ShanksData.hasOne(Image, { as: "shank_image", foreignKey: "id", sourceKey: "id_image" });

  // Side Setting Styles Associations
  SideSettingStyles.hasOne(Image, { as: "side_setting_image", foreignKey: "id", sourceKey: "id_image" });

  // About Us Data Associations
  AboutUsData.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });

  // Activity Logs Associations
  ActivityLogs.belongsTo(AppUser, { foreignKey: "created_by", as: "User" });

  // User Address Associations
  UserAddress.belongsTo(CityData, { foreignKey: "city_id", as: "city" });
  UserAddress.belongsTo(StateData, { foreignKey: "state_id", as: "state" });
  UserAddress.belongsTo(CountryData, { foreignKey: "country_id", as: "country" });

  // Blogs Data Associations
  BlogsData.hasOne(Image, { as: "banner_image", foreignKey: "id", sourceKey: "id_banner_image" });
  BlogsData.hasOne(Image, { as: "blog_image", foreignKey: "id", sourceKey: "id_image" });
  BlogsData.hasOne(BlogCategoryData, { as: "category", foreignKey: "id", sourceKey: "id_category" });

  // Category Data Associations
  CategoryData.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });
  CategoryData.belongsTo(CategoryData, { as: "parent_category", foreignKey: "parent_id" });
  CategoryData.hasMany(CategoryData, { as: "sub_category", foreignKey: "parent_id" });

  // Company Info Associations
  CompanyInfo.hasOne(Image, { as: "dark_image", foreignKey: "id", sourceKey: "dark_id_image" });
  CompanyInfo.hasOne(Image, { as: "light_image", foreignKey: "id", sourceKey: "light_id_image" });
  CompanyInfo.hasOne(Image, { as: "favicon", foreignKey: "id", sourceKey: "favicon_image" });
  CompanyInfo.hasOne(Image, { as: "loader", foreignKey: "id", sourceKey: "loader_image" });
  CompanyInfo.hasOne(Image, { as: "mail_logo", foreignKey: "id", sourceKey: "mail_tem_logo" });
  CompanyInfo.hasOne(Image, { as: "default", foreignKey: "id", sourceKey: "default_image" });
  CompanyInfo.hasOne(Image, { as: "page_not_image", foreignKey: "id", sourceKey: "page_not_found_image" });
  CompanyInfo.hasOne(Image, { as: "share_images", foreignKey: "id", sourceKey: "share_image" });
  CompanyInfo.hasOne(Image, { as: "product_not_images", foreignKey: "id", sourceKey: "product_not_found_image" });
  CompanyInfo.hasOne(Image, { as: "order_not_images", foreignKey: "id", sourceKey: "order_not_found_image" });

  // FAQ Data Associations
  FAQData.hasOne(FAQData, { as: "FAQ_category", foreignKey: "id", sourceKey: "id_parent" });

  // Home About Main Associations
  HomeAboutMain.hasMany(HomeAboutSub, { foreignKey: "id_home_main", as: "home_about_subs" });
};