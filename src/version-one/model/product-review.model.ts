import { DATE, INTEGER, STRING, DOUBLE } from "sequelize";
import dbContext from "../../config/db-context";
import { Product } from "./product.model";
import { ReviewImages } from "./review-images.model";

export const ProductReview = dbContext.define("product_reviews", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reviewer_id: {
    type: INTEGER,
  },
  product_id: {
    type: INTEGER,
  },
  rating: {
    type: DOUBLE,
  },
  reviewer_name: {
    type: STRING,
  },
  comment: {
    type: STRING,
  },
  is_approved: {
    type: STRING
  },
  created_date: {
    type: DATE,
  },
  modified_date: {
    type: DATE
  }
});

// Associations
ProductReview.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});
ProductReview.hasMany(ReviewImages, {
  foreignKey: "review_id",
  as: "product_images",
});
