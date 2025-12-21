import { BIGINT, DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { Themes } from "./themes.model";
import { Image } from "../../image.model";

export const ThemeAttributes = dbContext.define("theme_attributes", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  id_theme: {
    type: INTEGER,
  },
  key_value: {
    type: 'character varying',
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
  },
  is_changeable: {
    type: 'bit'
  }
});

// Associations
ThemeAttributes.belongsTo(Themes, { foreignKey: "id_theme", as: "theme" });
ThemeAttributes.hasOne(Image, { as: "theme_attribute_image", foreignKey: "id", sourceKey: "id_image" });
