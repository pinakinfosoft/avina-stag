import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const StoreAddress = dbContext.define("store_address", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: STRING,
  },
  map_link: {
    type: 'character varying',
  },
  branch_name: {
    type: 'character varying',
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
  },
  phone_number: {
    type: 'character varying',
  },
  timing: {
    type: 'character varying',
  },
});


