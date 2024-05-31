//import * as regexpPlugin from 'eslint-plugin-regexp';

/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	plugins: ['regexp'],
	rules: {
		'svelte/no-at-html-tags': 'off',
		'no-control-regex': 'warn',
		'no-extra-boolean-cast': 'warn',
		'no-irregular-whitespace': 'warn',
		'no-control-regex': 'warn',
		'no-unused-vars': 'warn',
		// 'regexp/rule-name': 'error',
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
