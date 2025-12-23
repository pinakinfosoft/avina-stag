import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Image } from "./image.model";
import { BlogCategoryData } from "./blog-category.model";

export const BlogsData = dbContext.define("blogs", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  meta_title: {
    type: STRING,
  },
  meta_description: {
    type: STRING,
  },
  meta_keywords: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
  id_banner_image: {
    type: INTEGER,
  },
  id_image: {
    type: INTEGER,
  },
  slug: {
    type: STRING,
  },
  description: {
    type: STRING,
  },
  author: {
    type: STRING,
  },
  publish_date: {
    type: DATE,
  },
  is_status: {
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
  id_category: {
    type: INTEGER,
  },
  is_default: {
    type: STRING,
  },
  sort_des: {
    type: STRING,
  }
});
