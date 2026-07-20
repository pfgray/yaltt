---
sidebar_position: 5
---

# LTI 1.1 vs LTI 1.3

LTI 1.3 evolves the LTI 1.1 standard, improving [**security**](#improved-security-asymmetric-vs-symmetric-encryption), easing [**installation**](#easier-installation-dynamic-registration), and adding rich [**tool capabilities**](#rich-tool-capabilities).

## Quick Comparison

| Feature               | LTI 1.1                    | LTI 1.3                          |
| --------------------- | -------------------------- | -------------------------------- |
| **Security**          | Symmetric (shared secrets) | Asymmetric (public/private keys) |
| **Registration**      | Manual configuration       | Dynamic registration             |
| **Grading**           | Single grade column        | Multiple line items + metadata   |
| **Roster Access**     | None                       | Full NRPS support                |
| **Content Selection** | None                       | Deep Linking                     |
| **Key Rotation**      | Difficult                  | Built-in via JWKS                |

## Improved Security: Asymmetric vs Symmetric Encryption

The most significant security improvement in LTI 1.3 is the shift from **symmetric** to **asymmetric** encryption.

In LTI 1.1, both platform and tool share the same secret key. These secrets are often shared via email or chat, requiring manual coordination and creating security risks.

LTI 1.3 uses public/private key pairs. The platform keeps its private key secure, while the public key can be safely shared without risk.

## Easier Installation: Dynamic Registration

LTI 1.1 requires manual configuration with many settings, making setup error-prone and time-consuming.

LTI 1.3 supports dynamic registration, where tools automatically share their configuration with the platform. This enables self-service installation and eliminates configuration errors. Yaltt demonstrates this flow in its installation screen.

## Rich Tool Capabilities

LTI 1.1 provides basic, XML-based grade passback with no roster access or content selection capabilities.

LTI 1.3 adds a framework for RESTful API requests to the platform, including APIs to retrieve roster data, post grades, and provide rich content selection.

New LTI 1.3 API Services:

#### Assignment and Grade Services (AGS)

- Create multiple gradebook columns
- Post scores with detailed metadata and progress indicators
- Support for complex grading workflows

#### Names and Role Provisioning Services (NRPS)

- Access full course rosters with user details
- Build collaborative features and instructor dashboards
- Display class lists within tools

#### Deep Linking (Content Item Selection)

- Let instructors select and add content from tools
- Support multiple content types (LTI links, files, HTML, images)
- Rich content integration with metadata and custom parameters

Yaltt displays these service endpoints and provides example API calls for testing.

## Testing with Yaltt

Yaltt helps you test and debug LTI integrations:

- **Dynamic Registration** - Test the registration flow with your platform
- **JWT Inspection** - View decoded launch tokens in the "Raw Launch" section
- **Service Testing** - Access AGS, NRPS, and Deep Linking endpoints with example API calls
- **API Tokens** - Get bearer tokens to test service calls directly

## Additional Resources

- [IMS Global LTI 1.3 Core Specification](https://www.imsglobal.org/spec/lti/v1p3/)
- [IMS Security Framework](https://www.imsglobal.org/spec/security/v1p0/)
- [LTI 1.3 Advantage Services](https://www.imsglobal.org/lti-advantage-overview)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
