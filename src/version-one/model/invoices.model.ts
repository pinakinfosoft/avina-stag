import { DATE, DOUBLE, INTEGER, JSON, SMALLINT, STRING } from "sequelize";
import dbContext from "../../config/db-context";


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


