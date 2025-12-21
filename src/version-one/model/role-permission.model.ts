import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { MenuItem } from "./menu-items.model";
import { RolePermissionAccess } from "./role-permission-access.model";
import { Role } from "./role.model";

export const RolePermission = dbContext.define("role_permissions", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_role: {
    type: INTEGER,
  },
  id_menu_item: {
    type: INTEGER,
  },
  is_active: {
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
RolePermission.belongsTo(Role, {
  foreignKey: "id_role",
  as: "role",
});
RolePermission.belongsTo(MenuItem, {
  foreignKey: "id_menu_item",
  as: "menu_item",
});
RolePermission.hasMany(RolePermissionAccess, {
  foreignKey: "id_role_permission",
  as: "RPA",
});
