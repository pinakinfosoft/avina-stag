import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../../../config/db-context";
import { MetalMaster } from "./metal-master.model";
import { GoldKarat } from "./gold-karat.model";

export const MetalGroupMaster = dbContext.define("metal_group_masters", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  },
  id_metal: {
    type: INTEGER,
  },
  id_kt: {
    type: INTEGER,
  },
  id_metal_tone: {
    type: INTEGER,
  },
  is_active: {
    type: STRING,
  },
  created_date: {
    type: DATE,
    allowNull: false,
  },
  modified_date: {
    type: DATE,
  },
  created_by: {
    type: INTEGER,
  },
  modified_by: {
    type: INTEGER,
  },
  is_deleted: {
    type: STRING,
  }
});

// Associations
MetalGroupMaster.belongsTo(MetalMaster, {
  foreignKey: "id_metal",
  as: "metal_group_metal",
});
MetalGroupMaster.belongsTo(GoldKarat, { foreignKey: "id_kt", as: "KT" });
