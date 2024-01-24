import { ConfigService } from "./ConfigService";

export const mkEnvConfigService = () => ({
  config: {
    primaryHostname: process.env.YALTT_HOST || "localhost",
    ssl: process.env.SSL === "true",
  },
});
