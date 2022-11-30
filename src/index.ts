import type { Plugin } from '@docusaurus/types';

export default function themeReadTime(): Plugin<undefined> {
    return {
        name: 'docupotamus-theme-read-time',

        getThemePath() {
            return './theme';
        },
    };
}

export { validateThemeConfig } from './validateThemeConfig';
