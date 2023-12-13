{
  local = {
    "@yaltt/backend@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "@yaltt/backend";
      src = ./packages/backend;
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/schema" = "0.33.2";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
        "@types/connect-pg-simple" = "7.0.0";
        "@types/cookie-parser" = "1.4.3";
        "@types/cors" = "2.8.13";
        "@types/express" = "4.17.17";
        "@types/express-session" = "1.17.7";
        "@types/jsonwebtoken" = "9.0.2";
        "@types/multer" = "1.4.7";
        "@types/passport" = "1.0.12";
        "@types/passport-local" = "1.0.35";
        "@types/pg" = "8.6.6";
        "@yaltt/model" = "0.0.0";
        "canvas-lti-model" = "0.0.0";
        "connect-pg-simple" = "8.0.0";
        "connect-redis" = "7.1.0";
        "cookie-parser" = "1.4.6";
        "cors" = "2.8.5";
        "effect" = "2.0.0-next.29";
        "express" = "4.18.2";
        "express-session" = "1.17.3";
        "jsonwebtoken" = "9.0.0";
        "lti-model" = "0.0.0";
        "multer" = "1.4.5-lts.1";
        "njwt" = "2.0.0";
        "node-fetch" = "3.3.2";
        "nodemon" = "2.0.22";
        "passport" = "0.6.0";
        "passport-local" = "1.0.0";
        "pg" = "8.2.2";
        "redis" = "4.6.8";
        "ts-adt" = "2.1.2";
        "ts-node" = "10.9.1";
        "typescript" = "5.1.3";
      };
    };
    "canvas-lti-model@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "canvas-lti-model";
      src = ./packages/canvas-lti-model;
      dependencies = {
        "esbuild" = "0.17.19";
        "typescript" = "5.1.3";
        "@effect/schema" = "0.33.2";
        "effect" = "2.0.0-next.24";
        "lti-model" = "0.0.0";
        "ts-adt" = "2.1.2";
      };
    };
    "@yaltt/frontend@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "@yaltt/frontend";
      src = ./packages/frontend;
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/schema" = "0.33.2";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
        "@heroicons/react" = "2.0.18";
        "@react-dnd/invariant" = "4.0.2";
        "@tailwindcss/typography" = "0.5.10";
        "@types/react" = "18.2.21";
        "@types/react-dom" = "18.2.4";
        "@vitejs/plugin-react" = "3.1.0";
        "@yaltt/model" = "0.0.0";
        "autoprefixer" = "10.4.15";
        "daisyui" = "3.7.3";
        "effect" = "2.0.0-next.29";
        "esbuild" = "0.17.19";
        "lti-schema" = "0.0.0";
        "postcss" = "8.4.29";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-router-dom" = "6.11.1";
        "tailwindcss" = "3.3.3";
        "timeago.js" = "4.0.2";
        "ts-adt" = "2.1.2";
        "typescript" = "5.1.3";
        "vite" = "4.3.5";
        "zustand" = "4.4.4";
      };
    };
    "lti-model@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "lti-model";
      src = ./packages/lti-model;
      dependencies = {
        "esbuild" = "0.17.19";
        "typescript" = "5.1.3";
        "@effect/schema" = "0.33.2";
        "effect" = "2.0.0-next.24";
        "node-fetch" = "3.3.2";
        "ts-adt" = "2.1.2";
      };
    };
    "lti-schema@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "lti-schema";
      src = ./packages/lti-schema;
      dependencies = {
        "esbuild" = "0.17.19";
        "typescript" = "5.1.3";
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/schema" = "0.33.2";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
        "effect" = "2.0.0-next.29";
        "ts-adt" = "2.1.2";
      };
    };
    "@yaltt/model@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "@yaltt/model";
      src = ./packages/model;
      dependencies = {
        "@types/node" = "20.5.0";
        "esbuild" = "0.17.19";
        "typescript" = "5.1.3";
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/schema" = "0.33.2";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
        "effect" = "2.0.0-next.29";
        "lti-model" = "0.0.0";
        "ts-adt" = "2.1.2";
      };
    };
  };
  remote = {
    "@alloc/quick-lru@5.2.0" = {
      type = "remote";
      version = "5.2.0";
      name = "@alloc/quick-lru";
      src = {
        name = "quick-lru-5.2.0.tgz";
        url = "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz";
        hash = "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@ampproject/remapping@2.2.1" = {
      type = "remote";
      version = "2.2.1";
      name = "@ampproject/remapping";
      src = {
        name = "remapping-2.2.1.tgz";
        url = "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.2.1.tgz";
        hash = "sha512-lFMjJTrFL3j7L9yBxwYfCq2k6qqwHyzuUl/XBnif78PWTJYyL/dfowQHWE3sp6U6ZzqWiiIZnpTMO96zhkjwtg==";
      };
      dependencies = {
        "@jridgewell/gen-mapping" = "0.3.3";
        "@jridgewell/trace-mapping" = "0.3.18";
      };
      peerDependencies = [];
    };
    "@babel/code-frame@7.21.4" = {
      type = "remote";
      version = "7.21.4";
      name = "@babel/code-frame";
      src = {
        name = "code-frame-7.21.4.tgz";
        url = "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.21.4.tgz";
        hash = "sha512-LYvhNKfwWSPpocw8GI7gpK2nq3HSDuEPC/uSYaALSJu9xjsalaaYFOq0Pwt5KmVqwEbZlDu81aLXwBOmD/Fv9g==";
      };
      dependencies = {
        "@babel/highlight" = "7.18.6";
      };
      peerDependencies = [];
    };
    "@babel/compat-data@7.21.7" = {
      type = "remote";
      version = "7.21.7";
      name = "@babel/compat-data";
      src = {
        name = "compat-data-7.21.7.tgz";
        url = "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.21.7.tgz";
        hash = "sha512-KYMqFYTaenzMK4yUtf4EW9wc4N9ef80FsbMtkwool5zpwl4YrT1SdWYSTRcT94KO4hannogdS+LxY7L+arP3gA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/core@7.21.8" = {
      type = "remote";
      version = "7.21.8";
      name = "@babel/core";
      src = {
        name = "core-7.21.8.tgz";
        url = "https://registry.npmjs.org/@babel/core/-/core-7.21.8.tgz";
        hash = "sha512-YeM22Sondbo523Sz0+CirSPnbj9bG3P0CdHcBZdqUuaeOaYEFbOLoGU7lebvGP6P5J/WE9wOn7u7C4J9HvS1xQ==";
      };
      dependencies = {
        "@ampproject/remapping" = "2.2.1";
        "@babel/code-frame" = "7.21.4";
        "@babel/generator" = "7.21.5";
        "@babel/helper-compilation-targets" = "7.21.5";
        "@babel/helper-module-transforms" = "7.21.5";
        "@babel/helpers" = "7.21.5";
        "@babel/parser" = "7.21.8";
        "@babel/template" = "7.20.7";
        "@babel/traverse" = "7.21.5";
        "@babel/types" = "7.21.5";
        "convert-source-map" = "1.9.0";
        "debug" = "4.3.4";
        "gensync" = "1.0.0-beta.2";
        "json5" = "2.2.3";
        "semver" = "6.3.0";
      };
      peerDependencies = [];
    };
    "@babel/generator@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/generator";
      src = {
        name = "generator-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/generator/-/generator-7.21.5.tgz";
        hash = "sha512-SrKK/sRv8GesIW1bDagf9cCG38IOMYZusoe1dfg0D8aiUe3Amvoj1QtjTPAWcfrZFvIwlleLb0gxzQidL9w14w==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
        "@jridgewell/gen-mapping" = "0.3.3";
        "@jridgewell/trace-mapping" = "0.3.18";
        "jsesc" = "2.5.2";
      };
      peerDependencies = [];
    };
    "@babel/helper-compilation-targets@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-compilation-targets";
      src = {
        name = "helper-compilation-targets-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.21.5.tgz";
        hash = "sha512-1RkbFGUKex4lvsB9yhIfWltJM5cZKUftB2eNajaDv3dCMEp49iBG0K14uH8NnX9IPux2+mK7JGEOB0jn48/J6w==";
      };
      dependencies = {
        "@babel/compat-data" = "7.21.7";
        "@babel/core" = "7.21.8";
        "@babel/helper-validator-option" = "7.21.0";
        "browserslist" = "4.21.10";
        "lru-cache" = "5.1.1";
        "semver" = "6.3.0";
      };
      peerDependencies = [
        "@babel/core"
      ];
    };
    "@babel/helper-environment-visitor@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-environment-visitor";
      src = {
        name = "helper-environment-visitor-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-environment-visitor/-/helper-environment-visitor-7.21.5.tgz";
        hash = "sha512-IYl4gZ3ETsWocUWgsFZLM5i1BYx9SoemminVEXadgLBa9TdeorzgLKm8wWLA6J1N/kT3Kch8XIk1laNzYoHKvQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/helper-function-name@7.21.0" = {
      type = "remote";
      version = "7.21.0";
      name = "@babel/helper-function-name";
      src = {
        name = "helper-function-name-7.21.0.tgz";
        url = "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.21.0.tgz";
        hash = "sha512-HfK1aMRanKHpxemaY2gqBmL04iAPOPRj7DxtNbiDOrJK+gdwkiNRVpCpUJYbUT+aZyemKN8brqTOxzCaG6ExRg==";
      };
      dependencies = {
        "@babel/template" = "7.20.7";
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-hoist-variables@7.18.6" = {
      type = "remote";
      version = "7.18.6";
      name = "@babel/helper-hoist-variables";
      src = {
        name = "helper-hoist-variables-7.18.6.tgz";
        url = "https://registry.npmjs.org/@babel/helper-hoist-variables/-/helper-hoist-variables-7.18.6.tgz";
        hash = "sha512-UlJQPkFqFULIcyW5sbzgbkxn2FKRgwWiRexcuaR8RNJRy8+LLveqPjwZV/bwrLZCN0eUHD/x8D0heK1ozuoo6Q==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-module-imports@7.21.4" = {
      type = "remote";
      version = "7.21.4";
      name = "@babel/helper-module-imports";
      src = {
        name = "helper-module-imports-7.21.4.tgz";
        url = "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.21.4.tgz";
        hash = "sha512-orajc5T2PsRYUN3ZryCEFeMDYwyw09c/pZeaQEZPH0MpKzSvn3e0uXsDBu3k03VI+9DBiRo+l22BfKTpKwa/Wg==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-module-transforms@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-module-transforms";
      src = {
        name = "helper-module-transforms-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.21.5.tgz";
        hash = "sha512-bI2Z9zBGY2q5yMHoBvJ2a9iX3ZOAzJPm7Q8Yz6YeoUjU/Cvhmi2G4QyTNyPBqqXSgTjUxRg3L0xV45HvkNWWBw==";
      };
      dependencies = {
        "@babel/helper-environment-visitor" = "7.21.5";
        "@babel/helper-module-imports" = "7.21.4";
        "@babel/helper-simple-access" = "7.21.5";
        "@babel/helper-split-export-declaration" = "7.18.6";
        "@babel/helper-validator-identifier" = "7.19.1";
        "@babel/template" = "7.20.7";
        "@babel/traverse" = "7.21.5";
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-plugin-utils@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-plugin-utils";
      src = {
        name = "helper-plugin-utils-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.21.5.tgz";
        hash = "sha512-0WDaIlXKOX/3KfBK/dwP1oQGiPh6rjMkT7HIRv7i5RR2VUMwrx5ZL0dwBkKx7+SW1zwNdgjHd34IMk5ZjTeHVg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/helper-simple-access@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-simple-access";
      src = {
        name = "helper-simple-access-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.21.5.tgz";
        hash = "sha512-ENPDAMC1wAjR0uaCUwliBdiSl1KBJAVnMTzXqi64c2MG8MPR6ii4qf7bSXDqSFbr4W6W028/rf5ivoHop5/mkg==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-split-export-declaration@7.18.6" = {
      type = "remote";
      version = "7.18.6";
      name = "@babel/helper-split-export-declaration";
      src = {
        name = "helper-split-export-declaration-7.18.6.tgz";
        url = "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.18.6.tgz";
        hash = "sha512-bde1etTx6ZyTmobl9LLMMQsaizFVZrquTEHOqKeQESMKo4PlObf+8+JA25ZsIpZhT/WEd39+vOdLXAFG/nELpA==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/helper-string-parser@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helper-string-parser";
      src = {
        name = "helper-string-parser-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.21.5.tgz";
        hash = "sha512-5pTUx3hAJaZIdW99sJ6ZUUgWq/Y+Hja7TowEnLNMm1VivRgZQL3vpBY3qUACVsvw+yQU6+YgfBVmcbLaZtrA1w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/helper-validator-identifier@7.19.1" = {
      type = "remote";
      version = "7.19.1";
      name = "@babel/helper-validator-identifier";
      src = {
        name = "helper-validator-identifier-7.19.1.tgz";
        url = "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.19.1.tgz";
        hash = "sha512-awrNfaMtnHUr653GgGEs++LlAvW6w+DcPrOliSMXWCKo597CwL5Acf/wWdNkf/tfEQE3mjkeD1YOVZOUV/od1w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/helper-validator-option@7.21.0" = {
      type = "remote";
      version = "7.21.0";
      name = "@babel/helper-validator-option";
      src = {
        name = "helper-validator-option-7.21.0.tgz";
        url = "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.21.0.tgz";
        hash = "sha512-rmL/B8/f0mKS2baE9ZpyTcTavvEuWhTTW8amjzXNvYG4AwBsqTLikfXsEofsJEfKHf+HQVQbFOHy6o+4cnC/fQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@babel/helpers@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/helpers";
      src = {
        name = "helpers-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/helpers/-/helpers-7.21.5.tgz";
        hash = "sha512-BSY+JSlHxOmGsPTydUkPf1MdMQ3M81x5xGCOVgWM3G8XH77sJ292Y2oqcp0CbbgxhqBuI46iUz1tT7hqP7EfgA==";
      };
      dependencies = {
        "@babel/template" = "7.20.7";
        "@babel/traverse" = "7.21.5";
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/highlight@7.18.6" = {
      type = "remote";
      version = "7.18.6";
      name = "@babel/highlight";
      src = {
        name = "highlight-7.18.6.tgz";
        url = "https://registry.npmjs.org/@babel/highlight/-/highlight-7.18.6.tgz";
        hash = "sha512-u7stbOuYjaPezCuLj29hNW1v64M2Md2qupEKP1fHc7WdOA3DgLh37suiSrZYY7haUB7iBeQZ9P1uiRF359do3g==";
      };
      dependencies = {
        "@babel/helper-validator-identifier" = "7.19.1";
        "chalk" = "2.4.2";
        "js-tokens" = "4.0.0";
      };
      peerDependencies = [];
    };
    "@babel/parser@7.21.8" = {
      type = "remote";
      version = "7.21.8";
      name = "@babel/parser";
      src = {
        name = "parser-7.21.8.tgz";
        url = "https://registry.npmjs.org/@babel/parser/-/parser-7.21.8.tgz";
        hash = "sha512-6zavDGdzG3gUqAdWvlLFfk+36RilI+Pwyuuh7HItyeScCWP3k6i8vKclAQ0bM/0y/Kz/xiwvxhMv9MgTJP5gmA==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/plugin-transform-react-jsx-self@7.21.0" = {
      type = "remote";
      version = "7.21.0";
      name = "@babel/plugin-transform-react-jsx-self";
      src = {
        name = "plugin-transform-react-jsx-self-7.21.0.tgz";
        url = "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.21.0.tgz";
        hash = "sha512-f/Eq+79JEu+KUANFks9UZCcvydOOGMgF7jBrcwjHa5jTZD8JivnhCJYvmlhR/WTXBWonDExPoW0eO/CR4QJirA==";
      };
      dependencies = {
        "@babel/core" = "7.21.8";
        "@babel/helper-plugin-utils" = "7.21.5";
      };
      peerDependencies = [
        "@babel/core"
      ];
    };
    "@babel/plugin-transform-react-jsx-source@7.19.6" = {
      type = "remote";
      version = "7.19.6";
      name = "@babel/plugin-transform-react-jsx-source";
      src = {
        name = "plugin-transform-react-jsx-source-7.19.6.tgz";
        url = "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.19.6.tgz";
        hash = "sha512-RpAi004QyMNisst/pvSanoRdJ4q+jMCWyk9zdw/CyLB9j8RXEahodR6l2GyttDRyEVWZtbN+TpLiHJ3t34LbsQ==";
      };
      dependencies = {
        "@babel/core" = "7.21.8";
        "@babel/helper-plugin-utils" = "7.21.5";
      };
      peerDependencies = [
        "@babel/core"
      ];
    };
    "@babel/template@7.20.7" = {
      type = "remote";
      version = "7.20.7";
      name = "@babel/template";
      src = {
        name = "template-7.20.7.tgz";
        url = "https://registry.npmjs.org/@babel/template/-/template-7.20.7.tgz";
        hash = "sha512-8SegXApWe6VoNw0r9JHpSteLKTpTiLZ4rMlGIm9JQ18KiCtyQiAMEazujAHrUS5flrcqYZa75ukev3P6QmUwUw==";
      };
      dependencies = {
        "@babel/code-frame" = "7.21.4";
        "@babel/parser" = "7.21.8";
        "@babel/types" = "7.21.5";
      };
      peerDependencies = [];
    };
    "@babel/traverse@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/traverse";
      src = {
        name = "traverse-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/traverse/-/traverse-7.21.5.tgz";
        hash = "sha512-AhQoI3YjWi6u/y/ntv7k48mcrCXmus0t79J9qPNlk/lAsFlCiJ047RmbfMOawySTHtywXhbXgpx/8nXMYd+oFw==";
      };
      dependencies = {
        "@babel/code-frame" = "7.21.4";
        "@babel/generator" = "7.21.5";
        "@babel/helper-environment-visitor" = "7.21.5";
        "@babel/helper-function-name" = "7.21.0";
        "@babel/helper-hoist-variables" = "7.18.6";
        "@babel/helper-split-export-declaration" = "7.18.6";
        "@babel/parser" = "7.21.8";
        "@babel/types" = "7.21.5";
        "debug" = "4.3.4";
        "globals" = "11.12.0";
      };
      peerDependencies = [];
    };
    "@babel/types@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/types";
      src = {
        name = "types-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/types/-/types-7.21.5.tgz";
        hash = "sha512-m4AfNvVF2mVC/F7fDEdH2El3HzUg9It/XsCxZiOTTA3m3qYfcSVSbTfM6Q9xG+hYDniZssYhlXKKUMD5m8tF4Q==";
      };
      dependencies = {
        "@babel/helper-string-parser" = "7.21.5";
        "@babel/helper-validator-identifier" = "7.19.1";
        "to-fast-properties" = "2.0.0";
      };
      peerDependencies = [];
    };
    "@cspotcode/source-map-support@0.8.1" = {
      type = "remote";
      version = "0.8.1";
      name = "@cspotcode/source-map-support";
      src = {
        name = "source-map-support-0.8.1.tgz";
        url = "https://registry.npmjs.org/@cspotcode/source-map-support/-/source-map-support-0.8.1.tgz";
        hash = "sha512-IchNf6dN4tHoMFIn/7OE8LWZ19Y6q/67Bmf6vnGREv8RSbBVb9LPJxEcnwrcwX6ixSvaiGoomAUvu4YSxXrVgw==";
      };
      dependencies = {
        "@jridgewell/trace-mapping" = "0.3.9";
      };
      peerDependencies = [];
    };
    "@effect/data@0.17.6" = {
      type = "remote";
      version = "0.17.6";
      name = "@effect/data";
      src = {
        name = "data-0.17.6.tgz";
        url = "https://registry.npmjs.org/@effect/data/-/data-0.17.6.tgz";
        hash = "sha512-/vwz7Jh05eS0qY8kczR/YyJd18d0C+PMtUkAealh4f6gwvhABLGCnktNJTcq/+UHxY0Cbv18r5uaJ4+7PPC+WQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@effect/io@0.38.2" = {
      type = "remote";
      version = "0.38.2";
      name = "@effect/io";
      src = {
        name = "io-0.38.2.tgz";
        url = "https://registry.npmjs.org/@effect/io/-/io-0.38.2.tgz";
        hash = "sha512-rnAXFo9BDLbY7DgQE1e8uP/sEniyVCsB7gNs+yXPu0XK9s4kaGinH6XgwYRDBuu7Fu1tQ1yd7JoAdEb7yutNRg==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
      };
      peerDependencies = [
        "@effect/data"
      ];
    };
    "@effect/match@0.32.0" = {
      type = "remote";
      version = "0.32.0";
      name = "@effect/match";
      src = {
        name = "match-0.32.0.tgz";
        url = "https://registry.npmjs.org/@effect/match/-/match-0.32.0.tgz";
        hash = "sha512-04QfnIgCcMnnNbGxTv2xa9/7q1c5kgpsBodqTUZ8eX86A/EdE8Czz+JkVarG00/xE+nYhQLXOXCN9Zj+dtqVkQ==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/schema" = "0.33.2";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/schema"
      ];
    };
    "@effect/match@0.34.0" = {
      type = "remote";
      version = "0.34.0";
      name = "@effect/match";
      src = {
        name = "match-0.34.0.tgz";
        url = "https://registry.npmjs.org/@effect/match/-/match-0.34.0.tgz";
        hash = "sha512-3fPqDT81rOU+83s84dx7Dh8pMtBq6BE+FGxq5U6FB48IeUdr35jayeuIXe6ZGQC6YorM3GJny6XYO5gOy0AAow==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
      };
      peerDependencies = [
        "@effect/data"
      ];
    };
    "@effect/schema@0.33.2" = {
      type = "remote";
      version = "0.33.2";
      name = "@effect/schema";
      src = {
        name = "schema-0.33.2.tgz";
        url = "https://registry.npmjs.org/@effect/schema/-/schema-0.33.2.tgz";
        hash = "sha512-GfV4kXAs4tkx09bGD6J4RDqVN+xea4UP0I05r1wloox6j0eYgXYaSKAXAZ7qBKVywkba3cDUDZhc9nplAD8TAA==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "fast-check" = "3.12.0";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/io"
      ];
    };
    "@effect/schema@0.52.0" = {
      type = "remote";
      version = "0.52.0";
      name = "@effect/schema";
      src = {
        name = "schema-0.52.0.tgz";
        url = "https://registry.npmjs.org/@effect/schema/-/schema-0.52.0.tgz";
        hash = "sha512-x6SmSdoL6PeZVAaK895NoRkKF8D/w+XyO8i17cUsQYFJBHNyUTi9Y1H2wrO8TkxhTmC93ejburpM+35/OKCi2Q==";
      };
      dependencies = {
        "effect" = "2.0.0-next.60";
        "fast-check" = "3.14.0";
      };
      peerDependencies = [
        "effect"
        "fast-check"
      ];
    };
    "@effect/stm@0.22.0" = {
      type = "remote";
      version = "0.22.0";
      name = "@effect/stm";
      src = {
        name = "stm-0.22.0.tgz";
        url = "https://registry.npmjs.org/@effect/stm/-/stm-0.22.0.tgz";
        hash = "sha512-K+v05Iveg9h//xZbo/JekZE4mHln8QA7dpfl84L3VKQlUfiAZOiN4ABTyb41Ly+n+YywSSbeTdbOya0ccxx/rQ==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/io"
      ];
    };
    "@effect/stream@0.34.0" = {
      type = "remote";
      version = "0.34.0";
      name = "@effect/stream";
      src = {
        name = "stream-0.34.0.tgz";
        url = "https://registry.npmjs.org/@effect/stream/-/stream-0.34.0.tgz";
        hash = "sha512-8eDDQ0JG+ctsstLH/Qo4ojBkcEIFtqpEsWZS6leAwY9gXVmEG54PMWXZiX6dTchgQXKmSnLkEh36leAq4piawQ==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/io"
      ];
    };
    "@esbuild/android-arm64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/android-arm64";
      src = {
        name = "android-arm64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.17.19.tgz";
        hash = "sha512-KBMWvEZooR7+kzY0BtbTQn0OAYY7CsiydT63pVEaPtVYF0hXbUaOyZog37DKxK7NF3XacBJOpYT4adIJh+avxA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/android-arm@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/android-arm";
      src = {
        name = "android-arm-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.17.19.tgz";
        hash = "sha512-rIKddzqhmav7MSmoFCmDIb6e2W57geRsM94gV2l38fzhXMwq7hZoClug9USI2pFRGL06f4IOPHHpFNOkWieR8A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/android-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/android-x64";
      src = {
        name = "android-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.17.19.tgz";
        hash = "sha512-uUTTc4xGNDT7YSArp/zbtmbhO0uEEK9/ETW29Wk1thYUJBz3IVnvgEiEwEa9IeLyvnpKrWK64Utw2bgUmDveww==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/darwin-arm64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/darwin-arm64";
      src = {
        name = "darwin-arm64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.17.19.tgz";
        hash = "sha512-80wEoCfF/hFKM6WE1FyBHc9SfUblloAWx6FJkFWTWiCoht9Mc0ARGEM47e67W9rI09YoUxJL68WHfDRYEAvOhg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/darwin-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/darwin-x64";
      src = {
        name = "darwin-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.17.19.tgz";
        hash = "sha512-IJM4JJsLhRYr9xdtLytPLSH9k/oxR3boaUIYiHkAawtwNOXKE8KoU8tMvryogdcT8AU+Bflmh81Xn6Q0vTZbQw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/freebsd-arm64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/freebsd-arm64";
      src = {
        name = "freebsd-arm64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.17.19.tgz";
        hash = "sha512-pBwbc7DufluUeGdjSU5Si+P3SoMF5DQ/F/UmTSb8HXO80ZEAJmrykPyzo1IfNbAoaqw48YRpv8shwd1NoI0jcQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/freebsd-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/freebsd-x64";
      src = {
        name = "freebsd-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.17.19.tgz";
        hash = "sha512-4lu+n8Wk0XlajEhbEffdy2xy53dpR06SlzvhGByyg36qJw6Kpfk7cp45DR/62aPH9mtJRmIyrXAS5UWBrJT6TQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-arm64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-arm64";
      src = {
        name = "linux-arm64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.17.19.tgz";
        hash = "sha512-ct1Tg3WGwd3P+oZYqic+YZF4snNl2bsnMKRkb3ozHmnM0dGWuxcPTTntAF6bOP0Sp4x0PjSF+4uHQ1xvxfRKqg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-arm@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-arm";
      src = {
        name = "linux-arm-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.17.19.tgz";
        hash = "sha512-cdmT3KxjlOQ/gZ2cjfrQOtmhG4HJs6hhvm3mWSRDPtZ/lP5oe8FWceS10JaSJC13GBd4eH/haHnqf7hhGNLerA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-ia32@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-ia32";
      src = {
        name = "linux-ia32-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.17.19.tgz";
        hash = "sha512-w4IRhSy1VbsNxHRQpeGCHEmibqdTUx61Vc38APcsRbuVgK0OPEnQ0YD39Brymn96mOx48Y2laBQGqgZ0j9w6SQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-loong64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-loong64";
      src = {
        name = "linux-loong64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.17.19.tgz";
        hash = "sha512-2iAngUbBPMq439a+z//gE+9WBldoMp1s5GWsUSgqHLzLJ9WoZLZhpwWuym0u0u/4XmZ3gpHmzV84PonE+9IIdQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-mips64el@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-mips64el";
      src = {
        name = "linux-mips64el-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.17.19.tgz";
        hash = "sha512-LKJltc4LVdMKHsrFe4MGNPp0hqDFA1Wpt3jE1gEyM3nKUvOiO//9PheZZHfYRfYl6AwdTH4aTcXSqBerX0ml4A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-ppc64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-ppc64";
      src = {
        name = "linux-ppc64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.17.19.tgz";
        hash = "sha512-/c/DGybs95WXNS8y3Ti/ytqETiW7EU44MEKuCAcpPto3YjQbyK3IQVKfF6nbghD7EcLUGl0NbiL5Rt5DMhn5tg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-riscv64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-riscv64";
      src = {
        name = "linux-riscv64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.17.19.tgz";
        hash = "sha512-FC3nUAWhvFoutlhAkgHf8f5HwFWUL6bYdvLc/TTuxKlvLi3+pPzdZiFKSWz/PF30TB1K19SuCxDTI5KcqASJqA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-s390x@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-s390x";
      src = {
        name = "linux-s390x-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.17.19.tgz";
        hash = "sha512-IbFsFbxMWLuKEbH+7sTkKzL6NJmG2vRyy6K7JJo55w+8xDk7RElYn6xvXtDW8HCfoKBFK69f3pgBJSUSQPr+4Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/linux-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/linux-x64";
      src = {
        name = "linux-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.17.19.tgz";
        hash = "sha512-68ngA9lg2H6zkZcyp22tsVt38mlhWde8l3eJLWkyLrp4HwMUr3c1s/M2t7+kHIhvMjglIBrFpncX1SzMckomGw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/netbsd-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/netbsd-x64";
      src = {
        name = "netbsd-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.17.19.tgz";
        hash = "sha512-CwFq42rXCR8TYIjIfpXCbRX0rp1jo6cPIUPSaWwzbVI4aOfX96OXY8M6KNmtPcg7QjYeDmN+DD0Wp3LaBOLf4Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/openbsd-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/openbsd-x64";
      src = {
        name = "openbsd-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.17.19.tgz";
        hash = "sha512-cnq5brJYrSZ2CF6c35eCmviIN3k3RczmHz8eYaVlNasVqsNY+JKohZU5MKmaOI+KkllCdzOKKdPs762VCPC20g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/sunos-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/sunos-x64";
      src = {
        name = "sunos-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.17.19.tgz";
        hash = "sha512-vCRT7yP3zX+bKWFeP/zdS6SqdWB8OIpaRq/mbXQxTGHnIxspRtigpkUcDMlSCOejlHowLqII7K2JKevwyRP2rg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/win32-arm64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/win32-arm64";
      src = {
        name = "win32-arm64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.17.19.tgz";
        hash = "sha512-yYx+8jwowUstVdorcMdNlzklLYhPxjniHWFKgRqH7IFlUEa0Umu3KuYplf1HUZZ422e3NU9F4LGb+4O0Kdcaag==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/win32-ia32@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/win32-ia32";
      src = {
        name = "win32-ia32-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.17.19.tgz";
        hash = "sha512-eggDKanJszUtCdlVs0RB+h35wNlb5v4TWEkq4vZcmVt5u/HiDZrTXe2bWFQUez3RgNHwx/x4sk5++4NSSicKkw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@esbuild/win32-x64@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "@esbuild/win32-x64";
      src = {
        name = "win32-x64-0.17.19.tgz";
        url = "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.17.19.tgz";
        hash = "sha512-lAhycmKnVOuRYNtRtatQR1LPQf2oYCkRGkSFnseDAKPl8lu5SOsK/e1sXe5a0Pc5kHIHe6P2I/ilntNv2xf3cA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@heroicons/react@2.0.18" = {
      type = "remote";
      version = "2.0.18";
      name = "@heroicons/react";
      src = {
        name = "react-2.0.18.tgz";
        url = "https://registry.npmjs.org/@heroicons/react/-/react-2.0.18.tgz";
        hash = "sha512-7TyMjRrZZMBPa+/5Y8lN0iyvUU/01PeMGX2+RE7cQWpEUIcb4QotzUObFkJDejj/HUH4qjP/eQ0gzzKs2f+6Yw==";
      };
      dependencies = {
        "react" = "18.2.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "@jridgewell/gen-mapping@0.3.3" = {
      type = "remote";
      version = "0.3.3";
      name = "@jridgewell/gen-mapping";
      src = {
        name = "gen-mapping-0.3.3.tgz";
        url = "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.3.tgz";
        hash = "sha512-HLhSWOLRi875zjjMG/r+Nv0oCW8umGb0BgEhyX3dDX3egwZtB8PqLnjz3yedt8R5StBrzcg4aBpnh8UA9D1BoQ==";
      };
      dependencies = {
        "@jridgewell/set-array" = "1.1.2";
        "@jridgewell/sourcemap-codec" = "1.4.15";
        "@jridgewell/trace-mapping" = "0.3.18";
      };
      peerDependencies = [];
    };
    "@jridgewell/resolve-uri@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "@jridgewell/resolve-uri";
      src = {
        name = "resolve-uri-3.1.0.tgz";
        url = "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.0.tgz";
        hash = "sha512-F2msla3tad+Mfht5cJq7LSXcdudKTWCVYUgw6pLFOOHSTtZlj6SWNYAp+AhuqLmWdBO2X5hPrLcu8cVP8fy28w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@jridgewell/resolve-uri@3.1.1" = {
      type = "remote";
      version = "3.1.1";
      name = "@jridgewell/resolve-uri";
      src = {
        name = "resolve-uri-3.1.1.tgz";
        url = "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.1.tgz";
        hash = "sha512-dSYZh7HhCDtCKm4QakX0xFpsRDqjjtZf/kjI/v3T3Nwt5r8/qz/M19F9ySyOqU94SXBmeG9ttTul+YnR4LOxFA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@jridgewell/set-array@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "@jridgewell/set-array";
      src = {
        name = "set-array-1.1.2.tgz";
        url = "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.1.2.tgz";
        hash = "sha512-xnkseuNADM0gt2bs+BvhO0p78Mk762YnZdsuzFV018NoG1Sj1SCQvpSqa7XUaTam5vAGasABV9qXASMKnFMwMw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@jridgewell/sourcemap-codec@1.4.14" = {
      type = "remote";
      version = "1.4.14";
      name = "@jridgewell/sourcemap-codec";
      src = {
        name = "sourcemap-codec-1.4.14.tgz";
        url = "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.14.tgz";
        hash = "sha512-XPSJHWmi394fuUuzDnGz1wiKqWfo1yXecHQMRf2l6hztTO+nPru658AyDngaBe7isIxEkRsPR3FZh+s7iVa4Uw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@jridgewell/sourcemap-codec@1.4.15" = {
      type = "remote";
      version = "1.4.15";
      name = "@jridgewell/sourcemap-codec";
      src = {
        name = "sourcemap-codec-1.4.15.tgz";
        url = "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz";
        hash = "sha512-eF2rxCRulEKXHTRiDrDy6erMYWqNw4LPdQ8UQA4huuxaQsVeRPFl2oM8oDGxMFhJUWZf9McpLtJasDDZb/Bpeg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@jridgewell/trace-mapping@0.3.18" = {
      type = "remote";
      version = "0.3.18";
      name = "@jridgewell/trace-mapping";
      src = {
        name = "trace-mapping-0.3.18.tgz";
        url = "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.18.tgz";
        hash = "sha512-w+niJYzMHdd7USdiH2U6869nqhD2nbfZXND5Yp93qIbEmnDNk7PD48o+YchRVpzMU7M6jVCbenTR7PA1FLQ9pA==";
      };
      dependencies = {
        "@jridgewell/resolve-uri" = "3.1.0";
        "@jridgewell/sourcemap-codec" = "1.4.14";
      };
      peerDependencies = [];
    };
    "@jridgewell/trace-mapping@0.3.9" = {
      type = "remote";
      version = "0.3.9";
      name = "@jridgewell/trace-mapping";
      src = {
        name = "trace-mapping-0.3.9.tgz";
        url = "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.9.tgz";
        hash = "sha512-3Belt6tdc8bPgAtbcmdtNJlirVoTmEb5e2gC94PnkwEW9jI6CAHUeoG85tjWP5WquqfavoMtMwiG4P926ZKKuQ==";
      };
      dependencies = {
        "@jridgewell/resolve-uri" = "3.1.1";
        "@jridgewell/sourcemap-codec" = "1.4.15";
      };
      peerDependencies = [];
    };
    "@nodelib/fs.scandir@2.1.5" = {
      type = "remote";
      version = "2.1.5";
      name = "@nodelib/fs.scandir";
      src = {
        name = "fs.scandir-2.1.5.tgz";
        url = "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz";
        hash = "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==";
      };
      dependencies = {
        "@nodelib/fs.stat" = "2.0.5";
        "run-parallel" = "1.2.0";
      };
      peerDependencies = [];
    };
    "@nodelib/fs.stat@2.0.5" = {
      type = "remote";
      version = "2.0.5";
      name = "@nodelib/fs.stat";
      src = {
        name = "fs.stat-2.0.5.tgz";
        url = "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz";
        hash = "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@nodelib/fs.walk@1.2.8" = {
      type = "remote";
      version = "1.2.8";
      name = "@nodelib/fs.walk";
      src = {
        name = "fs.walk-1.2.8.tgz";
        url = "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz";
        hash = "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==";
      };
      dependencies = {
        "@nodelib/fs.scandir" = "2.1.5";
        "fastq" = "1.15.0";
      };
      peerDependencies = [];
    };
    "@react-dnd/invariant@4.0.2" = {
      type = "remote";
      version = "4.0.2";
      name = "@react-dnd/invariant";
      src = {
        name = "invariant-4.0.2.tgz";
        url = "https://registry.npmjs.org/@react-dnd/invariant/-/invariant-4.0.2.tgz";
        hash = "sha512-xKCTqAK/FFauOM9Ta2pswIyT3D8AQlfrYdOi/toTPEhqCuAs1v5tcJ3Y08Izh1cJ5Jchwy9SeAXmMg6zrKs2iw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@redis/bloom@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "@redis/bloom";
      src = {
        name = "bloom-1.2.0.tgz";
        url = "https://registry.npmjs.org/@redis/bloom/-/bloom-1.2.0.tgz";
        hash = "sha512-HG2DFjYKbpNmVXsa0keLHp/3leGJz1mjh09f2RLGGLQZzSHpkmZWuwJbAvo3QcRY8p80m5+ZdXZdYOSBLlp7Cg==";
      };
      dependencies = {
        "@redis/client" = "1.5.9";
      };
      peerDependencies = [
        "@redis/client"
      ];
    };
    "@redis/client@1.5.9" = {
      type = "remote";
      version = "1.5.9";
      name = "@redis/client";
      src = {
        name = "client-1.5.9.tgz";
        url = "https://registry.npmjs.org/@redis/client/-/client-1.5.9.tgz";
        hash = "sha512-SffgN+P1zdWJWSXBvJeynvEnmnZrYmtKSRW00xl8pOPFOMJjxRR9u0frSxJpPR6Y4V+k54blJjGW7FgxbTI7bQ==";
      };
      dependencies = {
        "cluster-key-slot" = "1.1.2";
        "generic-pool" = "3.9.0";
        "yallist" = "4.0.0";
      };
      peerDependencies = [];
    };
    "@redis/graph@1.1.0" = {
      type = "remote";
      version = "1.1.0";
      name = "@redis/graph";
      src = {
        name = "graph-1.1.0.tgz";
        url = "https://registry.npmjs.org/@redis/graph/-/graph-1.1.0.tgz";
        hash = "sha512-16yZWngxyXPd+MJxeSr0dqh2AIOi8j9yXKcKCwVaKDbH3HTuETpDVPcLujhFYVPtYrngSco31BUcSa9TH31Gqg==";
      };
      dependencies = {
        "@redis/client" = "1.5.9";
      };
      peerDependencies = [
        "@redis/client"
      ];
    };
    "@redis/json@1.0.4" = {
      type = "remote";
      version = "1.0.4";
      name = "@redis/json";
      src = {
        name = "json-1.0.4.tgz";
        url = "https://registry.npmjs.org/@redis/json/-/json-1.0.4.tgz";
        hash = "sha512-LUZE2Gdrhg0Rx7AN+cZkb1e6HjoSKaeeW8rYnt89Tly13GBI5eP4CwDVr+MY8BAYfCg4/N15OUrtLoona9uSgw==";
      };
      dependencies = {
        "@redis/client" = "1.5.9";
      };
      peerDependencies = [
        "@redis/client"
      ];
    };
    "@redis/search@1.1.3" = {
      type = "remote";
      version = "1.1.3";
      name = "@redis/search";
      src = {
        name = "search-1.1.3.tgz";
        url = "https://registry.npmjs.org/@redis/search/-/search-1.1.3.tgz";
        hash = "sha512-4Dg1JjvCevdiCBTZqjhKkGoC5/BcB7k9j99kdMnaXFXg8x4eyOIVg9487CMv7/BUVkFLZCaIh8ead9mU15DNng==";
      };
      dependencies = {
        "@redis/client" = "1.5.9";
      };
      peerDependencies = [
        "@redis/client"
      ];
    };
    "@redis/time-series@1.0.5" = {
      type = "remote";
      version = "1.0.5";
      name = "@redis/time-series";
      src = {
        name = "time-series-1.0.5.tgz";
        url = "https://registry.npmjs.org/@redis/time-series/-/time-series-1.0.5.tgz";
        hash = "sha512-IFjIgTusQym2B5IZJG3XKr5llka7ey84fw/NOYqESP5WUfQs9zz1ww/9+qoz4ka/S6KcGBodzlCeZ5UImKbscg==";
      };
      dependencies = {
        "@redis/client" = "1.5.9";
      };
      peerDependencies = [
        "@redis/client"
      ];
    };
    "@remix-run/router@1.6.1" = {
      type = "remote";
      version = "1.6.1";
      name = "@remix-run/router";
      src = {
        name = "router-1.6.1.tgz";
        url = "https://registry.npmjs.org/@remix-run/router/-/router-1.6.1.tgz";
        hash = "sha512-YUkWj+xs0oOzBe74OgErsuR3wVn+efrFhXBWrit50kOiED+pvQe2r6MWY0iJMQU/mSVKxvNzL4ZaYvjdX+G7ZA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@tailwindcss/typography@0.5.10" = {
      type = "remote";
      version = "0.5.10";
      name = "@tailwindcss/typography";
      src = {
        name = "typography-0.5.10.tgz";
        url = "https://registry.npmjs.org/@tailwindcss/typography/-/typography-0.5.10.tgz";
        hash = "sha512-Pe8BuPJQJd3FfRnm6H0ulKIGoMEQS+Vq01R6M5aCrFB/ccR/shT+0kXLjouGC1gFLm9hopTFN+DMP0pfwRWzPw==";
      };
      dependencies = {
        "lodash.castarray" = "4.4.0";
        "lodash.isplainobject" = "4.0.6";
        "lodash.merge" = "4.6.2";
        "postcss-selector-parser" = "6.0.10";
        "tailwindcss" = "3.3.3";
      };
      peerDependencies = [
        "tailwindcss"
      ];
    };
    "@tsconfig/node10@1.0.9" = {
      type = "remote";
      version = "1.0.9";
      name = "@tsconfig/node10";
      src = {
        name = "node10-1.0.9.tgz";
        url = "https://registry.npmjs.org/@tsconfig/node10/-/node10-1.0.9.tgz";
        hash = "sha512-jNsYVVxU8v5g43Erja32laIDHXeoNvFEpX33OK4d6hljo3jDhCBDhx5dhCCTMWUojscpAagGiRkBKxpdl9fxqA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@tsconfig/node12@1.0.11" = {
      type = "remote";
      version = "1.0.11";
      name = "@tsconfig/node12";
      src = {
        name = "node12-1.0.11.tgz";
        url = "https://registry.npmjs.org/@tsconfig/node12/-/node12-1.0.11.tgz";
        hash = "sha512-cqefuRsh12pWyGsIoBKJA9luFu3mRxCA+ORZvA4ktLSzIuCUtWVxGIuXigEwO5/ywWFMZ2QEGKWvkZG1zDMTag==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@tsconfig/node14@1.0.3" = {
      type = "remote";
      version = "1.0.3";
      name = "@tsconfig/node14";
      src = {
        name = "node14-1.0.3.tgz";
        url = "https://registry.npmjs.org/@tsconfig/node14/-/node14-1.0.3.tgz";
        hash = "sha512-ysT8mhdixWK6Hw3i1V2AeRqZ5WfXg1G43mqoYlM2nc6388Fq5jcXyr5mRsqViLx/GJYdoL0bfXD8nmF+Zn/Iow==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@tsconfig/node16@1.0.4" = {
      type = "remote";
      version = "1.0.4";
      name = "@tsconfig/node16";
      src = {
        name = "node16-1.0.4.tgz";
        url = "https://registry.npmjs.org/@tsconfig/node16/-/node16-1.0.4.tgz";
        hash = "sha512-vxhUy4J8lyeyinH7Azl1pdd43GJhZH/tP2weN8TntQblOY+A0XbT8DJk1/oCPuOOyg/Ja757rG0CgHcWC8OfMA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/body-parser@1.19.2" = {
      type = "remote";
      version = "1.19.2";
      name = "@types/body-parser";
      src = {
        name = "body-parser-1.19.2.tgz";
        url = "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.2.tgz";
        hash = "sha512-ALYone6pm6QmwZoAgeyNksccT9Q4AWZQ6PvfwR37GT6r6FWUPguq6sUmNGSMV2Wr761oQoBxwGGa6DR5o1DC9g==";
      };
      dependencies = {
        "@types/connect" = "3.4.35";
        "@types/node" = "20.5.0";
      };
      peerDependencies = [];
    };
    "@types/chokidar@2.1.3" = {
      type = "remote";
      version = "2.1.3";
      name = "@types/chokidar";
      src = {
        name = "chokidar-2.1.3.tgz";
        url = "https://registry.npmjs.org/@types/chokidar/-/chokidar-2.1.3.tgz";
        hash = "sha512-6qK3xoLLAhQVTucQGHTySwOVA1crHRXnJeLwqK6KIFkkKa2aoMFXh+WEi8PotxDtvN6MQJLyYN9ag9P6NLV81w==";
      };
      dependencies = {
        "chokidar" = "3.5.3";
      };
      peerDependencies = [];
    };
    "@types/connect-pg-simple@7.0.0" = {
      type = "remote";
      version = "7.0.0";
      name = "@types/connect-pg-simple";
      src = {
        name = "connect-pg-simple-7.0.0.tgz";
        url = "https://registry.npmjs.org/@types/connect-pg-simple/-/connect-pg-simple-7.0.0.tgz";
        hash = "sha512-Sis1C3Ge9OSIropMARkq5dt6VDNzFi5z9eiw81qQP2EnPskGNMq+hzs1dJXUTI+q4GbEEXXUGIZQ7JWRC/Ljjw==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
        "@types/express-session" = "1.17.7";
        "@types/pg" = "8.6.6";
      };
      peerDependencies = [];
    };
    "@types/connect@3.4.35" = {
      type = "remote";
      version = "3.4.35";
      name = "@types/connect";
      src = {
        name = "connect-3.4.35.tgz";
        url = "https://registry.npmjs.org/@types/connect/-/connect-3.4.35.tgz";
        hash = "sha512-cdeYyv4KWoEgpBISTxWvqYsVy444DOqehiF3fM3ne10AmJ62RSyNkUnxMJXHQWRQQX2eR94m5y1IZyDwBjV9FQ==";
      };
      dependencies = {
        "@types/node" = "20.6.2";
      };
      peerDependencies = [];
    };
    "@types/cookie-parser@1.4.3" = {
      type = "remote";
      version = "1.4.3";
      name = "@types/cookie-parser";
      src = {
        name = "cookie-parser-1.4.3.tgz";
        url = "https://registry.npmjs.org/@types/cookie-parser/-/cookie-parser-1.4.3.tgz";
        hash = "sha512-CqSKwFwefj4PzZ5n/iwad/bow2hTCh0FlNAeWLtQM3JA/NX/iYagIpWG2cf1bQKQ2c9gU2log5VUCrn7LDOs0w==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
      };
      peerDependencies = [];
    };
    "@types/cors@2.8.13" = {
      type = "remote";
      version = "2.8.13";
      name = "@types/cors";
      src = {
        name = "cors-2.8.13.tgz";
        url = "https://registry.npmjs.org/@types/cors/-/cors-2.8.13.tgz";
        hash = "sha512-RG8AStHlUiV5ysZQKq97copd2UmVYw3/pRMLefISZ3S1hK104Cwm7iLQ3fTKx+lsUH2CE8FlLaYeEA2LSeqYUA==";
      };
      dependencies = {
        "@types/node" = "20.5.0";
      };
      peerDependencies = [];
    };
    "@types/express-serve-static-core@4.17.35" = {
      type = "remote";
      version = "4.17.35";
      name = "@types/express-serve-static-core";
      src = {
        name = "express-serve-static-core-4.17.35.tgz";
        url = "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.17.35.tgz";
        hash = "sha512-wALWQwrgiB2AWTT91CB62b6Yt0sNHpznUXeZEcnPU3DRdlDIz74x8Qg1UUYKSVFi+va5vKOLYRBI1bRKiLLKIg==";
      };
      dependencies = {
        "@types/node" = "20.5.0";
        "@types/qs" = "6.9.7";
        "@types/range-parser" = "1.2.4";
        "@types/send" = "0.17.1";
      };
      peerDependencies = [];
    };
    "@types/express-session@1.17.7" = {
      type = "remote";
      version = "1.17.7";
      name = "@types/express-session";
      src = {
        name = "express-session-1.17.7.tgz";
        url = "https://registry.npmjs.org/@types/express-session/-/express-session-1.17.7.tgz";
        hash = "sha512-L25080PBYoRLu472HY/HNCxaXY8AaGgqGC8/p/8+BYMhG0RDOLQ1wpXOpAzr4Gi5TGozTKyJv5BVODM5UNyVMw==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
      };
      peerDependencies = [];
    };
    "@types/express@4.17.17" = {
      type = "remote";
      version = "4.17.17";
      name = "@types/express";
      src = {
        name = "express-4.17.17.tgz";
        url = "https://registry.npmjs.org/@types/express/-/express-4.17.17.tgz";
        hash = "sha512-Q4FmmuLGBG58btUnfS1c1r/NQdlp3DMfGDGig8WhfpA2YRUtEkxAjkZb0yvplJGYdF1fsQ81iMDcH24sSCNC/Q==";
      };
      dependencies = {
        "@types/body-parser" = "1.19.2";
        "@types/express-serve-static-core" = "4.17.35";
        "@types/qs" = "6.9.7";
        "@types/serve-static" = "1.15.1";
      };
      peerDependencies = [];
    };
    "@types/glob@7.2.0" = {
      type = "remote";
      version = "7.2.0";
      name = "@types/glob";
      src = {
        name = "glob-7.2.0.tgz";
        url = "https://registry.npmjs.org/@types/glob/-/glob-7.2.0.tgz";
        hash = "sha512-ZUxbzKl0IfJILTS6t7ip5fQQM/J3TJYubDm3nMbgubNNYS62eXeUpoLUC8/7fJNiFYHTrGPQn7hspDUzIHX3UA==";
      };
      dependencies = {
        "@types/minimatch" = "5.1.2";
        "@types/node" = "20.6.2";
      };
      peerDependencies = [];
    };
    "@types/gradient-string@1.1.5" = {
      type = "remote";
      version = "1.1.5";
      name = "@types/gradient-string";
      src = {
        name = "gradient-string-1.1.5.tgz";
        url = "https://registry.npmjs.org/@types/gradient-string/-/gradient-string-1.1.5.tgz";
        hash = "sha512-Z2VPQ0q+IhrAO7XjJSjpDsoPc+CsCshRNah1IE9LCo/NzHMHylssvx73i0BAKzuaGj9cdhmgq9rLaietpYAbKQ==";
      };
      dependencies = {
        "@types/tinycolor2" = "1.4.6";
      };
      peerDependencies = [];
    };
    "@types/ink-divider@2.0.4" = {
      type = "remote";
      version = "2.0.4";
      name = "@types/ink-divider";
      src = {
        name = "ink-divider-2.0.4.tgz";
        url = "https://registry.npmjs.org/@types/ink-divider/-/ink-divider-2.0.4.tgz";
        hash = "sha512-9edcdEh7JMnkI0CZ4mI8xZ4Gc9cQO3v5+7peJvamWcvJVZKHzmEGorWdgeIu4o86QnwRP3k4Uipnxgh9ljx3iQ==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
      };
      peerDependencies = [];
    };
    "@types/ink-gradient@2.0.4" = {
      type = "remote";
      version = "2.0.4";
      name = "@types/ink-gradient";
      src = {
        name = "ink-gradient-2.0.4.tgz";
        url = "https://registry.npmjs.org/@types/ink-gradient/-/ink-gradient-2.0.4.tgz";
        hash = "sha512-cE89zTHJSYfqdSwmDuGQHVCmhpHHR6eciJ4hGYAA7HA+2d7NaTwGnrEGuAt6CFG83cxxa/D2/9IWFans5MneJw==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
      };
      peerDependencies = [];
    };
    "@types/jsonwebtoken@9.0.2" = {
      type = "remote";
      version = "9.0.2";
      name = "@types/jsonwebtoken";
      src = {
        name = "jsonwebtoken-9.0.2.tgz";
        url = "https://registry.npmjs.org/@types/jsonwebtoken/-/jsonwebtoken-9.0.2.tgz";
        hash = "sha512-drE6uz7QBKq1fYqqoFKTDRdFCPHd5TCub75BM+D+cMx7NU9hUz7SESLfC2fSCXVFMO5Yj8sOWHuGqPgjc+fz0Q==";
      };
      dependencies = {
        "@types/node" = "20.5.0";
      };
      peerDependencies = [];
    };
    "@types/mime@1.3.2" = {
      type = "remote";
      version = "1.3.2";
      name = "@types/mime";
      src = {
        name = "mime-1.3.2.tgz";
        url = "https://registry.npmjs.org/@types/mime/-/mime-1.3.2.tgz";
        hash = "sha512-YATxVxgRqNH6nHEIsvg6k2Boc1JHI9ZbH5iWFFv/MTkchz3b1ieGDa5T0a9RznNdI0KhVbdbWSN+KWWrQZRxTw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/mime@3.0.1" = {
      type = "remote";
      version = "3.0.1";
      name = "@types/mime";
      src = {
        name = "mime-3.0.1.tgz";
        url = "https://registry.npmjs.org/@types/mime/-/mime-3.0.1.tgz";
        hash = "sha512-Y4XFY5VJAuw0FgAqPNd6NNoV44jbq9Bz2L7Rh/J6jLTiHBSBJa9fxqQIvkIld4GsoDOcCbvzOUAbLPsSKKg+uA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/minimatch@5.1.2" = {
      type = "remote";
      version = "5.1.2";
      name = "@types/minimatch";
      src = {
        name = "minimatch-5.1.2.tgz";
        url = "https://registry.npmjs.org/@types/minimatch/-/minimatch-5.1.2.tgz";
        hash = "sha512-K0VQKziLUWkVKiRVrx4a40iPaxTUefQmjtkQofBkYRcoaaL/8rhwDWww9qWbrgicNOgnpIsMxyNIUM4+n6dUIA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/multer@1.4.7" = {
      type = "remote";
      version = "1.4.7";
      name = "@types/multer";
      src = {
        name = "multer-1.4.7.tgz";
        url = "https://registry.npmjs.org/@types/multer/-/multer-1.4.7.tgz";
        hash = "sha512-/SNsDidUFCvqqcWDwxv2feww/yqhNeTRL5CVoL3jU4Goc4kKEL10T7Eye65ZqPNi4HRx8sAEX59pV1aEH7drNA==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
      };
      peerDependencies = [];
    };
    "@types/node@14.18.63" = {
      type = "remote";
      version = "14.18.63";
      name = "@types/node";
      src = {
        name = "node-14.18.63.tgz";
        url = "https://registry.npmjs.org/@types/node/-/node-14.18.63.tgz";
        hash = "sha512-fAtCfv4jJg+ExtXhvCkCqUKZ+4ok/JQk01qDKhL5BDDoS3AxKXhV5/MAVUZyQnSEd2GT92fkgZl0pz0Q0AzcIQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/node@15.14.9" = {
      type = "remote";
      version = "15.14.9";
      name = "@types/node";
      src = {
        name = "node-15.14.9.tgz";
        url = "https://registry.npmjs.org/@types/node/-/node-15.14.9.tgz";
        hash = "sha512-qjd88DrCxupx/kJD5yQgZdcYKZKSIGBVDIBE1/LTGcNm3d2Np/jxojkdePDdfnBHJc5W7vSMpbJ1aB7p/Py69A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/node@20.5.0" = {
      type = "remote";
      version = "20.5.0";
      name = "@types/node";
      src = {
        name = "node-20.5.0.tgz";
        url = "https://registry.npmjs.org/@types/node/-/node-20.5.0.tgz";
        hash = "sha512-Mgq7eCtoTjT89FqNoTzzXg2XvCi5VMhRV6+I2aYanc6kQCBImeNaAYRs/DyoVqk1YEUJK5gN9VO7HRIdz4Wo3Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/node@20.6.2" = {
      type = "remote";
      version = "20.6.2";
      name = "@types/node";
      src = {
        name = "node-20.6.2.tgz";
        url = "https://registry.npmjs.org/@types/node/-/node-20.6.2.tgz";
        hash = "sha512-Y+/1vGBHV/cYk6OI1Na/LHzwnlNCAfU3ZNGrc1LdRe/LAIbdDPTTv/HU3M7yXN448aTVDq3eKRm2cg7iKLb8gw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/passport-local@1.0.35" = {
      type = "remote";
      version = "1.0.35";
      name = "@types/passport-local";
      src = {
        name = "passport-local-1.0.35.tgz";
        url = "https://registry.npmjs.org/@types/passport-local/-/passport-local-1.0.35.tgz";
        hash = "sha512-K4eLTJ8R0yYW8TvCqkjB0pTKoqfUSdl5PfZdidTjV2ETV3604fQxtY6BHKjQWAx50WUS0lqzBvKv3LoI1ZBPeA==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
        "@types/passport" = "1.0.12";
        "@types/passport-strategy" = "0.2.35";
      };
      peerDependencies = [];
    };
    "@types/passport-strategy@0.2.35" = {
      type = "remote";
      version = "0.2.35";
      name = "@types/passport-strategy";
      src = {
        name = "passport-strategy-0.2.35.tgz";
        url = "https://registry.npmjs.org/@types/passport-strategy/-/passport-strategy-0.2.35.tgz";
        hash = "sha512-o5D19Jy2XPFoX2rKApykY15et3Apgax00RRLf0RUotPDUsYrQa7x4howLYr9El2mlUApHmCMv5CZ1IXqKFQ2+g==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
        "@types/passport" = "1.0.12";
      };
      peerDependencies = [];
    };
    "@types/passport@1.0.12" = {
      type = "remote";
      version = "1.0.12";
      name = "@types/passport";
      src = {
        name = "passport-1.0.12.tgz";
        url = "https://registry.npmjs.org/@types/passport/-/passport-1.0.12.tgz";
        hash = "sha512-QFdJ2TiAEoXfEQSNDISJR1Tm51I78CymqcBa8imbjo6dNNu+l2huDxxbDEIoFIwOSKMkOfHEikyDuZ38WwWsmw==";
      };
      dependencies = {
        "@types/express" = "4.17.17";
      };
      peerDependencies = [];
    };
    "@types/pg@8.6.6" = {
      type = "remote";
      version = "8.6.6";
      name = "@types/pg";
      src = {
        name = "pg-8.6.6.tgz";
        url = "https://registry.npmjs.org/@types/pg/-/pg-8.6.6.tgz";
        hash = "sha512-O2xNmXebtwVekJDD+02udOncjVcMZQuTEQEMpKJ0ZRf5E7/9JJX3izhKUcUifBkyKpljyUM6BTgy2trmviKlpw==";
      };
      dependencies = {
        "@types/node" = "20.5.0";
        "pg-protocol" = "1.6.0";
        "pg-types" = "2.2.0";
      };
      peerDependencies = [];
    };
    "@types/prop-types@15.7.5" = {
      type = "remote";
      version = "15.7.5";
      name = "@types/prop-types";
      src = {
        name = "prop-types-15.7.5.tgz";
        url = "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.5.tgz";
        hash = "sha512-JCB8C6SnDoQf0cNycqd/35A7MjcnK+ZTqE7judS6o7utxUCg6imJg3QK2qzHKszlTjcj2cn+NwMB2i96ubpj7w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/qs@6.9.7" = {
      type = "remote";
      version = "6.9.7";
      name = "@types/qs";
      src = {
        name = "qs-6.9.7.tgz";
        url = "https://registry.npmjs.org/@types/qs/-/qs-6.9.7.tgz";
        hash = "sha512-FGa1F62FT09qcrueBA6qYTrJPVDzah9a+493+o2PCXsesWHIn27G98TsSMs3WPNbZIEj4+VJf6saSFpvD+3Zsw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/range-parser@1.2.4" = {
      type = "remote";
      version = "1.2.4";
      name = "@types/range-parser";
      src = {
        name = "range-parser-1.2.4.tgz";
        url = "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.4.tgz";
        hash = "sha512-EEhsLsD6UsDM1yFhAvy0Cjr6VwmpMWqFBCb9w07wVugF7w9nfajxLuVmngTIpgS6svCnm6Vaw+MZhoDCKnOfsw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/react-dom@18.2.4" = {
      type = "remote";
      version = "18.2.4";
      name = "@types/react-dom";
      src = {
        name = "react-dom-18.2.4.tgz";
        url = "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.2.4.tgz";
        hash = "sha512-G2mHoTMTL4yoydITgOGwWdWMVd8sNgyEP85xVmMKAPUBwQWm9wBPQUmvbeF4V3WBY1P7mmL4BkjQ0SqUpf1snw==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
      };
      peerDependencies = [];
    };
    "@types/react@17.0.59" = {
      type = "remote";
      version = "17.0.59";
      name = "@types/react";
      src = {
        name = "react-17.0.59.tgz";
        url = "https://registry.npmjs.org/@types/react/-/react-17.0.59.tgz";
        hash = "sha512-gSON5zWYIGyoBcycCE75E9+r6dCC2dHdsrVkOEiIYNU5+Q28HcBAuqvDuxHcCbMfHBHdeT5Tva/AFn3rnMKE4g==";
      };
      dependencies = {
        "@types/prop-types" = "15.7.5";
        "@types/scheduler" = "0.16.3";
        "csstype" = "3.1.2";
      };
      peerDependencies = [];
    };
    "@types/react@18.2.21" = {
      type = "remote";
      version = "18.2.21";
      name = "@types/react";
      src = {
        name = "react-18.2.21.tgz";
        url = "https://registry.npmjs.org/@types/react/-/react-18.2.21.tgz";
        hash = "sha512-neFKG/sBAwGxHgXiIxnbm3/AAVQ/cMRS93hvBpg8xYRbeQSPVABp9U2bRnPf0iI4+Ucdv3plSxKK+3CW2ENJxA==";
      };
      dependencies = {
        "@types/prop-types" = "15.7.5";
        "@types/scheduler" = "0.16.3";
        "csstype" = "3.1.2";
      };
      peerDependencies = [];
    };
    "@types/scheduler@0.16.3" = {
      type = "remote";
      version = "0.16.3";
      name = "@types/scheduler";
      src = {
        name = "scheduler-0.16.3.tgz";
        url = "https://registry.npmjs.org/@types/scheduler/-/scheduler-0.16.3.tgz";
        hash = "sha512-5cJ8CB4yAx7BH1oMvdU0Jh9lrEXyPkar6F9G/ERswkCuvP4KQZfZkSjcMbAICCpQTN4OuZn8tz0HiKv9TGZgrQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/send@0.17.1" = {
      type = "remote";
      version = "0.17.1";
      name = "@types/send";
      src = {
        name = "send-0.17.1.tgz";
        url = "https://registry.npmjs.org/@types/send/-/send-0.17.1.tgz";
        hash = "sha512-Cwo8LE/0rnvX7kIIa3QHCkcuF21c05Ayb0ZfxPiv0W8VRiZiNW/WuRupHKpqqGVGf7SUA44QSOUKaEd9lIrd/Q==";
      };
      dependencies = {
        "@types/mime" = "1.3.2";
        "@types/node" = "20.6.2";
      };
      peerDependencies = [];
    };
    "@types/serve-static@1.15.1" = {
      type = "remote";
      version = "1.15.1";
      name = "@types/serve-static";
      src = {
        name = "serve-static-1.15.1.tgz";
        url = "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.1.tgz";
        hash = "sha512-NUo5XNiAdULrJENtJXZZ3fHtfMolzZwczzBbnAeBbqBwG+LaG6YaJtuwzwGSQZ2wsCrxjEhNNjAkKigy3n8teQ==";
      };
      dependencies = {
        "@types/mime" = "3.0.1";
        "@types/node" = "20.5.0";
      };
      peerDependencies = [];
    };
    "@types/tinycolor2@1.4.6" = {
      type = "remote";
      version = "1.4.6";
      name = "@types/tinycolor2";
      src = {
        name = "tinycolor2-1.4.6.tgz";
        url = "https://registry.npmjs.org/@types/tinycolor2/-/tinycolor2-1.4.6.tgz";
        hash = "sha512-iEN8J0BoMnsWBqjVbWH/c0G0Hh7O21lpR2/+PrvAVgWdzL7eexIFm4JN/Wn10PTcmNdtS6U67r499mlWMXOxNw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/yargs-parser@21.0.3" = {
      type = "remote";
      version = "21.0.3";
      name = "@types/yargs-parser";
      src = {
        name = "yargs-parser-21.0.3.tgz";
        url = "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-21.0.3.tgz";
        hash = "sha512-I4q9QU9MQv4oEOz4tAHJtNz1cwuLxn2F3xcc2iV5WdqLPpUnj30aUuxt1mAxYTG+oe8CZMV/+6rU4S4gRDzqtQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/yargs@16.0.9" = {
      type = "remote";
      version = "16.0.9";
      name = "@types/yargs";
      src = {
        name = "yargs-16.0.9.tgz";
        url = "https://registry.npmjs.org/@types/yargs/-/yargs-16.0.9.tgz";
        hash = "sha512-tHhzvkFXZQeTECenFoRljLBYPZJ7jAVxqqtEI0qTLOmuultnFp4I9yKE17vTuhf7BkhCu7I4XuemPgikDVuYqA==";
      };
      dependencies = {
        "@types/yargs-parser" = "21.0.3";
      };
      peerDependencies = [];
    };
    "@types/yoga-layout@1.9.2" = {
      type = "remote";
      version = "1.9.2";
      name = "@types/yoga-layout";
      src = {
        name = "yoga-layout-1.9.2.tgz";
        url = "https://registry.npmjs.org/@types/yoga-layout/-/yoga-layout-1.9.2.tgz";
        hash = "sha512-S9q47ByT2pPvD65IvrWp7qppVMpk9WGMbVq9wbWZOHg6tnXSD4vyhao6nOSBwwfDdV2p3Kx9evA9vI+XWTfDvw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@vitejs/plugin-react@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "@vitejs/plugin-react";
      src = {
        name = "plugin-react-3.1.0.tgz";
        url = "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-3.1.0.tgz";
        hash = "sha512-AfgcRL8ZBhAlc3BFdigClmTUMISmmzHn7sB2h9U1odvc5U/MjWXsAaz18b/WoppUTDBzxOJwo2VdClfUcItu9g==";
      };
      dependencies = {
        "@babel/core" = "7.21.8";
        "@babel/plugin-transform-react-jsx-self" = "7.21.0";
        "@babel/plugin-transform-react-jsx-source" = "7.19.6";
        "magic-string" = "0.27.0";
        "react-refresh" = "0.14.0";
        "vite" = "4.3.5";
      };
      peerDependencies = [
        "vite"
      ];
    };
    "abbrev@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "abbrev";
      src = {
        name = "abbrev-1.1.1.tgz";
        url = "https://registry.npmjs.org/abbrev/-/abbrev-1.1.1.tgz";
        hash = "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "accepts@1.3.8" = {
      type = "remote";
      version = "1.3.8";
      name = "accepts";
      src = {
        name = "accepts-1.3.8.tgz";
        url = "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz";
        hash = "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==";
      };
      dependencies = {
        "mime-types" = "2.1.35";
        "negotiator" = "0.6.3";
      };
      peerDependencies = [];
    };
    "acorn-walk@8.2.0" = {
      type = "remote";
      version = "8.2.0";
      name = "acorn-walk";
      src = {
        name = "acorn-walk-8.2.0.tgz";
        url = "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.2.0.tgz";
        hash = "sha512-k+iyHEuPgSw6SbuDpGQM+06HQUa04DZ3o+F6CSzXMvvI5KMvnaEqXe+YVe555R9nn6GPt404fos4wcgpw12SDA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "acorn@8.8.2" = {
      type = "remote";
      version = "8.8.2";
      name = "acorn";
      src = {
        name = "acorn-8.8.2.tgz";
        url = "https://registry.npmjs.org/acorn/-/acorn-8.8.2.tgz";
        hash = "sha512-xjIYgE8HBrkpd/sJqOGNspf8uHG+NOHGOw6a/Urj8taM2EXfdNAH2oFcPeIFfsv3+kz/mJrS5VuMqbNLjCa2vw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ansi-escapes@4.3.2" = {
      type = "remote";
      version = "4.3.2";
      name = "ansi-escapes";
      src = {
        name = "ansi-escapes-4.3.2.tgz";
        url = "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.2.tgz";
        hash = "sha512-gKXj5ALrKWQLsYG9jlTRmR/xKluxHV+Z9QEwNIgCfM1/uwPMCuzVVnh5mwTd+OuBZcwSIMbqssNWRm1lE51QaQ==";
      };
      dependencies = {
        "type-fest" = "0.21.3";
      };
      peerDependencies = [];
    };
    "ansi-regex@5.0.1" = {
      type = "remote";
      version = "5.0.1";
      name = "ansi-regex";
      src = {
        name = "ansi-regex-5.0.1.tgz";
        url = "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz";
        hash = "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ansi-styles@3.2.1" = {
      type = "remote";
      version = "3.2.1";
      name = "ansi-styles";
      src = {
        name = "ansi-styles-3.2.1.tgz";
        url = "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz";
        hash = "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==";
      };
      dependencies = {
        "color-convert" = "1.9.3";
      };
      peerDependencies = [];
    };
    "ansi-styles@4.3.0" = {
      type = "remote";
      version = "4.3.0";
      name = "ansi-styles";
      src = {
        name = "ansi-styles-4.3.0.tgz";
        url = "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz";
        hash = "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==";
      };
      dependencies = {
        "color-convert" = "2.0.1";
      };
      peerDependencies = [];
    };
    "any-promise@1.3.0" = {
      type = "remote";
      version = "1.3.0";
      name = "any-promise";
      src = {
        name = "any-promise-1.3.0.tgz";
        url = "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz";
        hash = "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "anymatch@3.1.3" = {
      type = "remote";
      version = "3.1.3";
      name = "anymatch";
      src = {
        name = "anymatch-3.1.3.tgz";
        url = "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz";
        hash = "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==";
      };
      dependencies = {
        "normalize-path" = "3.0.0";
        "picomatch" = "2.3.1";
      };
      peerDependencies = [];
    };
    "append-field@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "append-field";
      src = {
        name = "append-field-1.0.0.tgz";
        url = "https://registry.npmjs.org/append-field/-/append-field-1.0.0.tgz";
        hash = "sha512-klpgFSWLW1ZEs8svjfb7g4qWY0YS5imI82dTg+QahUvJ8YqAY0P10Uk8tTyh9ZGuYEZEMaeJYCF5BFuX552hsw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "arg@4.1.3" = {
      type = "remote";
      version = "4.1.3";
      name = "arg";
      src = {
        name = "arg-4.1.3.tgz";
        url = "https://registry.npmjs.org/arg/-/arg-4.1.3.tgz";
        hash = "sha512-58S9QDqG0Xx27YwPSt9fJxivjYl432YCwfDMfZ+71RAqUrZef7LrKQZ3LHLOwCS4FLNBplP533Zx895SeOCHvA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "arg@5.0.2" = {
      type = "remote";
      version = "5.0.2";
      name = "arg";
      src = {
        name = "arg-5.0.2.tgz";
        url = "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz";
        hash = "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "array-flatten@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "array-flatten";
      src = {
        name = "array-flatten-1.1.1.tgz";
        url = "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz";
        hash = "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "astral-regex@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "astral-regex";
      src = {
        name = "astral-regex-2.0.0.tgz";
        url = "https://registry.npmjs.org/astral-regex/-/astral-regex-2.0.0.tgz";
        hash = "sha512-Z7tMw1ytTXt5jqMcOP+OQteU1VuNK9Y02uuJtKQ1Sv69jXQKKg5cibLwGJow8yzZP+eAc18EmLGPal0bp36rvQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "auto-bind@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "auto-bind";
      src = {
        name = "auto-bind-4.0.0.tgz";
        url = "https://registry.npmjs.org/auto-bind/-/auto-bind-4.0.0.tgz";
        hash = "sha512-Hdw8qdNiqdJ8LqT0iK0sVzkFbzg6fhnQqqfWhBDxcHZvU75+B+ayzTy8x+k5Ix0Y92XOhOUlx74ps+bA6BeYMQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "autoprefixer@10.4.15" = {
      type = "remote";
      version = "10.4.15";
      name = "autoprefixer";
      src = {
        name = "autoprefixer-10.4.15.tgz";
        url = "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.15.tgz";
        hash = "sha512-KCuPB8ZCIqFdA4HwKXsvz7j6gvSDNhDP7WnUjBleRkKjPdvCmHFuQ77ocavI8FT6NdvlBnE2UFr2H4Mycn8Vew==";
      };
      dependencies = {
        "browserslist" = "4.21.10";
        "caniuse-lite" = "1.0.30001529";
        "fraction.js" = "4.3.6";
        "normalize-range" = "0.1.2";
        "picocolors" = "1.0.0";
        "postcss" = "8.4.29";
        "postcss-value-parser" = "4.2.0";
      };
      peerDependencies = [
        "postcss"
      ];
    };
    "balanced-match@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "balanced-match";
      src = {
        name = "balanced-match-1.0.2.tgz";
        url = "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz";
        hash = "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "binary-extensions@2.2.0" = {
      type = "remote";
      version = "2.2.0";
      name = "binary-extensions";
      src = {
        name = "binary-extensions-2.2.0.tgz";
        url = "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz";
        hash = "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "body-parser@1.20.1" = {
      type = "remote";
      version = "1.20.1";
      name = "body-parser";
      src = {
        name = "body-parser-1.20.1.tgz";
        url = "https://registry.npmjs.org/body-parser/-/body-parser-1.20.1.tgz";
        hash = "sha512-jWi7abTbYwajOytWCQc37VulmWiRae5RyTpaCyDcS5/lMdtwSz5lOpDE67srw/HYe35f1z3fDQw+3txg7gNtWw==";
      };
      dependencies = {
        "bytes" = "3.1.2";
        "content-type" = "1.0.5";
        "debug" = "2.6.9";
        "depd" = "2.0.0";
        "destroy" = "1.2.0";
        "http-errors" = "2.0.0";
        "iconv-lite" = "0.4.24";
        "on-finished" = "2.4.1";
        "qs" = "6.11.0";
        "raw-body" = "2.5.1";
        "type-is" = "1.6.18";
        "unpipe" = "1.0.0";
      };
      peerDependencies = [];
    };
    "brace-expansion@1.1.11" = {
      type = "remote";
      version = "1.1.11";
      name = "brace-expansion";
      src = {
        name = "brace-expansion-1.1.11.tgz";
        url = "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz";
        hash = "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==";
      };
      dependencies = {
        "balanced-match" = "1.0.2";
        "concat-map" = "0.0.1";
      };
      peerDependencies = [];
    };
    "braces@3.0.2" = {
      type = "remote";
      version = "3.0.2";
      name = "braces";
      src = {
        name = "braces-3.0.2.tgz";
        url = "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz";
        hash = "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==";
      };
      dependencies = {
        "fill-range" = "7.0.1";
      };
      peerDependencies = [];
    };
    "browserslist@4.21.10" = {
      type = "remote";
      version = "4.21.10";
      name = "browserslist";
      src = {
        name = "browserslist-4.21.10.tgz";
        url = "https://registry.npmjs.org/browserslist/-/browserslist-4.21.10.tgz";
        hash = "sha512-bipEBdZfVH5/pwrvqc+Ub0kUPVfGUhlKxbvfD+z1BDnPEO/X98ruXGA1WP5ASpAFKan7Qr6j736IacbZQuAlKQ==";
      };
      dependencies = {
        "caniuse-lite" = "1.0.30001529";
        "electron-to-chromium" = "1.4.512";
        "node-releases" = "2.0.13";
        "update-browserslist-db" = "1.0.11";
      };
      peerDependencies = [];
    };
    "buffer-equal-constant-time@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "buffer-equal-constant-time";
      src = {
        name = "buffer-equal-constant-time-1.0.1.tgz";
        url = "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz";
        hash = "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "buffer-from@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "buffer-from";
      src = {
        name = "buffer-from-1.1.2.tgz";
        url = "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz";
        hash = "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "buffer-writer@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "buffer-writer";
      src = {
        name = "buffer-writer-2.0.0.tgz";
        url = "https://registry.npmjs.org/buffer-writer/-/buffer-writer-2.0.0.tgz";
        hash = "sha512-a7ZpuTZU1TRtnwyCNW3I5dc0wWNC3VR9S++Ewyk2HHZdrO3CQJqSpd+95Us590V6AL7JqUAH2IwZ/398PmNFgw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "busboy@1.6.0" = {
      type = "remote";
      version = "1.6.0";
      name = "busboy";
      src = {
        name = "busboy-1.6.0.tgz";
        url = "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz";
        hash = "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==";
      };
      dependencies = {
        "streamsearch" = "1.1.0";
      };
      peerDependencies = [];
    };
    "bytes@3.1.2" = {
      type = "remote";
      version = "3.1.2";
      name = "bytes";
      src = {
        name = "bytes-3.1.2.tgz";
        url = "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz";
        hash = "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "call-bind@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "call-bind";
      src = {
        name = "call-bind-1.0.2.tgz";
        url = "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz";
        hash = "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==";
      };
      dependencies = {
        "function-bind" = "1.1.1";
        "get-intrinsic" = "1.2.1";
      };
      peerDependencies = [];
    };
    "camelcase-css@2.0.1" = {
      type = "remote";
      version = "2.0.1";
      name = "camelcase-css";
      src = {
        name = "camelcase-css-2.0.1.tgz";
        url = "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz";
        hash = "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "caniuse-lite@1.0.30001529" = {
      type = "remote";
      version = "1.0.30001529";
      name = "caniuse-lite";
      src = {
        name = "caniuse-lite-1.0.30001529.tgz";
        url = "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001529.tgz";
        hash = "sha512-n2pUQYGAkrLG4QYj2desAh+NqsJpHbNmVZz87imptDdxLAtjxary7Df/psdfyDGmskJK/9Dt9cPnx5RZ3CU4Og==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "chalk@2.4.2" = {
      type = "remote";
      version = "2.4.2";
      name = "chalk";
      src = {
        name = "chalk-2.4.2.tgz";
        url = "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz";
        hash = "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==";
      };
      dependencies = {
        "ansi-styles" = "3.2.1";
        "escape-string-regexp" = "1.0.5";
        "supports-color" = "5.5.0";
      };
      peerDependencies = [];
    };
    "chalk@4.1.2" = {
      type = "remote";
      version = "4.1.2";
      name = "chalk";
      src = {
        name = "chalk-4.1.2.tgz";
        url = "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz";
        hash = "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==";
      };
      dependencies = {
        "ansi-styles" = "4.3.0";
        "supports-color" = "7.2.0";
      };
      peerDependencies = [];
    };
    "chokidar@3.5.3" = {
      type = "remote";
      version = "3.5.3";
      name = "chokidar";
      src = {
        name = "chokidar-3.5.3.tgz";
        url = "https://registry.npmjs.org/chokidar/-/chokidar-3.5.3.tgz";
        hash = "sha512-Dr3sfKRP6oTcjf2JmUmFJfeVMvXBdegxB0iVQ5eb2V10uFJUCAS8OByZdVAyVb8xXNz3GjjTgj9kLWsZTqE6kw==";
      };
      dependencies = {
        "anymatch" = "3.1.3";
        "braces" = "3.0.2";
        "glob-parent" = "5.1.2";
        "is-binary-path" = "2.1.0";
        "is-glob" = "4.0.3";
        "normalize-path" = "3.0.0";
        "readdirp" = "3.6.0";
      };
      peerDependencies = [];
    };
    "ci-info@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "ci-info";
      src = {
        name = "ci-info-2.0.0.tgz";
        url = "https://registry.npmjs.org/ci-info/-/ci-info-2.0.0.tgz";
        hash = "sha512-5tK7EtrZ0N+OLFMthtqOj4fI2Jeb88C4CAZPu25LDVUgXJ0A3Js4PMGqrn0JU1W0Mh1/Z8wZzYPxqUrXeBboCQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cli-boxes@2.2.1" = {
      type = "remote";
      version = "2.2.1";
      name = "cli-boxes";
      src = {
        name = "cli-boxes-2.2.1.tgz";
        url = "https://registry.npmjs.org/cli-boxes/-/cli-boxes-2.2.1.tgz";
        hash = "sha512-y4coMcylgSCdVinjiDBuR8PCC2bLjyGTwEmPb9NHR/QaNU6EUOXcTY/s6VjGMD6ENSEaeQYHCY0GNGS5jfMwPw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cli-cursor@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "cli-cursor";
      src = {
        name = "cli-cursor-3.1.0.tgz";
        url = "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz";
        hash = "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==";
      };
      dependencies = {
        "restore-cursor" = "3.1.0";
      };
      peerDependencies = [];
    };
    "cli-spinners@2.9.2" = {
      type = "remote";
      version = "2.9.2";
      name = "cli-spinners";
      src = {
        name = "cli-spinners-2.9.2.tgz";
        url = "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz";
        hash = "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cli-truncate@2.1.0" = {
      type = "remote";
      version = "2.1.0";
      name = "cli-truncate";
      src = {
        name = "cli-truncate-2.1.0.tgz";
        url = "https://registry.npmjs.org/cli-truncate/-/cli-truncate-2.1.0.tgz";
        hash = "sha512-n8fOixwDD6b/ObinzTrp1ZKFzbgvKZvuz/TvejnLn1aQfC6r52XEx85FmuC+3HI+JM7coBRXUvNqEU2PHVrHpg==";
      };
      dependencies = {
        "slice-ansi" = "3.0.0";
        "string-width" = "4.2.3";
      };
      peerDependencies = [];
    };
    "cliui@7.0.4" = {
      type = "remote";
      version = "7.0.4";
      name = "cliui";
      src = {
        name = "cliui-7.0.4.tgz";
        url = "https://registry.npmjs.org/cliui/-/cliui-7.0.4.tgz";
        hash = "sha512-OcRE68cOsVMXp1Yvonl/fzkQOyjLSu/8bhPDfQt0e0/Eb283TKP20Fs2MqoPsr9SwA595rRCA+QMzYc9nBP+JQ==";
      };
      dependencies = {
        "string-width" = "4.2.3";
        "strip-ansi" = "6.0.1";
        "wrap-ansi" = "7.0.0";
      };
      peerDependencies = [];
    };
    "cluster-key-slot@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "cluster-key-slot";
      src = {
        name = "cluster-key-slot-1.1.2.tgz";
        url = "https://registry.npmjs.org/cluster-key-slot/-/cluster-key-slot-1.1.2.tgz";
        hash = "sha512-RMr0FhtfXemyinomL4hrWcYJxmX6deFdCxpJzhDttxgO1+bcCnkk+9drydLVDmAMG7NE6aN/fl4F7ucU/90gAA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "code-excerpt@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "code-excerpt";
      src = {
        name = "code-excerpt-3.0.0.tgz";
        url = "https://registry.npmjs.org/code-excerpt/-/code-excerpt-3.0.0.tgz";
        hash = "sha512-VHNTVhd7KsLGOqfX3SyeO8RyYPMp1GJOg194VITk04WMYCv4plV68YWe6TJZxd9MhobjtpMRnVky01gqZsalaw==";
      };
      dependencies = {
        "convert-to-spaces" = "1.0.2";
      };
      peerDependencies = [];
    };
    "color-convert@1.9.3" = {
      type = "remote";
      version = "1.9.3";
      name = "color-convert";
      src = {
        name = "color-convert-1.9.3.tgz";
        url = "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz";
        hash = "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==";
      };
      dependencies = {
        "color-name" = "1.1.3";
      };
      peerDependencies = [];
    };
    "color-convert@2.0.1" = {
      type = "remote";
      version = "2.0.1";
      name = "color-convert";
      src = {
        name = "color-convert-2.0.1.tgz";
        url = "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz";
        hash = "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==";
      };
      dependencies = {
        "color-name" = "1.1.4";
      };
      peerDependencies = [];
    };
    "color-name@1.1.3" = {
      type = "remote";
      version = "1.1.3";
      name = "color-name";
      src = {
        name = "color-name-1.1.3.tgz";
        url = "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz";
        hash = "sha512-72fSenhMw2HZMTVHeCA9KCmpEIbzWiQsjN+BHcBbS9vr1mtt+vJjPdksIBNUmKAW8TFUDPJK5SUU3QhE9NEXDw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "color-name@1.1.4" = {
      type = "remote";
      version = "1.1.4";
      name = "color-name";
      src = {
        name = "color-name-1.1.4.tgz";
        url = "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz";
        hash = "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "colord@2.9.3" = {
      type = "remote";
      version = "2.9.3";
      name = "colord";
      src = {
        name = "colord-2.9.3.tgz";
        url = "https://registry.npmjs.org/colord/-/colord-2.9.3.tgz";
        hash = "sha512-jeC1axXpnb0/2nn/Y1LPuLdgXBLH7aDcHu4KEKfqw3CUhX7ZpfBSlPKyqXE6btIgEzfWtrX3/tyBCaCvXvMkOw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "commander@4.1.1" = {
      type = "remote";
      version = "4.1.1";
      name = "commander";
      src = {
        name = "commander-4.1.1.tgz";
        url = "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz";
        hash = "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "concat-map@0.0.1" = {
      type = "remote";
      version = "0.0.1";
      name = "concat-map";
      src = {
        name = "concat-map-0.0.1.tgz";
        url = "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz";
        hash = "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "concat-stream@1.6.2" = {
      type = "remote";
      version = "1.6.2";
      name = "concat-stream";
      src = {
        name = "concat-stream-1.6.2.tgz";
        url = "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz";
        hash = "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==";
      };
      dependencies = {
        "buffer-from" = "1.1.2";
        "inherits" = "2.0.4";
        "readable-stream" = "2.3.8";
        "typedarray" = "0.0.6";
      };
      peerDependencies = [];
    };
    "connect-pg-simple@8.0.0" = {
      type = "remote";
      version = "8.0.0";
      name = "connect-pg-simple";
      src = {
        name = "connect-pg-simple-8.0.0.tgz";
        url = "https://registry.npmjs.org/connect-pg-simple/-/connect-pg-simple-8.0.0.tgz";
        hash = "sha512-pBDa23RA1LCkwvRrPOh5xevB+Nknh1UDuhFOKsUrkUDodYqfiQT18P2qXc4lk/TqCMB6hI06B8KNncHh91bZMQ==";
      };
      dependencies = {
        "@types/pg" = "8.6.6";
        "pg" = "8.10.0";
      };
      peerDependencies = [];
    };
    "connect-redis@7.1.0" = {
      type = "remote";
      version = "7.1.0";
      name = "connect-redis";
      src = {
        name = "connect-redis-7.1.0.tgz";
        url = "https://registry.npmjs.org/connect-redis/-/connect-redis-7.1.0.tgz";
        hash = "sha512-UaqO1EirWjON2ENsyau7N5lbkrdYBpS6mYlXSeff/OYXsd6EGZ+SXSmNPoljL2PSua8fgjAEaldSA73PMZQ9Eg==";
      };
      dependencies = {
        "express-session" = "1.17.3";
      };
      peerDependencies = [
        "express-session"
      ];
    };
    "content-disposition@0.5.4" = {
      type = "remote";
      version = "0.5.4";
      name = "content-disposition";
      src = {
        name = "content-disposition-0.5.4.tgz";
        url = "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz";
        hash = "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==";
      };
      dependencies = {
        "safe-buffer" = "5.2.1";
      };
      peerDependencies = [];
    };
    "content-type@1.0.5" = {
      type = "remote";
      version = "1.0.5";
      name = "content-type";
      src = {
        name = "content-type-1.0.5.tgz";
        url = "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz";
        hash = "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "convert-source-map@1.9.0" = {
      type = "remote";
      version = "1.9.0";
      name = "convert-source-map";
      src = {
        name = "convert-source-map-1.9.0.tgz";
        url = "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.9.0.tgz";
        hash = "sha512-ASFBup0Mz1uyiIjANan1jzLQami9z1PoYSZCiiYW2FczPbenXc45FZdBZLzOT+r6+iciuEModtmCti+hjaAk0A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "convert-to-spaces@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "convert-to-spaces";
      src = {
        name = "convert-to-spaces-1.0.2.tgz";
        url = "https://registry.npmjs.org/convert-to-spaces/-/convert-to-spaces-1.0.2.tgz";
        hash = "sha512-cj09EBuObp9gZNQCzc7hByQyrs6jVGE+o9kSJmeUoj+GiPiJvi5LYqEH/Hmme4+MTLHM+Ejtq+FChpjjEnsPdQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cookie-parser@1.4.6" = {
      type = "remote";
      version = "1.4.6";
      name = "cookie-parser";
      src = {
        name = "cookie-parser-1.4.6.tgz";
        url = "https://registry.npmjs.org/cookie-parser/-/cookie-parser-1.4.6.tgz";
        hash = "sha512-z3IzaNjdwUC2olLIB5/ITd0/setiaFMLYiZJle7xg5Fe9KWAceil7xszYfHHBtDFYLSgJduS2Ty0P1uJdPDJeA==";
      };
      dependencies = {
        "cookie" = "0.4.1";
        "cookie-signature" = "1.0.6";
      };
      peerDependencies = [];
    };
    "cookie-signature@1.0.6" = {
      type = "remote";
      version = "1.0.6";
      name = "cookie-signature";
      src = {
        name = "cookie-signature-1.0.6.tgz";
        url = "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz";
        hash = "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cookie@0.4.1" = {
      type = "remote";
      version = "0.4.1";
      name = "cookie";
      src = {
        name = "cookie-0.4.1.tgz";
        url = "https://registry.npmjs.org/cookie/-/cookie-0.4.1.tgz";
        hash = "sha512-ZwrFkGJxUR3EIoXtO+yVE69Eb7KlixbaeAWfBQB9vVsNn/o+Yw69gBWSSDK825hQNdN+wF8zELf3dFNl/kxkUA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cookie@0.4.2" = {
      type = "remote";
      version = "0.4.2";
      name = "cookie";
      src = {
        name = "cookie-0.4.2.tgz";
        url = "https://registry.npmjs.org/cookie/-/cookie-0.4.2.tgz";
        hash = "sha512-aSWTXFzaKWkvHO1Ny/s+ePFpvKsPnjc551iI41v3ny/ow6tBG5Vd+FuqGNhh1LxOmVzOlGUriIlOaokOvhaStA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cookie@0.5.0" = {
      type = "remote";
      version = "0.5.0";
      name = "cookie";
      src = {
        name = "cookie-0.5.0.tgz";
        url = "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz";
        hash = "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "core-util-is@1.0.3" = {
      type = "remote";
      version = "1.0.3";
      name = "core-util-is";
      src = {
        name = "core-util-is-1.0.3.tgz";
        url = "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.3.tgz";
        hash = "sha512-ZQBvi1DcpJ4GDqanjucZ2Hj3wEO5pZDS89BWbkcrvdxksJorwUDDZamX9ldFkp9aw2lmBDLgkObEA4DWNJ9FYQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "cors@2.8.5" = {
      type = "remote";
      version = "2.8.5";
      name = "cors";
      src = {
        name = "cors-2.8.5.tgz";
        url = "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz";
        hash = "sha512-KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==";
      };
      dependencies = {
        "object-assign" = "4.1.1";
        "vary" = "1.1.2";
      };
      peerDependencies = [];
    };
    "create-require@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "create-require";
      src = {
        name = "create-require-1.1.1.tgz";
        url = "https://registry.npmjs.org/create-require/-/create-require-1.1.1.tgz";
        hash = "sha512-dcKFX3jn0MpIaXjisoRvexIJVEKzaq7z2rZKxf+MSr9TkdmHmsU4m2lcLojrj/FHl8mk5VxMmYA+ftRkP/3oKQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "css-selector-tokenizer@0.8.0" = {
      type = "remote";
      version = "0.8.0";
      name = "css-selector-tokenizer";
      src = {
        name = "css-selector-tokenizer-0.8.0.tgz";
        url = "https://registry.npmjs.org/css-selector-tokenizer/-/css-selector-tokenizer-0.8.0.tgz";
        hash = "sha512-Jd6Ig3/pe62/qe5SBPTN8h8LeUg/pT4lLgtavPf7updwwHpvFzxvOQBHYj2LZDMjUnBzgvIUSjRcf6oT5HzHFg==";
      };
      dependencies = {
        "cssesc" = "3.0.0";
        "fastparse" = "1.1.2";
      };
      peerDependencies = [];
    };
    "cssesc@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "cssesc";
      src = {
        name = "cssesc-3.0.0.tgz";
        url = "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz";
        hash = "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "csstype@3.1.2" = {
      type = "remote";
      version = "3.1.2";
      name = "csstype";
      src = {
        name = "csstype-3.1.2.tgz";
        url = "https://registry.npmjs.org/csstype/-/csstype-3.1.2.tgz";
        hash = "sha512-I7K1Uu0MBPzaFKg4nI5Q7Vs2t+3gWWW648spaF+Rg7pI9ds18Ugn+lvg4SHczUdKlHI5LWBXyqfS8+DufyBsgQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "daisyui@3.7.3" = {
      type = "remote";
      version = "3.7.3";
      name = "daisyui";
      src = {
        name = "daisyui-3.7.3.tgz";
        url = "https://registry.npmjs.org/daisyui/-/daisyui-3.7.3.tgz";
        hash = "sha512-gKlz3RwfaukZxf8nQZsDAZ7quUSi7F8HjGGB34tkHruvfQB9cgVDQsmqUqSQtkAJYvzbrg/3dLUa9+5jF4iC1A==";
      };
      dependencies = {
        "colord" = "2.9.3";
        "css-selector-tokenizer" = "0.8.0";
        "postcss" = "8.4.29";
        "postcss-js" = "4.0.1";
        "tailwindcss" = "3.3.3";
      };
      peerDependencies = [];
    };
    "data-uri-to-buffer@4.0.1" = {
      type = "remote";
      version = "4.0.1";
      name = "data-uri-to-buffer";
      src = {
        name = "data-uri-to-buffer-4.0.1.tgz";
        url = "https://registry.npmjs.org/data-uri-to-buffer/-/data-uri-to-buffer-4.0.1.tgz";
        hash = "sha512-0R9ikRb668HB7QDxT1vkpuUBtqc53YyAwMwGeUFKRojY/NWKvdZ+9UYtRfGmhqNbRkTSVpMbmyhXipFFv2cb/A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "debug@2.6.9" = {
      type = "remote";
      version = "2.6.9";
      name = "debug";
      src = {
        name = "debug-2.6.9.tgz";
        url = "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz";
        hash = "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==";
      };
      dependencies = {
        "ms" = "2.0.0";
      };
      peerDependencies = [
        "supports-color"
      ];
    };
    "debug@3.2.7" = {
      type = "remote";
      version = "3.2.7";
      name = "debug";
      src = {
        name = "debug-3.2.7.tgz";
        url = "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz";
        hash = "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==";
      };
      dependencies = {
        "ms" = "2.1.3";
        "supports-color" = "5.5.0";
      };
      peerDependencies = [
        "supports-color"
      ];
    };
    "debug@4.3.4" = {
      type = "remote";
      version = "4.3.4";
      name = "debug";
      src = {
        name = "debug-4.3.4.tgz";
        url = "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz";
        hash = "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==";
      };
      dependencies = {
        "ms" = "2.1.2";
      };
      peerDependencies = [
        "supports-color"
      ];
    };
    "depd@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "depd";
      src = {
        name = "depd-2.0.0.tgz";
        url = "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz";
        hash = "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "destroy@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "destroy";
      src = {
        name = "destroy-1.2.0.tgz";
        url = "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz";
        hash = "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "didyoumean@1.2.2" = {
      type = "remote";
      version = "1.2.2";
      name = "didyoumean";
      src = {
        name = "didyoumean-1.2.2.tgz";
        url = "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz";
        hash = "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "diff@4.0.2" = {
      type = "remote";
      version = "4.0.2";
      name = "diff";
      src = {
        name = "diff-4.0.2.tgz";
        url = "https://registry.npmjs.org/diff/-/diff-4.0.2.tgz";
        hash = "sha512-58lmxKSA4BNyLz+HHMUzlOEpg09FV+ev6ZMe3vJihgdxzgcwZ8VoEEPmALCZG9LmqfVoNMMKpttIYTVG6uDY7A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "dlv@1.1.3" = {
      type = "remote";
      version = "1.1.3";
      name = "dlv";
      src = {
        name = "dlv-1.1.3.tgz";
        url = "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz";
        hash = "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ecdsa-sig-formatter@1.0.11" = {
      type = "remote";
      version = "1.0.11";
      name = "ecdsa-sig-formatter";
      src = {
        name = "ecdsa-sig-formatter-1.0.11.tgz";
        url = "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz";
        hash = "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==";
      };
      dependencies = {
        "safe-buffer" = "5.2.1";
      };
      peerDependencies = [];
    };
    "ee-first@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "ee-first";
      src = {
        name = "ee-first-1.1.1.tgz";
        url = "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz";
        hash = "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "effect@2.0.0-next.24" = {
      type = "remote";
      version = "2.0.0-next.24";
      name = "effect";
      src = {
        name = "effect-2.0.0-next.24.tgz";
        url = "https://registry.npmjs.org/effect/-/effect-2.0.0-next.24.tgz";
        hash = "sha512-vPGoP5oLrc6TahWNcPWIMPYilVkJpmthv/pBTm+2FvSBYR9AcrzspUbpB2poMDaQ5pcKQTAMSVAmPpfAjssCTg==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.32.0";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/io"
        "@effect/match"
        "@effect/stm"
        "@effect/stream"
      ];
    };
    "effect@2.0.0-next.29" = {
      type = "remote";
      version = "2.0.0-next.29";
      name = "effect";
      src = {
        name = "effect-2.0.0-next.29.tgz";
        url = "https://registry.npmjs.org/effect/-/effect-2.0.0-next.29.tgz";
        hash = "sha512-CgQRDXcaGVBJUS7816vOwIP9CPRKXYBZMOP4ifJ4UdDLs1t/+EE4FSjiaHHjOCqIU7pRyCi2QZYuDjAT3OgFaw==";
      };
      dependencies = {
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
      };
      peerDependencies = [
        "@effect/data"
        "@effect/io"
        "@effect/match"
        "@effect/stm"
        "@effect/stream"
      ];
    };
    "effect@2.0.0-next.60" = {
      type = "remote";
      version = "2.0.0-next.60";
      name = "effect";
      src = {
        name = "effect-2.0.0-next.60.tgz";
        url = "https://registry.npmjs.org/effect/-/effect-2.0.0-next.60.tgz";
        hash = "sha512-23KhlVACgrg5UPFu9i4szybSU4cCU4T/7CX4pe0jV84QBZX0zm96WzwCtg6dqOnmUzBL7hm6S+iiPW2Rab13Uw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "electron-to-chromium@1.4.512" = {
      type = "remote";
      version = "1.4.512";
      name = "electron-to-chromium";
      src = {
        name = "electron-to-chromium-1.4.512.tgz";
        url = "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.512.tgz";
        hash = "sha512-1W8wRbYlQE4ph7eoj3TJ+uqwO6+xvAE/L+KGU7WTQQvX3tnSIGZAb90MTsMoJqzntamiwJhBAj4WZmygXhsOUg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "emoji-regex@8.0.0" = {
      type = "remote";
      version = "8.0.0";
      name = "emoji-regex";
      src = {
        name = "emoji-regex-8.0.0.tgz";
        url = "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz";
        hash = "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "encodeurl@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "encodeurl";
      src = {
        name = "encodeurl-1.0.2.tgz";
        url = "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz";
        hash = "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "esbuild@0.17.19" = {
      type = "remote";
      version = "0.17.19";
      name = "esbuild";
      src = {
        name = "esbuild-0.17.19.tgz";
        url = "https://registry.npmjs.org/esbuild/-/esbuild-0.17.19.tgz";
        hash = "sha512-XQ0jAPFkK/u3LcVRcvVHQcTIqD6E2H1fvZMA5dQPSOWb3suUbWbfbRf94pjc0bNzRYLfIrDRQXr7X+LHIm5oHw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "escalade@3.1.1" = {
      type = "remote";
      version = "3.1.1";
      name = "escalade";
      src = {
        name = "escalade-3.1.1.tgz";
        url = "https://registry.npmjs.org/escalade/-/escalade-3.1.1.tgz";
        hash = "sha512-k0er2gUkLf8O0zKJiAhmkTnJlTvINGv7ygDNPbeIsX/TJjGJZHuh9B2UxbsaEkmlEo9MfhrSzmhIlhRlI2GXnw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "escape-html@1.0.3" = {
      type = "remote";
      version = "1.0.3";
      name = "escape-html";
      src = {
        name = "escape-html-1.0.3.tgz";
        url = "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz";
        hash = "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "escape-string-regexp@1.0.5" = {
      type = "remote";
      version = "1.0.5";
      name = "escape-string-regexp";
      src = {
        name = "escape-string-regexp-1.0.5.tgz";
        url = "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz";
        hash = "sha512-vbRorB5FUQWvla16U8R/qgaFIya2qGzwDrNmCZuYKrbdSUMG6I1ZCGQRefkRVhuOkIGVne7BQ35DSfo1qvJqFg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "escape-string-regexp@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "escape-string-regexp";
      src = {
        name = "escape-string-regexp-2.0.0.tgz";
        url = "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-2.0.0.tgz";
        hash = "sha512-UpzcLCXolUWcNu5HtVMHYdXJjArjsF9C0aNnquZYY4uW/Vu0miy5YoWvbV345HauVvcAUnpRuhMMcqTcGOY2+w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "etag@1.8.1" = {
      type = "remote";
      version = "1.8.1";
      name = "etag";
      src = {
        name = "etag-1.8.1.tgz";
        url = "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz";
        hash = "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "express-session@1.17.3" = {
      type = "remote";
      version = "1.17.3";
      name = "express-session";
      src = {
        name = "express-session-1.17.3.tgz";
        url = "https://registry.npmjs.org/express-session/-/express-session-1.17.3.tgz";
        hash = "sha512-4+otWXlShYlG1Ma+2Jnn+xgKUZTMJ5QD3YvfilX3AcocOAbIkVylSWEklzALe/+Pu4qV6TYBj5GwOBFfdKqLBw==";
      };
      dependencies = {
        "cookie" = "0.4.2";
        "cookie-signature" = "1.0.6";
        "debug" = "2.6.9";
        "depd" = "2.0.0";
        "on-headers" = "1.0.2";
        "parseurl" = "1.3.3";
        "safe-buffer" = "5.2.1";
        "uid-safe" = "2.1.5";
      };
      peerDependencies = [];
    };
    "express@4.18.2" = {
      type = "remote";
      version = "4.18.2";
      name = "express";
      src = {
        name = "express-4.18.2.tgz";
        url = "https://registry.npmjs.org/express/-/express-4.18.2.tgz";
        hash = "sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==";
      };
      dependencies = {
        "accepts" = "1.3.8";
        "array-flatten" = "1.1.1";
        "body-parser" = "1.20.1";
        "content-disposition" = "0.5.4";
        "content-type" = "1.0.5";
        "cookie" = "0.5.0";
        "cookie-signature" = "1.0.6";
        "debug" = "2.6.9";
        "depd" = "2.0.0";
        "encodeurl" = "1.0.2";
        "escape-html" = "1.0.3";
        "etag" = "1.8.1";
        "finalhandler" = "1.2.0";
        "fresh" = "0.5.2";
        "http-errors" = "2.0.0";
        "merge-descriptors" = "1.0.1";
        "methods" = "1.1.2";
        "on-finished" = "2.4.1";
        "parseurl" = "1.3.3";
        "path-to-regexp" = "0.1.7";
        "proxy-addr" = "2.0.7";
        "qs" = "6.11.0";
        "range-parser" = "1.2.1";
        "safe-buffer" = "5.2.1";
        "send" = "0.18.0";
        "serve-static" = "1.15.0";
        "setprototypeof" = "1.2.0";
        "statuses" = "2.0.1";
        "type-is" = "1.6.18";
        "utils-merge" = "1.0.1";
        "vary" = "1.1.2";
      };
      peerDependencies = [];
    };
    "fast-check@3.12.0" = {
      type = "remote";
      version = "3.12.0";
      name = "fast-check";
      src = {
        name = "fast-check-3.12.0.tgz";
        url = "https://registry.npmjs.org/fast-check/-/fast-check-3.12.0.tgz";
        hash = "sha512-SqahE9mlL3+lhjJ39joMLwcj6F+24hfZdf/tchlNO8sHcTdrUUdA5P/ZbSFZM9Xpzs36XaneGwE0FWepm/zyOA==";
      };
      dependencies = {
        "pure-rand" = "6.0.2";
      };
      peerDependencies = [];
    };
    "fast-check@3.14.0" = {
      type = "remote";
      version = "3.14.0";
      name = "fast-check";
      src = {
        name = "fast-check-3.14.0.tgz";
        url = "https://registry.npmjs.org/fast-check/-/fast-check-3.14.0.tgz";
        hash = "sha512-9Z0zqASzDNjXBox/ileV/fd+4P+V/f3o4shM6QawvcdLFh8yjPG4h5BrHUZ8yzY6amKGDTAmRMyb/JZqe+dCgw==";
      };
      dependencies = {
        "pure-rand" = "6.0.2";
      };
      peerDependencies = [];
    };
    "fast-glob@3.3.1" = {
      type = "remote";
      version = "3.3.1";
      name = "fast-glob";
      src = {
        name = "fast-glob-3.3.1.tgz";
        url = "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz";
        hash = "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==";
      };
      dependencies = {
        "@nodelib/fs.stat" = "2.0.5";
        "@nodelib/fs.walk" = "1.2.8";
        "glob-parent" = "5.1.2";
        "merge2" = "1.4.1";
        "micromatch" = "4.0.5";
      };
      peerDependencies = [];
    };
    "fastparse@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "fastparse";
      src = {
        name = "fastparse-1.1.2.tgz";
        url = "https://registry.npmjs.org/fastparse/-/fastparse-1.1.2.tgz";
        hash = "sha512-483XLLxTVIwWK3QTrMGRqUfUpoOs/0hbQrl2oz4J0pAcm3A3bu84wxTFqGqkJzewCLdME38xJLJAxBABfQT8sQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "fastq@1.15.0" = {
      type = "remote";
      version = "1.15.0";
      name = "fastq";
      src = {
        name = "fastq-1.15.0.tgz";
        url = "https://registry.npmjs.org/fastq/-/fastq-1.15.0.tgz";
        hash = "sha512-wBrocU2LCXXa+lWBt8RoIRD89Fi8OdABODa/kEnyeyjS5aZO5/GNvI5sEINADqP/h8M29UHTHUb53sUu5Ihqdw==";
      };
      dependencies = {
        "reusify" = "1.0.4";
      };
      peerDependencies = [];
    };
    "fetch-blob@3.2.0" = {
      type = "remote";
      version = "3.2.0";
      name = "fetch-blob";
      src = {
        name = "fetch-blob-3.2.0.tgz";
        url = "https://registry.npmjs.org/fetch-blob/-/fetch-blob-3.2.0.tgz";
        hash = "sha512-7yAQpD2UMJzLi1Dqv7qFYnPbaPx7ZfFK6PiIxQ4PfkGPyNyl2Ugx+a/umUonmKqjhM4DnfbMvdX6otXq83soQQ==";
      };
      dependencies = {
        "node-domexception" = "1.0.0";
        "web-streams-polyfill" = "3.2.1";
      };
      peerDependencies = [];
    };
    "fill-range@7.0.1" = {
      type = "remote";
      version = "7.0.1";
      name = "fill-range";
      src = {
        name = "fill-range-7.0.1.tgz";
        url = "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz";
        hash = "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==";
      };
      dependencies = {
        "to-regex-range" = "5.0.1";
      };
      peerDependencies = [];
    };
    "finalhandler@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "finalhandler";
      src = {
        name = "finalhandler-1.2.0.tgz";
        url = "https://registry.npmjs.org/finalhandler/-/finalhandler-1.2.0.tgz";
        hash = "sha512-5uXcUVftlQMFnWC9qu/svkWv3GTd2PfUhK/3PLkYNAe7FbqJMt3515HaxE6eRL74GdsriiwujiawdaB1BpEISg==";
      };
      dependencies = {
        "debug" = "2.6.9";
        "encodeurl" = "1.0.2";
        "escape-html" = "1.0.3";
        "on-finished" = "2.4.1";
        "parseurl" = "1.3.3";
        "statuses" = "2.0.1";
        "unpipe" = "1.0.0";
      };
      peerDependencies = [];
    };
    "formdata-polyfill@4.0.10" = {
      type = "remote";
      version = "4.0.10";
      name = "formdata-polyfill";
      src = {
        name = "formdata-polyfill-4.0.10.tgz";
        url = "https://registry.npmjs.org/formdata-polyfill/-/formdata-polyfill-4.0.10.tgz";
        hash = "sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g==";
      };
      dependencies = {
        "fetch-blob" = "3.2.0";
      };
      peerDependencies = [];
    };
    "forwarded@0.2.0" = {
      type = "remote";
      version = "0.2.0";
      name = "forwarded";
      src = {
        name = "forwarded-0.2.0.tgz";
        url = "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz";
        hash = "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "fp-ts@2.16.1" = {
      type = "remote";
      version = "2.16.1";
      name = "fp-ts";
      src = {
        name = "fp-ts-2.16.1.tgz";
        url = "https://registry.npmjs.org/fp-ts/-/fp-ts-2.16.1.tgz";
        hash = "sha512-by7U5W8dkIzcvDofUcO42yl9JbnHTEDBrzu3pt5fKT+Z4Oy85I21K80EYJYdjQGC2qum4Vo55Ag57iiIK4FYuA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "fraction.js@4.3.6" = {
      type = "remote";
      version = "4.3.6";
      name = "fraction.js";
      src = {
        name = "fraction.js-4.3.6.tgz";
        url = "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.6.tgz";
        hash = "sha512-n2aZ9tNfYDwaHhvFTkhFErqOMIb8uyzSQ+vGJBjZyanAKZVbGUQ1sngfk9FdkBw7G26O7AgNjLcecLffD1c7eg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "fresh@0.5.2" = {
      type = "remote";
      version = "0.5.2";
      name = "fresh";
      src = {
        name = "fresh-0.5.2.tgz";
        url = "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz";
        hash = "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "frp-ts@0.0.1" = {
      type = "remote";
      version = "0.0.1";
      name = "frp-ts";
      src = {
        name = "frp-ts-0.0.1.tgz";
        url = "https://registry.npmjs.org/frp-ts/-/frp-ts-0.0.1.tgz";
        hash = "sha512-ryNqNx/+fXUsUsWNH9uBu3tgvcnB0tZKXHk0hqDG73r8/QmOYOGU8Xp5HEptkdEiLIO7GPBZ4GOA6ypoOHQzPA==";
      };
      dependencies = {
        "fp-ts" = "2.16.1";
      };
      peerDependencies = [
        "fp-ts"
      ];
    };
    "fs.realpath@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "fs.realpath";
      src = {
        name = "fs.realpath-1.0.0.tgz";
        url = "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz";
        hash = "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "fsevents@2.3.3" = {
      type = "remote";
      version = "2.3.3";
      name = "fsevents";
      src = {
        name = "fsevents-2.3.3.tgz";
        url = "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz";
        hash = "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "function-bind@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "function-bind";
      src = {
        name = "function-bind-1.1.1.tgz";
        url = "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz";
        hash = "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "gbt@0.0.5" = {
      type = "remote";
      version = "0.0.5";
      name = "gbt";
      src = {
        name = "gbt-0.0.5.tgz";
        url = "https://registry.npmjs.org/gbt/-/gbt-0.0.5.tgz";
        hash = "sha512-A3Sb88UUoOYjJbPnL1AwvOgSUb5RtlRPdp1Pt2xW2i3D6ssIJu320EAdn1os9D6LFD/dQGMEEwCNe38yBiGlDg==";
      };
      dependencies = {
        "@effect/schema" = "0.52.0";
        "@types/chokidar" = "2.1.3";
        "@types/glob" = "7.2.0";
        "@types/gradient-string" = "1.1.5";
        "@types/ink-divider" = "2.0.4";
        "@types/ink-gradient" = "2.0.4";
        "@types/node" = "14.18.63";
        "@types/react" = "17.0.59";
        "@types/yargs" = "16.0.9";
        "chokidar" = "3.5.3";
        "effect" = "2.0.0-next.60";
        "frp-ts" = "0.0.1";
        "glob" = "7.2.3";
        "gradient-string" = "1.2.0";
        "ink" = "3.2.0";
        "ink-divider" = "3.0.0";
        "ink-gradient" = "2.0.0";
        "ink-spinner" = "4.0.3";
        "ink-use-stdout-dimensions" = "1.0.5";
        "monocle-ts" = "2.3.13";
        "node-graphviz" = "0.1.1";
        "react" = "17.0.2";
        "tree-kill" = "1.2.2";
        "ts-adt" = "2.1.2";
        "typescript" = "5.3.3";
        "yargs" = "16.2.0";
      };
      peerDependencies = [];
    };
    "generic-pool@3.9.0" = {
      type = "remote";
      version = "3.9.0";
      name = "generic-pool";
      src = {
        name = "generic-pool-3.9.0.tgz";
        url = "https://registry.npmjs.org/generic-pool/-/generic-pool-3.9.0.tgz";
        hash = "sha512-hymDOu5B53XvN4QT9dBmZxPX4CWhBPPLguTZ9MMFeFa/Kg0xWVfylOVNlJji/E7yTZWFd/q9GO5TxDLq156D7g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "gensync@1.0.0-beta.2" = {
      type = "remote";
      version = "1.0.0-beta.2";
      name = "gensync";
      src = {
        name = "gensync-1.0.0-beta.2.tgz";
        url = "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz";
        hash = "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "get-caller-file@2.0.5" = {
      type = "remote";
      version = "2.0.5";
      name = "get-caller-file";
      src = {
        name = "get-caller-file-2.0.5.tgz";
        url = "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz";
        hash = "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "get-intrinsic@1.2.1" = {
      type = "remote";
      version = "1.2.1";
      name = "get-intrinsic";
      src = {
        name = "get-intrinsic-1.2.1.tgz";
        url = "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.1.tgz";
        hash = "sha512-2DcsyfABl+gVHEfCOaTrWgyt+tb6MSEGmKq+kI5HwLbIYgjgmMcV8KQ41uaKz1xxUcn9tJtgFbQUEVcEbd0FYw==";
      };
      dependencies = {
        "function-bind" = "1.1.1";
        "has" = "1.0.3";
        "has-proto" = "1.0.1";
        "has-symbols" = "1.0.3";
      };
      peerDependencies = [];
    };
    "glob-parent@5.1.2" = {
      type = "remote";
      version = "5.1.2";
      name = "glob-parent";
      src = {
        name = "glob-parent-5.1.2.tgz";
        url = "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz";
        hash = "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==";
      };
      dependencies = {
        "is-glob" = "4.0.3";
      };
      peerDependencies = [];
    };
    "glob-parent@6.0.2" = {
      type = "remote";
      version = "6.0.2";
      name = "glob-parent";
      src = {
        name = "glob-parent-6.0.2.tgz";
        url = "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz";
        hash = "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==";
      };
      dependencies = {
        "is-glob" = "4.0.3";
      };
      peerDependencies = [];
    };
    "glob@7.1.6" = {
      type = "remote";
      version = "7.1.6";
      name = "glob";
      src = {
        name = "glob-7.1.6.tgz";
        url = "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz";
        hash = "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==";
      };
      dependencies = {
        "fs.realpath" = "1.0.0";
        "inflight" = "1.0.6";
        "inherits" = "2.0.4";
        "minimatch" = "3.1.2";
        "once" = "1.4.0";
        "path-is-absolute" = "1.0.1";
      };
      peerDependencies = [];
    };
    "glob@7.2.3" = {
      type = "remote";
      version = "7.2.3";
      name = "glob";
      src = {
        name = "glob-7.2.3.tgz";
        url = "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz";
        hash = "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==";
      };
      dependencies = {
        "fs.realpath" = "1.0.0";
        "inflight" = "1.0.6";
        "inherits" = "2.0.4";
        "minimatch" = "3.1.2";
        "once" = "1.4.0";
        "path-is-absolute" = "1.0.1";
      };
      peerDependencies = [];
    };
    "globals@11.12.0" = {
      type = "remote";
      version = "11.12.0";
      name = "globals";
      src = {
        name = "globals-11.12.0.tgz";
        url = "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz";
        hash = "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "gradient-string@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "gradient-string";
      src = {
        name = "gradient-string-1.2.0.tgz";
        url = "https://registry.npmjs.org/gradient-string/-/gradient-string-1.2.0.tgz";
        hash = "sha512-Lxog7IDMMWNjwo4O0KbdBvSewk4vW6kQe5XaLuuPCyCE65AGQ1P8YqKJa5dq8TYf/Ge31F+KjWzPR5mAJvjlAg==";
      };
      dependencies = {
        "chalk" = "2.4.2";
        "tinygradient" = "0.4.3";
      };
      peerDependencies = [];
    };
    "has-flag@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "has-flag";
      src = {
        name = "has-flag-3.0.0.tgz";
        url = "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz";
        hash = "sha512-sKJf1+ceQBr4SMkvQnBDNDtf4TXpVhVGateu0t918bl30FnbE2m4vNLX+VWe/dpjlb+HugGYzW7uQXH98HPEYw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "has-flag@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "has-flag";
      src = {
        name = "has-flag-4.0.0.tgz";
        url = "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz";
        hash = "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "has-proto@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "has-proto";
      src = {
        name = "has-proto-1.0.1.tgz";
        url = "https://registry.npmjs.org/has-proto/-/has-proto-1.0.1.tgz";
        hash = "sha512-7qE+iP+O+bgF9clE5+UoBFzE65mlBiVj3tKCrlNQ0Ogwm0BjpT/gK4SlLYDMybDh5I3TCTKnPPa0oMG7JDYrhg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "has-symbols@1.0.3" = {
      type = "remote";
      version = "1.0.3";
      name = "has-symbols";
      src = {
        name = "has-symbols-1.0.3.tgz";
        url = "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz";
        hash = "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "has@1.0.3" = {
      type = "remote";
      version = "1.0.3";
      name = "has";
      src = {
        name = "has-1.0.3.tgz";
        url = "https://registry.npmjs.org/has/-/has-1.0.3.tgz";
        hash = "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==";
      };
      dependencies = {
        "function-bind" = "1.1.1";
      };
      peerDependencies = [];
    };
    "http-errors@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "http-errors";
      src = {
        name = "http-errors-2.0.0.tgz";
        url = "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz";
        hash = "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==";
      };
      dependencies = {
        "depd" = "2.0.0";
        "inherits" = "2.0.4";
        "setprototypeof" = "1.2.0";
        "statuses" = "2.0.1";
        "toidentifier" = "1.0.1";
      };
      peerDependencies = [];
    };
    "iconv-lite@0.4.24" = {
      type = "remote";
      version = "0.4.24";
      name = "iconv-lite";
      src = {
        name = "iconv-lite-0.4.24.tgz";
        url = "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz";
        hash = "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==";
      };
      dependencies = {
        "safer-buffer" = "2.1.2";
      };
      peerDependencies = [];
    };
    "ignore-by-default@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "ignore-by-default";
      src = {
        name = "ignore-by-default-1.0.1.tgz";
        url = "https://registry.npmjs.org/ignore-by-default/-/ignore-by-default-1.0.1.tgz";
        hash = "sha512-Ius2VYcGNk7T90CppJqcIkS5ooHUZyIQK+ClZfMfMNFEF9VSE73Fq+906u/CWu92x4gzZMWOwfFYckPObzdEbA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "indent-string@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "indent-string";
      src = {
        name = "indent-string-4.0.0.tgz";
        url = "https://registry.npmjs.org/indent-string/-/indent-string-4.0.0.tgz";
        hash = "sha512-EdDDZu4A2OyIK7Lr/2zG+w5jmbuk1DVBnEwREQvBzspBJkCEbRa8GxU1lghYcaGJCnRWibjDXlq779X1/y5xwg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "inflight@1.0.6" = {
      type = "remote";
      version = "1.0.6";
      name = "inflight";
      src = {
        name = "inflight-1.0.6.tgz";
        url = "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz";
        hash = "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==";
      };
      dependencies = {
        "once" = "1.4.0";
        "wrappy" = "1.0.2";
      };
      peerDependencies = [];
    };
    "inherits@2.0.4" = {
      type = "remote";
      version = "2.0.4";
      name = "inherits";
      src = {
        name = "inherits-2.0.4.tgz";
        url = "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz";
        hash = "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ink-divider@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "ink-divider";
      src = {
        name = "ink-divider-3.0.0.tgz";
        url = "https://registry.npmjs.org/ink-divider/-/ink-divider-3.0.0.tgz";
        hash = "sha512-Mqb9WArtEZCtXw622aHhJqPK157QNc+8ssl9/RvAZlS6nZRCKyW4mYOYCudQh6dSuFGt9eG5yaqT1mJaGmwu+w==";
      };
      dependencies = {
        "ink" = "3.2.0";
        "prop-types" = "15.8.1";
        "react" = "17.0.2";
        "string-width" = "4.2.3";
      };
      peerDependencies = [
        "ink"
        "react"
      ];
    };
    "ink-gradient@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "ink-gradient";
      src = {
        name = "ink-gradient-2.0.0.tgz";
        url = "https://registry.npmjs.org/ink-gradient/-/ink-gradient-2.0.0.tgz";
        hash = "sha512-d2BK/EzzBRoDL54NWkS3JGE4J8xtzwRVWxDAIkQ/eQ60XIzrFMtT5JlUqgV05Qlt32Jvk50qW51YqxGJggTuqA==";
      };
      dependencies = {
        "gradient-string" = "1.2.0";
        "ink" = "3.2.0";
        "prop-types" = "15.8.1";
        "react" = "17.0.2";
        "strip-ansi" = "6.0.1";
      };
      peerDependencies = [
        "ink"
        "react"
      ];
    };
    "ink-spinner@4.0.3" = {
      type = "remote";
      version = "4.0.3";
      name = "ink-spinner";
      src = {
        name = "ink-spinner-4.0.3.tgz";
        url = "https://registry.npmjs.org/ink-spinner/-/ink-spinner-4.0.3.tgz";
        hash = "sha512-uJ4nbH00MM9fjTJ5xdw0zzvtXMkeGb0WV6dzSWvFv2/+ks6FIhpkt+Ge/eLdh0Ah6Vjw5pLMyNfoHQpRDRVFbQ==";
      };
      dependencies = {
        "cli-spinners" = "2.9.2";
        "ink" = "3.2.0";
        "react" = "17.0.2";
      };
      peerDependencies = [
        "ink"
        "react"
      ];
    };
    "ink-use-stdout-dimensions@1.0.5" = {
      type = "remote";
      version = "1.0.5";
      name = "ink-use-stdout-dimensions";
      src = {
        name = "ink-use-stdout-dimensions-1.0.5.tgz";
        url = "https://registry.npmjs.org/ink-use-stdout-dimensions/-/ink-use-stdout-dimensions-1.0.5.tgz";
        hash = "sha512-rVsqnw4tQEAJUoknU09+zHdDf30GJdkumkHr0iz/TOYMYEZJkYqziQSGJAM+Z+M603EDfO89+Nxyn/Ko2Zknfw==";
      };
      dependencies = {
        "ink" = "3.2.0";
        "react" = "17.0.2";
      };
      peerDependencies = [
        "ink"
        "react"
      ];
    };
    "ink@3.2.0" = {
      type = "remote";
      version = "3.2.0";
      name = "ink";
      src = {
        name = "ink-3.2.0.tgz";
        url = "https://registry.npmjs.org/ink/-/ink-3.2.0.tgz";
        hash = "sha512-firNp1q3xxTzoItj/eOOSZQnYSlyrWks5llCTVX37nJ59K3eXbQ8PtzCguqo8YI19EELo5QxaKnJd4VxzhU8tg==";
      };
      dependencies = {
        "@types/react" = "17.0.59";
        "ansi-escapes" = "4.3.2";
        "auto-bind" = "4.0.0";
        "chalk" = "4.1.2";
        "cli-boxes" = "2.2.1";
        "cli-cursor" = "3.1.0";
        "cli-truncate" = "2.1.0";
        "code-excerpt" = "3.0.0";
        "indent-string" = "4.0.0";
        "is-ci" = "2.0.0";
        "lodash" = "4.17.21";
        "patch-console" = "1.0.0";
        "react" = "17.0.2";
        "react-devtools-core" = "4.28.5";
        "react-reconciler" = "0.26.2";
        "scheduler" = "0.20.2";
        "signal-exit" = "3.0.7";
        "slice-ansi" = "3.0.0";
        "stack-utils" = "2.0.6";
        "string-width" = "4.2.3";
        "type-fest" = "0.12.0";
        "widest-line" = "3.1.0";
        "wrap-ansi" = "6.2.0";
        "ws" = "7.5.9";
        "yoga-layout-prebuilt" = "1.10.0";
      };
      peerDependencies = [
        "@types/react"
        "react"
      ];
    };
    "ipaddr.js@1.9.1" = {
      type = "remote";
      version = "1.9.1";
      name = "ipaddr.js";
      src = {
        name = "ipaddr.js-1.9.1.tgz";
        url = "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz";
        hash = "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "is-binary-path@2.1.0" = {
      type = "remote";
      version = "2.1.0";
      name = "is-binary-path";
      src = {
        name = "is-binary-path-2.1.0.tgz";
        url = "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz";
        hash = "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==";
      };
      dependencies = {
        "binary-extensions" = "2.2.0";
      };
      peerDependencies = [];
    };
    "is-ci@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "is-ci";
      src = {
        name = "is-ci-2.0.0.tgz";
        url = "https://registry.npmjs.org/is-ci/-/is-ci-2.0.0.tgz";
        hash = "sha512-YfJT7rkpQB0updsdHLGWrvhBJfcfzNNawYDNIyQXJz0IViGf75O8EBPKSdvw2rF+LGCsX4FZ8tcr3b19LcZq4w==";
      };
      dependencies = {
        "ci-info" = "2.0.0";
      };
      peerDependencies = [];
    };
    "is-core-module@2.12.0" = {
      type = "remote";
      version = "2.12.0";
      name = "is-core-module";
      src = {
        name = "is-core-module-2.12.0.tgz";
        url = "https://registry.npmjs.org/is-core-module/-/is-core-module-2.12.0.tgz";
        hash = "sha512-RECHCBCd/viahWmwj6enj19sKbHfJrddi/6cBDsNTKbNq0f7VeaUkBo60BqzvPqo/W54ChS62Z5qyun7cfOMqQ==";
      };
      dependencies = {
        "has" = "1.0.3";
      };
      peerDependencies = [];
    };
    "is-extglob@2.1.1" = {
      type = "remote";
      version = "2.1.1";
      name = "is-extglob";
      src = {
        name = "is-extglob-2.1.1.tgz";
        url = "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz";
        hash = "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "is-fullwidth-code-point@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "is-fullwidth-code-point";
      src = {
        name = "is-fullwidth-code-point-3.0.0.tgz";
        url = "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz";
        hash = "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "is-glob@4.0.3" = {
      type = "remote";
      version = "4.0.3";
      name = "is-glob";
      src = {
        name = "is-glob-4.0.3.tgz";
        url = "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz";
        hash = "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==";
      };
      dependencies = {
        "is-extglob" = "2.1.1";
      };
      peerDependencies = [];
    };
    "is-number@7.0.0" = {
      type = "remote";
      version = "7.0.0";
      name = "is-number";
      src = {
        name = "is-number-7.0.0.tgz";
        url = "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz";
        hash = "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "isarray@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "isarray";
      src = {
        name = "isarray-1.0.0.tgz";
        url = "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz";
        hash = "sha512-VLghIWNM6ELQzo7zwmcg0NmTVyWKYjvIeM83yjp0wRDTmUnrM678fQbcKBo6n2CJEF0szoG//ytg+TKla89ALQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "jiti@1.20.0" = {
      type = "remote";
      version = "1.20.0";
      name = "jiti";
      src = {
        name = "jiti-1.20.0.tgz";
        url = "https://registry.npmjs.org/jiti/-/jiti-1.20.0.tgz";
        hash = "sha512-3TV69ZbrvV6U5DfQimop50jE9Dl6J8O1ja1dvBbMba/sZ3YBEQqJ2VZRoQPVnhlzjNtU1vaXRZVrVjU4qtm8yA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "js-tokens@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "js-tokens";
      src = {
        name = "js-tokens-4.0.0.tgz";
        url = "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz";
        hash = "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "jsesc@2.5.2" = {
      type = "remote";
      version = "2.5.2";
      name = "jsesc";
      src = {
        name = "jsesc-2.5.2.tgz";
        url = "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz";
        hash = "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "json5@2.2.3" = {
      type = "remote";
      version = "2.2.3";
      name = "json5";
      src = {
        name = "json5-2.2.3.tgz";
        url = "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz";
        hash = "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "jsonwebtoken@9.0.0" = {
      type = "remote";
      version = "9.0.0";
      name = "jsonwebtoken";
      src = {
        name = "jsonwebtoken-9.0.0.tgz";
        url = "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.0.tgz";
        hash = "sha512-tuGfYXxkQGDPnLJ7SibiQgVgeDgfbPq2k2ICcbgqW8WxWLBAxKQM/ZCu/IT8SOSwmaYl4dpTFCW5xZv7YbbWUw==";
      };
      dependencies = {
        "jws" = "3.2.2";
        "lodash" = "4.17.21";
        "ms" = "2.1.3";
        "semver" = "7.5.1";
      };
      peerDependencies = [];
    };
    "jwa@1.4.1" = {
      type = "remote";
      version = "1.4.1";
      name = "jwa";
      src = {
        name = "jwa-1.4.1.tgz";
        url = "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz";
        hash = "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==";
      };
      dependencies = {
        "buffer-equal-constant-time" = "1.0.1";
        "ecdsa-sig-formatter" = "1.0.11";
        "safe-buffer" = "5.2.1";
      };
      peerDependencies = [];
    };
    "jws@3.2.2" = {
      type = "remote";
      version = "3.2.2";
      name = "jws";
      src = {
        name = "jws-3.2.2.tgz";
        url = "https://registry.npmjs.org/jws/-/jws-3.2.2.tgz";
        hash = "sha512-YHlZCB6lMTllWDtSPHz/ZXTsi8S00usEV6v1tjq8tOUZzw7DpSDWVXjXDre6ed1w/pd495ODpHZYSdkRTsa0HA==";
      };
      dependencies = {
        "jwa" = "1.4.1";
        "safe-buffer" = "5.2.1";
      };
      peerDependencies = [];
    };
    "lilconfig@2.1.0" = {
      type = "remote";
      version = "2.1.0";
      name = "lilconfig";
      src = {
        name = "lilconfig-2.1.0.tgz";
        url = "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz";
        hash = "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lines-and-columns@1.2.4" = {
      type = "remote";
      version = "1.2.4";
      name = "lines-and-columns";
      src = {
        name = "lines-and-columns-1.2.4.tgz";
        url = "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz";
        hash = "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.castarray@4.4.0" = {
      type = "remote";
      version = "4.4.0";
      name = "lodash.castarray";
      src = {
        name = "lodash.castarray-4.4.0.tgz";
        url = "https://registry.npmjs.org/lodash.castarray/-/lodash.castarray-4.4.0.tgz";
        hash = "sha512-aVx8ztPv7/2ULbArGJ2Y42bG1mEQ5mGjpdvrbJcJFU3TbYybe+QlLS4pst9zV52ymy2in1KpFPiZnAOATxD4+Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.isplainobject@4.0.6" = {
      type = "remote";
      version = "4.0.6";
      name = "lodash.isplainobject";
      src = {
        name = "lodash.isplainobject-4.0.6.tgz";
        url = "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz";
        hash = "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.merge@4.6.2" = {
      type = "remote";
      version = "4.6.2";
      name = "lodash.merge";
      src = {
        name = "lodash.merge-4.6.2.tgz";
        url = "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz";
        hash = "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash@4.17.21" = {
      type = "remote";
      version = "4.17.21";
      name = "lodash";
      src = {
        name = "lodash-4.17.21.tgz";
        url = "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz";
        hash = "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "loose-envify@1.4.0" = {
      type = "remote";
      version = "1.4.0";
      name = "loose-envify";
      src = {
        name = "loose-envify-1.4.0.tgz";
        url = "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz";
        hash = "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==";
      };
      dependencies = {
        "js-tokens" = "4.0.0";
      };
      peerDependencies = [];
    };
    "lru-cache@5.1.1" = {
      type = "remote";
      version = "5.1.1";
      name = "lru-cache";
      src = {
        name = "lru-cache-5.1.1.tgz";
        url = "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz";
        hash = "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==";
      };
      dependencies = {
        "yallist" = "3.1.1";
      };
      peerDependencies = [];
    };
    "lru-cache@6.0.0" = {
      type = "remote";
      version = "6.0.0";
      name = "lru-cache";
      src = {
        name = "lru-cache-6.0.0.tgz";
        url = "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz";
        hash = "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==";
      };
      dependencies = {
        "yallist" = "4.0.0";
      };
      peerDependencies = [];
    };
    "magic-string@0.27.0" = {
      type = "remote";
      version = "0.27.0";
      name = "magic-string";
      src = {
        name = "magic-string-0.27.0.tgz";
        url = "https://registry.npmjs.org/magic-string/-/magic-string-0.27.0.tgz";
        hash = "sha512-8UnnX2PeRAPZuN12svgR9j7M1uWMovg/CEnIwIG0LFkXSJJe4PdfUGiTGl8V9bsBHFUtfVINcSyYxd7q+kx9fA==";
      };
      dependencies = {
        "@jridgewell/sourcemap-codec" = "1.4.15";
      };
      peerDependencies = [];
    };
    "make-error@1.3.6" = {
      type = "remote";
      version = "1.3.6";
      name = "make-error";
      src = {
        name = "make-error-1.3.6.tgz";
        url = "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz";
        hash = "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "media-typer@0.3.0" = {
      type = "remote";
      version = "0.3.0";
      name = "media-typer";
      src = {
        name = "media-typer-0.3.0.tgz";
        url = "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz";
        hash = "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "merge-descriptors@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "merge-descriptors";
      src = {
        name = "merge-descriptors-1.0.1.tgz";
        url = "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz";
        hash = "sha512-cCi6g3/Zr1iqQi6ySbseM1Xvooa98N0w31jzUYrXPX2xqObmFGHJ0tQ5u74H3mVh7wLouTseZyYIq39g8cNp1w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "merge2@1.4.1" = {
      type = "remote";
      version = "1.4.1";
      name = "merge2";
      src = {
        name = "merge2-1.4.1.tgz";
        url = "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz";
        hash = "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "methods@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "methods";
      src = {
        name = "methods-1.1.2.tgz";
        url = "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz";
        hash = "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "micromatch@4.0.5" = {
      type = "remote";
      version = "4.0.5";
      name = "micromatch";
      src = {
        name = "micromatch-4.0.5.tgz";
        url = "https://registry.npmjs.org/micromatch/-/micromatch-4.0.5.tgz";
        hash = "sha512-DMy+ERcEW2q8Z2Po+WNXuw3c5YaUSFjAO5GsJqfEl7UjvtIuFKO6ZrKvcItdy98dwFI2N1tg3zNIdKaQT+aNdA==";
      };
      dependencies = {
        "braces" = "3.0.2";
        "picomatch" = "2.3.1";
      };
      peerDependencies = [];
    };
    "mime-db@1.52.0" = {
      type = "remote";
      version = "1.52.0";
      name = "mime-db";
      src = {
        name = "mime-db-1.52.0.tgz";
        url = "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz";
        hash = "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "mime-types@2.1.35" = {
      type = "remote";
      version = "2.1.35";
      name = "mime-types";
      src = {
        name = "mime-types-2.1.35.tgz";
        url = "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz";
        hash = "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==";
      };
      dependencies = {
        "mime-db" = "1.52.0";
      };
      peerDependencies = [];
    };
    "mime@1.6.0" = {
      type = "remote";
      version = "1.6.0";
      name = "mime";
      src = {
        name = "mime-1.6.0.tgz";
        url = "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz";
        hash = "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "mimic-fn@2.1.0" = {
      type = "remote";
      version = "2.1.0";
      name = "mimic-fn";
      src = {
        name = "mimic-fn-2.1.0.tgz";
        url = "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz";
        hash = "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "minimatch@3.1.2" = {
      type = "remote";
      version = "3.1.2";
      name = "minimatch";
      src = {
        name = "minimatch-3.1.2.tgz";
        url = "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz";
        hash = "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==";
      };
      dependencies = {
        "brace-expansion" = "1.1.11";
      };
      peerDependencies = [];
    };
    "minimist@1.2.8" = {
      type = "remote";
      version = "1.2.8";
      name = "minimist";
      src = {
        name = "minimist-1.2.8.tgz";
        url = "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz";
        hash = "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "mkdirp@0.5.6" = {
      type = "remote";
      version = "0.5.6";
      name = "mkdirp";
      src = {
        name = "mkdirp-0.5.6.tgz";
        url = "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.6.tgz";
        hash = "sha512-FP+p8RB8OWpF3YZBCrP5gtADmtXApB5AMLn+vdyA+PyxCjrCs00mjyUozssO33cwDeT3wNGdLxJ5M//YqtHAJw==";
      };
      dependencies = {
        "minimist" = "1.2.8";
      };
      peerDependencies = [];
    };
    "monocle-ts@2.3.13" = {
      type = "remote";
      version = "2.3.13";
      name = "monocle-ts";
      src = {
        name = "monocle-ts-2.3.13.tgz";
        url = "https://registry.npmjs.org/monocle-ts/-/monocle-ts-2.3.13.tgz";
        hash = "sha512-D5Ygd3oulEoAm3KuGO0eeJIrhFf1jlQIoEVV2DYsZUMz42j4tGxgct97Aq68+F8w4w4geEnwFa8HayTS/7lpKQ==";
      };
      dependencies = {
        "fp-ts" = "2.16.1";
      };
      peerDependencies = [
        "fp-ts"
      ];
    };
    "ms@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "ms";
      src = {
        name = "ms-2.0.0.tgz";
        url = "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz";
        hash = "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ms@2.1.2" = {
      type = "remote";
      version = "2.1.2";
      name = "ms";
      src = {
        name = "ms-2.1.2.tgz";
        url = "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz";
        hash = "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ms@2.1.3" = {
      type = "remote";
      version = "2.1.3";
      name = "ms";
      src = {
        name = "ms-2.1.3.tgz";
        url = "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz";
        hash = "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "multer@1.4.5-lts.1" = {
      type = "remote";
      version = "1.4.5-lts.1";
      name = "multer";
      src = {
        name = "multer-1.4.5-lts.1.tgz";
        url = "https://registry.npmjs.org/multer/-/multer-1.4.5-lts.1.tgz";
        hash = "sha512-ywPWvcDMeH+z9gQq5qYHCCy+ethsk4goepZ45GLD63fOu0YcNecQxi64nDs3qluZB+murG3/D4dJ7+dGctcCQQ==";
      };
      dependencies = {
        "append-field" = "1.0.0";
        "busboy" = "1.6.0";
        "concat-stream" = "1.6.2";
        "mkdirp" = "0.5.6";
        "object-assign" = "4.1.1";
        "type-is" = "1.6.18";
        "xtend" = "4.0.2";
      };
      peerDependencies = [];
    };
    "mz@2.7.0" = {
      type = "remote";
      version = "2.7.0";
      name = "mz";
      src = {
        name = "mz-2.7.0.tgz";
        url = "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz";
        hash = "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==";
      };
      dependencies = {
        "any-promise" = "1.3.0";
        "object-assign" = "4.1.1";
        "thenify-all" = "1.6.0";
      };
      peerDependencies = [];
    };
    "nanoid@3.3.6" = {
      type = "remote";
      version = "3.3.6";
      name = "nanoid";
      src = {
        name = "nanoid-3.3.6.tgz";
        url = "https://registry.npmjs.org/nanoid/-/nanoid-3.3.6.tgz";
        hash = "sha512-BGcqMMJuToF7i1rt+2PWSNVnWIkGCU78jBG3RxO/bZlnZPK2Cmi2QaffxGO/2RvWi9sL+FAiRiXMgsyxQ1DIDA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "negotiator@0.6.3" = {
      type = "remote";
      version = "0.6.3";
      name = "negotiator";
      src = {
        name = "negotiator-0.6.3.tgz";
        url = "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz";
        hash = "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "njwt@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "njwt";
      src = {
        name = "njwt-2.0.0.tgz";
        url = "https://registry.npmjs.org/njwt/-/njwt-2.0.0.tgz";
        hash = "sha512-1RcqirhCqThBEe4KO83pFg0wPBa1c9NiXNCrocD2EbZqb6ksWWDVnp/w/p0gsyUcVa05PhhaaPjs9rc/GLmdxQ==";
      };
      dependencies = {
        "@types/node" = "15.14.9";
        "ecdsa-sig-formatter" = "1.0.11";
        "uuid" = "8.3.2";
      };
      peerDependencies = [];
    };
    "node-domexception@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "node-domexception";
      src = {
        name = "node-domexception-1.0.0.tgz";
        url = "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz";
        hash = "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "node-fetch@3.3.2" = {
      type = "remote";
      version = "3.3.2";
      name = "node-fetch";
      src = {
        name = "node-fetch-3.3.2.tgz";
        url = "https://registry.npmjs.org/node-fetch/-/node-fetch-3.3.2.tgz";
        hash = "sha512-dRB78srN/l6gqWulah9SrxeYnxeddIG30+GOqK/9OlLVyLg3HPnr6SqOWTWOXKRwC2eGYCkZ59NNuSgvSrpgOA==";
      };
      dependencies = {
        "data-uri-to-buffer" = "4.0.1";
        "fetch-blob" = "3.2.0";
        "formdata-polyfill" = "4.0.10";
      };
      peerDependencies = [];
    };
    "node-graphviz@0.1.1" = {
      type = "remote";
      version = "0.1.1";
      name = "node-graphviz";
      src = {
        name = "node-graphviz-0.1.1.tgz";
        url = "https://registry.npmjs.org/node-graphviz/-/node-graphviz-0.1.1.tgz";
        hash = "sha512-riY8/pFGSD1ipmyzqCwuN2M6W02ELfuLDjhJvTrQCUS/15tyU8ExkC96mlQrNLBK8Ws0z8PdH+ChBT6DuPFWWA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "node-releases@2.0.13" = {
      type = "remote";
      version = "2.0.13";
      name = "node-releases";
      src = {
        name = "node-releases-2.0.13.tgz";
        url = "https://registry.npmjs.org/node-releases/-/node-releases-2.0.13.tgz";
        hash = "sha512-uYr7J37ae/ORWdZeQ1xxMJe3NtdmqMC/JZK+geofDrkLUApKRHPd18/TxtBOJ4A0/+uUIliorNrfYV6s1b02eQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "nodemon@2.0.22" = {
      type = "remote";
      version = "2.0.22";
      name = "nodemon";
      src = {
        name = "nodemon-2.0.22.tgz";
        url = "https://registry.npmjs.org/nodemon/-/nodemon-2.0.22.tgz";
        hash = "sha512-B8YqaKMmyuCO7BowF1Z1/mkPqLk6cs/l63Ojtd6otKjMx47Dq1utxfRxcavH1I7VSaL8n5BUaoutadnsX3AAVQ==";
      };
      dependencies = {
        "chokidar" = "3.5.3";
        "debug" = "3.2.7";
        "ignore-by-default" = "1.0.1";
        "minimatch" = "3.1.2";
        "pstree.remy" = "1.1.8";
        "semver" = "5.7.1";
        "simple-update-notifier" = "1.1.0";
        "supports-color" = "5.5.0";
        "touch" = "3.1.0";
        "undefsafe" = "2.0.5";
      };
      peerDependencies = [];
    };
    "nopt@1.0.10" = {
      type = "remote";
      version = "1.0.10";
      name = "nopt";
      src = {
        name = "nopt-1.0.10.tgz";
        url = "https://registry.npmjs.org/nopt/-/nopt-1.0.10.tgz";
        hash = "sha512-NWmpvLSqUrgrAC9HCuxEvb+PSloHpqVu+FqcO4eeF2h5qYRhA7ev6KvelyQAKtegUbC6RypJnlEOhd8vloNKYg==";
      };
      dependencies = {
        "abbrev" = "1.1.1";
      };
      peerDependencies = [];
    };
    "normalize-path@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "normalize-path";
      src = {
        name = "normalize-path-3.0.0.tgz";
        url = "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz";
        hash = "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "normalize-range@0.1.2" = {
      type = "remote";
      version = "0.1.2";
      name = "normalize-range";
      src = {
        name = "normalize-range-0.1.2.tgz";
        url = "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz";
        hash = "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "object-assign@4.1.1" = {
      type = "remote";
      version = "4.1.1";
      name = "object-assign";
      src = {
        name = "object-assign-4.1.1.tgz";
        url = "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz";
        hash = "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "object-hash@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "object-hash";
      src = {
        name = "object-hash-3.0.0.tgz";
        url = "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz";
        hash = "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "object-inspect@1.12.3" = {
      type = "remote";
      version = "1.12.3";
      name = "object-inspect";
      src = {
        name = "object-inspect-1.12.3.tgz";
        url = "https://registry.npmjs.org/object-inspect/-/object-inspect-1.12.3.tgz";
        hash = "sha512-geUvdk7c+eizMNUDkRpW1wJwgfOiOeHbxBR/hLXK1aT6zmVSO0jsQcs7fj6MGw89jC/cjGfLcNOrtMYtGqm81g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "on-finished@2.4.1" = {
      type = "remote";
      version = "2.4.1";
      name = "on-finished";
      src = {
        name = "on-finished-2.4.1.tgz";
        url = "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz";
        hash = "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==";
      };
      dependencies = {
        "ee-first" = "1.1.1";
      };
      peerDependencies = [];
    };
    "on-headers@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "on-headers";
      src = {
        name = "on-headers-1.0.2.tgz";
        url = "https://registry.npmjs.org/on-headers/-/on-headers-1.0.2.tgz";
        hash = "sha512-pZAE+FJLoyITytdqK0U5s+FIpjN0JP3OzFi/u8Rx+EV5/W+JTWGXG8xFzevE7AjBfDqHv/8vL8qQsIhHnqRkrA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "once@1.4.0" = {
      type = "remote";
      version = "1.4.0";
      name = "once";
      src = {
        name = "once-1.4.0.tgz";
        url = "https://registry.npmjs.org/once/-/once-1.4.0.tgz";
        hash = "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==";
      };
      dependencies = {
        "wrappy" = "1.0.2";
      };
      peerDependencies = [];
    };
    "onetime@5.1.2" = {
      type = "remote";
      version = "5.1.2";
      name = "onetime";
      src = {
        name = "onetime-5.1.2.tgz";
        url = "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz";
        hash = "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==";
      };
      dependencies = {
        "mimic-fn" = "2.1.0";
      };
      peerDependencies = [];
    };
    "packet-reader@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "packet-reader";
      src = {
        name = "packet-reader-1.0.0.tgz";
        url = "https://registry.npmjs.org/packet-reader/-/packet-reader-1.0.0.tgz";
        hash = "sha512-HAKu/fG3HpHFO0AA8WE8q2g+gBJaZ9MG7fcKk+IJPLTGAD6Psw4443l+9DGRbOIh3/aXr7Phy0TjilYivJo5XQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "parseurl@1.3.3" = {
      type = "remote";
      version = "1.3.3";
      name = "parseurl";
      src = {
        name = "parseurl-1.3.3.tgz";
        url = "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz";
        hash = "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "passport-local@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "passport-local";
      src = {
        name = "passport-local-1.0.0.tgz";
        url = "https://registry.npmjs.org/passport-local/-/passport-local-1.0.0.tgz";
        hash = "sha512-9wCE6qKznvf9mQYYbgJ3sVOHmCWoUNMVFoZzNoznmISbhnNNPhN9xfY3sLmScHMetEJeoY7CXwfhCe7argfQow==";
      };
      dependencies = {
        "passport-strategy" = "1.0.0";
      };
      peerDependencies = [];
    };
    "passport-strategy@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "passport-strategy";
      src = {
        name = "passport-strategy-1.0.0.tgz";
        url = "https://registry.npmjs.org/passport-strategy/-/passport-strategy-1.0.0.tgz";
        hash = "sha512-CB97UUvDKJde2V0KDWWB3lyf6PC3FaZP7YxZ2G8OAtn9p4HI9j9JLP9qjOGZFvyl8uwNT8qM+hGnz/n16NI7oA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "passport@0.6.0" = {
      type = "remote";
      version = "0.6.0";
      name = "passport";
      src = {
        name = "passport-0.6.0.tgz";
        url = "https://registry.npmjs.org/passport/-/passport-0.6.0.tgz";
        hash = "sha512-0fe+p3ZnrWRW74fe8+SvCyf4a3Pb2/h7gFkQ8yTJpAO50gDzlfjZUZTO1k5Eg9kUct22OxHLqDZoKUWRHOh9ug==";
      };
      dependencies = {
        "passport-strategy" = "1.0.0";
        "pause" = "0.0.1";
        "utils-merge" = "1.0.1";
      };
      peerDependencies = [];
    };
    "patch-console@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "patch-console";
      src = {
        name = "patch-console-1.0.0.tgz";
        url = "https://registry.npmjs.org/patch-console/-/patch-console-1.0.0.tgz";
        hash = "sha512-nxl9nrnLQmh64iTzMfyylSlRozL7kAXIaxw1fVcLYdyhNkJCRUzirRZTikXGJsg+hc4fqpneTK6iU2H1Q8THSA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "path-is-absolute@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "path-is-absolute";
      src = {
        name = "path-is-absolute-1.0.1.tgz";
        url = "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz";
        hash = "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "path-parse@1.0.7" = {
      type = "remote";
      version = "1.0.7";
      name = "path-parse";
      src = {
        name = "path-parse-1.0.7.tgz";
        url = "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz";
        hash = "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "path-to-regexp@0.1.7" = {
      type = "remote";
      version = "0.1.7";
      name = "path-to-regexp";
      src = {
        name = "path-to-regexp-0.1.7.tgz";
        url = "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz";
        hash = "sha512-5DFkuoqlv1uYQKxy8omFBeJPQcdoE07Kv2sferDCrAq1ohOU+MSDswDIbnx3YAM60qIOnYa53wBhXW0EbMonrQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pause@0.0.1" = {
      type = "remote";
      version = "0.0.1";
      name = "pause";
      src = {
        name = "pause-0.0.1.tgz";
        url = "https://registry.npmjs.org/pause/-/pause-0.0.1.tgz";
        hash = "sha512-KG8UEiEVkR3wGEb4m5yZkVCzigAD+cVEJck2CzYZO37ZGJfctvVptVO192MwrtPhzONn6go8ylnOdMhKqi4nfg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pg-connection-string@2.5.0" = {
      type = "remote";
      version = "2.5.0";
      name = "pg-connection-string";
      src = {
        name = "pg-connection-string-2.5.0.tgz";
        url = "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.5.0.tgz";
        hash = "sha512-r5o/V/ORTA6TmUnyWZR9nCj1klXCO2CEKNRlVuJptZe85QuhFayC7WeMic7ndayT5IRIR0S0xFxFi2ousartlQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pg-int8@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "pg-int8";
      src = {
        name = "pg-int8-1.0.1.tgz";
        url = "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz";
        hash = "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pg-pool@3.6.0" = {
      type = "remote";
      version = "3.6.0";
      name = "pg-pool";
      src = {
        name = "pg-pool-3.6.0.tgz";
        url = "https://registry.npmjs.org/pg-pool/-/pg-pool-3.6.0.tgz";
        hash = "sha512-clFRf2ksqd+F497kWFyM21tMjeikn60oGDmqMT8UBrynEwVEX/5R5xd2sdvdo1cZCFlguORNpVuqxIj+aK4cfQ==";
      };
      dependencies = {
        "pg" = "8.2.2";
      };
      peerDependencies = [
        "pg"
      ];
    };
    "pg-protocol@1.6.0" = {
      type = "remote";
      version = "1.6.0";
      name = "pg-protocol";
      src = {
        name = "pg-protocol-1.6.0.tgz";
        url = "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.6.0.tgz";
        hash = "sha512-M+PDm637OY5WM307051+bsDia5Xej6d9IR4GwJse1qA1DIhiKlksvrneZOYQq42OM+spubpcNYEo2FcKQrDk+Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pg-types@2.2.0" = {
      type = "remote";
      version = "2.2.0";
      name = "pg-types";
      src = {
        name = "pg-types-2.2.0.tgz";
        url = "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz";
        hash = "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==";
      };
      dependencies = {
        "pg-int8" = "1.0.1";
        "postgres-array" = "2.0.0";
        "postgres-bytea" = "1.0.0";
        "postgres-date" = "1.0.7";
        "postgres-interval" = "1.2.0";
      };
      peerDependencies = [];
    };
    "pg@8.10.0" = {
      type = "remote";
      version = "8.10.0";
      name = "pg";
      src = {
        name = "pg-8.10.0.tgz";
        url = "https://registry.npmjs.org/pg/-/pg-8.10.0.tgz";
        hash = "sha512-ke7o7qSTMb47iwzOSaZMfeR7xToFdkE71ifIipOAAaLIM0DYzfOAXlgFFmYUIE2BcJtvnVlGCID84ZzCegE8CQ==";
      };
      dependencies = {
        "buffer-writer" = "2.0.0";
        "packet-reader" = "1.0.0";
        "pg-connection-string" = "2.5.0";
        "pg-pool" = "3.6.0";
        "pg-protocol" = "1.6.0";
        "pg-types" = "2.2.0";
        "pgpass" = "1.0.5";
      };
      peerDependencies = [
        "pg-native"
      ];
    };
    "pg@8.2.2" = {
      type = "remote";
      version = "8.2.2";
      name = "pg";
      src = {
        name = "pg-8.2.2.tgz";
        url = "https://registry.npmjs.org/pg/-/pg-8.2.2.tgz";
        hash = "sha512-Uni50U0W2CNPM68+zfC/1WWjSO3q/uBSF/Nl7D+1npZGsPSM4/EZt0xSMW2jox1Bn0EfDlnTWnTsM/TrSOtBEA==";
      };
      dependencies = {
        "buffer-writer" = "2.0.0";
        "packet-reader" = "1.0.0";
        "pg-connection-string" = "2.5.0";
        "pg-pool" = "3.6.0";
        "pg-protocol" = "1.6.0";
        "pg-types" = "2.2.0";
        "pgpass" = "1.0.5";
        "semver" = "4.3.2";
      };
      peerDependencies = [];
    };
    "pgpass@1.0.5" = {
      type = "remote";
      version = "1.0.5";
      name = "pgpass";
      src = {
        name = "pgpass-1.0.5.tgz";
        url = "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz";
        hash = "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==";
      };
      dependencies = {
        "split2" = "4.2.0";
      };
      peerDependencies = [];
    };
    "picocolors@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "picocolors";
      src = {
        name = "picocolors-1.0.0.tgz";
        url = "https://registry.npmjs.org/picocolors/-/picocolors-1.0.0.tgz";
        hash = "sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "picomatch@2.3.1" = {
      type = "remote";
      version = "2.3.1";
      name = "picomatch";
      src = {
        name = "picomatch-2.3.1.tgz";
        url = "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz";
        hash = "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pify@2.3.0" = {
      type = "remote";
      version = "2.3.0";
      name = "pify";
      src = {
        name = "pify-2.3.0.tgz";
        url = "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz";
        hash = "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pirates@4.0.6" = {
      type = "remote";
      version = "4.0.6";
      name = "pirates";
      src = {
        name = "pirates-4.0.6.tgz";
        url = "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz";
        hash = "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "postcss-import@15.1.0" = {
      type = "remote";
      version = "15.1.0";
      name = "postcss-import";
      src = {
        name = "postcss-import-15.1.0.tgz";
        url = "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz";
        hash = "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==";
      };
      dependencies = {
        "postcss" = "8.4.29";
        "postcss-value-parser" = "4.2.0";
        "read-cache" = "1.0.0";
        "resolve" = "1.22.2";
      };
      peerDependencies = [
        "postcss"
      ];
    };
    "postcss-js@4.0.1" = {
      type = "remote";
      version = "4.0.1";
      name = "postcss-js";
      src = {
        name = "postcss-js-4.0.1.tgz";
        url = "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz";
        hash = "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==";
      };
      dependencies = {
        "camelcase-css" = "2.0.1";
        "postcss" = "8.4.29";
      };
      peerDependencies = [
        "postcss"
      ];
    };
    "postcss-load-config@4.0.1" = {
      type = "remote";
      version = "4.0.1";
      name = "postcss-load-config";
      src = {
        name = "postcss-load-config-4.0.1.tgz";
        url = "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.1.tgz";
        hash = "sha512-vEJIc8RdiBRu3oRAI0ymerOn+7rPuMvRXslTvZUKZonDHFIczxztIyJ1urxM1x9JXEikvpWWTUUqal5j/8QgvA==";
      };
      dependencies = {
        "lilconfig" = "2.1.0";
        "postcss" = "8.4.29";
        "yaml" = "2.3.2";
      };
      peerDependencies = [
        "postcss"
        "ts-node"
      ];
    };
    "postcss-nested@6.0.1" = {
      type = "remote";
      version = "6.0.1";
      name = "postcss-nested";
      src = {
        name = "postcss-nested-6.0.1.tgz";
        url = "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.0.1.tgz";
        hash = "sha512-mEp4xPMi5bSWiMbsgoPfcP74lsWLHkQbZc3sY+jWYd65CUwXrUaTp0fmNpa01ZcETKlIgUdFN/MpS2xZtqL9dQ==";
      };
      dependencies = {
        "postcss" = "8.4.29";
        "postcss-selector-parser" = "6.0.13";
      };
      peerDependencies = [
        "postcss"
      ];
    };
    "postcss-selector-parser@6.0.10" = {
      type = "remote";
      version = "6.0.10";
      name = "postcss-selector-parser";
      src = {
        name = "postcss-selector-parser-6.0.10.tgz";
        url = "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.10.tgz";
        hash = "sha512-IQ7TZdoaqbT+LCpShg46jnZVlhWD2w6iQYAcYXfHARZ7X1t/UGhhceQDs5X0cGqKvYlHNOuv7Oa1xmb0oQuA3w==";
      };
      dependencies = {
        "cssesc" = "3.0.0";
        "util-deprecate" = "1.0.2";
      };
      peerDependencies = [];
    };
    "postcss-selector-parser@6.0.13" = {
      type = "remote";
      version = "6.0.13";
      name = "postcss-selector-parser";
      src = {
        name = "postcss-selector-parser-6.0.13.tgz";
        url = "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.13.tgz";
        hash = "sha512-EaV1Gl4mUEV4ddhDnv/xtj7sxwrwxdetHdWUGnT4VJQf+4d05v6lHYZr8N573k5Z0BViss7BDhfWtKS3+sfAqQ==";
      };
      dependencies = {
        "cssesc" = "3.0.0";
        "util-deprecate" = "1.0.2";
      };
      peerDependencies = [];
    };
    "postcss-value-parser@4.2.0" = {
      type = "remote";
      version = "4.2.0";
      name = "postcss-value-parser";
      src = {
        name = "postcss-value-parser-4.2.0.tgz";
        url = "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz";
        hash = "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "postcss@8.4.29" = {
      type = "remote";
      version = "8.4.29";
      name = "postcss";
      src = {
        name = "postcss-8.4.29.tgz";
        url = "https://registry.npmjs.org/postcss/-/postcss-8.4.29.tgz";
        hash = "sha512-cbI+jaqIeu/VGqXEarWkRCCffhjgXc0qjBtXpqJhTBohMUjUQnbBr0xqX3vEKudc4iviTewcJo5ajcec5+wdJw==";
      };
      dependencies = {
        "nanoid" = "3.3.6";
        "picocolors" = "1.0.0";
        "source-map-js" = "1.0.2";
      };
      peerDependencies = [];
    };
    "postgres-array@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "postgres-array";
      src = {
        name = "postgres-array-2.0.0.tgz";
        url = "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz";
        hash = "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "postgres-bytea@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "postgres-bytea";
      src = {
        name = "postgres-bytea-1.0.0.tgz";
        url = "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.0.tgz";
        hash = "sha512-xy3pmLuQqRBZBXDULy7KbaitYqLcmxigw14Q5sj8QBVLqEwXfeybIKVWiqAXTlcvdvb0+xkOtDbfQMOf4lST1w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "postgres-date@1.0.7" = {
      type = "remote";
      version = "1.0.7";
      name = "postgres-date";
      src = {
        name = "postgres-date-1.0.7.tgz";
        url = "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz";
        hash = "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "postgres-interval@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "postgres-interval";
      src = {
        name = "postgres-interval-1.2.0.tgz";
        url = "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz";
        hash = "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==";
      };
      dependencies = {
        "xtend" = "4.0.2";
      };
      peerDependencies = [];
    };
    "process-nextick-args@2.0.1" = {
      type = "remote";
      version = "2.0.1";
      name = "process-nextick-args";
      src = {
        name = "process-nextick-args-2.0.1.tgz";
        url = "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz";
        hash = "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "prop-types@15.8.1" = {
      type = "remote";
      version = "15.8.1";
      name = "prop-types";
      src = {
        name = "prop-types-15.8.1.tgz";
        url = "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz";
        hash = "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
        "object-assign" = "4.1.1";
        "react-is" = "16.13.1";
      };
      peerDependencies = [];
    };
    "proxy-addr@2.0.7" = {
      type = "remote";
      version = "2.0.7";
      name = "proxy-addr";
      src = {
        name = "proxy-addr-2.0.7.tgz";
        url = "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz";
        hash = "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==";
      };
      dependencies = {
        "forwarded" = "0.2.0";
        "ipaddr.js" = "1.9.1";
      };
      peerDependencies = [];
    };
    "pstree.remy@1.1.8" = {
      type = "remote";
      version = "1.1.8";
      name = "pstree.remy";
      src = {
        name = "pstree.remy-1.1.8.tgz";
        url = "https://registry.npmjs.org/pstree.remy/-/pstree.remy-1.1.8.tgz";
        hash = "sha512-77DZwxQmxKnu3aR542U+X8FypNzbfJ+C5XQDk3uWjWxn6151aIMGthWYRXTqT1E5oJvg+ljaa2OJi+VfvCOQ8w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "pure-rand@6.0.2" = {
      type = "remote";
      version = "6.0.2";
      name = "pure-rand";
      src = {
        name = "pure-rand-6.0.2.tgz";
        url = "https://registry.npmjs.org/pure-rand/-/pure-rand-6.0.2.tgz";
        hash = "sha512-6Yg0ekpKICSjPswYOuC5sku/TSWaRYlA0qsXqJgM/d/4pLPHPuTxK7Nbf7jFKzAeedUhR8C7K9Uv63FBsSo8xQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "qs@6.11.0" = {
      type = "remote";
      version = "6.11.0";
      name = "qs";
      src = {
        name = "qs-6.11.0.tgz";
        url = "https://registry.npmjs.org/qs/-/qs-6.11.0.tgz";
        hash = "sha512-MvjoMCJwEarSbUYk5O+nmoSzSutSsTwF85zcHPQ9OrlFoZOYIjaqBAJIqIXjptyD5vThxGq52Xu/MaJzRkIk4Q==";
      };
      dependencies = {
        "side-channel" = "1.0.4";
      };
      peerDependencies = [];
    };
    "queue-microtask@1.2.3" = {
      type = "remote";
      version = "1.2.3";
      name = "queue-microtask";
      src = {
        name = "queue-microtask-1.2.3.tgz";
        url = "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz";
        hash = "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "random-bytes@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "random-bytes";
      src = {
        name = "random-bytes-1.0.0.tgz";
        url = "https://registry.npmjs.org/random-bytes/-/random-bytes-1.0.0.tgz";
        hash = "sha512-iv7LhNVO047HzYR3InF6pUcUsPQiHTM1Qal51DcGSuZFBil1aBBWG5eHPNek7bvILMaYJ/8RU1e8w1AMdHmLQQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "range-parser@1.2.1" = {
      type = "remote";
      version = "1.2.1";
      name = "range-parser";
      src = {
        name = "range-parser-1.2.1.tgz";
        url = "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz";
        hash = "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "raw-body@2.5.1" = {
      type = "remote";
      version = "2.5.1";
      name = "raw-body";
      src = {
        name = "raw-body-2.5.1.tgz";
        url = "https://registry.npmjs.org/raw-body/-/raw-body-2.5.1.tgz";
        hash = "sha512-qqJBtEyVgS0ZmPGdCFPWJ3FreoqvG4MVQln/kCgF7Olq95IbOp0/BWyMwbdtn4VTvkM8Y7khCQ2Xgk/tcrCXig==";
      };
      dependencies = {
        "bytes" = "3.1.2";
        "http-errors" = "2.0.0";
        "iconv-lite" = "0.4.24";
        "unpipe" = "1.0.0";
      };
      peerDependencies = [];
    };
    "react-devtools-core@4.28.5" = {
      type = "remote";
      version = "4.28.5";
      name = "react-devtools-core";
      src = {
        name = "react-devtools-core-4.28.5.tgz";
        url = "https://registry.npmjs.org/react-devtools-core/-/react-devtools-core-4.28.5.tgz";
        hash = "sha512-cq/o30z9W2Wb4rzBefjv5fBalHU0rJGZCHAkf/RHSBWSSYwh8PlQTqqOJmgIIbBtpj27T6FIPXeomIjZtCNVqA==";
      };
      dependencies = {
        "shell-quote" = "1.8.1";
        "ws" = "7.5.9";
      };
      peerDependencies = [];
    };
    "react-dom@18.2.0" = {
      type = "remote";
      version = "18.2.0";
      name = "react-dom";
      src = {
        name = "react-dom-18.2.0.tgz";
        url = "https://registry.npmjs.org/react-dom/-/react-dom-18.2.0.tgz";
        hash = "sha512-6IMTriUmvsjHUjNtEDudZfuDQUoWXVxKHhlEGSk81n4YFS+r/Kl99wXiwlVXtPBtJenozv2P+hxDsw9eA7Xo6g==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
        "react" = "18.2.0";
        "scheduler" = "0.23.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "react-is@16.13.1" = {
      type = "remote";
      version = "16.13.1";
      name = "react-is";
      src = {
        name = "react-is-16.13.1.tgz";
        url = "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz";
        hash = "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "react-reconciler@0.26.2" = {
      type = "remote";
      version = "0.26.2";
      name = "react-reconciler";
      src = {
        name = "react-reconciler-0.26.2.tgz";
        url = "https://registry.npmjs.org/react-reconciler/-/react-reconciler-0.26.2.tgz";
        hash = "sha512-nK6kgY28HwrMNwDnMui3dvm3rCFjZrcGiuwLc5COUipBK5hWHLOxMJhSnSomirqWwjPBJKV1QcbkI0VJr7Gl1Q==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
        "object-assign" = "4.1.1";
        "react" = "17.0.2";
        "scheduler" = "0.20.2";
      };
      peerDependencies = [
        "react"
      ];
    };
    "react-refresh@0.14.0" = {
      type = "remote";
      version = "0.14.0";
      name = "react-refresh";
      src = {
        name = "react-refresh-0.14.0.tgz";
        url = "https://registry.npmjs.org/react-refresh/-/react-refresh-0.14.0.tgz";
        hash = "sha512-wViHqhAd8OHeLS/IRMJjTSDHF3U9eWi62F/MledQGPdJGDhodXJ9PBLNGr6WWL7qlH12Mt3TyTpbS+hGXMjCzQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "react-router-dom@6.11.1" = {
      type = "remote";
      version = "6.11.1";
      name = "react-router-dom";
      src = {
        name = "react-router-dom-6.11.1.tgz";
        url = "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.11.1.tgz";
        hash = "sha512-dPC2MhoPeTQ1YUOt5uIK376SMNWbwUxYRWk2ZmTT4fZfwlOvabF8uduRKKJIyfkCZvMgiF0GSCQckmkGGijIrg==";
      };
      dependencies = {
        "@remix-run/router" = "1.6.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-router" = "6.11.1";
      };
      peerDependencies = [
        "react"
        "react-dom"
      ];
    };
    "react-router@6.11.1" = {
      type = "remote";
      version = "6.11.1";
      name = "react-router";
      src = {
        name = "react-router-6.11.1.tgz";
        url = "https://registry.npmjs.org/react-router/-/react-router-6.11.1.tgz";
        hash = "sha512-OZINSdjJ2WgvAi7hgNLazrEV8SGn6xrKA+MkJe9wVDMZ3zQ6fdJocUjpCUCI0cNrelWjcvon0S/QK/j0NzL3KA==";
      };
      dependencies = {
        "@remix-run/router" = "1.6.1";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "react@17.0.2" = {
      type = "remote";
      version = "17.0.2";
      name = "react";
      src = {
        name = "react-17.0.2.tgz";
        url = "https://registry.npmjs.org/react/-/react-17.0.2.tgz";
        hash = "sha512-gnhPt75i/dq/z3/6q/0asP78D0u592D5L1pd7M8P+dck6Fu/jJeL6iVVK23fptSUZj8Vjf++7wXA8UNclGQcbA==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
        "object-assign" = "4.1.1";
      };
      peerDependencies = [];
    };
    "react@18.2.0" = {
      type = "remote";
      version = "18.2.0";
      name = "react";
      src = {
        name = "react-18.2.0.tgz";
        url = "https://registry.npmjs.org/react/-/react-18.2.0.tgz";
        hash = "sha512-/3IjMdb2L9QbBdWiW5e3P2/npwMBaU9mHCSCUzNln0ZCYbcfTsGbTJrU/kGemdH2IWmB2ioZ+zkxtmq6g09fGQ==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
      };
      peerDependencies = [];
    };
    "read-cache@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "read-cache";
      src = {
        name = "read-cache-1.0.0.tgz";
        url = "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz";
        hash = "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==";
      };
      dependencies = {
        "pify" = "2.3.0";
      };
      peerDependencies = [];
    };
    "readable-stream@2.3.8" = {
      type = "remote";
      version = "2.3.8";
      name = "readable-stream";
      src = {
        name = "readable-stream-2.3.8.tgz";
        url = "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.8.tgz";
        hash = "sha512-8p0AUk4XODgIewSi0l8Epjs+EVnWiK7NoDIEGU0HhE7+ZyY8D1IMY7odu5lRrFXGg71L15KG8QrPmum45RTtdA==";
      };
      dependencies = {
        "core-util-is" = "1.0.3";
        "inherits" = "2.0.4";
        "isarray" = "1.0.0";
        "process-nextick-args" = "2.0.1";
        "safe-buffer" = "5.1.2";
        "string_decoder" = "1.1.1";
        "util-deprecate" = "1.0.2";
      };
      peerDependencies = [];
    };
    "readdirp@3.6.0" = {
      type = "remote";
      version = "3.6.0";
      name = "readdirp";
      src = {
        name = "readdirp-3.6.0.tgz";
        url = "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz";
        hash = "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==";
      };
      dependencies = {
        "picomatch" = "2.3.1";
      };
      peerDependencies = [];
    };
    "redis@4.6.8" = {
      type = "remote";
      version = "4.6.8";
      name = "redis";
      src = {
        name = "redis-4.6.8.tgz";
        url = "https://registry.npmjs.org/redis/-/redis-4.6.8.tgz";
        hash = "sha512-S7qNkPUYrsofQ0ztWlTHSaK0Qqfl1y+WMIxrzeAGNG+9iUZB4HGeBgkHxE6uJJ6iXrkvLd1RVJ2nvu6H1sAzfQ==";
      };
      dependencies = {
        "@redis/bloom" = "1.2.0";
        "@redis/client" = "1.5.9";
        "@redis/graph" = "1.1.0";
        "@redis/json" = "1.0.4";
        "@redis/search" = "1.1.3";
        "@redis/time-series" = "1.0.5";
      };
      peerDependencies = [];
    };
    "require-directory@2.1.1" = {
      type = "remote";
      version = "2.1.1";
      name = "require-directory";
      src = {
        name = "require-directory-2.1.1.tgz";
        url = "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz";
        hash = "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "resolve@1.22.2" = {
      type = "remote";
      version = "1.22.2";
      name = "resolve";
      src = {
        name = "resolve-1.22.2.tgz";
        url = "https://registry.npmjs.org/resolve/-/resolve-1.22.2.tgz";
        hash = "sha512-Sb+mjNHOULsBv818T40qSPeRiuWLyaGMa5ewydRLFimneixmVy2zdivRl+AF6jaYPC8ERxGDmFSiqui6SfPd+g==";
      };
      dependencies = {
        "is-core-module" = "2.12.0";
        "path-parse" = "1.0.7";
        "supports-preserve-symlinks-flag" = "1.0.0";
      };
      peerDependencies = [];
    };
    "restore-cursor@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "restore-cursor";
      src = {
        name = "restore-cursor-3.1.0.tgz";
        url = "https://registry.npmjs.org/restore-cursor/-/restore-cursor-3.1.0.tgz";
        hash = "sha512-l+sSefzHpj5qimhFSE5a8nufZYAM3sBSVMAPtYkmC+4EH2anSGaEMXSD0izRQbu9nfyQ9y5JrVmp7E8oZrUjvA==";
      };
      dependencies = {
        "onetime" = "5.1.2";
        "signal-exit" = "3.0.7";
      };
      peerDependencies = [];
    };
    "reusify@1.0.4" = {
      type = "remote";
      version = "1.0.4";
      name = "reusify";
      src = {
        name = "reusify-1.0.4.tgz";
        url = "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz";
        hash = "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "rollup@3.21.7" = {
      type = "remote";
      version = "3.21.7";
      name = "rollup";
      src = {
        name = "rollup-3.21.7.tgz";
        url = "https://registry.npmjs.org/rollup/-/rollup-3.21.7.tgz";
        hash = "sha512-KXPaEuR8FfUoK2uHwNjxTmJ18ApyvD6zJpYv9FOJSqLStmt6xOY84l1IjK2dSolQmoXknrhEFRaPRgOPdqCT5w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "run-parallel@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "run-parallel";
      src = {
        name = "run-parallel-1.2.0.tgz";
        url = "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz";
        hash = "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==";
      };
      dependencies = {
        "queue-microtask" = "1.2.3";
      };
      peerDependencies = [];
    };
    "safe-buffer@5.1.2" = {
      type = "remote";
      version = "5.1.2";
      name = "safe-buffer";
      src = {
        name = "safe-buffer-5.1.2.tgz";
        url = "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz";
        hash = "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "safe-buffer@5.2.1" = {
      type = "remote";
      version = "5.2.1";
      name = "safe-buffer";
      src = {
        name = "safe-buffer-5.2.1.tgz";
        url = "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz";
        hash = "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "safer-buffer@2.1.2" = {
      type = "remote";
      version = "2.1.2";
      name = "safer-buffer";
      src = {
        name = "safer-buffer-2.1.2.tgz";
        url = "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz";
        hash = "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "scheduler@0.20.2" = {
      type = "remote";
      version = "0.20.2";
      name = "scheduler";
      src = {
        name = "scheduler-0.20.2.tgz";
        url = "https://registry.npmjs.org/scheduler/-/scheduler-0.20.2.tgz";
        hash = "sha512-2eWfGgAqqWFGqtdMmcL5zCMK1U8KlXv8SQFGglL3CEtd0aDVDWgeF/YoCmvln55m5zSk3J/20hTaSBeSObsQDQ==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
        "object-assign" = "4.1.1";
      };
      peerDependencies = [];
    };
    "scheduler@0.23.0" = {
      type = "remote";
      version = "0.23.0";
      name = "scheduler";
      src = {
        name = "scheduler-0.23.0.tgz";
        url = "https://registry.npmjs.org/scheduler/-/scheduler-0.23.0.tgz";
        hash = "sha512-CtuThmgHNg7zIZWAXi3AsyIzA3n4xx7aNyjwC2VJldO2LMVDhFK+63xGqq6CsJH4rTAt6/M+N4GhZiDYPx9eUw==";
      };
      dependencies = {
        "loose-envify" = "1.4.0";
      };
      peerDependencies = [];
    };
    "semver@4.3.2" = {
      type = "remote";
      version = "4.3.2";
      name = "semver";
      src = {
        name = "semver-4.3.2.tgz";
        url = "https://registry.npmjs.org/semver/-/semver-4.3.2.tgz";
        hash = "sha512-VyFUffiBx8hABJ9HYSTXLRwyZtdDHMzMtFmID1aiNAD2BZppBmJm0Hqw3p2jkgxP9BNt1pQ9RnC49P0EcXf6cA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "semver@5.7.1" = {
      type = "remote";
      version = "5.7.1";
      name = "semver";
      src = {
        name = "semver-5.7.1.tgz";
        url = "https://registry.npmjs.org/semver/-/semver-5.7.1.tgz";
        hash = "sha512-sauaDf/PZdVgrLTNYHRtpXa1iRiKcaebiKQ1BJdpQlWH2lCvexQdX55snPFyK7QzpudqbCI0qXFfOasHdyNDGQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "semver@6.3.0" = {
      type = "remote";
      version = "6.3.0";
      name = "semver";
      src = {
        name = "semver-6.3.0.tgz";
        url = "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz";
        hash = "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "semver@7.0.0" = {
      type = "remote";
      version = "7.0.0";
      name = "semver";
      src = {
        name = "semver-7.0.0.tgz";
        url = "https://registry.npmjs.org/semver/-/semver-7.0.0.tgz";
        hash = "sha512-+GB6zVA9LWh6zovYQLALHwv5rb2PHGlJi3lfiqIHxR0uuwCgefcOJc59v9fv1w8GbStwxuuqqAjI9NMAOOgq1A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "semver@7.5.1" = {
      type = "remote";
      version = "7.5.1";
      name = "semver";
      src = {
        name = "semver-7.5.1.tgz";
        url = "https://registry.npmjs.org/semver/-/semver-7.5.1.tgz";
        hash = "sha512-Wvss5ivl8TMRZXXESstBA4uR5iXgEN/VC5/sOcuXdVLzcdkz4HWetIoRfG5gb5X+ij/G9rw9YoGn3QoQ8OCSpw==";
      };
      dependencies = {
        "lru-cache" = "6.0.0";
      };
      peerDependencies = [];
    };
    "send@0.18.0" = {
      type = "remote";
      version = "0.18.0";
      name = "send";
      src = {
        name = "send-0.18.0.tgz";
        url = "https://registry.npmjs.org/send/-/send-0.18.0.tgz";
        hash = "sha512-qqWzuOjSFOuqPjFe4NOsMLafToQQwBSOEpS+FwEt3A2V3vKubTquT3vmLTQpFgMXp8AlFWFuP1qKaJZOtPpVXg==";
      };
      dependencies = {
        "debug" = "2.6.9";
        "depd" = "2.0.0";
        "destroy" = "1.2.0";
        "encodeurl" = "1.0.2";
        "escape-html" = "1.0.3";
        "etag" = "1.8.1";
        "fresh" = "0.5.2";
        "http-errors" = "2.0.0";
        "mime" = "1.6.0";
        "ms" = "2.1.3";
        "on-finished" = "2.4.1";
        "range-parser" = "1.2.1";
        "statuses" = "2.0.1";
      };
      peerDependencies = [];
    };
    "serve-static@1.15.0" = {
      type = "remote";
      version = "1.15.0";
      name = "serve-static";
      src = {
        name = "serve-static-1.15.0.tgz";
        url = "https://registry.npmjs.org/serve-static/-/serve-static-1.15.0.tgz";
        hash = "sha512-XGuRDNjXUijsUL0vl6nSD7cwURuzEgglbOaFuZM9g3kwDXOWVTck0jLzjPzGD+TazWbboZYu52/9/XPdUgne9g==";
      };
      dependencies = {
        "encodeurl" = "1.0.2";
        "escape-html" = "1.0.3";
        "parseurl" = "1.3.3";
        "send" = "0.18.0";
      };
      peerDependencies = [];
    };
    "setprototypeof@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "setprototypeof";
      src = {
        name = "setprototypeof-1.2.0.tgz";
        url = "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz";
        hash = "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "shell-quote@1.8.1" = {
      type = "remote";
      version = "1.8.1";
      name = "shell-quote";
      src = {
        name = "shell-quote-1.8.1.tgz";
        url = "https://registry.npmjs.org/shell-quote/-/shell-quote-1.8.1.tgz";
        hash = "sha512-6j1W9l1iAs/4xYBI1SYOVZyFcCis9b4KCLQ8fgAGG07QvzaRLVVRQvAy85yNmmZSjYjg4MWh4gNvlPujU/5LpA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "side-channel@1.0.4" = {
      type = "remote";
      version = "1.0.4";
      name = "side-channel";
      src = {
        name = "side-channel-1.0.4.tgz";
        url = "https://registry.npmjs.org/side-channel/-/side-channel-1.0.4.tgz";
        hash = "sha512-q5XPytqFEIKHkGdiMIrY10mvLRvnQh42/+GoBlFW3b2LXLE2xxJpZFdm94we0BaoV3RwJyGqg5wS7epxTv0Zvw==";
      };
      dependencies = {
        "call-bind" = "1.0.2";
        "get-intrinsic" = "1.2.1";
        "object-inspect" = "1.12.3";
      };
      peerDependencies = [];
    };
    "signal-exit@3.0.7" = {
      type = "remote";
      version = "3.0.7";
      name = "signal-exit";
      src = {
        name = "signal-exit-3.0.7.tgz";
        url = "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz";
        hash = "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "simple-update-notifier@1.1.0" = {
      type = "remote";
      version = "1.1.0";
      name = "simple-update-notifier";
      src = {
        name = "simple-update-notifier-1.1.0.tgz";
        url = "https://registry.npmjs.org/simple-update-notifier/-/simple-update-notifier-1.1.0.tgz";
        hash = "sha512-VpsrsJSUcJEseSbMHkrsrAVSdvVS5I96Qo1QAQ4FxQ9wXFcB+pjj7FB7/us9+GcgfW4ziHtYMc1J0PLczb55mg==";
      };
      dependencies = {
        "semver" = "7.0.0";
      };
      peerDependencies = [];
    };
    "slice-ansi@3.0.0" = {
      type = "remote";
      version = "3.0.0";
      name = "slice-ansi";
      src = {
        name = "slice-ansi-3.0.0.tgz";
        url = "https://registry.npmjs.org/slice-ansi/-/slice-ansi-3.0.0.tgz";
        hash = "sha512-pSyv7bSTC7ig9Dcgbw9AuRNUb5k5V6oDudjZoMBSr13qpLBG7tB+zgCkARjq7xIUgdz5P1Qe8u+rSGdouOOIyQ==";
      };
      dependencies = {
        "ansi-styles" = "4.3.0";
        "astral-regex" = "2.0.0";
        "is-fullwidth-code-point" = "3.0.0";
      };
      peerDependencies = [];
    };
    "source-map-js@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "source-map-js";
      src = {
        name = "source-map-js-1.0.2.tgz";
        url = "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz";
        hash = "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "split2@4.2.0" = {
      type = "remote";
      version = "4.2.0";
      name = "split2";
      src = {
        name = "split2-4.2.0.tgz";
        url = "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz";
        hash = "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "stack-utils@2.0.6" = {
      type = "remote";
      version = "2.0.6";
      name = "stack-utils";
      src = {
        name = "stack-utils-2.0.6.tgz";
        url = "https://registry.npmjs.org/stack-utils/-/stack-utils-2.0.6.tgz";
        hash = "sha512-XlkWvfIm6RmsWtNJx+uqtKLS8eqFbxUg0ZzLXqY0caEy9l7hruX8IpiDnjsLavoBgqCCR71TqWO8MaXYheJ3RQ==";
      };
      dependencies = {
        "escape-string-regexp" = "2.0.0";
      };
      peerDependencies = [];
    };
    "statuses@2.0.1" = {
      type = "remote";
      version = "2.0.1";
      name = "statuses";
      src = {
        name = "statuses-2.0.1.tgz";
        url = "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz";
        hash = "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "streamsearch@1.1.0" = {
      type = "remote";
      version = "1.1.0";
      name = "streamsearch";
      src = {
        name = "streamsearch-1.1.0.tgz";
        url = "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz";
        hash = "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "string-width@4.2.3" = {
      type = "remote";
      version = "4.2.3";
      name = "string-width";
      src = {
        name = "string-width-4.2.3.tgz";
        url = "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz";
        hash = "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==";
      };
      dependencies = {
        "emoji-regex" = "8.0.0";
        "is-fullwidth-code-point" = "3.0.0";
        "strip-ansi" = "6.0.1";
      };
      peerDependencies = [];
    };
    "string_decoder@1.1.1" = {
      type = "remote";
      version = "1.1.1";
      name = "string_decoder";
      src = {
        name = "string_decoder-1.1.1.tgz";
        url = "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz";
        hash = "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==";
      };
      dependencies = {
        "safe-buffer" = "5.1.2";
      };
      peerDependencies = [];
    };
    "strip-ansi@6.0.1" = {
      type = "remote";
      version = "6.0.1";
      name = "strip-ansi";
      src = {
        name = "strip-ansi-6.0.1.tgz";
        url = "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz";
        hash = "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==";
      };
      dependencies = {
        "ansi-regex" = "5.0.1";
      };
      peerDependencies = [];
    };
    "sucrase@3.34.0" = {
      type = "remote";
      version = "3.34.0";
      name = "sucrase";
      src = {
        name = "sucrase-3.34.0.tgz";
        url = "https://registry.npmjs.org/sucrase/-/sucrase-3.34.0.tgz";
        hash = "sha512-70/LQEZ07TEcxiU2dz51FKaE6hCTWC6vr7FOk3Gr0U60C3shtAN+H+BFr9XlYe5xqf3RA8nrc+VIwzCfnxuXJw==";
      };
      dependencies = {
        "@jridgewell/gen-mapping" = "0.3.3";
        "commander" = "4.1.1";
        "glob" = "7.1.6";
        "lines-and-columns" = "1.2.4";
        "mz" = "2.7.0";
        "pirates" = "4.0.6";
        "ts-interface-checker" = "0.1.13";
      };
      peerDependencies = [];
    };
    "supports-color@5.5.0" = {
      type = "remote";
      version = "5.5.0";
      name = "supports-color";
      src = {
        name = "supports-color-5.5.0.tgz";
        url = "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz";
        hash = "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==";
      };
      dependencies = {
        "has-flag" = "3.0.0";
      };
      peerDependencies = [];
    };
    "supports-color@7.2.0" = {
      type = "remote";
      version = "7.2.0";
      name = "supports-color";
      src = {
        name = "supports-color-7.2.0.tgz";
        url = "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz";
        hash = "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==";
      };
      dependencies = {
        "has-flag" = "4.0.0";
      };
      peerDependencies = [];
    };
    "supports-preserve-symlinks-flag@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "supports-preserve-symlinks-flag";
      src = {
        name = "supports-preserve-symlinks-flag-1.0.0.tgz";
        url = "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz";
        hash = "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "tailwindcss@3.3.3" = {
      type = "remote";
      version = "3.3.3";
      name = "tailwindcss";
      src = {
        name = "tailwindcss-3.3.3.tgz";
        url = "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.3.3.tgz";
        hash = "sha512-A0KgSkef7eE4Mf+nKJ83i75TMyq8HqY3qmFIJSWy8bNt0v1lG7jUcpGpoTFxAwYcWOphcTBLPPJg+bDfhDf52w==";
      };
      dependencies = {
        "@alloc/quick-lru" = "5.2.0";
        "arg" = "5.0.2";
        "chokidar" = "3.5.3";
        "didyoumean" = "1.2.2";
        "dlv" = "1.1.3";
        "fast-glob" = "3.3.1";
        "glob-parent" = "6.0.2";
        "is-glob" = "4.0.3";
        "jiti" = "1.20.0";
        "lilconfig" = "2.1.0";
        "micromatch" = "4.0.5";
        "normalize-path" = "3.0.0";
        "object-hash" = "3.0.0";
        "picocolors" = "1.0.0";
        "postcss" = "8.4.29";
        "postcss-import" = "15.1.0";
        "postcss-js" = "4.0.1";
        "postcss-load-config" = "4.0.1";
        "postcss-nested" = "6.0.1";
        "postcss-selector-parser" = "6.0.13";
        "resolve" = "1.22.2";
        "sucrase" = "3.34.0";
      };
      peerDependencies = [];
    };
    "thenify-all@1.6.0" = {
      type = "remote";
      version = "1.6.0";
      name = "thenify-all";
      src = {
        name = "thenify-all-1.6.0.tgz";
        url = "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz";
        hash = "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==";
      };
      dependencies = {
        "thenify" = "3.3.1";
      };
      peerDependencies = [];
    };
    "thenify@3.3.1" = {
      type = "remote";
      version = "3.3.1";
      name = "thenify";
      src = {
        name = "thenify-3.3.1.tgz";
        url = "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz";
        hash = "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==";
      };
      dependencies = {
        "any-promise" = "1.3.0";
      };
      peerDependencies = [];
    };
    "timeago.js@4.0.2" = {
      type = "remote";
      version = "4.0.2";
      name = "timeago.js";
      src = {
        name = "timeago.js-4.0.2.tgz";
        url = "https://registry.npmjs.org/timeago.js/-/timeago.js-4.0.2.tgz";
        hash = "sha512-a7wPxPdVlQL7lqvitHGGRsofhdwtkoSXPGATFuSOA2i1ZNQEPLrGnj68vOp2sOJTCFAQVXPeNMX/GctBaO9L2w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "tinycolor2@1.6.0" = {
      type = "remote";
      version = "1.6.0";
      name = "tinycolor2";
      src = {
        name = "tinycolor2-1.6.0.tgz";
        url = "https://registry.npmjs.org/tinycolor2/-/tinycolor2-1.6.0.tgz";
        hash = "sha512-XPaBkWQJdsf3pLKJV9p4qN/S+fm2Oj8AIPo1BTUhg5oxkvm9+SVEGFdhyOz7tTdUTfvxMiAs4sp6/eZO2Ew+pw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "tinygradient@0.4.3" = {
      type = "remote";
      version = "0.4.3";
      name = "tinygradient";
      src = {
        name = "tinygradient-0.4.3.tgz";
        url = "https://registry.npmjs.org/tinygradient/-/tinygradient-0.4.3.tgz";
        hash = "sha512-tBPYQSs6eWukzzAITBSmqcOwZCKACvRa/XjPPh1mj4mnx4G3Drm51HxyCTU/TKnY8kG4hmTe5QlOh9O82aNtJQ==";
      };
      dependencies = {
        "@types/tinycolor2" = "1.4.6";
        "tinycolor2" = "1.6.0";
      };
      peerDependencies = [];
    };
    "to-fast-properties@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "to-fast-properties";
      src = {
        name = "to-fast-properties-2.0.0.tgz";
        url = "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz";
        hash = "sha512-/OaKK0xYrs3DmxRYqL/yDc+FxFUVYhDlXMhRmv3z915w2HF1tnN1omB354j8VUGO/hbRzyD6Y3sA7v7GS/ceog==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "to-regex-range@5.0.1" = {
      type = "remote";
      version = "5.0.1";
      name = "to-regex-range";
      src = {
        name = "to-regex-range-5.0.1.tgz";
        url = "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz";
        hash = "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==";
      };
      dependencies = {
        "is-number" = "7.0.0";
      };
      peerDependencies = [];
    };
    "toidentifier@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "toidentifier";
      src = {
        name = "toidentifier-1.0.1.tgz";
        url = "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz";
        hash = "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "touch@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "touch";
      src = {
        name = "touch-3.1.0.tgz";
        url = "https://registry.npmjs.org/touch/-/touch-3.1.0.tgz";
        hash = "sha512-WBx8Uy5TLtOSRtIq+M03/sKDrXCLHxwDcquSP2c43Le03/9serjQBIztjRz6FkJez9D/hleyAXTBGLwwZUw9lA==";
      };
      dependencies = {
        "nopt" = "1.0.10";
      };
      peerDependencies = [];
    };
    "tree-kill@1.2.2" = {
      type = "remote";
      version = "1.2.2";
      name = "tree-kill";
      src = {
        name = "tree-kill-1.2.2.tgz";
        url = "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz";
        hash = "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ts-adt@2.1.2" = {
      type = "remote";
      version = "2.1.2";
      name = "ts-adt";
      src = {
        name = "ts-adt-2.1.2.tgz";
        url = "https://registry.npmjs.org/ts-adt/-/ts-adt-2.1.2.tgz";
        hash = "sha512-UD0lr7eyiBjxogQjb1xMCjF7skrnxGZLNm4iROeU3ky5tJzXN0yQkkS4DfNGfM4RaUGMhgyrzf2wUynqK8AdWQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ts-interface-checker@0.1.13" = {
      type = "remote";
      version = "0.1.13";
      name = "ts-interface-checker";
      src = {
        name = "ts-interface-checker-0.1.13.tgz";
        url = "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz";
        hash = "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ts-node@10.9.1" = {
      type = "remote";
      version = "10.9.1";
      name = "ts-node";
      src = {
        name = "ts-node-10.9.1.tgz";
        url = "https://registry.npmjs.org/ts-node/-/ts-node-10.9.1.tgz";
        hash = "sha512-NtVysVPkxxrwFGUUxGYhfux8k78pQB3JqYBXlLRZgdGUqTO5wU/UyHop5p70iEbGhB7q5KmiZiU0Y3KlJrScEw==";
      };
      dependencies = {
        "@cspotcode/source-map-support" = "0.8.1";
        "@tsconfig/node10" = "1.0.9";
        "@tsconfig/node12" = "1.0.11";
        "@tsconfig/node14" = "1.0.3";
        "@tsconfig/node16" = "1.0.4";
        "@types/node" = "20.6.2";
        "acorn" = "8.8.2";
        "acorn-walk" = "8.2.0";
        "arg" = "4.1.3";
        "create-require" = "1.1.1";
        "diff" = "4.0.2";
        "make-error" = "1.3.6";
        "typescript" = "5.1.3";
        "v8-compile-cache-lib" = "3.0.1";
        "yn" = "3.1.1";
      };
      peerDependencies = [
        "@swc/core"
        "@swc/wasm"
        "@types/node"
        "typescript"
      ];
    };
    "type-fest@0.12.0" = {
      type = "remote";
      version = "0.12.0";
      name = "type-fest";
      src = {
        name = "type-fest-0.12.0.tgz";
        url = "https://registry.npmjs.org/type-fest/-/type-fest-0.12.0.tgz";
        hash = "sha512-53RyidyjvkGpnWPMF9bQgFtWp+Sl8O2Rp13VavmJgfAP9WWG6q6TkrKU8iyJdnwnfgHI6k2hTlgqH4aSdjoTbg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "type-fest@0.21.3" = {
      type = "remote";
      version = "0.21.3";
      name = "type-fest";
      src = {
        name = "type-fest-0.21.3.tgz";
        url = "https://registry.npmjs.org/type-fest/-/type-fest-0.21.3.tgz";
        hash = "sha512-t0rzBq87m3fVcduHDUFhKmyyX+9eo6WQjZvf51Ea/M0Q7+T374Jp1aUiyUl0GKxp8M/OETVHSDvmkyPgvX+X2w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "type-is@1.6.18" = {
      type = "remote";
      version = "1.6.18";
      name = "type-is";
      src = {
        name = "type-is-1.6.18.tgz";
        url = "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz";
        hash = "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==";
      };
      dependencies = {
        "media-typer" = "0.3.0";
        "mime-types" = "2.1.35";
      };
      peerDependencies = [];
    };
    "typedarray@0.0.6" = {
      type = "remote";
      version = "0.0.6";
      name = "typedarray";
      src = {
        name = "typedarray-0.0.6.tgz";
        url = "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz";
        hash = "sha512-/aCDEGatGvZ2BIk+HmLf4ifCJFwvKFNb9/JeZPMulfgFracn9QFcAf5GO8B/mweUjSoblS5In0cWhqpfs/5PQA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "typescript@5.1.3" = {
      type = "remote";
      version = "5.1.3";
      name = "typescript";
      src = {
        name = "typescript-5.1.3.tgz";
        url = "https://registry.npmjs.org/typescript/-/typescript-5.1.3.tgz";
        hash = "sha512-XH627E9vkeqhlZFQuL+UsyAXEnibT0kWR2FWONlr4sTjvxyJYnyefgrkyECLzM5NenmKzRAy2rR/OlYLA1HkZw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "typescript@5.3.3" = {
      type = "remote";
      version = "5.3.3";
      name = "typescript";
      src = {
        name = "typescript-5.3.3.tgz";
        url = "https://registry.npmjs.org/typescript/-/typescript-5.3.3.tgz";
        hash = "sha512-pXWcraxM0uxAS+tN0AG/BF2TyqmHO014Z070UsJ+pFvYuRSq8KH8DmWpnbXe0pEPDHXZV3FcAbJkijJ5oNEnWw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "uid-safe@2.1.5" = {
      type = "remote";
      version = "2.1.5";
      name = "uid-safe";
      src = {
        name = "uid-safe-2.1.5.tgz";
        url = "https://registry.npmjs.org/uid-safe/-/uid-safe-2.1.5.tgz";
        hash = "sha512-KPHm4VL5dDXKz01UuEd88Df+KzynaohSL9fBh096KWAxSKZQDI2uBrVqtvRM4rwrIrRRKsdLNML/lnaaVSRioA==";
      };
      dependencies = {
        "random-bytes" = "1.0.0";
      };
      peerDependencies = [];
    };
    "undefsafe@2.0.5" = {
      type = "remote";
      version = "2.0.5";
      name = "undefsafe";
      src = {
        name = "undefsafe-2.0.5.tgz";
        url = "https://registry.npmjs.org/undefsafe/-/undefsafe-2.0.5.tgz";
        hash = "sha512-WxONCrssBM8TSPRqN5EmsjVrsv4A8X12J4ArBiiayv3DyyG3ZlIg6yysuuSYdZsVz3TKcTg2fd//Ujd4CHV1iA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "unpipe@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "unpipe";
      src = {
        name = "unpipe-1.0.0.tgz";
        url = "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz";
        hash = "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "update-browserslist-db@1.0.11" = {
      type = "remote";
      version = "1.0.11";
      name = "update-browserslist-db";
      src = {
        name = "update-browserslist-db-1.0.11.tgz";
        url = "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.0.11.tgz";
        hash = "sha512-dCwEFf0/oT85M1fHBg4F0jtLwJrutGoHSQXCh7u4o2t1drG+c0a9Flnqww6XUKSfQMPpJBRjU8d4RXB09qtvaA==";
      };
      dependencies = {
        "browserslist" = "4.21.10";
        "escalade" = "3.1.1";
        "picocolors" = "1.0.0";
      };
      peerDependencies = [
        "browserslist"
      ];
    };
    "use-sync-external-store@1.2.0" = {
      type = "remote";
      version = "1.2.0";
      name = "use-sync-external-store";
      src = {
        name = "use-sync-external-store-1.2.0.tgz";
        url = "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.2.0.tgz";
        hash = "sha512-eEgnFxGQ1Ife9bzYs6VLi8/4X6CObHMw9Qr9tPY43iKwsPw8xE8+EFsf/2cFZ5S3esXgpWgtSCtLNS41F+sKPA==";
      };
      dependencies = {
        "react" = "18.2.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "util-deprecate@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "util-deprecate";
      src = {
        name = "util-deprecate-1.0.2.tgz";
        url = "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz";
        hash = "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "utils-merge@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "utils-merge";
      src = {
        name = "utils-merge-1.0.1.tgz";
        url = "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz";
        hash = "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "uuid@8.3.2" = {
      type = "remote";
      version = "8.3.2";
      name = "uuid";
      src = {
        name = "uuid-8.3.2.tgz";
        url = "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz";
        hash = "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "v8-compile-cache-lib@3.0.1" = {
      type = "remote";
      version = "3.0.1";
      name = "v8-compile-cache-lib";
      src = {
        name = "v8-compile-cache-lib-3.0.1.tgz";
        url = "https://registry.npmjs.org/v8-compile-cache-lib/-/v8-compile-cache-lib-3.0.1.tgz";
        hash = "sha512-wa7YjyUGfNZngI/vtK0UHAN+lgDCxBPCylVXGp0zu59Fz5aiGtNXaq3DhIov063MorB+VfufLh3JlF2KdTK3xg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "vary@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "vary";
      src = {
        name = "vary-1.1.2.tgz";
        url = "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz";
        hash = "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "vite@4.3.5" = {
      type = "remote";
      version = "4.3.5";
      name = "vite";
      src = {
        name = "vite-4.3.5.tgz";
        url = "https://registry.npmjs.org/vite/-/vite-4.3.5.tgz";
        hash = "sha512-0gEnL9wiRFxgz40o/i/eTBwm+NEbpUeTWhzKrZDSdKm6nplj+z4lKz8ANDgildxHm47Vg8EUia0aicKbawUVVA==";
      };
      dependencies = {
        "esbuild" = "0.17.19";
        "postcss" = "8.4.29";
        "rollup" = "3.21.7";
      };
      peerDependencies = [
        "@types/node"
        "less"
        "sass"
        "stylus"
        "sugarss"
        "terser"
      ];
    };
    "web-streams-polyfill@3.2.1" = {
      type = "remote";
      version = "3.2.1";
      name = "web-streams-polyfill";
      src = {
        name = "web-streams-polyfill-3.2.1.tgz";
        url = "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-3.2.1.tgz";
        hash = "sha512-e0MO3wdXWKrLbL0DgGnUV7WHVuw9OUvL4hjgnPkIeEvESk74gAITi5G606JtZPp39cd8HA9VQzCIvA49LpPN5Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "widest-line@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "widest-line";
      src = {
        name = "widest-line-3.1.0.tgz";
        url = "https://registry.npmjs.org/widest-line/-/widest-line-3.1.0.tgz";
        hash = "sha512-NsmoXalsWVDMGupxZ5R08ka9flZjjiLvHVAWYOKtiKM8ujtZWr9cRffak+uSE48+Ob8ObalXpwyeUiyDD6QFgg==";
      };
      dependencies = {
        "string-width" = "4.2.3";
      };
      peerDependencies = [];
    };
    "wrap-ansi@6.2.0" = {
      type = "remote";
      version = "6.2.0";
      name = "wrap-ansi";
      src = {
        name = "wrap-ansi-6.2.0.tgz";
        url = "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz";
        hash = "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==";
      };
      dependencies = {
        "ansi-styles" = "4.3.0";
        "string-width" = "4.2.3";
        "strip-ansi" = "6.0.1";
      };
      peerDependencies = [];
    };
    "wrap-ansi@7.0.0" = {
      type = "remote";
      version = "7.0.0";
      name = "wrap-ansi";
      src = {
        name = "wrap-ansi-7.0.0.tgz";
        url = "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz";
        hash = "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==";
      };
      dependencies = {
        "ansi-styles" = "4.3.0";
        "string-width" = "4.2.3";
        "strip-ansi" = "6.0.1";
      };
      peerDependencies = [];
    };
    "wrappy@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "wrappy";
      src = {
        name = "wrappy-1.0.2.tgz";
        url = "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz";
        hash = "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "ws@7.5.9" = {
      type = "remote";
      version = "7.5.9";
      name = "ws";
      src = {
        name = "ws-7.5.9.tgz";
        url = "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz";
        hash = "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==";
      };
      dependencies = {};
      peerDependencies = [
        "bufferutil"
        "utf-8-validate"
      ];
    };
    "xtend@4.0.2" = {
      type = "remote";
      version = "4.0.2";
      name = "xtend";
      src = {
        name = "xtend-4.0.2.tgz";
        url = "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz";
        hash = "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "y18n@5.0.8" = {
      type = "remote";
      version = "5.0.8";
      name = "y18n";
      src = {
        name = "y18n-5.0.8.tgz";
        url = "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz";
        hash = "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yallist@3.1.1" = {
      type = "remote";
      version = "3.1.1";
      name = "yallist";
      src = {
        name = "yallist-3.1.1.tgz";
        url = "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz";
        hash = "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yallist@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "yallist";
      src = {
        name = "yallist-4.0.0.tgz";
        url = "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz";
        hash = "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yaml@2.3.2" = {
      type = "remote";
      version = "2.3.2";
      name = "yaml";
      src = {
        name = "yaml-2.3.2.tgz";
        url = "https://registry.npmjs.org/yaml/-/yaml-2.3.2.tgz";
        hash = "sha512-N/lyzTPaJasoDmfV7YTrYCI0G/3ivm/9wdG0aHuheKowWQwGTsK0Eoiw6utmzAnI6pkJa0DUVygvp3spqqEKXg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yargs-parser@20.2.9" = {
      type = "remote";
      version = "20.2.9";
      name = "yargs-parser";
      src = {
        name = "yargs-parser-20.2.9.tgz";
        url = "https://registry.npmjs.org/yargs-parser/-/yargs-parser-20.2.9.tgz";
        hash = "sha512-y11nGElTIV+CT3Zv9t7VKl+Q3hTQoT9a1Qzezhhl6Rp21gJ/IVTW7Z3y9EWXhuUBC2Shnf+DX0antecpAwSP8w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yargs@16.2.0" = {
      type = "remote";
      version = "16.2.0";
      name = "yargs";
      src = {
        name = "yargs-16.2.0.tgz";
        url = "https://registry.npmjs.org/yargs/-/yargs-16.2.0.tgz";
        hash = "sha512-D1mvvtDG0L5ft/jGWkLpG1+m0eQxOfaBvTNELraWj22wSVUMWxZUvYgJYcKh6jGGIkJFhH4IZPQhR4TKpc8mBw==";
      };
      dependencies = {
        "cliui" = "7.0.4";
        "escalade" = "3.1.1";
        "get-caller-file" = "2.0.5";
        "require-directory" = "2.1.1";
        "string-width" = "4.2.3";
        "y18n" = "5.0.8";
        "yargs-parser" = "20.2.9";
      };
      peerDependencies = [];
    };
    "yn@3.1.1" = {
      type = "remote";
      version = "3.1.1";
      name = "yn";
      src = {
        name = "yn-3.1.1.tgz";
        url = "https://registry.npmjs.org/yn/-/yn-3.1.1.tgz";
        hash = "sha512-Ux4ygGWsu2c7isFWe8Yu1YluJmqVhxqK2cLXNQA5AcC3QfbGNpM7fu0Y8b/z16pXLnFxZYvWhd3fhBY9DLmC6Q==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "yoga-layout-prebuilt@1.10.0" = {
      type = "remote";
      version = "1.10.0";
      name = "yoga-layout-prebuilt";
      src = {
        name = "yoga-layout-prebuilt-1.10.0.tgz";
        url = "https://registry.npmjs.org/yoga-layout-prebuilt/-/yoga-layout-prebuilt-1.10.0.tgz";
        hash = "sha512-YnOmtSbv4MTf7RGJMK0FvZ+KD8OEe/J5BNnR0GHhD8J/XcG/Qvxgszm0Un6FTHWW4uHlTgP0IztiXQnGyIR45g==";
      };
      dependencies = {
        "@types/yoga-layout" = "1.9.2";
      };
      peerDependencies = [];
    };
    "zustand@4.4.4" = {
      type = "remote";
      version = "4.4.4";
      name = "zustand";
      src = {
        name = "zustand-4.4.4.tgz";
        url = "https://registry.npmjs.org/zustand/-/zustand-4.4.4.tgz";
        hash = "sha512-5UTUIAiHMNf5+mFp7/AnzJXS7+XxktULFN0+D1sCiZWyX7ZG+AQpqs2qpYrynRij4QvoDdCD+U+bmg/cG3Ucxw==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
        "react" = "18.2.0";
        "use-sync-external-store" = "1.2.0";
      };
      peerDependencies = [
        "@types/react"
        "immer"
        "react"
      ];
    };
  };
}