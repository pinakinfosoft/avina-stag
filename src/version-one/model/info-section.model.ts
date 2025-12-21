import { BIGINT, DATE, INTEGER, STRING, TEXT } from "sequelize";
import dbContext from "../../config/db-context";

export const InfoSection = dbContext.define("info_sections", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: STRING,
  },
  title: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  created_at: {
    type: DATE
  },
  created_by: {
    type: BIGINT
  },
  modified_at: {
    type: DATE
  },
  modified_by: {
    type: BIGINT
  }
});
