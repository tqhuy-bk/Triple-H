import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as alertAction from '../../redux/actions/alertAction';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}


export default function NotificationBar() {

    const dispatch = useDispatch();

    const { success, error, message } = useSelector(state => state.alert);

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(alertAction.reset());
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={error}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
