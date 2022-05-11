module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base/legacy', 'plugin:prettier/recommended'],

  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-plusplus': 'warn',
    'no-console': 0,
    'max-len': ['warn', { code: 120 }],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
  ignorePatterns: ['*config.js'],
};
