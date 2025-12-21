import { Dialect, Sequelize, Options } from "sequelize";
import {
  DB_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_HOST,
  SEQUELIZE_DIALECT,
  DB_PORT,
  SSL_UNAUTHORIZED,
} from "./env.var";

// Base dialect options
const baseDialectOptions: Record<string, any> = {
  dateStrings: true,
  typeCast: true,
  keepAlive: true,
  // useUTC: false, // for reading from database
};

// Add SSL configuration if enabled
const isSslEnabled = SSL_UNAUTHORIZED?.toLowerCase() === "true";
if (isSslEnabled) {
  baseDialectOptions.ssl = {
    rejectUnauthorized: false,
  };
}

// Base configuration shared by both SSL and non-SSL connections
const baseConfig: Options = {
  host: DB_HOST,
  dialect: SEQUELIZE_DIALECT as Dialect,
  port: Number(DB_PORT),
  define: {
    timestamps: false, // I do not want timestamp fields by default (createdAt, updatedAt)
    freezeTableName: true, // To allow singular table name. Sequelize will infer the table name to be equal to the model name, without any modifications
  },
  dialectOptions: baseDialectOptions,
  // pool: {
  //   max: 50,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  //   evict: 10000,
  // }
};

// Create Sequelize instance with the configured options
const dbContext = new Sequelize(
  DB_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  baseConfig
);

export default dbContext;
