import { DATE, DOUBLE, FLOAT, INTEGER, JSON, STRING } from "sequelize";
import dbContext from "../../../../config/db-context";


export const DiamondGroupMaster = dbContext.define("diamond_group_masters", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  },
  id_stone: {
    type: INTEGER,
  },
  id_shape: {
    type: INTEGER,
  },
  id_mm_size: {
    type: INTEGER,
  },
  id_color: {
    type: INTEGER,
  },
  id_clarity: {
    type: INTEGER,
  },
  id_cuts: {
    type: INTEGER,
  },
  rate: {
    type: FLOAT,
  },
  is_active: {
    type: STRING,
  },
  created_date: {
    type: DATE,
  },
  modified_date: {
    type: DATE,
  },
  created_by: {
    type: INTEGER,
  },
  modified_by: {
    type: INTEGER,
  },
  is_deleted: {
    type: STRING,
  },
  id_image: {
    type: INTEGER,
  },
  id_carat: {
    type: INTEGER,
  },
  id_seive_size: {
    type: INTEGER,
  },
  synthetic_rate: {
    type: DOUBLE,
  },
  is_config: {
    type: STRING,
  },
  is_diamond_type: {
    type: JSON,
  },
  min_carat_range: {
    type: DOUBLE,
  },
  max_carat_range: {
    type: DOUBLE,
  },
  is_band: {
    type: STRING,
  },
  is_three_stone: {
    type: STRING,
  },
  is_bracelet: {
    type: STRING,
  },
  is_pendant: {
    type: STRING,
  },
  is_earring: {
    type: STRING,
  },
  average_carat: {
    type: DOUBLE
  }
});


