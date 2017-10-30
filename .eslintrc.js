module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", "tab"],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [1]
    },
    "globals": {
        "global": true,
        "process": true,
        "__dirname": true,
        "module": true,
        "require": true,
        "$": true,
        "Velocity": true
    }
};