import { ARRAY, DATE, DECIMAL, INTEGER, NOW, STRING, TEXT, TIME } from "sequelize";
import dbContext from "../../../config/db-context";


export const OfferDetails = dbContext.define('offer_details', {
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
  product_id: {
    type: INTEGER,
    allowNull: true,
  },
  category_id: {
    type: INTEGER,
    allowNull: true,
  },
  collection_id: {
    type: INTEGER,
    allowNull: true,
  },
  style_id: {
    type: INTEGER,
    allowNull: true,
  },
  event_id: {
    type: INTEGER,
    allowNull: true,
  },
  lookbook_id: {
    type: INTEGER,
    allowNull: true,
  },
  min_price: {
    type: DECIMAL(10, 2),
  },
  max_price: {
    type: DECIMAL(10, 2),
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
  },
  condition: {
    type: STRING
  }
}, {
  timestamps: false, // Disable automatic Sequelize timestamps
});

// Associations

