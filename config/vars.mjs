import { config } from "dotenv";

config();

const {
  PORT,
  DB_URL,
  DB_TOKEN,
  WHITELIST,
  EXCLUDED_ROUTES,
  VALUE_PROTECTED_VERIFY,
  CORS
} = process.env;

export {
  PORT,
  DB_URL,
  DB_TOKEN,
  WHITELIST,
  EXCLUDED_ROUTES,
  VALUE_PROTECTED_VERIFY,
  CORS
};