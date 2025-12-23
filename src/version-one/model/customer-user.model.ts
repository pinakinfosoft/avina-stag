import { ARRAY, DATE, INTEGER, JSON, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const CustomerUser = dbContext.define("customer_users", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  mobile: {
    type: STRING,
  },
  country_id: {
    type: INTEGER,
  },
  id_image: {
    type: INTEGER,
  },
  is_active: {
    type: STRING,
    allowNull: false,
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
  id_app_user: {
    type: INTEGER,
  },
  sign_up_type: {
    type: STRING,
  },
  third_party_response: {
    type: JSON,
  },
  gender: {
    type: STRING,
  }
});

// Associations

