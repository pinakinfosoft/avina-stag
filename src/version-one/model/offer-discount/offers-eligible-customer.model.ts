import { DATE, INTEGER, NOW, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { Offers } from "./offer.model";

export const OfferEligibleCustomers = dbContext.define('offer_eligible_customers', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  offer_id: {
    type: INTEGER,
    allowNull: false,
  },
  user_id: {
    type: INTEGER,
    allowNull: true,
  },
  user_segments: {
    type: STRING,
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
  },
  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
  is_deleted: {
    type: STRING,
    defaultValue: '0',
  },
  created_by: {
    type: INTEGER,
  },
  updated_by: {
    type: INTEGER,
  }
}, {
  timestamps: false, // Disable automatic Sequelize timestamps
});

// Associations
OfferEligibleCustomers.belongsTo(Offers, {
  foreignKey: "offer_id",
  as: "offer",
});
