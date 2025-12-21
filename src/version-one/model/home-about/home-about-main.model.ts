import { DATE, INTEGER, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { HomeAboutSub } from "./home-about-sub.model";

export const HomeAboutMain = dbContext.define("home_about_mains", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sort_title: {
    type: STRING,
  },
  title: {
    type: STRING,
  },
  content: {
    type: STRING,
  },
  created_date: {
    type: DATE,
    allowNull: false
  },
  modified_date: {
    type: DATE,
  },
  created_by: {
    type: INTEGER,
  },
  modified_by: {
    type: INTEGER,
  }
});

// Associations
HomeAboutMain.hasMany(HomeAboutSub, {
  foreignKey: "id_home_main",
  as: "home_about_subs",
});
