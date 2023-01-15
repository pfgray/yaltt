{yarn2nix, mkYarnPackage, ...}:
  mkYarnPackage {
    name = "yaltt";
    src = ./.;
    packageJSON = ./package.json;
    yarnLock = ./yarn.lock;
  }