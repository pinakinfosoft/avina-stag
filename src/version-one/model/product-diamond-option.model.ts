import { BOOLEAN, DATE, DECIMAL, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const ProductDiamondOption = dbContext.define("product_diamond_options", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: INTEGER,
  },
  id_diamond_group: {
    type: INTEGER,
  },
  id_type: {
    type: INTEGER,
  },
  id_setting: {
    type: INTEGER,
  },
  weight: {
    type: DECIMAL,
  },
  count: {
    type: INTEGER,
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
  id_stone: {
    type: INTEGER,
  },
  id_shape: {
    type: INTEGER,
  },
  id_color: {
    type: INTEGER,
  },
  id_clarity: {
    type: INTEGER,
  },
  id_mm_size: {
    type: INTEGER,
  },
  id_cut: {
    type: INTEGER,
  },
  is_band: {
    type: BOOLEAN
  }
});


