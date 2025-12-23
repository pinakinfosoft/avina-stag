import { BIGINT, DOUBLE, INTEGER, STRING } from "sequelize";
import dbContext from "../../config/db-context";


export const StudDiamonds = dbContext.define("stud_diamonds", {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  stud_id: {
    type: BIGINT,
  },
  dia_shape: {
    type: BIGINT,
  },
  dia_weight: {
    type: DOUBLE,
  },
  dia_mm_size: {
    type: BIGINT,
  },
  dia_count: {
    type: BIGINT,
  },
  side_dia_prod_type: {
    type: STRING
  }
});


