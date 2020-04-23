module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
  ],
  plugins: [
    '@typescript-eslint', '@typescript-eslint/tslint', 'eslint-plugin-import', 'react-hooks'],
  rules: {
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    "react-hooks/rules-of-hooks": "warn",
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['parent'], ['sibling', 'index']],
      },
    ],
    'import/no-default-export': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rulesDirectory": [
          "node_modules/tslint-immutable/rules"
        ],
        "rules": {
          "no-array-mutation": [true, {
            "ignore-suffix": [
              "copyWithin",
              "fill",
              "pop",
              "push",
              "reverse",
              "shift",
              "splice",
              "unshift",
            ]
          }],
        }
      }
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
