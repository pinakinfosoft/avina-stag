import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { RoleApiPermission } from "./role-api-permission.model";
import { RolePermissionAccess } from "./role-permission-access.model";

export const Action = dbContext.define("actions", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action_name: {
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
  }
});

// Associations (defined after all models are loaded)
// Note: These associations will be set up after all models are imported
// Action.hasMany(RolePermissionAccess, { foreignKey: 'id_action' });
// Action.hasMany(RoleApiPermission, { as: "action", foreignKey: "id_action" });
