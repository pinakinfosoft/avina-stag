import { DATE, INTEGER, SMALLINT, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Product } from "./product.model";
import { MetalTone } from "./master/attributes/metal/metalTone.model";

export const ProductImage = dbContext.define("product_images", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: STRING,
  },
  id_metal_tone: {
    type: STRING,
  },
  image_path: {
    type: STRING,
  },
  image_type: {
    type: SMALLINT,
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
  }
});

// Associations
ProductImage.belongsTo(Product, { foreignKey: "id_product", as: "product" });
ProductImage.belongsTo(MetalTone, { foreignKey: "id_metal_tone", as: "metal_tones" });
