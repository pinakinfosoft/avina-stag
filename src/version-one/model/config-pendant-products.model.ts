import { BIGINT, DATE, DOUBLE, INTEGER, STRING, TEXT } from "sequelize";
import dbContext from "../../config/db-context";
import { MMSizeData } from "./master/attributes/mmSize.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { DiamondCaratSize } from "./master/attributes/caratSize.model";
import { HeadsData } from "./master/attributes/heads.model";
import { ConfigPendantDiamonds } from "./config-pendant-diamonds.model";
import { ConfigPendantMetals } from "./config-pendant-metals.model";

export const ConfigPendantProduct = dbContext.define("config_pendant_products", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  bale_type: {
    type: STRING,
  },
  design_type: {
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
ConfigPendantProduct.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "center_dia_mm_size" });
ConfigPendantProduct.belongsTo(DiamondShape, { as: "dia_shape", foreignKey: "center_dia_shape" });
ConfigPendantProduct.belongsTo(DiamondCaratSize, { as: "dia_wt", foreignKey: "center_dia_wt" });
ConfigPendantProduct.belongsTo(HeadsData, { as: "design", foreignKey: "design_type" });
ConfigPendantProduct.hasOne(ConfigPendantDiamonds, { as: "diamonds", foreignKey: "pendant_id" });
ConfigPendantProduct.hasOne(ConfigPendantMetals, { as: "metals", foreignKey: "pendant_id" });
