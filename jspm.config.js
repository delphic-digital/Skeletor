SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "skeletor/": "Static/src/js/"
  },
  browserConfig: {
    "baseURL": "/",
    "bundles": {
      "Static/dist/js/main.js": [
        "skeletor/main.js",
        "npm:jquery@3.1.1/dist/jquery.js",
        "npm:jquery@3.1.1.json"
      ]
    }
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
    "npm:*.json"
  ],
  map: {
    "jquery": "npm:jquery@3.1.1"
  },
  packages: {}
});
