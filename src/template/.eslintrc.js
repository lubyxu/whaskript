module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    semi: ['error', 'always']
  },
};