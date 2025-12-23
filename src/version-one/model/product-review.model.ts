import { DATE, INTEGER, STRING, DOUBLE } from "sequelize";
import dbContext from "../../config/db-context";


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


