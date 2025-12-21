import { BOOLEAN, DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { AppUser } from "./app-user.model";
import { RolePermission } from "./role-permission.model";

export const Role = dbContext.define("roles", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: STRING,
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
  is_super_admin: {
    type: BOOLEAN,
  },
  is_sub_admin: {
    type: BOOLEAN,
  }
});

// Associations
Role.hasMany(AppUser, { foreignKey: "id_role", as: "role_app_user" });
Role.hasMany(RolePermission, { foreignKey: "id_role", as: "RP" });
