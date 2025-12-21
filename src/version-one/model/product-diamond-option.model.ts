import { BOOLEAN, DATE, DECIMAL, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { DiamondGroupMaster } from "./master/attributes/diamond-group-master.model";
import { Product } from "./product.model";
import { SettingTypeData } from "./master/attributes/settingType.model";
import { StoneData } from "./master/attributes/gemstones.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { Colors } from "./master/attributes/colors.model";
import { ClarityData } from "./master/attributes/clarity.model";
import { MMSizeData } from "./master/attributes/mmSize.model";
import { CutsData } from "./master/attributes/cuts.model";

export const ProductDiamondOption = dbContext.define("product_diamond_options", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: INTEGER,
  },
  id_diamond_group: {
    type: INTEGER,
  },
  id_type: {
    type: INTEGER,
  },
  id_setting: {
    type: INTEGER,
  },
  weight: {
    type: DECIMAL,
  },
  count: {
    type: INTEGER,
  },
  is_default: {
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
  },
  id_stone: {
    type: INTEGER,
  },
  id_shape: {
    type: INTEGER,
  },
  id_color: {
    type: INTEGER,
  },
  id_clarity: {
    type: INTEGER,
  },
  id_mm_size: {
    type: INTEGER,
  },
  id_cut: {
    type: INTEGER,
  },
  is_band: {
    type: BOOLEAN
  }
});

// Associations
ProductDiamondOption.belongsTo(Product, {
  foreignKey: "id_product",
  as: "product",
});
ProductDiamondOption.belongsTo(SettingTypeData, {
  foreignKey: "id_setting",
  as: "setting",
});
ProductDiamondOption.belongsTo(DiamondGroupMaster, {
  foreignKey: "id_diamond_group",
  as: "rate",
});
ProductDiamondOption.belongsTo(StoneData, {
  foreignKey: "id_stone",
  as: "p_d_stone",
});
ProductDiamondOption.belongsTo(DiamondShape, {
  foreignKey: "id_shape",
  as: "p_d_shape",
});
ProductDiamondOption.belongsTo(Colors, {
  foreignKey: "id_color",
  as: "p_d_color",
});
ProductDiamondOption.belongsTo(ClarityData, {
  foreignKey: "id_clarity",
  as: "p_d_clarity",
});
ProductDiamondOption.belongsTo(MMSizeData, {
  foreignKey: "id_mm_size",
  as: "p_d_mm_size",
});
ProductDiamondOption.belongsTo(CutsData, {
  foreignKey: "id_cut",
  as: "p_d_cut",
});
