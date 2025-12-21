import { DATE, INTEGER, JSON } from "sequelize";
import dbContext from "../../config/db-context";

export const FiltersData = dbContext.define("filters", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'character varying',
  },
  key: {
    type: 'character varying',
  },
  filter_select_type: {
    type: 'character varying',
  },
  selected_value: {
    type: JSON,
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
  is_active: {
    type: 'bit',
  },
  item_scope: {
    type: 'character varying',
  }
});
