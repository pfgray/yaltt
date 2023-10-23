{ dockerTools, pkgsCross }:

dockerTools.buildImage {
  name = "hello-docker";
  config = {
    Cmd = [ "${pkgsCross.musl64.hello}/bin/hello" ];
  };
}