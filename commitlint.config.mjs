const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'release',
        'ui',
      ],
    ],
    'header-max-length': [2, 'always', 200],
    'header-case': [0],
    'subject-case': [0],
    'type-case': [0],
  },
};

export default config;
