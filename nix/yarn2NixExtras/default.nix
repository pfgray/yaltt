{ stdenv, lib, unzip, writeShellScriptBin, ... }: {
  linkNodeModules = build:
    writeShellScriptBin  "linkNodeModules" ''
      ln -s ${build}/libexec/${build.name}/node_modules node_modules
    '';
}