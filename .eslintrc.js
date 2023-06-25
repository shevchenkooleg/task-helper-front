module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended'
    ],
    overrides: [{
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: ['./tsconfig.json']
        },
        files: ['*.ts', '*.tsx']
    }, {
        rules: {
            'i18next/no-literal-string': 'off',
            'max-len': 'off'
        },
        files: ['**/src/**/*.{test,stories}.{ts,tsx}']
    }],
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'path-import-validation-plugin',
        'unused-imports'
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/indent': [2, 4],
        indent: 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-array-constructor': 'off',
        '@typescript-eslint/semi': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-multiple-empty-lines': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': [0],
        '@typescript-eslint/no-floating-promises': [0],
        'unused-imports/no-unused-imports': 'error',
        'i18next/no-literal-string': ['error', {
            markupOnly: true,
            ignoreAttribute: [
                'data-testid',
                'to',
                'name',
                'target',
                'direction',
                'justify',
                'align',
                'gap',
                'role',
                'as',
                'border'
            ]
        }],
        'max-len': ['error', {
            ignoreComments: true,
            code: 120
        }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'promise/param-names': 'off',
        'path-import-validation-plugin/relative-path-import-checker': ['error', { alias: '@' }],
        'path-import-validation-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.tsx', '**/StoreDecorator.tsx']
            }
        ],
        'path-import-validation-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing']
            }
        ]
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true
    }
}
