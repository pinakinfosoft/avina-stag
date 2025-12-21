import { DATE, INTEGER, NUMBER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { Image } from "../image.model";
import { BirthstoneProductCategory } from "./birth-stone-product-category.model";
import { BirthstoneProductEngraving } from "./birth-stone-product-engraving.model";
import { BirthstoneProductMetalOption } from "./birth-stone-product-metal-option.model";
import { BirthStoneProductDiamondOption } from "./birth-stone-product-diamond-option.model";

export const BirthStoneProduct = dbContext.define("birthstone_products", {
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
    type: STRING
  },
  is_trending: {
    type: STRING
  },
  slug: {
    type: STRING
  },
  gender: {
    type: STRING
  },
  product_number: {
    type: STRING
  },
  engraving_count: {
    type: INTEGER
  },
  gemstone_count: {
    type: INTEGER
  },
  product_image: {
    type: INTEGER
  },
  style_no: {
    type: STRING
  },
  discount_value: {
    type: STRING
  },
  discount_type: {
    type: INTEGER
  }
});

// Associations
BirthStoneProduct.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "product_image" });
BirthStoneProduct.hasMany(BirthstoneProductCategory, {
  foreignKey: "id_product",
  as: "birth_stone_product_categories",
});
BirthStoneProduct.hasMany(BirthstoneProductEngraving, {
  foreignKey: "id_product",
  as: "engravings",
});
BirthStoneProduct.hasMany(BirthstoneProductMetalOption, {
  foreignKey: "id_product",
  as: "birthstone_PMO",
});
BirthStoneProduct.hasMany(BirthStoneProductDiamondOption, {
  foreignKey: "id_product",
  as: "birthstone_PDO",
});
