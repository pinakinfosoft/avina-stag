import {
  BIGINT,
  BOOLEAN,
  DATE,
  DOUBLE,
  INTEGER,
  NUMBER,
  STRING,
} from "sequelize";
import dbContext from "../../config/db-context";
import { BrandData } from "./master/attributes/brands.model";
import { ProductCategory } from "./product-category.model";
import { ProductImage } from "./product-image.model";
import { ProductVideo } from "./product-video.model";
import { ProductReview } from "./product-review.model";
import { ProductEnquiries } from "./product-enquiry.model";
import { ProductMetalOption } from "./product-metal-option.model";
import { ProductDiamondOption } from "./product-diamond-option.model";
import { ProductAttributeValue } from "./product-attribute-value.model";
import { OrdersDetails } from "./order-details.model";
import { CartProducts } from "./cart-product.model";

export const Product = dbContext.define("products", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  },
  sku: {
    type: STRING,
  },
  sort_description: {
    type: STRING,
  },
  long_description: {
    type: STRING,
  },
  tag: {
    type: STRING,
  },
  setting_style_type: {
    type: STRING,
  },
  size: {
    type: STRING,
  },
  length: {
    type: STRING,
  },
  is_active: {
    type: STRING,
  },
  is_deleted: {
    type: STRING,
  },
  making_charge: {
    type: NUMBER,
  },
  finding_charge: {
    type: NUMBER,
  },
  other_charge: {
    type: NUMBER,
  },
  created_by: {
    type: INTEGER,
  },
  created_date: {
    type: DATE,
  },
  modified_by: {
    type: INTEGER,
  },
  modified_date: {
    type: DATE,
  },
  is_featured: {
    type: STRING,
  },
  is_trending: {
    type: STRING,
  },
  slug: {
    type: STRING,
  },
  gender: {
    type: STRING,
  },
  product_type: {
    type: INTEGER,
  },
  retail_price: {
    type: DOUBLE,
  },
  compare_price: {
    type: DOUBLE,
  },
  discount_type: {
    type: INTEGER,
  },
  discount_value: {
    type: STRING,
  },
  quantity: {
    type: BIGINT,
  },
  id_brand: {
    type: INTEGER,
  },
  id_collection: {
    type: STRING,
  },
  is_quantity_track: {
    type: BOOLEAN,
  },
  is_choose_setting: {
    type: STRING,
  },
  is_single: {
    type: STRING,
  },
  setting_diamond_shapes: {
    type: STRING,
  },
  additional_detail: {
    type: STRING,
  },
  certificate: {
    type: STRING,
  },
  shipping_day: {
    type: INTEGER,
  },
  is_customization: {
    type: STRING,
  },
  parent_id: {
    type: STRING,
  },
  meta_title: {
    type: STRING,
  },
  meta_description: {
    type: STRING,
  },
  meta_tag: {
    type: STRING,
  },
  setting_diamond_sizes: {
    type: 'character varying',
  },
  is_band: {
    type: 'bit',
  },
  is_3d_product: {
    type: BOOLEAN
  },
  head_no: {
    type: 'character varying'
  },
  shank_no: {
    type: 'character varying'
  },
  band_no: {
    type: 'character varying'
  },
  style_no: {
    type: 'character varying'
  }
});

// Associations
Product.belongsTo(Product, {
  foreignKey: "parent_id",
  as: "parent_product",
});
Product.belongsTo(BrandData, { foreignKey: "id_brand", as: "brands" });
Product.hasMany(ProductCategory, {
  foreignKey: "id_product",
  as: "product_categories",
});
Product.hasMany(ProductImage, {
  foreignKey: "id_product",
  as: "product_images",
});
Product.hasMany(ProductVideo, {
  foreignKey: "id_product",
  as: "product_videos",
});
Product.hasMany(ProductReview, {
  foreignKey: "product_id",
  as: "product_Review",
});
Product.hasMany(ProductEnquiries, {
  foreignKey: "product_id",
  as: "product_enquiry",
});
Product.hasMany(ProductMetalOption, {
  foreignKey: "id_product",
  as: "PMO",
});
Product.hasMany(ProductDiamondOption, {
  foreignKey: "id_product",
  as: "PDO",
});
Product.hasMany(ProductAttributeValue, { foreignKey: "id_product", as: 'PAV' });
Product.hasMany(OrdersDetails, {
  foreignKey: "product_id",
  as: "product_image",
});
Product.hasMany(CartProducts, {
  foreignKey: "product_id",
  as: "product_cart",
});
