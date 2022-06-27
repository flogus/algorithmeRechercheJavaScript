module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-func-assign": "off",
  },
};
