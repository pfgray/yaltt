{ stdenv, lib, unzip, writeShellScriptBin, ... }: {
  linkNodeModules = build:
    writeShellScriptBin "linkNodeModules" ''
      ln -s ${build}/libexec/ts-adt/node_modules node_modules
    '';
}