import * as Eff from "@effect/io/Effect";
import * as Context from "@fp-ts/data/Context";

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

export const getConfig = Eff.serviceWith(ConfigService, ({ config }) => config);
