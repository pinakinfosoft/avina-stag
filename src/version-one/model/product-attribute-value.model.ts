import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const ProductAttributeValue = dbContext.define("product_attribute_values", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: STRING,
  },
  attribute_type: {
    type: STRING,
  },
  id_attribute_value: {
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
  }
});


