import {
  Button,
  Grid,
  Modal,
  Backdrop,
  Box,
  Fade,
  Dialog,
  DialogActions,
  Step,
  DialogTitle,
  CircularProgress,
  IconButton,
  Stepper,
  StepContent,
  StepLabel,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tourdetailStyles } from '../../style';
// import AddLocationForm from "../Forms/AddLocation";
// import Location from './Location';
import * as tourAction from '../../redux/actions/createTourAction';
import { useHistory } from 'react-router-dom';
import UpdateDateForm from '../Forms/UpdateDate';
import UpdateTourInfo from '../Forms/UpdateInfoCreateTour';
import { convertDateToStr } from '../../utils/date';
import { saveTour, updateTour } from '../../redux/callApi/tourCall';
import { getProvinces } from '../../redux/callApi/locationCall';
import ServiceRecommend from '../Service/ServiceRecommend';
import {
  AddCircle,
  Close,
  Save,
  Update,
  LocationOnOutlined
} from '@material-ui/icons';
import ChangeImageTour from './ChangeImageTour';
import { error } from '../../redux/actions/alertAction';
import * as alertAction from '../../redux/actions/alertAction';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DetailDate from './DetailDate';
import QuillEditor from '../QuillEditor';

function EditBaseDate(props) {
  const { tourDate, date } = props;

  const [text, setText] = useState(tourDate.description || '');
  const { recommendService } = useSelector(state => state.createTour);

  // const handleChange = e => {
  //   setText(e.target.value);
  // };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    dispatch(
      tourAction.updateDesciptionDate({
        indexDate: date,
        description: text
      })
    );
    dispatch(alertAction.success({ message: 'Cập nhật thành công!' }));
  };

  const classes = tourdetailStyles();

  return (
    <div className={classes.paperDetailDate}>
      <Typography className={classes.detailDateTittle}>
        {' '}
        Tổng quan ngày
      </Typography>
      <div className={classes.tourDateWrapper}>
        <div>
          <QuillEditor
            value={text}
            setValue={e => setText(e)}
            placeholder="Chi tiết"
          />
          <Typography className={classes.costTotalTour}>
            <b>Chi phí ngày: </b>
            {new Intl.NumberFormat().format(tourDate.cost * 1000)} VND
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className={classes.addDayCustom}
            >
              Cập nhật
            </Button>
          </div>
        </div>
        {recommendService?.list && recommendService?.list.length > 0 &&  (
          <ServiceRecommend services={recommendService.list} />
        )}
      </div>
    </div>
  );
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    zIndex: 1,
    color: '#63B191',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #63B191'
  },
  active: {
    backgroundColor: '#63B191',
    color: 'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundColor: 'white',
    color: '#63B191'
  }
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <LocationOnOutlined style={{ width: 25 }} />
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`
//   };
// }

export default function AddTour(props) {
  const { isUpdate } = props;

  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const dispatch = useDispatch();
  const { createTour, location, auth, socket } = useSelector(state => state);

  const [tourInfo, setTourInfo] = useState({
    name: '',
    content: '',
    hashtags: [],
    isPublic: false
  });
  const [idx, setIdx] = useState(0);
  const [showUpdateDate, setShowUpdateDate] = useState(false);
  const [showDeleteDate, setShowDeteleDate] = useState(-1);
  const [showReset, setShowReset] = useState(false);

  const handleShowReset = () => {
    setShowReset(true);
  };

  const handleCloseReset = () => {
    setShowReset(false);
  };

  const handleAddDay = () => {
    dispatch(tourAction.addDate());
  };

  const handleSave = async () => {
    if (createTour.tour.length === 0) return;
    setState({
      loading: true,
      error: false
    });
    if (!createTour.image || createTour.image === '') {
      setState({
        loading: false,
        error: true
      });
      return;
    }

    dispatch(
      saveTour(
        {
          ...tourInfo,
          tour: createTour.tour,
          cost: createTour.cost
        },
        createTour.image,
        auth,
        socket,
        id => {
          setState({
            loading: false,
            error: false
          });
          history.push(`/tour/${id}`);
        },
        () => {
          setState({
            loading: false,
            error: false
          });
          dispatch(error({ message: 'Có lỗi xảy ra' }));
        }
      )
    );
  };

  const handleUpdate = async () => {
    if (createTour.tour.length === 0) return;
    setState({
      loading: true,
      error: false
    });

    if (!createTour.image || createTour.image === '') {
      setState({
        loading: false,
        error: true
      });
      return;
    }

    console.log(tourInfo);

    dispatch(
      updateTour(
        createTour._id,
        {
          tour: createTour.tour,
          cost: createTour.cost,
          ...tourInfo
        },
        createTour.image,
        auth.token,
        () => {
          // console.log("done");
          setState({
            loading: false,
            error: false
          });
          history.push(`/tour/${createTour._id}`);
        },
        () => {
          setState({
            loading: false,
            error: false
          });
          dispatch(error({ error: 'Có lỗi xảy ra' }));
        }
      )
    );
  };

  const handleDeleteDate = index => {
    if (index < 0) return;
    dispatch(tourAction.deleteDate({ indexDate: index }));
    if (idx === index) {
      if (index === 0) {
        setIdx(0);
      } else setIdx(index - 1);
    }
    handleCloseDelete();
  };

  const handleShowUpdate = () => {
    setShowUpdateDate(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateDate(false);
  };

  const handleShowDelete = index => {
    if (createTour.tour?.length <= 1) return;
    setShowDeteleDate(index);
  };

  const handleCloseDelete = () => {
    setShowDeteleDate(-1);
  };

  useEffect(() => {
    if (location.provinces?.length === 0) {
      dispatch(getProvinces());
    }
  }, [dispatch, location.provinces]);

  const refUdDate = React.createRef();
  const refEditDetailDate = React.createRef();

  const UpdateDateRef = React.forwardRef((props, ref) => (
    <UpdateDateForm {...props} innerRef={ref} />
  ));

  const EditBaseDateRef = React.forwardRef((props, ref) => (
    <EditBaseDate {...props} innerRef={ref} />
  ));

  const handleReset = () => {
    dispatch(
      tourAction.createTour({
        name: createTour.name,
        date: createTour.tour[0]?.date
      })
    );
    handleCloseReset();
  };

  const classes = tourdetailStyles();

  useEffect(() => {
    setTourInfo({
      isPubic: createTour.isPublic || false,
      name: createTour.name || '',
      content: createTour.content || '',
      hashtags: createTour.hashtags || []
    });
  }, [
    createTour?.name,
    createTour?.content,
    createTour?.hashtags,
    createTour?.isPublic
  ]);
  return (
    <>
      {(!isUpdate || (isUpdate && createTour.tour && createTour.tour[0])) && (
        <div className={classes.container}>
          <Grid container className={classes.tourDetailContainer}>
            <div className={classes.tourInfoGeneral}>
              <Grid container>
                <Grid item md={8} sm={7} xs={12}>
                  <UpdateTourInfo
                    tourInfo={tourInfo}
                    setTourInfo={setTourInfo}
                    cost={createTour.cost}
                  />
                </Grid>
                <Grid item md={4} sm={5} xs={12}>
                  <div
                    style={{ padding: 20, maxHeight: 250, overflow: 'hidden' }}
                  >
                    <ChangeImageTour />
                  </div>
                  {state.error && (
                    <span
                      style={{
                        fontSize: '15px',
                        color: 'red',
                        marginInline: '20px',
                        marginTop: '10px'
                      }}
                    >
                      Bạn cần thêm ảnh
                    </span>
                  )}
                  <div className={classes.tourRight}>
                    <div className={classes.tourButtons}>
                      <Button
                        onClick={handleShowReset}
                        className={classes.reviewBtn}
                      >
                        Reset
                      </Button>
                      <div className={classes.center}>
                        <Dialog
                          open={showReset}
                          onClose={handleCloseDelete}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {'Bạn có chắc chắn muốn reset tour?'}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleCloseReset}>Hủy</Button>
                            <Button
                              onClick={handleReset}
                              className={classes.delete}
                            >
                              Reset
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <Button
                        onClick={isUpdate ? handleUpdate : handleSave}
                        startIcon={<Save />}
                        className={classes.reviewBtn}
                      >
                        {state.loading ? (
                          <CircularProgress size="25px" color="inherit" />
                        ) : (
                          'Lưu hành trình'
                        )}
                      </Button>
                    </div>
                    <div className={classes.tourChoose}></div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.createTourDates}>
              <Stepper
                activeStep={idx}
                orientation="vertical"
                className={classes.datesWrapper}
              >
                {createTour.tour.map((item, index) => (
                  <Step
                    key={index}
                    onClick={() => setIdx(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      Chi tiết lịch trình ngày {convertDateToStr(item.date)}
                      <IconButton
                        size="small"
                        onClick={() => handleShowDelete(index)}
                        style={{ marginLeft: 20 }}
                      >
                        <Close />
                      </IconButton>
                      <Button
                        onClick={handleShowUpdate}
                        className={classes.addDay}
                        startIcon={<Update />}
                      >
                        Thay đổi ngày
                      </Button>
                      <Button
                        className={classes.addDay}
                        onClick={handleAddDay}
                        startIcon={<AddCircle />}
                      >
                        Thêm ngày
                      </Button>
                    </StepLabel>
                    <StepContent>
                      <Grid
                        container
                        style={{
                          border: '1px solid #a9a9a9',
                          backgroundColor: '#ebf3f0'
                        }}
                      >
                        <Grid item md={5} sm={12} xs={12} style={{borderRight: "1px solid #a9a9a9"}}>
                          <EditBaseDateRef
                            ref={refEditDetailDate}
                            date={idx}
                            tourDate={createTour.tour[idx]}
                          />
                        </Grid>
                        <Grid item md={7} sm={12} xs={12}>
                          <DetailDate
                            indexDate={idx}
                            events={createTour.tour[idx].events}
                          />
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className={classes.center}>
              <Dialog
                open={showDeleteDate !== -1}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Bạn có chắc chắn muốn xóa ngày?'}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDelete}>Hủy</Button>
                  <Button
                    onClick={() => handleDeleteDate(showDeleteDate)}
                    className={classes.delete}
                  >
                    Xóa
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showUpdateDate}
              className={classes.modal}
              onClose={handleCloseUpdate}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showUpdateDate}>
                <UpdateDateRef
                  ref={refUdDate}
                  handleClose={handleCloseUpdate}
                  indexDate={idx}
                  currentDate={createTour.tour[idx].date}
                />
              </Fade>
            </Modal>
          </Grid>
        </div>
      )}
    </>
  );
}
