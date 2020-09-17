module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-fragments': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 0
  },
};
