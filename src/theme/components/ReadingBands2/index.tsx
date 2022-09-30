import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import * as React from 'react';
import type { DocupotamusThemeConfig } from '../../../utils';
import { getViewportHeight } from '../../../utils';
import type { Band } from './reading-bands';
import styles from './styles.module.css';

const CENTER: number = .5;
const STANDARD_DEVIATION_1: number = .341;
const STANDARD_DEVIATION_2: number = .477;
const B0_MULTIPLIER: number = 1.0;
const B1_MULTIPLIER: number = 0.8;
const B2_MULTIPLIER: number = 0.4;

type Props = {
};

const bands: Band[] = [
    {
        topVh: 0,
        bottomVh: CENTER - STANDARD_DEVIATION_2,
        multiplier: B2_MULTIPLIER,
    },
    {
        topVh: CENTER - STANDARD_DEVIATION_2,
        bottomVh: CENTER - STANDARD_DEVIATION_1,
        multiplier: B1_MULTIPLIER,
    },
    {
        topVh: CENTER - STANDARD_DEVIATION_1,
        bottomVh: CENTER + STANDARD_DEVIATION_1,
        multiplier: B0_MULTIPLIER,
    },
    {
        topVh: CENTER + STANDARD_DEVIATION_1,
        bottomVh: CENTER + STANDARD_DEVIATION_2,
        multiplier: B1_MULTIPLIER,
    },
    {
        topVh: CENTER + STANDARD_DEVIATION_2,
        bottomVh: 1.0,
        multiplier: B2_MULTIPLIER,
    },
];

export default function ReadingBands(
    {
    }: Props
): JSX.Element | null {
    const {
        readTime: {
            debug: {
                band: {
                    isEnabled: debugBandIsEnabled,
                    colors: bandColors,
                }
            },
        },
    } = useDocusaurusContext()
        .siteConfig
        .themeConfig
        .docupotamus as DocupotamusThemeConfig;

    // TODO(dnguyen0304): hover
    const viewportHeight = getViewportHeight();

    return (
        debugBandIsEnabled
            ? <>
                {bands.map((band, i) => {
                    const heightPx =
                        (band.bottomVh - band.topVh) * viewportHeight;
                    return (
                        <div
                            className={styles.readingBands}
                            style={{
                                top: `${viewportHeight * band.topVh}px`,
                                height: `${heightPx}px`,
                                backgroundColor: bandColors[i],
                            }}>
                        </div>
                    )
                })}
            </>
            : null
    );
}
