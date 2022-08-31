import React, { useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  InputAdornment
} from '@material-ui/core';
import { addVolunteerStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddImageHorizontal from '../Input/AddImageHorizontal';
import { Close, AddCircle } from '@material-ui/icons';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@material-ui/lab';
import { convertDateToStr } from '../../utils/date';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { RadioButtonUnchecked } from '@material-ui/icons';
import AddLocationForm from '../Forms/AddLocationVolunteer';
import {
  createVolunteer,
  updateVolunteer
} from '../../redux/callApi/volunteerCall';

function Item(props) {
  const { item, handleRemove } = props;

  const classes = addVolunteerStyles();

  return (
    <div className={classes.itemContainer}>
      <Typography>{item}</Typography>
      <IconButton size="small" onClick={() => handleRemove()}>
        <Close />
      </IconButton>
    </div>
  );
}
export default function AddVolunteer(props) {
  const classes = addVolunteerStyles();
  const { auth, socket } = useSelector(state => state);
  const { volunteer, isUpdate } = props;
  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const [idx, setIdx] = useState(0);
  const [idxLocation, setIdxLocation] = useState(0);

  const [tempDescription, setTempDescription] = useState('');
  const [tempTime, setTempTime] = useState('');
  const [tempActivity, setTempActivity] = useState('');
  const [tempLocation, setTempLocation] = useState(null);

  //data save
  const [images, setImages] = useState(volunteer ? volunteer.images : []);
  const [context, setContext] = useState(
    volunteer
      ? {
          name: volunteer.name,
          descriptions: volunteer.descriptions,
          cost: volunteer.cost,
          type: volunteer.type
        }
      : {
          name: '',
          descriptions: [],
          cost: '',
          type: ''
        }
  );
  const [dateVolunteer, setDateVolunteer] = useState(
    volunteer
      ? volunteer.date
      : [
          {
            activities: [],
            accommodation: '',
            date: new Date()
          }
        ]
  );

  const [locationVolunteer, setLocationVolunteer] = useState(
    volunteer ? volunteer.location : []
  );
  const handleAddDescription = e => {
    e.preventDefault();
    setContext({
      ...context,
      descriptions: [...context.descriptions, tempDescription]
    });
    setTempDescription('');
  };

  const handleRemoveDescription = idx => {
    setContext({
      ...context,
      descriptions: [
        ...context.descriptions.slice(0, idx),
        ...context.descriptions.slice(idx + 1)
      ]
    });
  };
  const handleChange = e => {
    setContext({
      ...context,
      [e.target.name]: e.target.value
    });
  };

  const handleAddDay = () => {
    var newDate = new Date(dateVolunteer[dateVolunteer.length - 1].date);
    newDate.setDate(newDate.getDate() + 1);
    setDateVolunteer([
      ...dateVolunteer,
      {
        activities: [],
        accommodation: '',
        date: newDate
      }
    ]);
  };
  const handleDeleteDay = () => {
    setDateVolunteer([
      ...dateVolunteer.slice(0, idx),
      ...dateVolunteer.slice(idx + 1)
    ]);
  };

  const handleAddActivity = e => {
    e.preventDefault();
    setDateVolunteer([
      ...dateVolunteer.slice(0, idx),
      {
        ...dateVolunteer[idx],
        activities: [
          ...dateVolunteer[idx].activities,
          { time: tempTime, activity: tempActivity }
        ]
      },
      ...dateVolunteer.slice(idx + 1)
    ]);
    if (tempLocation != null) {
      setLocationVolunteer([
        ...locationVolunteer,
        {
          timeStart: '',
          maxUsers: '',
          description: [],
          activities: [],
          ageUser: '',
          location: tempLocation,
          accommodation: ''
        }
      ]);
      setTempLocation(null);
    }
    setTempTime('');
    setTempActivity('');
  };
  const handleDeleteActivity = index => {
    setDateVolunteer([
      ...dateVolunteer.slice(0, idx),
      {
        ...dateVolunteer[idx],
        activities: [
          ...dateVolunteer[idx].activities.slice(0, index),
          ...dateVolunteer[idx].activities.slice(index + 1)
        ]
      },
      ...dateVolunteer.slice(idx + 1)
    ]);
  };
  const [showAddLoc, setShowAddLoc] = useState(false);
  const handleShowAddLoc = () => {
    setShowAddLoc(true);
  };
  const handleCloseAddLoc = () => {
    setShowAddLoc(false);
  };

  const handleDeleteLocation = () => {
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
  };

  //location
  const [tempLocationDescription, setTempLocationDescription] = useState('');
  const handleAddLocationDescription = e => {
    e.preventDefault();
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      {
        ...locationVolunteer[idxLocation],
        description: [
          ...locationVolunteer[idxLocation].description,
          tempLocationDescription
        ]
      },
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
    setTempLocationDescription('');
  };
  const handleDeleteLocationDescription = index => {
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      {
        ...locationVolunteer[idxLocation],
        description: [
          ...locationVolunteer[idxLocation].description.slice(0, index),
          ...locationVolunteer[idxLocation].description.slice(index + 1)
        ]
      },
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
  };
  const handleChangeLocation = e => {
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      {
        ...locationVolunteer[idxLocation],
        [e.target.name]: e.target.value
      },
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
  };

  const [tempLocationActivity, setTempLocationActivity] = useState('');
  const handleAddLocationActivity = e => {
    e.preventDefault();
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      {
        ...locationVolunteer[idxLocation],
        activities: [
          ...locationVolunteer[idxLocation].activities,
          tempLocationActivity
        ]
      },
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
    setTempLocationActivity('');
  };
  const handleDeleteLocationActivity = index => {
    setLocationVolunteer([
      ...locationVolunteer.slice(0, idxLocation),
      {
        ...locationVolunteer[idxLocation],
        activities: [
          ...locationVolunteer[idxLocation].activities.slice(0, index),
          ...locationVolunteer[idxLocation].activities.slice(index + 1)
        ]
      },
      ...locationVolunteer.slice(idxLocation + 1)
    ]);
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      setState({
        loading: false,
        error: true,
        notFound: false
      });
      return;
    }
    setState({
      loading: true,
      error: false,
      notFound: false
    });
    if (isUpdate) {
      dispatch(
        updateVolunteer(
          volunteer._id,
          auth.token,
          socket,
          {
            ...context,
            date: dateVolunteer,
            location: locationVolunteer
          },
          images,
          () => {
            history.push(`/volunteer/${volunteer._id}`);
            setState({
              loading: false,
              error: false,
              notFound: false
            });
          },
          () => {
            setState({
              loading: false,
              error: true,
              notFound: false
            });
          }
        )
      );
    } else {
      dispatch(
        createVolunteer(
          auth.token,
          socket,
          {
            ...context,
            date: dateVolunteer,
            location: locationVolunteer
          },
          images,
          () => {
            history.push(`/volunteer`);
            setState({
              loading: false,
              error: false,
              notFound: false
            });
          },
          () => {
            setState({
              loading: false,
              error: true,
              notFound: false
            });
          }
        )
      );
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography variant="h5">Tạo hoạt động tình nguyện của bạn</Typography>
      <TextField
        label="Tên hoạt động"
        variant="outlined"
        name="name"
        required
        className={classes.fullField}
        onChange={handleChange}
        value={context.name}
      />
      <Grid container>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            type={'number'}
            name="cost"
            id="cost"
            label="Giá tiêu chuẩn (Nghìn đồng)"
            variant="outlined"
            className={classes.fullField}
            onChange={handleChange}
            value={context.cost}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">.000 VND</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            label="Thể loại"
            variant="outlined"
            name="type"
            required
            className={classes.fullField}
            onChange={handleChange}
            value={context.type}
          />
        </Grid>
      </Grid>

      <AddImageHorizontal
        images={images}
        onChange={setImages}
        className={classes.fullField}
        maxImage={10}
      />
      <span>{state.error}</span>
      <Typography>Các thông tin chung</Typography>
      <Grid container>
        {context.descriptions.map((item, index) => (
          <Grid item md={6} sm={12} xs={12} key={index}>
            <Item
              item={item}
              handleRemove={() => handleRemoveDescription(index)}
            />
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleAddDescription} className={classes.formAdd}>
        <TextField
          label="Thông tin chung"
          variant="outlined"
          name="description"
          className={classes.fullField}
          onChange={e => setTempDescription(e.target.value)}
          value={tempDescription}
        />
        <Button
          type="submit"
          disabled={!tempDescription}
          variant="contained"
          color="primary"
        >
          Thêm
        </Button>
      </form>
      <div>
        <Typography variant="h5">Tạo Lịch trình</Typography>
        <Grid container>
          <Grid item md={3} sm={12} xs={12}>
            <div className={classes.timeline}>
              <Timeline align="right">
                {dateVolunteer.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        className={
                          index === idx
                            ? classes.activeDot
                            : classes.unactiveDot
                        }
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <div style={{ display: 'flex' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteDay()}
                        >
                          <Close />
                        </IconButton>
                        <Button
                          className={
                            index === idx
                              ? classes.activeTimeline
                              : classes.unactiveTimeline
                          }
                          onClick={() => setIdx(index)}
                        >
                          {convertDateToStr(item.date)}
                        </Button>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
            <div className={classes.smallTimeline}>
              <div className={classes.timelineWrap}>
                {dateVolunteer.map((item, index) => (
                  <Button
                    key={index}
                    className={
                      index === idx
                        ? classes.activeTimeline
                        : classes.unactiveTimeline
                    }
                    onClick={() => setIdx(index)}
                  >
                    {convertDateToStr(item.date)}
                  </Button>
                ))}
              </div>
            </div>
            <div className={classes.addDayWrap}>
              <IconButton size="small" onClick={() => handleAddDay()}>
                <AddCircle />
              </IconButton>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <form onSubmit={handleAddActivity} className={classes.formAdd}>
              <TextField
                label="Khoảng thời gian"
                variant="outlined"
                name="time"
                className={classes.halfFeild}
                onChange={e => setTempTime(e.target.value)}
                value={tempTime}
                required
              />
              <TextField
                label="Hoạt động"
                variant="outlined"
                name="activity"
                className={classes.halfFeild}
                onChange={e => setTempActivity(e.target.value)}
                value={tempActivity}
                required
              />
              {tempLocation != null && (
                <TextField
                  variant="outlined"
                  name="location"
                  className={classes.halfFeild}
                  value={tempLocation.fullname}
                  required
                />
              )}
              <Button
                variant="contained"
                onClick={handleShowAddLoc}
                style={{ marginTop: 20 }}
              >
                {tempLocation == null ? 'Thêm địa điểm' : 'Thay đổi địa điểm'}
              </Button>
              <Button
                type="submit"
                disabled={!(tempActivity && tempTime)}
                variant="contained"
                color="primary"
                style={{ marginLeft: 10, marginTop: 20 }}
              >
                Thêm
              </Button>
              <Modal
                aria-labelledby="modal-add-location"
                aria-describedby="modal-add-location-description"
                open={showAddLoc}
                className={classes.modal}
                onClose={handleCloseAddLoc}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={showAddLoc}>
                  <AddLocationForm
                    handleClose={handleCloseAddLoc}
                    tempLocation={tempLocation}
                    setTempLocation={setTempLocation}
                  />
                </Fade>
              </Modal>
            </form>
            <Typography>Lịch trình ngày: {idx + 1}</Typography>
            {dateVolunteer[idx] &&
              dateVolunteer[idx].activities.map((item, index) => (
                <List key={index} component="nav" aria-label="main folders">
                  <ListItem button className={classes.scheduleItem}>
                    <ListItemIcon>
                      <RadioButtonUnchecked style={{ color: '#A5DEC8' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.time}
                      style={{ minWidth: '80px' }}
                    />
                    <ListItemText primary={item.activity} />
                    <ListItemIcon>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteActivity(index)}
                      >
                        <Close />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                </List>
              ))}
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant="h5">
          Hoạt động chi tiết cho từng địa điểm
        </Typography>
        {locationVolunteer.length !== 0 && (
          <Grid container>
            <Grid item md={3} sm={12} xs={12}>
              <div className={classes.timeline}>
                <Timeline align="right">
                  {locationVolunteer.length !== 0 ? (
                    locationVolunteer.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            className={
                              index === idxLocation
                                ? classes.activeDot
                                : classes.unactiveDot
                            }
                          />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <div style={{ display: 'flex' }}>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteLocation()}
                            >
                              <Close />
                            </IconButton>
                            <Button
                              className={
                                index === idxLocation
                                  ? classes.activeTimeline
                                  : classes.unactiveTimeline
                              }
                              onClick={() => setIdxLocation(index)}
                            >
                              {item.location.fullname}
                            </Button>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Timeline>
              </div>
              <div className={classes.smallTimeline}>
                <div className={classes.timelineWrap}>
                  {locationVolunteer.map((item, index) => (
                    <Button
                      key={index}
                      className={
                        index === idxLocation
                          ? classes.activeTimeline
                          : classes.unactiveTimeline
                      }
                      onClick={() => setIdxLocation(index)}
                    >
                      {item.location.fullname}
                    </Button>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
              <TextField
                type={'number'}
                label="Khoảng tuổi"
                variant="outlined"
                name="ageUser"
                className={classes.halfFeild}
                onChange={handleChangeLocation}
                value={
                  locationVolunteer[idxLocation] &&
                  locationVolunteer[idxLocation].ageUser
                }
              />
              <TextField
                type={'number'}
                label="Số người tham gia tối đa"
                variant="outlined"
                name="maxUser"
                className={classes.halfFeild}
                onChange={handleChangeLocation}
                value={
                  locationVolunteer[idxLocation] &&
                  locationVolunteer[idxLocation].maxUser
                }
              />

              <form
                onSubmit={handleAddLocationDescription}
                className={classes.formAdd}
              >
                <TextField
                  label="Thông tin địa điểm"
                  variant="outlined"
                  name="location_description"
                  className={classes.fullField}
                  onChange={e => setTempLocationDescription(e.target.value)}
                  value={tempLocationDescription}
                  required
                />
                <Button
                  type="submit"
                  disabled={!tempLocationDescription}
                  variant="contained"
                  color="primary"
                >
                  Thêm
                </Button>
              </form>
              <Typography>Thông tin :</Typography>
              {locationVolunteer[idxLocation] &&
                locationVolunteer[idxLocation].description.map(
                  (item, index) => (
                    <List key={index} component="nav" aria-label="main folders">
                      <ListItem button className={classes.scheduleItem}>
                        <ListItemIcon>
                          <RadioButtonUnchecked style={{ color: '#A5DEC8' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          style={{ minWidth: '80px' }}
                        />
                        <ListItemIcon>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteLocationDescription(index)
                            }
                          >
                            <Close />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  )
                )}

              <form
                onSubmit={handleAddLocationActivity}
                className={classes.formAdd}
              >
                <TextField
                  label="Hoạt động cụ thể"
                  variant="outlined"
                  name="location_activity"
                  className={classes.fullField}
                  onChange={e => setTempLocationActivity(e.target.value)}
                  value={tempLocationActivity}
                  required
                />
                <Button
                  type="submit"
                  disabled={!tempLocationActivity}
                  variant="contained"
                  color="primary"
                >
                  Thêm
                </Button>
              </form>
              <Typography>Các hoạt động cụ thể:</Typography>
              {locationVolunteer[idxLocation] &&
                locationVolunteer[idxLocation].activities.map((item, index) => (
                  <List key={index} component="nav" aria-label="main folders">
                    <ListItem button className={classes.scheduleItem}>
                      <ListItemIcon>
                        <RadioButtonUnchecked style={{ color: '#A5DEC8' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        style={{ minWidth: '80px' }}
                      />
                      <ListItemIcon>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteLocationActivity(index)}
                        >
                          <Close />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  </List>
                ))}
            </Grid>
            <Button
              onClick={() => handleSubmit()}
              disabled={
                !(context && dateVolunteer && locationVolunteer) ||
                state.loading
              }
              variant="contained"
              color="primary"
              // disabled={state.loading}
            >
              {state.loading ? (
                <CircularProgress size="25px" color="inherit" />
              ) : isUpdate ? (
                'Lưu lại'
              ) : (
                'Thêm hoạt động'
              )}
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
}
