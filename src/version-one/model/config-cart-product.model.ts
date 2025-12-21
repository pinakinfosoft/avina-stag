import { DATE, INTEGER, JSON, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { AppUser } from "./app-user.model";
import { ConfigProduct } from "./config-product.model";
import { Image } from "./image.model";

export const ConfigCartProduct = dbContext.define("config_cart_products", {
  id: {
    type: STRING,
    primaryKey: true,
  },
  user_id: {
    type: INTEGER,
  },
  product_id: {
    type: INTEGER,
  },
  product_SKU: {
    type: INTEGER,
  },
  quantity: {
    type: INTEGER,
  },
  product_details: {
    type: JSON,
  },
  id_image: {
    type: INTEGER,
  },
  created_date: {
    type: DATE,
  },
  modified_date: {
    type: DATE,
  }
});

// Associations
ConfigCartProduct.belongsTo(ConfigProduct, {
  foreignKey: "product_id",
  as: "config_product",
});
ConfigCartProduct.belongsTo(AppUser, {
  foreignKey: "user_id",
  as: "user",
});
ConfigCartProduct.hasOne(Image, {
  as: "image",
  foreignKey: "id",
  sourceKey: "id_image",
});
