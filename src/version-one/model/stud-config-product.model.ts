import { BIGINT, DATE, DOUBLE, INTEGER, STRING, TEXT } from "sequelize";
import dbContext from "../../config/db-context";
import { MMSizeData } from "./master/attributes/mmSize.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { DiamondCaratSize } from "./master/attributes/caratSize.model";
import { HeadsData } from "./master/attributes/heads.model";
import { SideSettingStyles } from "./master/attributes/side-setting-styles.model";

export const StudConfigProduct = dbContext.define("stud_config_products", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  setting_type: {
    type: BIGINT,
  },
  center_dia_wt: {
    type: BIGINT,
  },
  center_dia_shape: {
    type: BIGINT,
  },
  center_dia_mm_size: {
    type: BIGINT,
  },
  center_dia_count: {
    type: BIGINT,
  },
  style_no: {
    type: BIGINT,
  },
  huggies_no: {
    type: BIGINT,
  },
  drop_no: {
    type: BIGINT,
  },
  sort_description: {
    type: STRING,
  },
  long_description: {
    type: TEXT,
  },
  labour_charge: {
    type: DOUBLE
  },
  other_charge: {
    type: DOUBLE
  },
  product_total_diamond: {
    type: DOUBLE
  },
  is_active: {
    type: STRING,
  },
  is_deleted: {
    type: STRING,
  },
  created_by: {
    type: BIGINT,
  },
  created_at: {
    type: DATE,
  },
  modified_by: {
    type: BIGINT,
  },
  modified_at: {
    type: DATE,
  },
  deleted_by: {
    type: BIGINT,
  },
  deleted_at: {
    type: DATE,
  },
  product_style: {
    type: STRING
  },
  huggies_setting_type: {
    type: BIGINT
  },
  name: {
    type: STRING
  },
  sku: {
    type: STRING
  },
  slug: {
    type: STRING
  }
});

// Associations
StudConfigProduct.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "center_dia_mm_size" });
StudConfigProduct.belongsTo(DiamondShape, { as: "dia_shape", foreignKey: "center_dia_shape" });
StudConfigProduct.belongsTo(DiamondCaratSize, { as: "dia_wt", foreignKey: "center_dia_wt" });
StudConfigProduct.belongsTo(HeadsData, { as: "setting", foreignKey: "setting_type" });
StudConfigProduct.belongsTo(SideSettingStyles, { as: "huggies", foreignKey: "huggies_setting_type" });
