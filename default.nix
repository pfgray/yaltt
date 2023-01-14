{yarn2nix, mkYarnPackage, ...}:
  mkYarnPackage {
    name = "ts-adt";
    src = ./.;
    packageJSON = ./package.json;
    yarnLock = ./yarn.lock;
  }