import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { tourdetailStyles } from '../../style';
import AddService from './AddService';
import AddLocation from './AddLocation';
import Location from './Location';
import ServiceCard from './Service';
import { AddCircle, Clear, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  addEvent,
  deleteEvent,
  updateEvent,
  updateTimeEvent
} from '../../redux/actions/createTourAction';
import QuillEditor from '../QuillEditor';

function UpdateTimeForm({ value, indexDate, indexEvent, handleClose }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);
  const handleUpdate = () => {
    dispatch(updateTimeEvent({ time, indexDate, indexEvent }));
    handleClose();
  };

  useEffect(() => {
    console.log('Time:', value);
    setTime(value);
  }, [value]);
  return (
    <Paper style={{ paddingInline: 40, paddingBlock: 10 }}>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        <Typography variant="h6">Chỉnh sửa thời gian</Typography>
      </div>
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        value={time}
        variant="outlined"
        onChange={e => setTime(e.target.value)}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300 // 5 min
        }}
        style={{ width: '100%' }}
      />
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBlock: 10 }}
      >
        <Button onClick={handleUpdate}>Xong</Button>
      </div>
      {/* <Button onClick={handleUpdate}>Xong</Button> */}
    </Paper>
  );
}

function AddEventButtons({
  indexDate,
  indexEvent,
  hideAddLocation,
  hideAddService
}) {
  const classes = tourdetailStyles();

  const [addService, setAddService] = useState(false);
  const [addLocation, setAddLocation] = useState(false);

  const showAddService = () => {
    setAddService(true);
  };

  const closeAddService = () => {
    setAddService(false);
  };

  const showAddLocation = () => {
    setAddLocation(true);
  };

  const closeAddLocation = () => {
    setAddLocation(false);
  };

  const refAddService = React.createRef();

  const refAddLoc = React.createRef();

  const AddServiceRef = React.forwardRef((props, ref) => (
    <AddService {...props} innerRef={ref} />
  ));

  const AddLocationRef = React.forwardRef((props, ref) => (
    <AddLocation {...props} innerRef={ref} />
  ));

  return (
    <>
      <Button
        variant="contained"
        onClick={showAddService}
        className={classes.addDay}
        disabled={Boolean(hideAddService)}
      >
        Thêm dịch vụ
      </Button>
      <Modal
        aria-labelledby="add-service"
        aria-describedby="add-service-modal"
        className={classes.modal}
        open={addService}
        onClose={closeAddService}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <AddServiceRef
          ref={refAddService}
          handleClose={closeAddService}
          indexDate={indexDate}
          indexEvent={indexEvent}
        />
      </Modal>
      <Button
        variant="contained"
        onClick={showAddLocation}
        className={classes.addDay}
        disabled={Boolean(hideAddLocation)}
      >
        Thêm địa điểm
      </Button>
      <Modal
        aria-labelledby="add-location"
        aria-describedby="add-location-modal"
        className={classes.modal}
        open={addLocation}
        onClose={closeAddLocation}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <AddLocationRef
          ref={refAddLoc}
          handleClose={closeAddLocation}
          indexDate={indexDate}
          indexEvent={indexEvent}
        />
      </Modal>
    </>
  );
}

function TimeDetail({ event, indexDate, indexEvent }) {
  const classes = tourdetailStyles();
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setDescription(event?.description || '');
    setCost(event?.cost || 0);
  }, [event]);

  const handleUpdateInfo = () => {
    dispatch(updateEvent({ indexDate, indexEvent, description, cost }));
  };

  return (
    <div>
      <QuillEditor
        value={description}
        setValue={e => setDescription(e)}
        className={classes.reactQuillTour}
        placeholder="Mô tả"
      />
      <div className={classes.btnWrap}>
        <TextField
          label="Chi phí"
          title="Chi phí"
          variant="outlined"
          name="cost"
          id="cost"
          type="number"
          className={classes.fullField}
          style={{ backgroundColor: 'white' }}
          value={cost}
          onChange={e => setCost(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">.000 VND</InputAdornment>
            )
          }}
        />
        <Button
          onClick={handleUpdateInfo}
          variant="contained"
          className={classes.addDayCustom}
        >
          Cập nhật
        </Button>
      </div>
      <div className={classes.btnWrap}>
        <AddEventButtons
          indexDate={indexDate}
          indexEvent={indexEvent}
          hideAddLocation={event?.location}
          hideAddService={event?.service}
        />
      </div>
      {event?.location && (
        <Location
          location={event}
          indexDate={indexDate}
          indexLocation={indexEvent}
          isSave={false}
          isEdit
        />
      )}
      {event?.service && (
        <ServiceCard
          service={event}
          indexDate={indexDate}
          index={indexEvent}
          isSave={false}
          isEdit
        />
      )}
    </div>
  );
}

function TimeLine({ events, indexDate, index, setValue, value, item }) {
  const [showEditTime, setShowEditTime] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  const classes = tourdetailStyles();
  const handleShowEdit = () => {
    setShowEditTime(true);
  };

  const closeEdit = () => {
    setShowEditTime(false);
  };

  const handleShowDelete = () => {
    if (events.length <= 1) return;
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDelete = index => {
    dispatch(deleteEvent({ indexDate, index }));
    setValue(state => (state - 1 >= 0 ? state - 1 : 0));
    handleCloseDelete();
  };

  return (
    <div key={index}>
      <Button
        onClick={() => setValue(index)}
        className={
          index === value ? classes.activeTimeline : classes.unactiveTimeline
        }
      >
        {item.time}
      </Button>
      <IconButton onClick={handleShowEdit} size="small">
        <Edit />
      </IconButton>
      <Modal
        aria-labelledby="create-post"
        aria-describedby="create-post-modal"
        className={classes.modal}
        open={showEditTime}
        onClose={closeEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <UpdateTimeForm
          indexDate={indexDate}
          indexEvent={index}
          value={events[index].time}
          handleClose={closeEdit}
        />
      </Modal>
      <IconButton onClick={handleShowDelete} size="small">
        <Clear />
      </IconButton>
      <Dialog
        open={showDelete}
        onClose={handleCloseDelete}
        aria-labelledby="show-delete-dialog"
        aria-describedby="show-delete-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn có chắc chắn muốn xóa?'}
        </DialogTitle>

        <DialogContent>
          Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy</Button>
          <Button
            onClick={() => handleDelete(index)}
            variant="contained"
            color="secondary"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function DetailDate({ indexDate, events }) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const classes = tourdetailStyles();
  const handleAddEvent = () => {
    dispatch(addEvent({ indexDate }));
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography className={classes.detailDateTittle}>Chi tiết</Typography>
      <Grid
        container
        className={classes.tourDateWrapper}
      >
        <Grid item md={3} sm={12} xs={12}>
          <div className={classes.timelineTour}>
            {events.map((item, index) => (
              <TimeLine
                events={events}
                indexDate={indexDate}
                index={index}
                setValue={setValue}
                value={value}
                item={item}
              />
            ))}
          </div>
          <IconButton onClick={handleAddEvent}>
            <AddCircle />
          </IconButton>
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <TimeDetail
            event={events[value]}
            indexDate={indexDate}
            indexEvent={value}
          />
        </Grid>
      </Grid>
    </div>
  );
}
