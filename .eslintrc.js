module.exports = {
  root: true,

  rules: {
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
  },
  overrides: [
    // Next.js
    {
      files: ['src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        // 'plugin:import/recommended',
        'next/core-web-vitals',
        'prettier',
      ],
      plugins: ['eslint-plugin-tsdoc'],
      rules: {
        'tsdoc/syntax': 'warn',
        // Exclude utils/debug
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { varsIgnorePattern: 'debug' },
        ],
      },
      overrides: [
        // Vitest
        {
          files: ['src/**/*.test.{js,mjs,cjs,ts,mts,cjs}'],
          rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
          },
        },
      ],
    },
    // Node.js
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cjs}'],
      excludedFiles: ['src/**/*'],
      env: {
        es2022: true,
        node: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        // 'plugin:import/recommended',
        'plugin:n/recommended',
        'prettier',
      ],
      // parserOptions: {
      //   ecmaVersion: 'latest',
      //   project: './tsconfig.scripts.json',
      //   tsconfigRootDir: __dirname,
      // },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.mts', 'cts'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/no-named-as-default-member': 'off', // Allow default export even if named export exists
        '@typescript-eslint/no-non-null-assertion': 'off', // for Map
        '@typescript-eslint/no-explicit-any': 'off', // Loosen
        '@typescript-eslint/no-empty-interface': 'off', // Loosen
        '@typescript-eslint/no-unused-vars': 'off', // Loosen
        'import/no-extraneous-dependencies': 'off', // for dev use
        'n/no-extraneous-import': 'off', // for dev use
        'n/no-unsupported-features/es-syntax': 'off', // for esm
        'no-console': 'off', // for dev use
      },
      overrides: [
        // for CommonJS
        {
          files: ['**/*.{js,cjs,ts,cts}'],
          rules: {
            '@typescript-eslint/no-var-requires': 'off',
          },
        },
      ],
    },
  ],
};
