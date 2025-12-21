import { BIGINT, DATE, INTEGER, JSON } from "sequelize";
import dbContext from "../../config/db-context";

export const ExceptionLogs = dbContext.define("exception_logs", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  request_body: {
    type: JSON
  },
  request_query: {
    type: JSON
  },
  request_param: {
    type: JSON
  },
  error: {
    type: JSON
  },
  created_date: {
    type: DATE
  },
  created_by: {
    type: INTEGER,
  },
  response: {
    type: JSON
  }
});
