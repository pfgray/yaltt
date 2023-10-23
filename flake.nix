{
  description = "An Algebraic Data Type generator for Typescript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
    js-nix.url = "github:pfgray/js-nix";
    gbt.url = "github:pfgray/gbt";
  };

  outputs = { self, nixpkgs, js-nix, gbt, flake-utils }:
    flake-utils.lib.eachDefaultSystem (
      system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          removeDependencies = deps: pkg: pkg // {
            dependencies = pkgs.lib.attrsets.filterAttrs (
              name: value: !(builtins.elem name deps)
            ) pkg.dependencies;
          };
          esbuildSystemMap = {
            "x86_64-darwin" = "darwin-x64";
          };

          mkWorkspace = js-nix.lib.${system}.mkWorkspace;
          workspaces = (mkWorkspace {
            modules = ./js-modules.nix;
            overrideModules = {
              "esbuild@0.17.19" = pkg: (pkg // {
                dependencies = pkg.dependencies // {
                  "@esbuild/${esbuildSystemMap.${system}}" = "0.17.19";
                };
              });
              "pg-pool@3.6.0" = removeDependencies ["pg"];
              "@babel/helper-compilation-targets@7.21.5" = removeDependencies ["@babel/core"];
            };
            includePeerDependencies = false;
          });
        in {

          devShell = pkgs.mkShell {
            packages = with pkgs; [
              nodejs.pkgs.pnpm
              # nodePackages.pnpm
              pkgs.nodejs-18_x
              js-nix.packages.${system}.js-nix
              gbt.packages.${system}.gbt
            ];
            shellHook = ''
            '';
          };
          packages = workspaces.packages // workspaces.remotePackages;
        }
    );
}
