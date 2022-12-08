import Box from '@mui/material/Box';
import * as React from 'react';
import { useToolbar } from '../../../contexts/toolbar';
import { CardViewModel } from '../../../docusaurus-theme-read-time';
import Card from './Card';

const KEY_PREFIX: string = 'workbenchCard';
const BOX_SHADOW_WIDTH: string = 'var(--space-xs)';
const fakeData: CardViewModel[] = [
    {
        targetId: 'ABC',
        details: 'Setting up your environment',
        readTime: {
            minute: 61,
            second: 87,
        },
    },
    {
        targetId: 'IJK',
        details: 'Database backup',
        readTime: {
            minute: 11,
            second: 32,
        },
    },
    {
        targetId: 'XYZ',
        details: 'It is important to...',
        readTime: {
            minute: 130,
            second: 49,
        },
    },
];

interface Props { };

export default function Workbench(
    {
    }: Props
): JSX.Element {
    const { workbenchIsOpen } = useToolbar();

    return (
        <Box
            sx={theme => ({
                position: 'sticky',
                top: 0,
                // TODO(dnguyen0304): Fix missing responsive design.
                width: '300px',
                height: '100vh',
                display: workbenchIsOpen ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                background: `linear-gradient(
                    to bottom,
                    ${theme.palette.grey[600]} 0%,
                    ${theme.palette.grey[700]} 100%
                )`,
                borderTopLeftRadius: 'var(--space-2xs)',
                padding: 'var(--space-xs) var(--space-2xs)',
                // TODO(dnguyen0304): Investigate refactoring to box-shadow
                // style to reduce complexity.
                '&::before': {
                    'content': '""',
                    'position': 'absolute',
                    'width': BOX_SHADOW_WIDTH,
                    'height': '100vh',
                    'top': '0',
                    'left': `calc(-1 * ${BOX_SHADOW_WIDTH})`,
                    'background': `linear-gradient(
                        to right,
                        transparent,
                        rgba(60, 64, 67, 0.15) 70%,
                        rgba(60, 64, 67, 0.4) 100%)`,
                },
                '& > *': {
                    marginBottom: 'var(--space-xs)',
                },
                '& > *:last-child': {
                    marginBottom: 0,
                },
            })}
        >
            {fakeData.map((card, i) =>
                <Card
                    key={`${KEY_PREFIX}-${i}`}
                    card={card}
                />
            )}
        </Box>
    );
};
