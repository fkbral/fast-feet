module.exports = {
    "env": {
        "es6": true
    },
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "prettier"
    ],
    "rules": {
      "prettier/prettier":'error',
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-undef": "off",
      'react/jsx-filename-extension' : [
        'error',
        {
          extensions: ['.jsx', '.js']
        }
      ],
      "import/prefer-default-export":'off',
      "react/jsx-props-no-spreading": 'off',
      "no-console": ['error',
        {
          'allow':['tron']
        }
      ],
      "no-param-reassign":'off',
    },
    settings:{
      "import/resolver" : {
        "babel-plugin-root-import": {
          rootPathSuffix: "src"
        }
      }
    }
};
