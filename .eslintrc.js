module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],

  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-plusplus': 'off',
    'no-console': 'warn',
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
