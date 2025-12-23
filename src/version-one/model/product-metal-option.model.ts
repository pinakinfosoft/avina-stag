import { BIGINT, DATE, DECIMAL, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const ProductMetalOption = dbContext.define("product_metal_options", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: INTEGER,
  },
  id_metal_group: {
    type: INTEGER,
  },
  metal_weight: {
    type: DECIMAL,
  },
  is_default: {
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
  id_metal: {
    type: INTEGER,
  },
  id_metal_tone: {
    type: STRING,
  },
  id_karat: {
    type: INTEGER,
  },
  retail_price: {
    type: DOUBLE,
  },
  compare_price: {
    type: DOUBLE,
  },
  id_size: {
    type: INTEGER,
  },
  id_length: {
    type: INTEGER,
  },
  quantity: {
    type: BIGINT,
  },
  side_dia_weight: {
    type: DOUBLE,
  },
  side_dia_count: {
    type: BIGINT,
  },
  remaing_quantity_count: {
    type: BIGINT,
  },
  id_m_tone: {
    type: INTEGER,
  },
  center_diamond_price: {
    type: DOUBLE,
  },
  band_metal_weight: {
    type: DOUBLE
  },
  band_metal_price: {
    type: DOUBLE
  }
});


