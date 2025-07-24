import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env.test"),
});

export default {
  testTimeout: 30000, 
  maxConcurrency: 1, 
};