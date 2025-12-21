import { ARRAY, BOOLEAN, DATE, DOUBLE, INTEGER, JSONB, STRING, TEXT } from "sequelize";
import dbContext from "../../config/db-context";

export const EmailTemplate = dbContext.define("email_templates", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  template_name: {
    type: STRING,
    allowNull: false,
  },
  subject: {
    type: STRING,
    allowNull: false,
  },
  body: {
    type: TEXT,
    allowNull: false,
  },
  message_type: {
    type: ARRAY(INTEGER),
  },
  placeholders: {
    type: JSONB,
    allowNull: false,
  },
  is_active: {
    type: STRING
  },
  is_deleted: {
    type: STRING
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
  is_invoice: {
    type: BOOLEAN,
  },
});
