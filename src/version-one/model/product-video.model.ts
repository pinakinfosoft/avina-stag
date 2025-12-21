import { DATE, INTEGER, SMALLINT, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Product } from "./product.model";

export const ProductVideo = dbContext.define("product_videos", {
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
  video_path: {
    type: STRING,
  },
  video_type: {
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
ProductVideo.belongsTo(Product, { foreignKey: "id_product", as: "product" });
