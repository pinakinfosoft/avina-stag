import { DATE, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";


export const MegaMenuAttributes = dbContext.define("mega_menu_attributes", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
  },
  sort_order: {
    type: INTEGER,
  },
  url: {
    type: 'character varying',
  },
  menu_type: {
    type: STRING,
  },
  target_type: {
    type: STRING,
  },
  id_image: {
    type: INTEGER,
  },
  id_parent: {
    type: INTEGER,
  },
  id_category: {
    type: INTEGER,
  },
  id_collection: {
    type: INTEGER,
  },
  id_brand: {
    type: INTEGER,
  },
  id_setting_type: {
    type: INTEGER,
  },
  id_diamond_shape: {
    type: INTEGER,
  },
  id_gender: {
    type: INTEGER,
  },
  id_metal_tone: {
    type: INTEGER,
  },
  id_metal: {
    type: INTEGER,
  },
  id_page: {
    type: INTEGER,
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
  id_menu: {
    type: INTEGER
  },
  id_static_page: {
    type: INTEGER
  }
});


