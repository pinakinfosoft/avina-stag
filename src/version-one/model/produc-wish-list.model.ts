import { BIGINT, DATE, INTEGER, JSON, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const ProductWish = dbContext.define("wishlist_products", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: INTEGER,
  },
  product_id: {
    type: INTEGER,
  },
  created_date: {
    type: DATE,
  },
  product_type: {
    type: INTEGER,
  },
  variant_id: {
    type: INTEGER,
  },
  id_size: {
    type: INTEGER,
  },
  id_length: {
    type: INTEGER,
  },
  id_metal_tone: {
    type: INTEGER,
  },
  id_head_metal_tone: {
    type: INTEGER,
  },
  id_shank_metal_tone: {
    type: INTEGER,
  },
  is_band: {
    type: STRING,
  },
  id_band_metal_tone: {
    type: INTEGER,
  },
  id_metal: {
    type: INTEGER,
  },
  id_karat: {
    type: INTEGER,
  },
  product_details: {
    type: JSON,
  },
  modified_date: {
    type: DATE,
  },
  user_ip: {
    type: 'character varying',
  },
  user_country: {
    type: 'character varying',
  },
  user_location: {
    type: 'character varying',
  }
});

// Associations


