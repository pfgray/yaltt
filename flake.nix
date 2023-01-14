{
  description = "An Algebraic Data Type generator for Typescript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
    flake-utils.url = "github:numtide/flake-utils";
    bun-flake.url = "github:pfgray/bun-flake";
  };

  outputs = { self, nixpkgs, flake-utils, bun-flake }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      yaltt = pkgs.callPackage ./. {};
      yarn2NixExtras = pkgs.callPackage ./nix/yarn2NixExtras {};
    in {
      devShell = pkgs.mkShell {
        packages = with pkgs; [
          (builtins.trace (builtins.attrNames bun-flake.outputs.packages.${system}) bun-flake.outputs.packages.${system}.v0_4_0)
          yarn
          deno
          (yarn2NixExtras.linkNodeModules yaltt)
        ];
      };
      packages = {
        yaltt-build = yaltt;
      };
    });
}
