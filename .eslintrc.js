module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'unused-imports'
    ],
    rules: {
        'object-curly-spacing': ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/no-unused-vars': 1,
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
