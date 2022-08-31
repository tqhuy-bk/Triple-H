import { Button, Paper, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';

import * as tourAction from '../../redux/actions/createTourAction';
import { useDispatch } from "react-redux";
import { formStyles } from "../../style";
// import * as dateUtils from '../../utils/date';

export default function UpdateDateForm(props) {

    const { currentDate, indexDate, handleClose } = props;

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tourAction.updateDate({ indexDate: indexDate, newDate: selectedDate }));
        handleClose();
    }

    const classes = formStyles();

    return (
        <Paper style={{ padding: 20 }}>
            <div className={classes.center}>
                <Typography variant="h5">Thay đổi ngày</Typography>
            </div>
            <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.center}
                        name="date"
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Thay đổi ngày"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div style={{ marginTop: 20 }} className={classes.center}>
                    <Button onClick={handleSubmit} type="submit">
                        Xong
                    </Button>
                </div>
            </form>
        </Paper>
    )
}