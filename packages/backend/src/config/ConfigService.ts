import { Effect, Context } from "effect";

export interface ConfigError {
  tag: "config_error";
  message: string;
}

export interface YalttConfig {
  primaryHostname: string;
  ssl: boolean;
}

export interface ConfigService {
  config: YalttConfig;
}

export const ConfigService = Context.Tag<ConfigService>();

export const getConfig = ConfigService.pipe(Effect.map(({ config }) => config));
