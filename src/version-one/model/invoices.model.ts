import { DATE, DOUBLE, INTEGER, JSON, SMALLINT, STRING } from "sequelize";
import dbContext from "../../config/db-context";
import { Orders } from "./order.model";
import { OrderTransaction } from "./order-transaction.model";

export const Invoices = dbContext.define("invoices", {
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
  invoice_pdf_path: {
    type: STRING
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
Invoices.hasOne(Orders, { as: "order_invoice", foreignKey: "id", sourceKey: "order_id" });
Invoices.hasOne(OrderTransaction, { as: "order_transaction", foreignKey: "id", sourceKey: "transaction_id" });
