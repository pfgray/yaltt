---
sidebar_position: 5
---

# LTI 1.1 vs LTI 1.3

LTI 1.3 evolves the standard LTI 1.1 standard, improving [**security**](#improved-security-asymmetric-vs-symmetric-encryption), easing [**installation**](#easier-installation-dynamic-registration), and adds rich [**tool capabilities**](#rich-tool-capabilities).

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

With symmetric keys, both the platform and tool need to have the same secret key (or, "password"). These are often communicated through unsafe means like email or chat messages, and require humans to coordinate.

Asymmetric cryptography use two keys, one private that's kept confidential by the platform, and a public key that's not confidential and shared with the tool. The public key that's shared does not need to be kept secret, and can be safely shared through public channels.

## Easier Installation: Dynamic Registration

To configure an LTI 1.1 app, the person installing the tool needs to set up a lot of complicated configuration options, and can easily make mistakes, costing time and money.

LTI 1.3 added the ability for tools to automatically send their configuration details to the platform, removing the human element to enable self-service tool avoid configuration issues and reduce setup time.

Dynamic registration reduces setup time, eliminates configuration errors, and enables self-service tool installation. Yaltt demonstrates this flow in its installation screen.

## Rich Tool Capabilities

LTI 1.1 provides clunky, XML-based grade pass-back functionality. There's no way to fetch roster data, and no content selection capabilities.

LTI 1.3 adds the framework for tools to make RESTful API requests to the platform, adding APIs to retrieve roster data, post grades, and provide rich content selection.
ication.

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
