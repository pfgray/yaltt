import { Effect } from "effect";
import oauthSignature from "oauth-signature";
import crypto from "crypto";

/**
 * Error type for OAuth validation failures
 */
export class OAuthValidationError {
  readonly _tag = "OAuthValidationError";
  constructor(public readonly message: string) {}
}

/**
 * Validates the OAuth 1.0a signature for an LTI 1.1 launch request
 *
 * @param httpMethod - HTTP method (usually "POST")
 * @param url - Full URL being accessed (must match exactly what was signed)
 * @param parameters - All parameters including OAuth parameters (except oauth_signature)
 * @param consumerSecret - The shared secret for the consumer
 * @returns Effect that succeeds if signature is valid, fails otherwise
 */
export const validateOAuthSignature = (
  httpMethod: string,
  url: string,
  parameters: Record<string, any>,
  consumerSecret: string
): Effect.Effect<void, OAuthValidationError> =>
  Effect.gen(function* (_) {
    // Extract the signature from parameters
    const providedSignature = parameters.oauth_signature;
    if (!providedSignature) {
      return yield* _(
        Effect.fail(
          new OAuthValidationError("Missing oauth_signature parameter")
        )
      );
    }

    // Remove the signature from parameters before generating expected signature
    const { oauth_signature, ...paramsWithoutSignature } = parameters;

    // OAuth signature uses consumer secret and token secret (empty for LTI 1.1)
    const tokenSecret = "";

    try {
      // Generate the expected signature
      const expectedSignature = oauthSignature.generate(
        httpMethod,
        url,
        paramsWithoutSignature,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false } // LTI typically doesn't double-encode
      );

      // Compare signatures (case-sensitive)
      if (providedSignature !== expectedSignature) {
        return yield* _(
          Effect.fail(
            new OAuthValidationError(
              `Invalid OAuth signature. Expected: ${expectedSignature}, Got: ${providedSignature}`
            )
          )
        );
      }

      return yield* _(Effect.succeed(undefined));
    } catch (error) {
      return yield* _(
        Effect.fail(
          new OAuthValidationError(
            `Error generating signature: ${error instanceof Error ? error.message : String(error)}`
          )
        )
      );
    }
  });

/**
 * Validates that the OAuth timestamp is within an acceptable time window
 *
 * @param timestamp - OAuth timestamp (Unix seconds as string)
 * @param maxAgeSeconds - Maximum age in seconds (default: 300 = 5 minutes)
 * @returns Effect that succeeds if timestamp is valid, fails otherwise
 */
export const validateTimestamp = (
  timestamp: string,
  maxAgeSeconds: number = 300
): Effect.Effect<void, OAuthValidationError> =>
  Effect.gen(function* (_) {
    // Parse the timestamp
    const timestampNum = parseInt(timestamp, 10);
    if (isNaN(timestampNum)) {
      return yield* _(
        Effect.fail(
          new OAuthValidationError(`Invalid timestamp format: ${timestamp}`)
        )
      );
    }

    // Get current time in seconds
    const nowSeconds = Math.floor(Date.now() / 1000);

    // Check if timestamp is within acceptable range
    const age = Math.abs(nowSeconds - timestampNum);

    if (age > maxAgeSeconds) {
      return yield* _(
        Effect.fail(
          new OAuthValidationError(
            `Timestamp too old or in future. Age: ${age}s, Max: ${maxAgeSeconds}s`
          )
        )
      );
    }

    return yield* _(Effect.succeed(undefined));
  });

/**
 * Constructs the full URL from Express request
 * This is critical for OAuth signature validation - must match exactly
 *
 * @param protocol - Request protocol (http/https)
 * @param host - Request host (including port if non-standard)
 * @param path - Request path
 * @returns Full URL string
 */
export const constructOAuthUrl = (
  protocol: string,
  host: string,
  path: string
): string => {
  // Ensure protocol doesn't have trailing colon or slashes
  const cleanProtocol = protocol.replace(/[:/]+$/, "");

  // Construct the full URL
  return `${cleanProtocol}://${host}${path}`;
};

/**
 * Generates a unique nonce for OAuth requests
 * Uses crypto.randomBytes for cryptographic randomness
 *
 * @returns A random hex string suitable for use as an OAuth nonce
 */
export const generateNonce = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

/**
 * Generates OAuth 1.0a signature and returns signed parameters
 *
 * @param httpMethod - HTTP method (usually "POST")
 * @param url - Full URL being accessed
 * @param parameters - Request parameters (without OAuth parameters)
 * @param consumerKey - The OAuth consumer key
 * @param consumerSecret - The shared secret for the consumer
 * @returns Effect containing all parameters including OAuth signature
 */
export const generateOAuthSignature = (
  httpMethod: string,
  url: string,
  parameters: Record<string, any>,
  consumerKey: string,
  consumerSecret: string
): Effect.Effect<Record<string, any>, OAuthValidationError> =>
  Effect.gen(function* (_) {
    try {
      // Generate OAuth parameters
      const oauthParams = {
        oauth_consumer_key: consumerKey,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_nonce: generateNonce(),
        oauth_version: "1.0",
      };

      // Combine with existing parameters
      const allParams = {
        ...parameters,
        ...oauthParams,
      };

      // OAuth signature uses consumer secret and token secret (empty for LTI 1.1)
      const tokenSecret = "";

      // Generate the signature
      const signature = oauthSignature.generate(
        httpMethod,
        url,
        allParams,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false } // LTI typically doesn't double-encode
      );

      // Return all parameters including the signature
      return yield* _(
        Effect.succeed({
          ...allParams,
          oauth_signature: signature,
        })
      );
    } catch (error) {
      return yield* _(
        Effect.fail(
          new OAuthValidationError(
            `Error generating OAuth signature: ${error instanceof Error ? error.message : String(error)}`
          )
        )
      );
    }
  });
