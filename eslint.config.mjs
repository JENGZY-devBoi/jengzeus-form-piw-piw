import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
    features: {
        tooling: true,
        stylistic: {
            commaDangle: 'never',
            braceStyle: '1tbs',
            indent: 4,
            semi: true,
            quotes: 'single'
        }
    }
}).overrideRules({
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 5 }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 'no-unused-vars': 'off'
    '@typescript-eslint/no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    '@stylistic/operator-linebreak': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/quote-props': 'off',
    '@stylistic/no-trailing-spaces': 'off',
    'vue/require-valid-default-prop': 'off'
}).append({
    rules: {
        // TypeScript rules
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-object-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',

        // JavaScript rules
        '@/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'semi': 'error',

        // Vue rules
        'vue/html-end-tags': 'warn',
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'any'
                }
            }
        ],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/html-quotes': ['error', 'double'],
        'vue/block-order': [
            'error',
            {
                order: ['script', 'template', 'style']
            }
        ],
        'vue/valid-v-slot': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/no-unused-vars': 'off',
        'vue/no-mutating-props': 'off',
        'vue/no-side-effects-in-computed-properties': 'off',
        'vue/return-in-computed-property': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'no-empty': 'warn',
        '@stylistic/operator-linebreak': 'off'
    }
});
