{
  local = {
    "@yaltt/backend@0.0.0" = {
      type = "local";
      version = "0.0.0";
      name = "@yaltt/backend";
      src = ./packages/backend;
      dependencies = {
        "nodemon" = "2.0.22";
        "ts-node" = "10.9.1";
        "typescript" = "5.1.3";
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
        "cookie-parser" = "1.4.6";
        "cors" = "2.8.5";
        "effect" = "2.0.0-next.29";
        "express" = "4.18.2";
        "express-session" = "1.17.3";
        "jsonwebtoken" = "9.0.0";
        "lti-model" = "0.0.0";
        "multer" = "1.4.5-lts.1";
        "passport" = "0.6.0";
        "passport-local" = "1.0.0";
        "pg" = "8.2.2";
        "ts-adt" = "2.1.2";
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
        "esbuild" = "0.17.19";
        "typescript" = "5.1.3";
        "@effect/data" = "0.17.6";
        "@effect/io" = "0.38.2";
        "@effect/match" = "0.34.0";
        "@effect/schema" = "0.33.2";
        "@effect/stm" = "0.22.0";
        "@effect/stream" = "0.34.0";
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "@mui/icons-material" = "5.11.16";
        "@mui/lab" = "5.0.0-alpha.129";
        "@mui/material" = "5.13.0";
        "@mui/system" = "5.12.3";
        "@mui/utils" = "5.12.3";
        "@react-dnd/invariant" = "4.0.2";
        "@types/mui-datatables" = "4.3.4";
        "@types/react" = "18.2.21";
        "@types/react-dom" = "18.2.4";
        "@vitejs/plugin-react" = "3.1.0";
        "@yaltt/model" = "0.0.0";
        "effect" = "2.0.0-next.29";
        "mui-datatables" = "4.3.0";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-router-dom" = "6.11.1";
        "styled-components" = "5.3.10";
        "ts-adt" = "2.1.2";
        "vite" = "4.3.5";
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
        "@fp-ts/core" = "0.1.1";
        "@fp-ts/data" = "0.1.1";
        "@fp-ts/schema" = "0.1.3";
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
    "@babel/helper-annotate-as-pure@7.18.6" = {
      type = "remote";
      version = "7.18.6";
      name = "@babel/helper-annotate-as-pure";
      src = {
        name = "helper-annotate-as-pure-7.18.6.tgz";
        url = "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.18.6.tgz";
        hash = "sha512-duORpUiYrEpzKIop6iNbjnwKLAKnJ47csTyRACyEmWj0QdUrm5aqNJGHSSEQSUAvNW0ojX0dOmK9dZduvkfeXA==";
      };
      dependencies = {
        "@babel/types" = "7.21.5";
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
        "browserslist" = "4.21.5";
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
    "@babel/runtime-corejs3@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/runtime-corejs3";
      src = {
        name = "runtime-corejs3-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/runtime-corejs3/-/runtime-corejs3-7.21.5.tgz";
        hash = "sha512-FRqFlFKNazWYykft5zvzuEl1YyTDGsIRrjV9rvxvYkUC7W/ueBng1X68Xd6uRMzAaJ0xMKn08/wem5YS1lpX8w==";
      };
      dependencies = {
        "core-js-pure" = "3.30.2";
        "regenerator-runtime" = "0.13.11";
      };
      peerDependencies = [];
    };
    "@babel/runtime@7.21.5" = {
      type = "remote";
      version = "7.21.5";
      name = "@babel/runtime";
      src = {
        name = "runtime-7.21.5.tgz";
        url = "https://registry.npmjs.org/@babel/runtime/-/runtime-7.21.5.tgz";
        hash = "sha512-8jI69toZqqcsnqGGqwGS4Qb1VwLOEp4hz+CXPywcvjs60u3B4Pom/U/7rm4W8tMOYEB+E9wgD0mW1l3r8qlI9Q==";
      };
      dependencies = {
        "regenerator-runtime" = "0.13.11";
      };
      peerDependencies = [];
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
    "@emotion/babel-plugin@11.11.0" = {
      type = "remote";
      version = "11.11.0";
      name = "@emotion/babel-plugin";
      src = {
        name = "babel-plugin-11.11.0.tgz";
        url = "https://registry.npmjs.org/@emotion/babel-plugin/-/babel-plugin-11.11.0.tgz";
        hash = "sha512-m4HEDZleaaCH+XgDDsPF15Ht6wTLsgDTeR3WYj9Q/k76JtWhrJjcP4+/XlG8LGT/Rol9qUfOIztXeA84ATpqPQ==";
      };
      dependencies = {
        "@babel/helper-module-imports" = "7.21.4";
        "@babel/runtime" = "7.21.5";
        "@emotion/hash" = "0.9.1";
        "@emotion/memoize" = "0.8.1";
        "@emotion/serialize" = "1.1.2";
        "babel-plugin-macros" = "3.1.0";
        "convert-source-map" = "1.9.0";
        "escape-string-regexp" = "4.0.0";
        "find-root" = "1.1.0";
        "source-map" = "0.5.7";
        "stylis" = "4.2.0";
      };
      peerDependencies = [];
    };
    "@emotion/cache@11.11.0" = {
      type = "remote";
      version = "11.11.0";
      name = "@emotion/cache";
      src = {
        name = "cache-11.11.0.tgz";
        url = "https://registry.npmjs.org/@emotion/cache/-/cache-11.11.0.tgz";
        hash = "sha512-P34z9ssTCBi3e9EI1ZsWpNHcfY1r09ZO0rZbRO2ob3ZQMnFI35jB536qoXbkdesr5EUhYi22anuEJuyxifaqAQ==";
      };
      dependencies = {
        "@emotion/memoize" = "0.8.1";
        "@emotion/sheet" = "1.2.2";
        "@emotion/utils" = "1.2.1";
        "@emotion/weak-memoize" = "0.3.1";
        "stylis" = "4.2.0";
      };
      peerDependencies = [];
    };
    "@emotion/hash@0.9.1" = {
      type = "remote";
      version = "0.9.1";
      name = "@emotion/hash";
      src = {
        name = "hash-0.9.1.tgz";
        url = "https://registry.npmjs.org/@emotion/hash/-/hash-0.9.1.tgz";
        hash = "sha512-gJB6HLm5rYwSLI6PQa+X1t5CFGrv1J1TWG+sOyMCeKz2ojaj6Fnl/rZEspogG+cvqbt4AE/2eIyD2QfLKTBNlQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/is-prop-valid@1.2.1" = {
      type = "remote";
      version = "1.2.1";
      name = "@emotion/is-prop-valid";
      src = {
        name = "is-prop-valid-1.2.1.tgz";
        url = "https://registry.npmjs.org/@emotion/is-prop-valid/-/is-prop-valid-1.2.1.tgz";
        hash = "sha512-61Mf7Ufx4aDxx1xlDeOm8aFFigGHE4z+0sKCa+IHCeZKiyP9RLD0Mmx7m8b9/Cf37f7NAvQOOJAbQQGVr5uERw==";
      };
      dependencies = {
        "@emotion/memoize" = "0.8.1";
      };
      peerDependencies = [];
    };
    "@emotion/memoize@0.8.1" = {
      type = "remote";
      version = "0.8.1";
      name = "@emotion/memoize";
      src = {
        name = "memoize-0.8.1.tgz";
        url = "https://registry.npmjs.org/@emotion/memoize/-/memoize-0.8.1.tgz";
        hash = "sha512-W2P2c/VRW1/1tLox0mVUalvnWXxavmv/Oum2aPsRcoDJuob75FC3Y8FbpfLwUegRcxINtGUMPq0tFCvYNTBXNA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/react@11.11.0" = {
      type = "remote";
      version = "11.11.0";
      name = "@emotion/react";
      src = {
        name = "react-11.11.0.tgz";
        url = "https://registry.npmjs.org/@emotion/react/-/react-11.11.0.tgz";
        hash = "sha512-ZSK3ZJsNkwfjT3JpDAWJZlrGD81Z3ytNDsxw1LKq1o+xkmO5pnWfr6gmCC8gHEFf3nSSX/09YrG67jybNPxSUw==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/babel-plugin" = "11.11.0";
        "@emotion/cache" = "11.11.0";
        "@emotion/serialize" = "1.1.2";
        "@emotion/use-insertion-effect-with-fallbacks" = "1.0.1";
        "@emotion/utils" = "1.2.1";
        "@emotion/weak-memoize" = "0.3.1";
        "@types/react" = "18.2.21";
        "hoist-non-react-statics" = "3.3.2";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@types/react"
        "react"
      ];
    };
    "@emotion/serialize@1.1.2" = {
      type = "remote";
      version = "1.1.2";
      name = "@emotion/serialize";
      src = {
        name = "serialize-1.1.2.tgz";
        url = "https://registry.npmjs.org/@emotion/serialize/-/serialize-1.1.2.tgz";
        hash = "sha512-zR6a/fkFP4EAcCMQtLOhIgpprZOwNmCldtpaISpvz348+DP4Mz8ZoKaGGCQpbzepNIUWbq4w6hNZkwDyKoS+HA==";
      };
      dependencies = {
        "@emotion/hash" = "0.9.1";
        "@emotion/memoize" = "0.8.1";
        "@emotion/unitless" = "0.8.1";
        "@emotion/utils" = "1.2.1";
        "csstype" = "3.1.2";
      };
      peerDependencies = [];
    };
    "@emotion/sheet@1.2.2" = {
      type = "remote";
      version = "1.2.2";
      name = "@emotion/sheet";
      src = {
        name = "sheet-1.2.2.tgz";
        url = "https://registry.npmjs.org/@emotion/sheet/-/sheet-1.2.2.tgz";
        hash = "sha512-0QBtGvaqtWi+nx6doRwDdBIzhNdZrXUppvTM4dtZZWEGTXL/XE/yJxLMGlDT1Gt+UHH5IX1n+jkXyytE/av7OA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/styled@11.11.0" = {
      type = "remote";
      version = "11.11.0";
      name = "@emotion/styled";
      src = {
        name = "styled-11.11.0.tgz";
        url = "https://registry.npmjs.org/@emotion/styled/-/styled-11.11.0.tgz";
        hash = "sha512-hM5Nnvu9P3midq5aaXj4I+lnSfNi7Pmd4EWk1fOZ3pxookaQTNew6bp4JaCBYM4HVFZF9g7UjJmsUmC2JlxOng==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/babel-plugin" = "11.11.0";
        "@emotion/is-prop-valid" = "1.2.1";
        "@emotion/react" = "11.11.0";
        "@emotion/serialize" = "1.1.2";
        "@emotion/use-insertion-effect-with-fallbacks" = "1.0.1";
        "@emotion/utils" = "1.2.1";
        "@types/react" = "18.2.21";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@emotion/react"
        "@types/react"
        "react"
      ];
    };
    "@emotion/stylis@0.8.5" = {
      type = "remote";
      version = "0.8.5";
      name = "@emotion/stylis";
      src = {
        name = "stylis-0.8.5.tgz";
        url = "https://registry.npmjs.org/@emotion/stylis/-/stylis-0.8.5.tgz";
        hash = "sha512-h6KtPihKFn3T9fuIrwvXXUOwlx3rfUvfZIcP5a6rh8Y7zjE3O06hT5Ss4S/YI1AYhuZ1kjaE/5EaOOI2NqSylQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/unitless@0.7.5" = {
      type = "remote";
      version = "0.7.5";
      name = "@emotion/unitless";
      src = {
        name = "unitless-0.7.5.tgz";
        url = "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.7.5.tgz";
        hash = "sha512-OWORNpfjMsSSUBVrRBVGECkhWcULOAJz9ZW8uK9qgxD+87M7jHRcvh/A96XXNhXTLmKcoYSQtBEX7lHMO7YRwg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/unitless@0.8.1" = {
      type = "remote";
      version = "0.8.1";
      name = "@emotion/unitless";
      src = {
        name = "unitless-0.8.1.tgz";
        url = "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.8.1.tgz";
        hash = "sha512-KOEGMu6dmJZtpadb476IsZBclKvILjopjUii3V+7MnXIQCYh8W3NgNcgwo21n9LXZX6EDIKvqfjYxXebDwxKmQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/use-insertion-effect-with-fallbacks@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "@emotion/use-insertion-effect-with-fallbacks";
      src = {
        name = "use-insertion-effect-with-fallbacks-1.0.1.tgz";
        url = "https://registry.npmjs.org/@emotion/use-insertion-effect-with-fallbacks/-/use-insertion-effect-with-fallbacks-1.0.1.tgz";
        hash = "sha512-jT/qyKZ9rzLErtrjGgdkMBn2OP8wl0G3sQlBb3YPryvKHsjvINUhVaPFfP+fpBcOkmrVOVEEHQFJ7nbj2TH2gw==";
      };
      dependencies = {
        "react" = "18.2.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "@emotion/utils@1.2.1" = {
      type = "remote";
      version = "1.2.1";
      name = "@emotion/utils";
      src = {
        name = "utils-1.2.1.tgz";
        url = "https://registry.npmjs.org/@emotion/utils/-/utils-1.2.1.tgz";
        hash = "sha512-Y2tGf3I+XVnajdItskUCn6LX+VUDmP6lTL4fcqsXAv43dnlbZiuW4MWQW38rW/BVWSE7Q/7+XQocmpnRYILUmg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@emotion/weak-memoize@0.3.1" = {
      type = "remote";
      version = "0.3.1";
      name = "@emotion/weak-memoize";
      src = {
        name = "weak-memoize-0.3.1.tgz";
        url = "https://registry.npmjs.org/@emotion/weak-memoize/-/weak-memoize-0.3.1.tgz";
        hash = "sha512-EsBwpc7hBUJWAsNPBmJy4hxWx12v6bshQsldrVmjxJoc3isbxhOrF2IcCpaXxfvq03NwkI7sbsOLXbYuqF/8Ww==";
      };
      dependencies = {};
      peerDependencies = [];
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
    "@fp-ts/core@0.1.1" = {
      type = "remote";
      version = "0.1.1";
      name = "@fp-ts/core";
      src = {
        name = "core-0.1.1.tgz";
        url = "https://registry.npmjs.org/@fp-ts/core/-/core-0.1.1.tgz";
        hash = "sha512-7vQnrnvJAMrXgIwt0qQNhXkPDtm4l8vwql8EvXeY47v/FwnWpDvt1HISoO9Kq3am5SZ0A8Av+4NqPab2FRdKxw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@fp-ts/data@0.1.1" = {
      type = "remote";
      version = "0.1.1";
      name = "@fp-ts/data";
      src = {
        name = "data-0.1.1.tgz";
        url = "https://registry.npmjs.org/@fp-ts/data/-/data-0.1.1.tgz";
        hash = "sha512-hgsoSDKP01kGY+g/Ino+QX3VEqiPnf0mrhKujMajT4ma0w82i4u0nMEPbBykyMxscQirFemwl7CnWn7G3TadcA==";
      };
      dependencies = {
        "@fp-ts/core" = "0.1.1";
      };
      peerDependencies = [];
    };
    "@fp-ts/schema@0.1.3" = {
      type = "remote";
      version = "0.1.3";
      name = "@fp-ts/schema";
      src = {
        name = "schema-0.1.3.tgz";
        url = "https://registry.npmjs.org/@fp-ts/schema/-/schema-0.1.3.tgz";
        hash = "sha512-rdyqwodZPqbY96mAUg3cAEKK7WsJ3JqZWDfBShSoPvxwB+fnFw1Rjhg3tsTpBhBN1oGlSHatIRJQ+QcoaAU+uA==";
      };
      dependencies = {
        "@fp-ts/core" = "0.1.1";
        "@fp-ts/data" = "0.1.1";
        "fast-check" = "3.8.1";
      };
      peerDependencies = [];
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
    "@mui/base@5.0.0-alpha.128" = {
      type = "remote";
      version = "5.0.0-alpha.128";
      name = "@mui/base";
      src = {
        name = "base-5.0.0-alpha.128.tgz";
        url = "https://registry.npmjs.org/@mui/base/-/base-5.0.0-alpha.128.tgz";
        hash = "sha512-wub3wxNN+hUp8hzilMlXX3sZrPo75vsy1cXEQpqdTfIFlE9HprP1jlulFiPg5tfPst2OKmygXr2hhmgvAKRrzQ==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/is-prop-valid" = "1.2.1";
        "@mui/types" = "7.2.4";
        "@mui/utils" = "5.12.3";
        "@popperjs/core" = "2.11.7";
        "@types/react" = "18.2.21";
        "clsx" = "1.2.1";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-is" = "18.2.0";
      };
      peerDependencies = [
        "@types/react"
        "react"
        "react-dom"
      ];
    };
    "@mui/base@5.0.0-beta.0" = {
      type = "remote";
      version = "5.0.0-beta.0";
      name = "@mui/base";
      src = {
        name = "base-5.0.0-beta.0.tgz";
        url = "https://registry.npmjs.org/@mui/base/-/base-5.0.0-beta.0.tgz";
        hash = "sha512-ap+juKvt8R8n3cBqd/pGtZydQ4v2I/hgJKnvJRGjpSh3RvsvnDHO4rXov8MHQlH6VqpOekwgilFLGxMZjNTucA==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/is-prop-valid" = "1.2.1";
        "@mui/types" = "7.2.4";
        "@mui/utils" = "5.12.3";
        "@popperjs/core" = "2.11.7";
        "@types/react" = "18.2.21";
        "clsx" = "1.2.1";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-is" = "18.2.0";
      };
      peerDependencies = [
        "@types/react"
        "react"
        "react-dom"
      ];
    };
    "@mui/core-downloads-tracker@5.13.0" = {
      type = "remote";
      version = "5.13.0";
      name = "@mui/core-downloads-tracker";
      src = {
        name = "core-downloads-tracker-5.13.0.tgz";
        url = "https://registry.npmjs.org/@mui/core-downloads-tracker/-/core-downloads-tracker-5.13.0.tgz";
        hash = "sha512-5nXz2k8Rv2ZjtQY6kXirJVyn2+ODaQuAJmXSJtLDUQDKWp3PFUj6j3bILqR0JGOs9R5ejgwz3crLKsl6GwjwkQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@mui/icons-material@5.11.16" = {
      type = "remote";
      version = "5.11.16";
      name = "@mui/icons-material";
      src = {
        name = "icons-material-5.11.16.tgz";
        url = "https://registry.npmjs.org/@mui/icons-material/-/icons-material-5.11.16.tgz";
        hash = "sha512-oKkx9z9Kwg40NtcIajF9uOXhxiyTZrrm9nmIJ4UjkU2IdHpd4QVLbCc/5hZN/y0C6qzi2Zlxyr9TGddQx2vx2A==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@mui/material" = "5.13.0";
        "@types/react" = "18.2.21";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@mui/material"
        "@types/react"
        "react"
      ];
    };
    "@mui/lab@5.0.0-alpha.129" = {
      type = "remote";
      version = "5.0.0-alpha.129";
      name = "@mui/lab";
      src = {
        name = "lab-5.0.0-alpha.129.tgz";
        url = "https://registry.npmjs.org/@mui/lab/-/lab-5.0.0-alpha.129.tgz";
        hash = "sha512-niv2mFgSTgdrRJXbWoX9pIivhe80BaFXfdWajXe1bS8VYH3Y5WyJpk8KiU3rbHyJswbFEGd8N6EBBrq11X8yMA==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "@mui/base" = "5.0.0-alpha.128";
        "@mui/material" = "5.13.0";
        "@mui/system" = "5.12.3";
        "@mui/types" = "7.2.4";
        "@mui/utils" = "5.12.3";
        "@types/react" = "18.2.21";
        "clsx" = "1.2.1";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-is" = "18.2.0";
      };
      peerDependencies = [
        "@emotion/react"
        "@emotion/styled"
        "@mui/material"
        "@types/react"
        "react"
        "react-dom"
      ];
    };
    "@mui/material@5.13.0" = {
      type = "remote";
      version = "5.13.0";
      name = "@mui/material";
      src = {
        name = "material-5.13.0.tgz";
        url = "https://registry.npmjs.org/@mui/material/-/material-5.13.0.tgz";
        hash = "sha512-ckS+9tCpAzpdJdaTF+btF0b6mF9wbXg/EVKtnoAWYi0UKXoXBAVvEUMNpLGA5xdpCdf+A6fPbVUEHs9TsfU+Yw==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "@mui/base" = "5.0.0-beta.0";
        "@mui/core-downloads-tracker" = "5.13.0";
        "@mui/system" = "5.12.3";
        "@mui/types" = "7.2.4";
        "@mui/utils" = "5.12.3";
        "@types/react" = "18.2.21";
        "@types/react-transition-group" = "4.4.6";
        "clsx" = "1.2.1";
        "csstype" = "3.1.2";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-is" = "18.2.0";
        "react-transition-group" = "4.4.5";
      };
      peerDependencies = [
        "@emotion/react"
        "@emotion/styled"
        "@types/react"
        "react"
        "react-dom"
      ];
    };
    "@mui/private-theming@5.12.3" = {
      type = "remote";
      version = "5.12.3";
      name = "@mui/private-theming";
      src = {
        name = "private-theming-5.12.3.tgz";
        url = "https://registry.npmjs.org/@mui/private-theming/-/private-theming-5.12.3.tgz";
        hash = "sha512-o1e7Z1Bp27n4x2iUHhegV4/Jp6H3T6iBKHJdLivS5GbwsuAE/5l4SnZ+7+K+e5u9TuhwcAKZLkjvqzkDe8zqfA==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@mui/utils" = "5.12.3";
        "@types/react" = "18.2.21";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@types/react"
        "react"
      ];
    };
    "@mui/styled-engine@5.12.3" = {
      type = "remote";
      version = "5.12.3";
      name = "@mui/styled-engine";
      src = {
        name = "styled-engine-5.12.3.tgz";
        url = "https://registry.npmjs.org/@mui/styled-engine/-/styled-engine-5.12.3.tgz";
        hash = "sha512-AhZtiRyT8Bjr7fufxE/mLS+QJ3LxwX1kghIcM2B2dvJzSSg9rnIuXDXM959QfUVIM3C8U4x3mgVoPFMQJvc4/g==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/cache" = "11.11.0";
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "csstype" = "3.1.2";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@emotion/react"
        "@emotion/styled"
        "react"
      ];
    };
    "@mui/system@5.12.3" = {
      type = "remote";
      version = "5.12.3";
      name = "@mui/system";
      src = {
        name = "system-5.12.3.tgz";
        url = "https://registry.npmjs.org/@mui/system/-/system-5.12.3.tgz";
        hash = "sha512-JB/6sypHqeJCqwldWeQ1MKkijH829EcZAKKizxbU2MJdxGG5KSwZvTBa5D9qiJUA1hJFYYupjiuy9ZdJt6rV6w==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "@mui/private-theming" = "5.12.3";
        "@mui/styled-engine" = "5.12.3";
        "@mui/types" = "7.2.4";
        "@mui/utils" = "5.12.3";
        "@types/react" = "18.2.21";
        "clsx" = "1.2.1";
        "csstype" = "3.1.2";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@emotion/react"
        "@emotion/styled"
        "@types/react"
        "react"
      ];
    };
    "@mui/types@7.2.4" = {
      type = "remote";
      version = "7.2.4";
      name = "@mui/types";
      src = {
        name = "types-7.2.4.tgz";
        url = "https://registry.npmjs.org/@mui/types/-/types-7.2.4.tgz";
        hash = "sha512-LBcwa8rN84bKF+f5sDyku42w1NTxaPgPyYKODsh01U1fVstTClbUoSA96oyRBnSNyEiAVjKm6Gwx9vjR+xyqHA==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
      };
      peerDependencies = [
        "@types/react"
      ];
    };
    "@mui/utils@5.12.3" = {
      type = "remote";
      version = "5.12.3";
      name = "@mui/utils";
      src = {
        name = "utils-5.12.3.tgz";
        url = "https://registry.npmjs.org/@mui/utils/-/utils-5.12.3.tgz";
        hash = "sha512-D/Z4Ub3MRl7HiUccid7sQYclTr24TqUAQFFlxHQF8FR177BrCTQ0JJZom7EqYjZCdXhwnSkOj2ph685MSKNtIA==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "@types/prop-types" = "15.7.5";
        "@types/react-is" = "17.0.4";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-is" = "18.2.0";
      };
      peerDependencies = [
        "react"
      ];
    };
    "@popperjs/core@2.11.7" = {
      type = "remote";
      version = "2.11.7";
      name = "@popperjs/core";
      src = {
        name = "core-2.11.7.tgz";
        url = "https://registry.npmjs.org/@popperjs/core/-/core-2.11.7.tgz";
        hash = "sha512-Cr4OjIkipTtcXKjAsm8agyleBuDHvxzeBoa1v543lbv1YaIwQjESsVcmjiWiPEbC1FIeHOG/Op9kdCmAmiS3Kw==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@react-dnd/asap@4.0.1" = {
      type = "remote";
      version = "4.0.1";
      name = "@react-dnd/asap";
      src = {
        name = "asap-4.0.1.tgz";
        url = "https://registry.npmjs.org/@react-dnd/asap/-/asap-4.0.1.tgz";
        hash = "sha512-kLy0PJDDwvwwTXxqTFNAAllPHD73AycE9ypWeln/IguoGBEbvFcPDbCV03G52bEcC5E+YgupBE0VzHGdC8SIXg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@react-dnd/invariant@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "@react-dnd/invariant";
      src = {
        name = "invariant-2.0.0.tgz";
        url = "https://registry.npmjs.org/@react-dnd/invariant/-/invariant-2.0.0.tgz";
        hash = "sha512-xL4RCQBCBDJ+GRwKTFhGUW8GXa4yoDfJrPbLblc3U09ciS+9ZJXJ3Qrcs/x2IODOdIE5kQxvMmE2UKyqUictUw==";
      };
      dependencies = {};
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
    "@react-dnd/shallowequal@2.0.0" = {
      type = "remote";
      version = "2.0.0";
      name = "@react-dnd/shallowequal";
      src = {
        name = "shallowequal-2.0.0.tgz";
        url = "https://registry.npmjs.org/@react-dnd/shallowequal/-/shallowequal-2.0.0.tgz";
        hash = "sha512-Pc/AFTdwZwEKJxFJvlxrSmGe/di+aAOBn60sremrpLo6VI/6cmiUYNNwlI5KNYttg7uypzA3ILPMPgxB2GYZEg==";
      };
      dependencies = {};
      peerDependencies = [];
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
        "@types/node" = "20.5.0";
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
    "@types/hoist-non-react-statics@3.3.1" = {
      type = "remote";
      version = "3.3.1";
      name = "@types/hoist-non-react-statics";
      src = {
        name = "hoist-non-react-statics-3.3.1.tgz";
        url = "https://registry.npmjs.org/@types/hoist-non-react-statics/-/hoist-non-react-statics-3.3.1.tgz";
        hash = "sha512-iMIqiko6ooLrTh1joXodJK5X9xeEALT1kM5G3ZLhD3hszxBdIEd5C75U834D9mLcINgD4OyZf5uQXjkuYydWvA==";
      };
      dependencies = {
        "@types/react" = "18.2.21";
        "hoist-non-react-statics" = "3.3.2";
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
    "@types/mui-datatables@4.3.4" = {
      type = "remote";
      version = "4.3.4";
      name = "@types/mui-datatables";
      src = {
        name = "mui-datatables-4.3.4.tgz";
        url = "https://registry.npmjs.org/@types/mui-datatables/-/mui-datatables-4.3.4.tgz";
        hash = "sha512-/UVcSnfCnhrZcX6E4muDs7fiPPzmfUkzEUsDAPotGQdSYcbamFMFntNkMLYuhyZJH9KN3UOyazHP3MyDAPvYQQ==";
      };
      dependencies = {
        "@emotion/react" = "11.11.0";
        "@emotion/styled" = "11.11.0";
        "@mui/material" = "5.13.0";
        "@types/react" = "18.2.21";
        "csstype" = "3.1.2";
      };
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
    "@types/node@20.5.7" = {
      type = "remote";
      version = "20.5.7";
      name = "@types/node";
      src = {
        name = "node-20.5.7.tgz";
        url = "https://registry.npmjs.org/@types/node/-/node-20.5.7.tgz";
        hash = "sha512-dP7f3LdZIysZnmvP3ANJYTSwg+wLLl8p7RqniVlV7j+oXSXAbt9h0WIBFmJy5inWZoX9wZN6eXx+YXd9Rh3RBA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "@types/parse-json@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "@types/parse-json";
      src = {
        name = "parse-json-4.0.0.tgz";
        url = "https://registry.npmjs.org/@types/parse-json/-/parse-json-4.0.0.tgz";
        hash = "sha512-//oorEZjL6sbPcKUaCdIGlIUeH26mgzimjBB77G6XRgnDl/L5wOnpyBGRe/Mmf5CVW3PwEBE1NjiMZ/ssFh4wA==";
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
    "@types/react-is@17.0.4" = {
      type = "remote";
      version = "17.0.4";
      name = "@types/react-is";
      src = {
        name = "react-is-17.0.4.tgz";
        url = "https://registry.npmjs.org/@types/react-is/-/react-is-17.0.4.tgz";
        hash = "sha512-FLzd0K9pnaEvKz4D1vYxK9JmgQPiGk1lu23o1kqGsLeT0iPbRSF7b76+S5T9fD8aRa0B8bY7I/3DebEj+1ysBA==";
      };
      dependencies = {
        "@types/react" = "17.0.59";
      };
      peerDependencies = [];
    };
    "@types/react-transition-group@4.4.6" = {
      type = "remote";
      version = "4.4.6";
      name = "@types/react-transition-group";
      src = {
        name = "react-transition-group-4.4.6.tgz";
        url = "https://registry.npmjs.org/@types/react-transition-group/-/react-transition-group-4.4.6.tgz";
        hash = "sha512-VnCdSxfcm08KjsJVQcfBmhEQAPnLB8G08hAxn39azX1qYBQ/5RVQuoHuKIcfKOdncuaUvEpFKFzEvbtIMsfVew==";
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
        "@types/node" = "20.5.0";
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
    "babel-plugin-macros@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "babel-plugin-macros";
      src = {
        name = "babel-plugin-macros-3.1.0.tgz";
        url = "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-3.1.0.tgz";
        hash = "sha512-Cg7TFGpIr01vOQNODXOOaGz2NpCU5gl8x1qJFbb6hbZxR7XrcE2vtbAsTAbJ7/xwJtUuJEw8K8Zr/AE0LHlesg==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "cosmiconfig" = "7.1.0";
        "resolve" = "1.22.2";
      };
      peerDependencies = [];
    };
    "babel-plugin-styled-components@2.1.1" = {
      type = "remote";
      version = "2.1.1";
      name = "babel-plugin-styled-components";
      src = {
        name = "babel-plugin-styled-components-2.1.1.tgz";
        url = "https://registry.npmjs.org/babel-plugin-styled-components/-/babel-plugin-styled-components-2.1.1.tgz";
        hash = "sha512-c8lJlszObVQPguHkI+akXv8+Jgb9Ccujx0EetL7oIvwU100LxO6XAGe45qry37wUL40a5U9f23SYrivro2XKhA==";
      };
      dependencies = {
        "@babel/helper-annotate-as-pure" = "7.18.6";
        "@babel/helper-module-imports" = "7.21.4";
        "babel-plugin-syntax-jsx" = "6.18.0";
        "lodash" = "4.17.21";
        "picomatch" = "2.3.1";
        "styled-components" = "5.3.10";
      };
      peerDependencies = [
        "styled-components"
      ];
    };
    "babel-plugin-syntax-jsx@6.18.0" = {
      type = "remote";
      version = "6.18.0";
      name = "babel-plugin-syntax-jsx";
      src = {
        name = "babel-plugin-syntax-jsx-6.18.0.tgz";
        url = "https://registry.npmjs.org/babel-plugin-syntax-jsx/-/babel-plugin-syntax-jsx-6.18.0.tgz";
        hash = "sha512-qrPaCSo9c8RHNRHIotaufGbuOBN8rtdC4QrrFFc43vyWCCz7Kl7GL1PGaXtMGQZUXrkCjNEgxDfmAuAabr/rlw==";
      };
      dependencies = {};
      peerDependencies = [];
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
    "browserslist@4.21.5" = {
      type = "remote";
      version = "4.21.5";
      name = "browserslist";
      src = {
        name = "browserslist-4.21.5.tgz";
        url = "https://registry.npmjs.org/browserslist/-/browserslist-4.21.5.tgz";
        hash = "sha512-tUkiguQGW7S3IhB7N+c2MV/HZPSCPAAiYBZXLsBhFB/PCy6ZKKsZrmBayHV9fdGV/ARIfJ14NkxKzRDjvp7L6w==";
      };
      dependencies = {
        "caniuse-lite" = "1.0.30001487";
        "electron-to-chromium" = "1.4.394";
        "node-releases" = "2.0.10";
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
    "callsites@3.1.0" = {
      type = "remote";
      version = "3.1.0";
      name = "callsites";
      src = {
        name = "callsites-3.1.0.tgz";
        url = "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz";
        hash = "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "camelize@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "camelize";
      src = {
        name = "camelize-1.0.1.tgz";
        url = "https://registry.npmjs.org/camelize/-/camelize-1.0.1.tgz";
        hash = "sha512-dU+Tx2fsypxTgtLoE36npi3UqcjSSMNYfkqgmoEhtZrraP5VWq0K7FkWVTYa8eMPtnU/G2txVsfdCJTn9uzpuQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "caniuse-lite@1.0.30001487" = {
      type = "remote";
      version = "1.0.30001487";
      name = "caniuse-lite";
      src = {
        name = "caniuse-lite-1.0.30001487.tgz";
        url = "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001487.tgz";
        hash = "sha512-83564Z3yWGqXsh2vaH/mhXfEM0wX+NlBCm1jYHOb97TrTWJEmPTccZgeLTPBUUb0PNVo+oomb7wkimZBIERClA==";
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
    "clsx@1.2.1" = {
      type = "remote";
      version = "1.2.1";
      name = "clsx";
      src = {
        name = "clsx-1.2.1.tgz";
        url = "https://registry.npmjs.org/clsx/-/clsx-1.2.1.tgz";
        hash = "sha512-EcR6r5a8bj6pu3ycsa/E/cKVGuTgZJZdsyUYHOksG/UHIiKfjxzRxYJpyVBwYaQeOvghal9fcc4PidlgzugAQg==";
      };
      dependencies = {};
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
    "core-js-pure@3.30.2" = {
      type = "remote";
      version = "3.30.2";
      name = "core-js-pure";
      src = {
        name = "core-js-pure-3.30.2.tgz";
        url = "https://registry.npmjs.org/core-js-pure/-/core-js-pure-3.30.2.tgz";
        hash = "sha512-p/npFUJXXBkCCTIlEGBdghofn00jWG6ZOtdoIXSJmAu2QBvN0IqpZXWweOytcwE6cfx8ZvVUy1vw8zxhe4Y2vg==";
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
    "cosmiconfig@7.1.0" = {
      type = "remote";
      version = "7.1.0";
      name = "cosmiconfig";
      src = {
        name = "cosmiconfig-7.1.0.tgz";
        url = "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-7.1.0.tgz";
        hash = "sha512-AdmX6xUzdNASswsFtmwSt7Vj8po9IuqXm0UXz7QKPuEUmPB4XyjGfaAr2PSuELMwkRMVH1EpIkX5bTZGRB3eCA==";
      };
      dependencies = {
        "@types/parse-json" = "4.0.0";
        "import-fresh" = "3.3.0";
        "parse-json" = "5.2.0";
        "path-type" = "4.0.0";
        "yaml" = "1.10.2";
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
    "css-color-keywords@1.0.0" = {
      type = "remote";
      version = "1.0.0";
      name = "css-color-keywords";
      src = {
        name = "css-color-keywords-1.0.0.tgz";
        url = "https://registry.npmjs.org/css-color-keywords/-/css-color-keywords-1.0.0.tgz";
        hash = "sha512-FyyrDHZKEjXDpNJYvVsV960FiqQyXc/LlYmsxl2BcdMb2WPx0OGRVgTg55rPSyLSNMqP52R9r8geSp7apN3Ofg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "css-to-react-native@3.2.0" = {
      type = "remote";
      version = "3.2.0";
      name = "css-to-react-native";
      src = {
        name = "css-to-react-native-3.2.0.tgz";
        url = "https://registry.npmjs.org/css-to-react-native/-/css-to-react-native-3.2.0.tgz";
        hash = "sha512-e8RKaLXMOFii+02mOlqwjbD00KSEKqblnpO9e++1aXS1fPQOpS1YoqdVHBqPjHNoxeF2mimzVqawm2KCbEdtHQ==";
      };
      dependencies = {
        "camelize" = "1.0.1";
        "css-color-keywords" = "1.0.0";
        "postcss-value-parser" = "4.2.0";
      };
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
        "supports-color" = "5.5.0";
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
    "dnd-core@11.1.3" = {
      type = "remote";
      version = "11.1.3";
      name = "dnd-core";
      src = {
        name = "dnd-core-11.1.3.tgz";
        url = "https://registry.npmjs.org/dnd-core/-/dnd-core-11.1.3.tgz";
        hash = "sha512-QugF55dNW+h+vzxVJ/LSJeTeUw9MCJ2cllhmVThVPEtF16ooBkxj0WBE5RB+AceFxMFo1rO6bJKXtqKl+JNnyA==";
      };
      dependencies = {
        "@react-dnd/asap" = "4.0.1";
        "@react-dnd/invariant" = "2.0.0";
        "redux" = "4.2.1";
      };
      peerDependencies = [];
    };
    "dom-helpers@5.2.1" = {
      type = "remote";
      version = "5.2.1";
      name = "dom-helpers";
      src = {
        name = "dom-helpers-5.2.1.tgz";
        url = "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz";
        hash = "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "csstype" = "3.1.2";
      };
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
    "electron-to-chromium@1.4.394" = {
      type = "remote";
      version = "1.4.394";
      name = "electron-to-chromium";
      src = {
        name = "electron-to-chromium-1.4.394.tgz";
        url = "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.394.tgz";
        hash = "sha512-0IbC2cfr8w5LxTz+nmn2cJTGafsK9iauV2r5A5scfzyovqLrxuLoxOHE5OBobP3oVIggJT+0JfKnw9sm87c8Hw==";
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
    "error-ex@1.3.2" = {
      type = "remote";
      version = "1.3.2";
      name = "error-ex";
      src = {
        name = "error-ex-1.3.2.tgz";
        url = "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz";
        hash = "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==";
      };
      dependencies = {
        "is-arrayish" = "0.2.1";
      };
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
    "escape-string-regexp@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "escape-string-regexp";
      src = {
        name = "escape-string-regexp-4.0.0.tgz";
        url = "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz";
        hash = "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==";
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
    "fast-check@3.8.1" = {
      type = "remote";
      version = "3.8.1";
      name = "fast-check";
      src = {
        name = "fast-check-3.8.1.tgz";
        url = "https://registry.npmjs.org/fast-check/-/fast-check-3.8.1.tgz";
        hash = "sha512-WRll9CUIz6jWKgByFlHT2M/1BY3F7lewKl5BBIz5VHAy7B8y5iklK9rVm922kx+0x1hJqdkffuTs008xfIgytQ==";
      };
      dependencies = {
        "pure-rand" = "6.0.2";
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
    "find-root@1.1.0" = {
      type = "remote";
      version = "1.1.0";
      name = "find-root";
      src = {
        name = "find-root-1.1.0.tgz";
        url = "https://registry.npmjs.org/find-root/-/find-root-1.1.0.tgz";
        hash = "sha512-NKfW6bec6GfKc0SGx1e07QZY9PE99u0Bft/0rzSD5k3sO/vwkVUpDUKVm5Gpp5Ue3YfShPFTX2070tDs5kB9Ng==";
      };
      dependencies = {};
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
    "hoist-non-react-statics@3.3.2" = {
      type = "remote";
      version = "3.3.2";
      name = "hoist-non-react-statics";
      src = {
        name = "hoist-non-react-statics-3.3.2.tgz";
        url = "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz";
        hash = "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==";
      };
      dependencies = {
        "react-is" = "16.13.1";
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
    "import-fresh@3.3.0" = {
      type = "remote";
      version = "3.3.0";
      name = "import-fresh";
      src = {
        name = "import-fresh-3.3.0.tgz";
        url = "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.0.tgz";
        hash = "sha512-veYYhQa+D1QBKznvhUHxb8faxlrwUnxseDAbAp457E0wLNio2bOSKnjYDhMj+YiAq61xrMGhQk9iXVk5FzgQMw==";
      };
      dependencies = {
        "parent-module" = "1.0.1";
        "resolve-from" = "4.0.0";
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
    "is-arrayish@0.2.1" = {
      type = "remote";
      version = "0.2.1";
      name = "is-arrayish";
      src = {
        name = "is-arrayish-0.2.1.tgz";
        url = "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz";
        hash = "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==";
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
    "json-parse-even-better-errors@2.3.1" = {
      type = "remote";
      version = "2.3.1";
      name = "json-parse-even-better-errors";
      src = {
        name = "json-parse-even-better-errors-2.3.1.tgz";
        url = "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz";
        hash = "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==";
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
    "lodash.assignwith@4.2.0" = {
      type = "remote";
      version = "4.2.0";
      name = "lodash.assignwith";
      src = {
        name = "lodash.assignwith-4.2.0.tgz";
        url = "https://registry.npmjs.org/lodash.assignwith/-/lodash.assignwith-4.2.0.tgz";
        hash = "sha512-ZznplvbvtjK2gMvnQ1BR/zqPFZmS6jbK4p+6Up4xcRYA7yMIwxHCfbTcrYxXKzzqLsQ05eJPVznEW3tuwV7k1g==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.clonedeep@4.5.0" = {
      type = "remote";
      version = "4.5.0";
      name = "lodash.clonedeep";
      src = {
        name = "lodash.clonedeep-4.5.0.tgz";
        url = "https://registry.npmjs.org/lodash.clonedeep/-/lodash.clonedeep-4.5.0.tgz";
        hash = "sha512-H5ZhCF25riFd9uB5UCkVKo61m3S/xZk1x4wA6yp/L3RFP6Z/eHH1ymQcGLo7J3GMPfm0V/7m1tryHuGVxpqEBQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.debounce@4.0.8" = {
      type = "remote";
      version = "4.0.8";
      name = "lodash.debounce";
      src = {
        name = "lodash.debounce-4.0.8.tgz";
        url = "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz";
        hash = "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.find@4.6.0" = {
      type = "remote";
      version = "4.6.0";
      name = "lodash.find";
      src = {
        name = "lodash.find-4.6.0.tgz";
        url = "https://registry.npmjs.org/lodash.find/-/lodash.find-4.6.0.tgz";
        hash = "sha512-yaRZoAV3Xq28F1iafWN1+a0rflOej93l1DQUejs3SZ41h2O9UJBoS9aueGjPDgAl4B6tPC0NuuchLKaDQQ3Isg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.get@4.4.2" = {
      type = "remote";
      version = "4.4.2";
      name = "lodash.get";
      src = {
        name = "lodash.get-4.4.2.tgz";
        url = "https://registry.npmjs.org/lodash.get/-/lodash.get-4.4.2.tgz";
        hash = "sha512-z+Uw/vLuy6gQe8cfaFWD7p0wVv8fJl3mbzXh33RS+0oW2wvUqiRXiQ69gLWSLpgB5/6sU+r6BlQR0MBILadqTQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.isequal@4.5.0" = {
      type = "remote";
      version = "4.5.0";
      name = "lodash.isequal";
      src = {
        name = "lodash.isequal-4.5.0.tgz";
        url = "https://registry.npmjs.org/lodash.isequal/-/lodash.isequal-4.5.0.tgz";
        hash = "sha512-pDo3lu8Jhfjqls6GkMgpahsF9kCyayhgykjyLMNFTKWrpVdAQtYyB4muAMWozBB4ig/dtWAmsMxLEI8wuz+DYQ==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.isundefined@3.0.1" = {
      type = "remote";
      version = "3.0.1";
      name = "lodash.isundefined";
      src = {
        name = "lodash.isundefined-3.0.1.tgz";
        url = "https://registry.npmjs.org/lodash.isundefined/-/lodash.isundefined-3.0.1.tgz";
        hash = "sha512-MXB1is3s899/cD8jheYYE2V9qTHwKvt+npCwpD+1Sxm3Q3cECXCiYHjeHWXNwr6Q0SOBPrYUDxendrO6goVTEA==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "lodash.memoize@4.1.2" = {
      type = "remote";
      version = "4.1.2";
      name = "lodash.memoize";
      src = {
        name = "lodash.memoize-4.1.2.tgz";
        url = "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz";
        hash = "sha512-t7j+NzmgnQzTAYXcsHYLgimltOV1MXHtlOWf6GjL9Kj8GK5FInw5JotxvbOs+IvV1/Dzo04/fCGfLVs7aXb4Ag==";
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
    "lodash.throttle@4.1.1" = {
      type = "remote";
      version = "4.1.1";
      name = "lodash.throttle";
      src = {
        name = "lodash.throttle-4.1.1.tgz";
        url = "https://registry.npmjs.org/lodash.throttle/-/lodash.throttle-4.1.1.tgz";
        hash = "sha512-wIkUCfVKpVsWo3JSZlc+8MB5it+2AN5W8J7YVMST30UrvcQNZ1Okbj+rbVniijTWE6FGYy4XJq/rHkas8qJMLQ==";
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
    "mui-datatables@4.3.0" = {
      type = "remote";
      version = "4.3.0";
      name = "mui-datatables";
      src = {
        name = "mui-datatables-4.3.0.tgz";
        url = "https://registry.npmjs.org/mui-datatables/-/mui-datatables-4.3.0.tgz";
        hash = "sha512-LFliQwNnnxW03IO+V3q/ORxZsOHkzl53iGogLbjUJzme47hNEN106dM0ie8oMSc0heYJY0J07oZmKm7Xn3X7IQ==";
      };
      dependencies = {
        "@babel/runtime-corejs3" = "7.21.5";
        "@emotion/cache" = "11.11.0";
        "@emotion/react" = "11.11.0";
        "@mui/icons-material" = "5.11.16";
        "@mui/material" = "5.13.0";
        "clsx" = "1.2.1";
        "lodash.assignwith" = "4.2.0";
        "lodash.clonedeep" = "4.5.0";
        "lodash.debounce" = "4.0.8";
        "lodash.find" = "4.6.0";
        "lodash.get" = "4.4.2";
        "lodash.isequal" = "4.5.0";
        "lodash.isundefined" = "3.0.1";
        "lodash.memoize" = "4.1.2";
        "lodash.merge" = "4.6.2";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dnd" = "11.1.3";
        "react-dnd-html5-backend" = "11.1.3";
        "react-dom" = "18.2.0";
        "react-sortable-tree-patch-react-17" = "2.9.0";
        "react-to-print" = "2.14.12";
        "tss-react" = "3.7.1";
      };
      peerDependencies = [
        "@emotion/react"
        "@mui/icons-material"
        "@mui/material"
        "react"
        "react-dom"
      ];
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
    "node-releases@2.0.10" = {
      type = "remote";
      version = "2.0.10";
      name = "node-releases";
      src = {
        name = "node-releases-2.0.10.tgz";
        url = "https://registry.npmjs.org/node-releases/-/node-releases-2.0.10.tgz";
        hash = "sha512-5GFldHPXVG/YZmFzJvKK2zDSzPKhEp0+ZR5SVaoSag9fsL5YgHbUHDfnG5494ISANDcK4KwPXAx2xqVEydmd7w==";
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
    "parent-module@1.0.1" = {
      type = "remote";
      version = "1.0.1";
      name = "parent-module";
      src = {
        name = "parent-module-1.0.1.tgz";
        url = "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz";
        hash = "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==";
      };
      dependencies = {
        "callsites" = "3.1.0";
      };
      peerDependencies = [];
    };
    "parse-json@5.2.0" = {
      type = "remote";
      version = "5.2.0";
      name = "parse-json";
      src = {
        name = "parse-json-5.2.0.tgz";
        url = "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz";
        hash = "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==";
      };
      dependencies = {
        "@babel/code-frame" = "7.21.4";
        "error-ex" = "1.3.2";
        "json-parse-even-better-errors" = "2.3.1";
        "lines-and-columns" = "1.2.4";
      };
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
    "path-type@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "path-type";
      src = {
        name = "path-type-4.0.0.tgz";
        url = "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz";
        hash = "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==";
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
    "performance-now@2.1.0" = {
      type = "remote";
      version = "2.1.0";
      name = "performance-now";
      src = {
        name = "performance-now-2.1.0.tgz";
        url = "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz";
        hash = "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow==";
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
    "postcss@8.4.23" = {
      type = "remote";
      version = "8.4.23";
      name = "postcss";
      src = {
        name = "postcss-8.4.23.tgz";
        url = "https://registry.npmjs.org/postcss/-/postcss-8.4.23.tgz";
        hash = "sha512-bQ3qMcpF6A/YjR55xtoTr0jGOlnPOKAIMdOWiv0EIT6HVPEaJiJB4NLljSbiHoC2RX7DN5Uvjtpbg1NPdwv1oA==";
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
    "raf@3.4.1" = {
      type = "remote";
      version = "3.4.1";
      name = "raf";
      src = {
        name = "raf-3.4.1.tgz";
        url = "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz";
        hash = "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==";
      };
      dependencies = {
        "performance-now" = "2.1.0";
      };
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
    "react-display-name@0.2.5" = {
      type = "remote";
      version = "0.2.5";
      name = "react-display-name";
      src = {
        name = "react-display-name-0.2.5.tgz";
        url = "https://registry.npmjs.org/react-display-name/-/react-display-name-0.2.5.tgz";
        hash = "sha512-I+vcaK9t4+kypiSgaiVWAipqHRXYmZIuAiS8vzFvXHHXVigg/sMKwlRgLy6LH2i3rmP+0Vzfl5lFsFRwF1r3pg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "react-dnd-html5-backend@11.1.3" = {
      type = "remote";
      version = "11.1.3";
      name = "react-dnd-html5-backend";
      src = {
        name = "react-dnd-html5-backend-11.1.3.tgz";
        url = "https://registry.npmjs.org/react-dnd-html5-backend/-/react-dnd-html5-backend-11.1.3.tgz";
        hash = "sha512-/1FjNlJbW/ivkUxlxQd7o3trA5DE33QiRZgxent3zKme8DwF4Nbw3OFVhTRFGaYhHFNL1rZt6Rdj1D78BjnNLw==";
      };
      dependencies = {
        "dnd-core" = "11.1.3";
      };
      peerDependencies = [];
    };
    "react-dnd-scrollzone-patch-react-17@1.0.2" = {
      type = "remote";
      version = "1.0.2";
      name = "react-dnd-scrollzone-patch-react-17";
      src = {
        name = "react-dnd-scrollzone-patch-react-17-1.0.2.tgz";
        url = "https://registry.npmjs.org/react-dnd-scrollzone-patch-react-17/-/react-dnd-scrollzone-patch-react-17-1.0.2.tgz";
        hash = "sha512-Wfhyc/Y/Veim29REBYm8nMmtDB5IwSmPPhXIuabBgsEa1MrVsuOwK9+7LmuP+mGbDOEP/S6G8+5XvDqPlRFK2g==";
      };
      dependencies = {
        "hoist-non-react-statics" = "3.3.2";
        "lodash.throttle" = "4.1.1";
        "prop-types" = "15.8.1";
        "raf" = "3.4.1";
        "react" = "18.2.0";
        "react-display-name" = "0.2.5";
        "react-dnd" = "11.1.3";
        "react-dom" = "18.2.0";
      };
      peerDependencies = [
        "react"
        "react-dnd"
        "react-dom"
      ];
    };
    "react-dnd@11.1.3" = {
      type = "remote";
      version = "11.1.3";
      name = "react-dnd";
      src = {
        name = "react-dnd-11.1.3.tgz";
        url = "https://registry.npmjs.org/react-dnd/-/react-dnd-11.1.3.tgz";
        hash = "sha512-8rtzzT8iwHgdSC89VktwhqdKKtfXaAyC4wiqp0SywpHG12TTLvfOoL6xNEIUWXwIEWu+CFfDn4GZJyynCEuHIQ==";
      };
      dependencies = {
        "@react-dnd/shallowequal" = "2.0.0";
        "@types/hoist-non-react-statics" = "3.3.1";
        "dnd-core" = "11.1.3";
        "hoist-non-react-statics" = "3.3.2";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
      };
      peerDependencies = [
        "react"
        "react-dom"
      ];
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
    "react-is@18.2.0" = {
      type = "remote";
      version = "18.2.0";
      name = "react-is";
      src = {
        name = "react-is-18.2.0.tgz";
        url = "https://registry.npmjs.org/react-is/-/react-is-18.2.0.tgz";
        hash = "sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "react-lifecycles-compat@3.0.4" = {
      type = "remote";
      version = "3.0.4";
      name = "react-lifecycles-compat";
      src = {
        name = "react-lifecycles-compat-3.0.4.tgz";
        url = "https://registry.npmjs.org/react-lifecycles-compat/-/react-lifecycles-compat-3.0.4.tgz";
        hash = "sha512-fBASbA6LnOU9dOU2eW7aQ8xmYBSXUIWr+UmF9b1efZBazGNO+rcXT/icdKnYm2pTwcRylVUYwW7H1PHfLekVzA==";
      };
      dependencies = {};
      peerDependencies = [];
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
    "react-sortable-tree-patch-react-17@2.9.0" = {
      type = "remote";
      version = "2.9.0";
      name = "react-sortable-tree-patch-react-17";
      src = {
        name = "react-sortable-tree-patch-react-17-2.9.0.tgz";
        url = "https://registry.npmjs.org/react-sortable-tree-patch-react-17/-/react-sortable-tree-patch-react-17-2.9.0.tgz";
        hash = "sha512-Ngtdbf78OfjqCxLj7+N+K4zM9d1mQ/tfnUsOfICFDzNa5JHg6AjixAj69ijvz0ykEiA9lYop+0Fm4KCOqCdlKA==";
      };
      dependencies = {
        "lodash.isequal" = "4.5.0";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dnd" = "11.1.3";
        "react-dnd-html5-backend" = "11.1.3";
        "react-dnd-scrollzone-patch-react-17" = "1.0.2";
        "react-dom" = "18.2.0";
        "react-lifecycles-compat" = "3.0.4";
        "react-virtualized" = "9.22.5";
      };
      peerDependencies = [
        "react"
        "react-dnd"
        "react-dom"
      ];
    };
    "react-to-print@2.14.12" = {
      type = "remote";
      version = "2.14.12";
      name = "react-to-print";
      src = {
        name = "react-to-print-2.14.12.tgz";
        url = "https://registry.npmjs.org/react-to-print/-/react-to-print-2.14.12.tgz";
        hash = "sha512-qFJAwvDFd95Z+FWNqitt+HaB1/z+Zdd0MMrNOPUSus3fG32vqv512yB+HXhQ94J3HKoyqaIg44v0Zfc6xUBqlg==";
      };
      dependencies = {
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
      };
      peerDependencies = [
        "react"
        "react-dom"
      ];
    };
    "react-transition-group@4.4.5" = {
      type = "remote";
      version = "4.4.5";
      name = "react-transition-group";
      src = {
        name = "react-transition-group-4.4.5.tgz";
        url = "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz";
        hash = "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "dom-helpers" = "5.2.1";
        "loose-envify" = "1.4.0";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
      };
      peerDependencies = [
        "react"
        "react-dom"
      ];
    };
    "react-virtualized@9.22.5" = {
      type = "remote";
      version = "9.22.5";
      name = "react-virtualized";
      src = {
        name = "react-virtualized-9.22.5.tgz";
        url = "https://registry.npmjs.org/react-virtualized/-/react-virtualized-9.22.5.tgz";
        hash = "sha512-YqQMRzlVANBv1L/7r63OHa2b0ZsAaDp1UhVNEdUaXI8A5u6hTpA5NYtUueLH2rFuY/27mTGIBl7ZhqFKzw18YQ==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
        "clsx" = "1.2.1";
        "dom-helpers" = "5.2.1";
        "loose-envify" = "1.4.0";
        "prop-types" = "15.8.1";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-lifecycles-compat" = "3.0.4";
      };
      peerDependencies = [
        "react"
        "react-dom"
      ];
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
    "redux@4.2.1" = {
      type = "remote";
      version = "4.2.1";
      name = "redux";
      src = {
        name = "redux-4.2.1.tgz";
        url = "https://registry.npmjs.org/redux/-/redux-4.2.1.tgz";
        hash = "sha512-LAUYz4lc+Do8/g7aeRa8JkyDErK6ekstQaqWQrNRW//MY1TvCEpMtpTWvlQ+FPbWCx+Xixu/6SHt5N0HR+SB4w==";
      };
      dependencies = {
        "@babel/runtime" = "7.21.5";
      };
      peerDependencies = [];
    };
    "regenerator-runtime@0.13.11" = {
      type = "remote";
      version = "0.13.11";
      name = "regenerator-runtime";
      src = {
        name = "regenerator-runtime-0.13.11.tgz";
        url = "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.11.tgz";
        hash = "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg==";
      };
      dependencies = {};
      peerDependencies = [];
    };
    "resolve-from@4.0.0" = {
      type = "remote";
      version = "4.0.0";
      name = "resolve-from";
      src = {
        name = "resolve-from-4.0.0.tgz";
        url = "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz";
        hash = "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==";
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
    "shallowequal@1.1.0" = {
      type = "remote";
      version = "1.1.0";
      name = "shallowequal";
      src = {
        name = "shallowequal-1.1.0.tgz";
        url = "https://registry.npmjs.org/shallowequal/-/shallowequal-1.1.0.tgz";
        hash = "sha512-y0m1JoUZSlPAjXVtPPW70aZWfIL/dSP7AFkRnniLCrK/8MDKog3TySTBmckD+RObVxH0v4Tox67+F14PdED2oQ==";
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
    "source-map@0.5.7" = {
      type = "remote";
      version = "0.5.7";
      name = "source-map";
      src = {
        name = "source-map-0.5.7.tgz";
        url = "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz";
        hash = "sha512-LbrmJOMUSdEVxIKvdcJzQC+nQhe8FUZQTXQy6+I75skNgn3OoQ0DZA8YnFa7gp8tqtL3KPf1kmo0R5DoApeSGQ==";
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
    "styled-components@5.3.10" = {
      type = "remote";
      version = "5.3.10";
      name = "styled-components";
      src = {
        name = "styled-components-5.3.10.tgz";
        url = "https://registry.npmjs.org/styled-components/-/styled-components-5.3.10.tgz";
        hash = "sha512-3kSzSBN0TiCnGJM04UwO1HklIQQSXW7rCARUk+VyMR7clz8XVlA3jijtf5ypqoDIdNMKx3la4VvaPFR855SFcg==";
      };
      dependencies = {
        "@babel/helper-module-imports" = "7.21.4";
        "@babel/traverse" = "7.21.5";
        "@emotion/is-prop-valid" = "1.2.1";
        "@emotion/stylis" = "0.8.5";
        "@emotion/unitless" = "0.7.5";
        "babel-plugin-styled-components" = "2.1.1";
        "css-to-react-native" = "3.2.0";
        "hoist-non-react-statics" = "3.3.2";
        "react" = "18.2.0";
        "react-dom" = "18.2.0";
        "react-is" = "18.2.0";
        "shallowequal" = "1.1.0";
        "supports-color" = "5.5.0";
      };
      peerDependencies = [
        "react"
        "react-dom"
        "react-is"
      ];
    };
    "stylis@4.2.0" = {
      type = "remote";
      version = "4.2.0";
      name = "stylis";
      src = {
        name = "stylis-4.2.0.tgz";
        url = "https://registry.npmjs.org/stylis/-/stylis-4.2.0.tgz";
        hash = "sha512-Orov6g6BB1sDfYgzWfTHDOxamtX1bE/zo104Dh9e6fqJ3PooipYyfJ0pUmrZO2wAvO8YbEyeFrkV91XTsGMSrw==";
      };
      dependencies = {};
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
        "@types/node" = "20.5.7";
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
    "tss-react@3.7.1" = {
      type = "remote";
      version = "3.7.1";
      name = "tss-react";
      src = {
        name = "tss-react-3.7.1.tgz";
        url = "https://registry.npmjs.org/tss-react/-/tss-react-3.7.1.tgz";
        hash = "sha512-dfWUoxBlKZfIG9UC1A2h02OmcE/Ni0itCmmZu94E9g+KyBhKMHKcsKvUm0bNlRqTmYjXiCgPJDmj5fyc8CSrLg==";
      };
      dependencies = {
        "@emotion/cache" = "11.11.0";
        "@emotion/react" = "11.11.0";
        "@emotion/serialize" = "1.1.2";
        "@emotion/utils" = "1.2.1";
        "react" = "18.2.0";
      };
      peerDependencies = [
        "@emotion/react"
        "@emotion/server"
        "react"
      ];
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
        "browserslist" = "4.21.5";
        "escalade" = "3.1.1";
        "picocolors" = "1.0.0";
      };
      peerDependencies = [
        "browserslist"
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
        "postcss" = "8.4.23";
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
    "yaml@1.10.2" = {
      type = "remote";
      version = "1.10.2";
      name = "yaml";
      src = {
        name = "yaml-1.10.2.tgz";
        url = "https://registry.npmjs.org/yaml/-/yaml-1.10.2.tgz";
        hash = "sha512-r3vXyErRCYJ7wg28yvBY5VSoAF8ZvlcW9/BwUzEtUsjvX/DKs24dIkuwjtuprwJJHsbyUbLApepYTR1BN4uHrg==";
      };
      dependencies = {};
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
  };
}