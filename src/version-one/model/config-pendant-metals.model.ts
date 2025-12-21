import { BIGINT, DOUBLE, INTEGER } from "sequelize";
import dbContext from "../../config/db-context";
import { ConfigPendantProduct } from "./config-pendant-products.model";
import { MetalMaster } from "./master/attributes/metal/metal-master.model";
import { GoldKarat } from "./master/attributes/metal/gold-karat.model";

export const ConfigPendantMetals = dbContext.define("config_pendant_metals", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  pendant_id: {
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
ConfigPendantMetals.belongsTo(ConfigPendantProduct, { as: "metals", foreignKey: "pendant_id" });
ConfigPendantMetals.belongsTo(MetalMaster, { as: "metal", foreignKey: "metal_id" });
ConfigPendantMetals.belongsTo(GoldKarat, { as: "karat", foreignKey: "karat_id" });
