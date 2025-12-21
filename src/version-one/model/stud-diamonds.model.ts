import { BIGINT, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { StudConfigProduct } from "./stud-config-product.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { MMSizeData } from "./master/attributes/mmSize.model";

export const StudDiamonds = dbContext.define("stud_diamonds", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  stud_id: {
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
StudDiamonds.belongsTo(StudConfigProduct, { as: "stud_config_product", foreignKey: "stud_id" });
StudDiamonds.belongsTo(DiamondShape, { as: "shape", foreignKey: "dia_shape" });
StudDiamonds.belongsTo(MMSizeData, { as: "mm_size", foreignKey: "dia_mm_size" });
