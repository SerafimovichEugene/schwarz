module.exports = {
    "root": true,
    "extends": ["airbnb-base", "prettier"],
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
          "jsx": true,
          experimentalObjectRestSpread: true
        }
    },
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "arrow-body-style": 0,
        "no-shadow": 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "global-require": 0,
        "func-names": "off",
        "no-underscore-dangle": "off",
        "max-len": "off",
        "no-bitwise": "off",
        "no-param-reassign": ["warn", { "props": false }],
        "padded-blocks": "off",
        "no-use-before-define": "off",
        "no-unused-vars": "warn",
        "react/require-extension": "off",
        "import/no-extraneous-dependencies": "off",
        "no-plusplus": "off",
        "prefer-template": "off",
        "consistent-return": "off",
        "no-console": "off",
        "no-restricted-syntax": ["error", "DebuggerStatement", "ForInStatement", "LabeledStatement", "WithStatement"],
        "dot-notation": "off",
        "class-methods-use-this": "off",
        "no-useless-constructor": "off",
        "react/display-name": 0, // Prevent missing displayName in a React component definition
        "react/jsx-no-undef": 2, // Disallow undeclared variables in JSX
        "react/jsx-sort-props": 0, // Enforce props alphabetical sorting
        "react/jsx-uses-react": 2, // Prevent React to be incorrectly marked as unused
        "react/jsx-uses-vars": 2, // Prevent variables used in JSX to be incorrectly marked as unused
        "react/no-did-update-set-state": 2, // Prevent usage of setState in componentDidUpdate
        "react/no-multi-comp": 0, // Prevent multiple component definition per file
        "react/no-unknown-property": 2, // Prevent usage of unknown DOM property
        "react/prop-types": 2, // Prevent missing props validation in a React component definition
        "react/react-in-jsx-scope": 2, // Prevent missing React when using JSX
        "react/self-closing-comp": 2, // Prevent extra closing tags for components without children
        // "react/wrap-multilines": 2, // Prevent missing parentheses around multilines JSX
    }
}
