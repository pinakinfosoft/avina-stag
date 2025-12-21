import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";

export const FontStyleFiles = dbContext.define("font_style_files", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  file_path: {
    type: 'character varying',
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
  deleted_date: {
    type: DATE
  },
  deleted_by: {
    type: INTEGER
  }
});
