import { BIGINT, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { ConfigPendantProduct } from "./config-pendant-products.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { MMSizeData } from "./master/attributes/mmSize.model";

export const ConfigPendantDiamonds = dbContext.define("config_pendant_diamonds", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  pendant_id: {
    type: BIGINT,
  },
  dia_shape: {
    type: BIGINT,
  },
  dia_weight: {
    type: DOUBLE,
  },
  dia_mm_size: {
    type: BIGINT,
  },
  dia_count: {
    type: BIGINT,
  },
  side_dia_prod_type: {
    type: STRING
  }
});

// Associations
ConfigPendantDiamonds.belongsTo(ConfigPendantProduct, { as: "diamonds", foreignKey: "pendant_id" });
ConfigPendantDiamonds.belongsTo(DiamondShape, { as: "shape", foreignKey: "dia_shape" });
ConfigPendantDiamonds.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "dia_mm_size" });
