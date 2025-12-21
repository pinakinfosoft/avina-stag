import { DATE, NOW, STRING } from "sequelize";
import dbContext from "../../config/db-context";

export const SeederMeta = dbContext.define(
  "SeederMeta",
  {
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    executed_at: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW,
    },
  },
  {
    tableName: 'SeederMeta'
  }
);
