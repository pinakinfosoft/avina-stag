import { DATE, INTEGER, TEXT } from "sequelize";
import dbContext from "../../config/db-context";
import { Image } from "./image.model";
import { ConfiguratorSettingFile } from "./configurator-setting-file.model";

export const ConfiguratorSetting = dbContext.define("configurator_setting", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'character varying',
  },
  key: {
    type: 'character varying',
  },
  description: {
    type: TEXT,
  },
  link: {
    type: "character varying"
  },
  is_active: {
    type: 'bit',
  },
  id_image: {
    type: INTEGER,
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
  is_deleted: {
    type: 'bit',
  }
});

// Associations
ConfiguratorSetting.hasOne(Image, { as: "image", foreignKey: "id", sourceKey: "id_image" });
ConfiguratorSetting.hasMany(ConfiguratorSettingFile, {
  foreignKey: "id_config_setting",
  as: "configurator_setting_files",
});
