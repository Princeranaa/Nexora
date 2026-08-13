import { config as dotConfig } from "dotenv";
dotConfig();

const requiredEnv = ["PORT", "MONGO_URL", "JWT_SECRET"];

for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
}

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;