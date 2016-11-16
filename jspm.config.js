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
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "jquery": "npm:jquery@3.1.1",
    "picturefill": "npm:picturefill@3.0.2",
    "svg4everybody": "npm:svg4everybody@2.1.3"
  },
  packages: {}
});
