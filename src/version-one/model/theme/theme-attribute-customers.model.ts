import { BIGINT, DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { Image } from "../../image.model";

export const ThemeAttributeCustomers = dbContext.define("theme_attribute_customers", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_company_info: {
    type: INTEGER
  },
  id_theme: {
    type: INTEGER,
  },
  id_theme_attribute: {
    type: BIGINT
  },
  value: {
    type: 'character varying',
  },
  link: {
    type: 'character varying',
  },
  id_image: {
    type: INTEGER,
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

// Associations
ThemeAttributeCustomers.hasOne(Image, { as: "theme_attribute_customer_image", foreignKey: "id", sourceKey: "id_image" });
