import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // TanStack Form uses render-prop `children={...}` which conflicts with the default rule.
  {
    files: ['src/components/auth/**/*.tsx'],
    rules: { 'react/no-children-prop': 'off' },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
