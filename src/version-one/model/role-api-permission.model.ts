import { INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { MenuItem } from "./menu-items.model";
import { Action } from "./action.model";

export const RoleApiPermission = dbContext.define("role_api_permissions", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_menu_item: {
    type: INTEGER,
  },
  id_action: {
    type: INTEGER,
  },
  api_endpoint: {
    type: STRING,
  },
  http_method: {
    type: INTEGER,
  },
  is_active: {
    type: STRING,
  },
  master_type: {
    type: STRING
  }
});

// Associations
RoleApiPermission.belongsTo(MenuItem, { as: "rap", foreignKey: "id_menu_item" });
RoleApiPermission.belongsTo(Action, { as: "action", foreignKey: "id_action" });
