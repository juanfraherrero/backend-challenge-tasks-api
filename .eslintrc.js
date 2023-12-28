module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  globals: {
    describe: 'readonly',
    beforeAll: 'readonly',
    test: 'readonly',
    afterAll: 'readonly',
    expect: 'readonly',
  },
};
