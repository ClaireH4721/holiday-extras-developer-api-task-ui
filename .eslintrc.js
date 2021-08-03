module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-expressions': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off'
  },
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx'
      ],
      env: {
        jest: true
      }
    }
  ]
};
