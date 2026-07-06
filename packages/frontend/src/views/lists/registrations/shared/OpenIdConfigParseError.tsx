import { formatError } from "@effect/schema/TreeFormatter";
import { ParseError } from "@effect/schema/ParseResult";
import * as React from "react";
import { Pre } from "../../../../lib/ui/Pre";

type OpenIdConfigParseErrorProps = {
  openidConfigurationUrl: string;
  rawResponse: unknown;
  parseError: ParseError;
};

export const OpenIdConfigParseError: React.FC<OpenIdConfigParseErrorProps> = ({
  openidConfigurationUrl,
  rawResponse,
  parseError,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <article className="prose">
        <h3>Error retrieving OpenID Configuration from:</h3>
        <Pre>{openidConfigurationUrl}</Pre>
        <h3>Raw Response Body</h3>
        <Pre>{JSON.stringify(rawResponse, null, 2)}</Pre>
        <h3>Parse Error:</h3>
        <Pre>{formatError(parseError)}</Pre>
      </article>
    </div>
  );
};
