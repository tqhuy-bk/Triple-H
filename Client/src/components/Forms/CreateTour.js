import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import 'date-fns';
import {
  Button,
  Paper,
  InputBase,
  Typography,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { formStyles } from '../../style';
import { createTour } from '../../redux/actions/createTourAction';
import LoginModal from '../Modal/Login';

export default function CreateTourForm(props) {
  const { handleClose } = props;
  const { auth } = useSelector(state => state);

  const history = useHistory();

  const dispatch = useDispatch();

  const classes = formStyles();

  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleTextChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createTour({ name: name, date: selectedDate }));
    history.push('/createtour');
  };

  return (
    <>
      {auth.token ? (
        <Paper className={classes.paperContainer}>
          <div className={classes.modal_header}>
            <Typography variant="h5" style={{ marginLeft: '35%' }}>
              Tạo hành trình
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <Close className={classes.modal_header_closeIcon} />
            </IconButton>
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
            <div className={classes.composeTour}>
              <div className={classes.composeForm}>
                <InputBase
                  placeholder="Hãy đặt tên cho hành trình của bạn..."
                  title="Hãy đặt tên cho hành trình của bạn"
                  rows={3}
                  name="tourname"
                  required
                  multiline
                  className={classes.createText}
                  value={name}
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className={classes.datepicker}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="date"
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Chọn ngày khởi hành"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.center}>
              <Button type="submit" className={classes.button}>
                Tạo
              </Button>
            </div>
          </form>
        </Paper>
      ) : (
        <LoginModal handleClose={handleClose} />
      )}
    </>
  );
}
