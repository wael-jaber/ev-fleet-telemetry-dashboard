module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'references-empty': [2, 'never'], // Ensures a reference to GitHub issues is required
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['#'], // This will ensure issue numbers like "#123" are recognized
    },
  },
};

