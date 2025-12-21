import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Orders } from "./order.model";

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

// Associations
StoreAddress.hasMany(Orders, { foreignKey: "pickup_store_id", as: "store_address" });
