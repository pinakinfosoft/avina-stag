import { DATE, INTEGER } from "sequelize";
import dbContext from "../../config/db-context";
import { ConfiguratorSetting } from "./configurator-setting.model";
import { AppUser } from "./app-user.model";

export const ConfiguratorSettingFile = dbContext.define("configurator_setting_file", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  file_path: {
    type: 'character varying',
  },
  key: {
    type: 'character varying',
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
  },
  id_config_setting: {
    type: INTEGER,
  }
});

// Associations
ConfiguratorSettingFile.belongsTo(ConfiguratorSetting, {
  foreignKey: "id_config_setting",
  as: "configurator_setting",
});
ConfiguratorSettingFile.belongsTo(AppUser, {
  foreignKey: "created_by",
  as: "created_user",
});
