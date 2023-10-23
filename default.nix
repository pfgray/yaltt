{}:

with (import <nixpkgs> {});
with (import /Users/paul.gray/dev/pnpm2nix { inherit pkgs; });

mkPnpmPackage {
  src = ./.;
  # These default to src/package.json & src/shrinkwrap.yaml
  # packageJSON = ./package.json;
  # shrinkwrapYML = ./shrinkwrap.yaml;
}