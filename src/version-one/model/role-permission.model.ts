import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


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

