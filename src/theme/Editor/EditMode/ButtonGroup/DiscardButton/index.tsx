import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSnackbar } from '../../../../../contexts/snackbar';
import type { KeyBinding as KeyBindingType } from '../../../../../docusaurus-theme-editor';
import Transition from '../../../../components/Transition';

interface Props {
    readonly onSubmit: () => void;
}

const KeyBinding: KeyBindingType = {
    key: 'shift+option+d',
    friendlyLabel: '^⌥D',
};

const StyledDialog = styled(Dialog)({
    '& div.MuiPaper-root': {
        padding: '1.5rem 1.25rem',
        borderRadius: '30px',
    },
    '& div.MuiDialogContent-root': {
        paddingBottom: '.9rem',
    },
});

export default function DiscardButton({ onSubmit }: Props): JSX.Element {
    const snackbar = useSnackbar().snackbar;

    const [confirmationIsOpen, setConfirmationIsOpen] =
        React.useState<boolean>(false);

    const toggleConfirmation = () => {
        setConfirmationIsOpen(prev => !prev);
    };

    const closeEditor = () => {
        toggleConfirmation();
        onSubmit();
        snackbar.sendSuccessAlert('Successfully discarded changes.');
    };

    useHotkeys(
        KeyBinding.key,
        toggleConfirmation,
    );

    return (
        <React.Fragment>
            {/* TODO(dnguyen0304): Extract to a centralized location to
                facilitate maintenance. */}
            <Tooltip
                title={`Discard (${KeyBinding.friendlyLabel})`}
                placement='top'
            >
                <IconButton
                    aria-label='discard'
                    // TODO(dnguyen0304): Add red color for theme palette.
                    color='error'
                    onClick={toggleConfirmation}
                >
                    <DeleteOutlineRoundedIcon />
                </IconButton>
            </Tooltip>
            <StyledDialog
                TransitionComponent={Transition}
                onClose={toggleConfirmation}
                open={confirmationIsOpen}
                keepMounted
            >
                <DialogTitle>Discard changes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to discard your changes? Your changes will
                        be permanently lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleConfirmation}
                        variant='contained'
                        autoFocus
                    >
                        Go Back
                    </Button>
                    <Button onClick={closeEditor}>
                        Discard
                    </Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}
