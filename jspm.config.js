SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "skeletor/": "Static/src/js/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.16"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "skeletor": {
      "main": "main.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "jquery": "npm:jquery@3.1.1",
    "logdown": "npm:logdown@1.4.2",
    "onMediaQuery": "github:JoshBarr/on-media-query@0.2.0",
    "picturefill": "npm:picturefill@3.0.2",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "svg4everybody": "npm:svg4everybody@2.1.3"
  },
  packages: {}
});
