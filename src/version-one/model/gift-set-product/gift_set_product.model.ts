import { DATE, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { BrandData } from "../../master/attributes/brands.model";
import { GiftSetProductImages } from "./gift_set_product_image.model";
import { GiftSetOrdersDetails } from "./git_set_product_order_details.model";

export const GiftSetProduct = dbContext.define("gift_set_products", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_title: {
    type: STRING,
  },
  sku: {
    type: STRING,
  },
  short_des: {
    type: STRING,
  },
  long_des: {
    type: STRING,
  },
  tags: {
    type: STRING,
  },
  price: {
    type: DOUBLE
  },
  is_active: {
    type: STRING,
  },
  is_deleted: {
    type: STRING,
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
  slug: {
    type: STRING
  },
  gender: {
    type: STRING
  },
  brand_id: {
    type: INTEGER
  }
});

// Associations
GiftSetProduct.hasOne(BrandData, { as: "brands", foreignKey: "id", sourceKey: "brand_id" });
GiftSetProduct.hasMany(GiftSetProductImages, {
  foreignKey: "id_product",
  as: "gift_product_images",
});
GiftSetProduct.hasMany(GiftSetOrdersDetails, {
  foreignKey: "product_id",
  as: "gift_set_product_images",
});
