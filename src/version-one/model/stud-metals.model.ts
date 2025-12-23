import { BIGINT, DOUBLE, INTEGER } from "sequelize";
import dbContext from "../../config/db-context";


export const StudMetal = dbContext.define("stud_metals", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  stud_id: {
    type: BIGINT,
  },
  metal_id: {
    type: BIGINT,
  },
  karat_id: {
    type: BIGINT,
  },
  metal_wt: {
    type: DOUBLE,
  },
});


