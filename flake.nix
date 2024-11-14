{
  description = "An Algebraic Data Type generator for Typescript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
    gbt.url = "github:pfgray/gbt";
  };

  outputs = { self, nixpkgs, gbt, flake-utils }:
    flake-utils.lib.eachDefaultSystem (
      system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in {

          devShell = pkgs.mkShell {
            packages = with pkgs; [
              nodejs.pkgs.pnpm
              pkgs.nodejs-18_x
              gbt.packages.${system}.gbt
            ];
            shellHook = ''
            '';
          };
        }
    );
}
