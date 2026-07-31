import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist', 'node_modules', 'coverage']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			/*
			 * react/recommended is what makes no-unused-vars JSX-aware, via the
			 * jsx-uses-vars rule. Without it every component imported purely for
			 * use in JSX — motion, Skeleton, Icon — was reported as unused, which
			 * buried the real findings in false positives.
			 */
			react.configs.flat.recommended,
			react.configs.flat['jsx-runtime'],
			jsxA11y.flatConfigs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			// Last: turns off every stylistic rule Prettier owns.
			prettier,
		],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				// Injected by the Google Maps SDK loaded by @vis.gl/react-google-maps.
				google: 'readonly',
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			'no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^[A-Z_]',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			// This project does not use PropTypes; component contracts are
			// documented in JSDoc instead. Revisit if TypeScript is adopted.
			'react/prop-types': 'off',
			// A literal apostrophe in JSX text is valid HTML and renders
			// correctly. This rule predates modern JSX handling and its only
			// effect here would be to make copy harder to read in source.
			'react/no-unescaped-entities': 'off',
			// `role` is a domain prop on our own Sidebar/Header components
			// ("Student", "Lecturer", "Admin"), not an ARIA role. Scope the rule
			// to real DOM elements, where it still catches genuine mistakes.
			'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
		},
	},
]);
