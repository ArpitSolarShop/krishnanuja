import "dotenv/config";
import { env } from "process";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env.DIRECT_URL || env.DATABASE_URL,
  },
});
