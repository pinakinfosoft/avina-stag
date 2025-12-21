import { BIGINT, DATE, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Master } from "./master/master.model";
import { DiamondShape } from "./master/attributes/diamondShape.model";
import { Colors } from "./master/attributes/colors.model";
import { ClarityData } from "./master/attributes/clarity.model";
import { CutsData } from "./master/attributes/cuts.model";
import { BrandData } from "./master/attributes/brands.model";
import { StoneData } from "./master/attributes/gemstones.model";

export const LooseDiamondGroupMasters = dbContext.define("loose_diamond_group_masters", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  stock_id: {
    type: STRING,
  },
  availability: {
    type: BIGINT,
  },
  stone: {
    type: BIGINT,
  },
  stone_type: {
    type: STRING,
  },
  shape: {
    type: BIGINT,
  },
  weight: {
    type: DOUBLE,
  },
  color: {
    type: BIGINT,
  },
  clarity: {
    type: BIGINT,
  },
  mm_size: {
    type: STRING,
  },
  seive_size: {
    type: BIGINT,
  },
  cut_grade: {
    type: BIGINT,
  },
  off_RAP: {
    type: DOUBLE,
  },
  polish: {
    type: BIGINT,
  },
  symmetry: {
    type: BIGINT,
  },
  fluorescence_intensity: {
    type: BIGINT,
  },
  fluorescence_color: {
    type: BIGINT,
  },
  measurements: {
    type: STRING,
  },
  lab: {
    type: BIGINT,
  },
  certificate: {
    type: STRING,
  },
  certificate_url: {
    type: STRING,
  },
  treatment: {
    type: STRING,
  },
  fancy_color: {
    type: BIGINT,
  },
  fancy_color_intensity: {
    type: BIGINT,
  },
  fancy_color_overtone: {
    type: BIGINT,
  },
  depth_per: {
    type: DOUBLE,
  },
  table_per: {
    type: DOUBLE,
  },
  girdle_thin: {
    type: BIGINT,
  },
  girdle_thick: {
    type: BIGINT,
  },
  girdle_per: {
    type: DOUBLE,
  },
  girdle_condition: {
    type: BIGINT,
  },
  culet_size: {
    type: STRING,
  },
  culet_condition: {
    type: BIGINT,
  },
  crown_height: {
    type: DOUBLE,
  },
  crown_angle: {
    type: DOUBLE,
  },
  pavilion_depth: {
    type: DOUBLE,
  },
  pavilion_angle: {
    type: DOUBLE,
  },
  laser_inscription: {
    type: BIGINT,
  },
  cert_comment: {
    type: BIGINT,
  },
  sort_description: {
    type: STRING,
  },
  long_description: {
    type: STRING,
  },
  country: {
    type: BIGINT,
  },
  state: {
    type: BIGINT,
  },
  city: {
    type: BIGINT,
  },
  time_to_location: {
    type: BIGINT,
  },
  in_matched_pair_separable: {
    type: STRING,
  },
  pair_stock: {
    type: STRING,
  },
  parcel_stone: {
    type: BIGINT,
  },
  image_link: {
    type: STRING,
  },
  video_link: {
    type: STRING,
  },
  sari_loupe: {
    type: STRING,
  },
  trade_show: {
    type: BIGINT,
  },
  key_of_symbols: {
    type: STRING,
  },
  shade: {
    type: BIGINT,
  },
  star_length: {
    type: DOUBLE,
  },
  center_inclusion: {
    type: BIGINT,
  },
  black_inclusion: {
    type: BIGINT,
  },
  member_comment: {
    type: STRING,
  },
  report_issue_date: {
    type: DATE,
  },
  report_type: {
    type: STRING,
  },
  lab_location: {
    type: STRING,
  },
  brand: {
    type: BIGINT,
  },
  milky: {
    type: BIGINT,
  },
  eye_clean: {
    type: STRING,
  },
  h_a: {
    type: BIGINT,
  },
  bgm: {
    type: BIGINT,
  },
  growth_type: {
    type: BIGINT,
  },
  total_price: {
    type: DOUBLE,
  },
  price_ct: {
    type: DOUBLE,
  },
  is_active: {
    type: STRING,
  },
  is_deleted: {
    type: STRING,
  },
  created_by: {
    type: BIGINT,
  },
  created_at: {
    type: DATE,
  },
  modified_by: {
    type: BIGINT,
  },
  modified_at: {
    type: DATE,
  },
  deleted_at: {
    type: DATE,
  },
  deleted_by: {
    type: BIGINT,
  },
  image_path: {
    type: STRING
  },
  quantity: {
    type: INTEGER
  },
  remaining_quantity_count: {
    type: INTEGER
  }
});

// Associations
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "availability",
  as: "availability_master",
});
LooseDiamondGroupMasters.belongsTo(StoneData, {
  foreignKey: "stone",
  as: "stone_master",
});
LooseDiamondGroupMasters.belongsTo(DiamondShape, {
  foreignKey: "shape",
  as: "shape_master",
});
LooseDiamondGroupMasters.belongsTo(Colors, {
  foreignKey: "color",
  as: "color_master",
});
LooseDiamondGroupMasters.belongsTo(ClarityData, {
  foreignKey: "clarity",
  as: "clarity_master",
});
LooseDiamondGroupMasters.belongsTo(CutsData, {
  foreignKey: "cut_grade",
  as: "cut_grade_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "polish",
  as: "polish_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "symmetry",
  as: "symmetry_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "fluorescence_intensity",
  as: "fluorescence_intensity_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "fluorescence_color",
  as: "fluorescence_color_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "lab",
  as: "lab_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "fancy_color",
  as: "fancy_color_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "fancy_color_intensity",
  as: "fancy_color_intensity_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "fancy_color_overtone",
  as: "fancy_color_overtone_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "girdle_thin",
  as: "girdle_thin_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "girdle_thick",
  as: "girdle_thick_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "girdle_condition",
  as: "girdle_condition_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "culet_condition",
  as: "culet_condition_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "laser_inscription",
  as: "laser_inscription_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "cert_comment",
  as: "cert_comment_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "country",
  as: "country_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "state",
  as: "state_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "city",
  as: "city_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "time_to_location",
  as: "time_to_location_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "parcel_stone",
  as: "parcel_stone_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "trade_show",
  as: "trade_show_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "shade",
  as: "shade_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "center_inclusion",
  as: "center_inclusion_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "black_inclusion",
  as: "black_inclusion_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "h_a",
  as: "h_a_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "bgm",
  as: "bgm_master",
});
LooseDiamondGroupMasters.belongsTo(Master, {
  foreignKey: "growth_type",
  as: "growth_type_master",
});
LooseDiamondGroupMasters.belongsTo(BrandData, {
  foreignKey: "brand",
  as: "brand_master",
});
