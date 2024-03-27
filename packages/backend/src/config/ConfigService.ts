import { Effect, Context } from "effect";

export interface ConfigError {
  _tag: "config_error";
  message: string;
}

export interface YalttConfig {
  primaryHostname: string;
  ssl: boolean;
}

export class ConfigService extends Context.Tag("ConfigService")<
  ConfigService,
  {
    config: YalttConfig;
  }
>() {}

export const getConfig = ConfigService.pipe(Effect.map(({ config }) => config));
