import { DATE, DOUBLE, INTEGER, JSON, STRING } from "sequelize";
import dbContext from "../../../config/db-context";
import { GiftSetProductOrder } from "./gift_set_product_order.model";

export const GiftSetProductInvoice = dbContext.define("gift_set_product_invoices", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_number: {
    type: STRING
  },
  invoice_date: {
    type: DATE
  },
  invoice_amount: {
    type: DOUBLE
  },
  billing_address: {
    type: JSON
  },
  shipping_address: {
    type: JSON
  },
  order_id: {
    type: INTEGER
  },
  transaction_id: {
    type: INTEGER
  },
  created_by: {
    type: INTEGER,
  },
  created_date: {
    type: DATE,
  }
});

// Associations
GiftSetProductInvoice.belongsTo(GiftSetProductOrder, {
  foreignKey: "order_id",
  as: "gift_set_order_invoice",
});
GiftSetProductOrder.hasMany(GiftSetProductInvoice, {
  foreignKey: "order_id",
  as: "gift_set_invoice",
});
