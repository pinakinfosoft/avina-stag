import { BIGINT, DOUBLE, INTEGER } from "sequelize";
import dbContext from "../../config/db-context";
import { StudConfigProduct } from "./stud-config-product.model";
import { MetalMaster } from "./master/attributes/metal/metal-master.model";
import { GoldKarat } from "./master/attributes/metal/gold-karat.model";

export const StudMetal = dbContext.define("stud_metals", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  stud_id: {
    type: BIGINT,
  },
  metal_id: {
    type: BIGINT,
  },
  karat_id: {
    type: BIGINT,
  },
  metal_wt: {
    type: DOUBLE,
  },
});

// Associations
StudMetal.belongsTo(StudConfigProduct, { as: "stud_config_product", foreignKey: "stud_id" });
StudMetal.belongsTo(MetalMaster, { as: "metal", foreignKey: "metal_id" });
StudMetal.belongsTo(GoldKarat, { as: "karat", foreignKey: "karat_id" });
