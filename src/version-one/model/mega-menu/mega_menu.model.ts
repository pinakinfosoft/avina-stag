import { DATE, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { MegaMenuAttributes } from "./mega_menu_attributes.model";

export const MegaMenus = dbContext.define("mega_menus", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'character varying',
  },
  menu_type: {
    type: 'character varying',
  },
  is_active: {
    type: 'bit',
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
    type: 'bit',
  }
});

// Associations
MegaMenus.hasMany(MegaMenuAttributes, {
  foreignKey: "id_menu",
  as: "mega_menu_attributes",
});
