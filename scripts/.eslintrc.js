module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script' // Allow CommonJS
  },
  rules: {
    // Allow require() in Node.js scripts
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    
    // Node.js specific rules
    'no-console': 'off', // Allow console.log in scripts
    'no-process-exit': 'off' // Allow process.exit in scripts
  }
}; 