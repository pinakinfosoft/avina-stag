import { BOOLEAN, DATE, DECIMAL, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { RolePermission } from "./role-permission.model";
import { RoleApiPermission } from "./role-api-permission.model";

export const MenuItem = dbContext.define("menu_items", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  },
  id_parent_menu: {
    type: INTEGER,
  },
  nav_path: {
    type: STRING,
  },
  menu_location: {
    type: STRING,
  },
  sort_order: {
    type: DECIMAL,
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
  icon: {
    type: STRING,
  },
  is_for_super_admin: {
    type: BOOLEAN
  }
});

// Associations
MenuItem.belongsTo(MenuItem, {
  as: 'parent_menu',
  foreignKey: 'id_parent_menu',
});
MenuItem.hasMany(RolePermission, { foreignKey: "id_menu_item", as: "RP" });
MenuItem.hasMany(RoleApiPermission, { as: "rap", foreignKey: "id_menu_item" });
