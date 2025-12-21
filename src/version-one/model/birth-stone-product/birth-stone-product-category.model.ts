import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { BirthStoneProduct } from "./birth-stone-product.model";
import { CategoryData } from "../category.model";

export const BirthstoneProductCategory = dbContext.define("birthstone_product_categories", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_product: {
    type: INTEGER,
  },
  id_category: {
    type: INTEGER,
  },
  id_sub_category: {
    type: INTEGER,
  },
  id_sub_sub_category: {
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
  }
});

// Associations
BirthstoneProductCategory.belongsTo(BirthStoneProduct, {
  foreignKey: "id_product",
  as: "product",
});
BirthstoneProductCategory.belongsTo(CategoryData, {
  foreignKey: "id_category",
  as: "category",
});
BirthstoneProductCategory.belongsTo(CategoryData, {
  foreignKey: "id_sub_category",
  as: "sub_category",
});
BirthstoneProductCategory.belongsTo(CategoryData, {
  foreignKey: "id_sub_sub_category",
  as: "sub_sub_category",
});
