import {
  Button,
  CircularProgress,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import {
  BasicServiceInfo,
  DetailServiceInfo
} from '../components/Service/AddService';
import { getProvinces } from '../redux/callApi/locationCall';
import { updateService } from '../redux/callApi/serviceCall';
import { addServiceStyles } from '../style';
import customAxios from '../utils/fetchData';
import { getToken } from '../utils/token';
import * as alertAction from '../redux/actions/alertAction';
import Loading from '../components/Loading';

function getStep() {
  return ['Thông tin cơ bản', 'Thông tin chi tiết', 'Hoàn thành'];
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Complele(props) {
  return (
    <div style={{ marginBlock: 100 }}>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
      >
        <CheckCircle style={{ fontSize: 100, color: '#777' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Nhấn HOÀN TẤT để kết thúc</Typography>
      </div>
    </div>
  );
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <BasicServiceInfo {...props} />;
    case 1:
      return <DetailServiceInfo {...props} />;
    case 2:
      return <Complele />;
    default:
      return 'Error';
  }
}

export default function EditServicePage() {
  const classes = addServiceStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingService, setLoadingService] = useState(false);

  const id = useQuery().get('id');

  const { auth, location } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, setImages] = useState([]);
  const [context, setContext] = useState({
    name: '',
    type: null,
    description: '',
    contact: '',
    cost: '',
    andress: '',
    province: null,
    position: null,
    discount: []
  });
  const [detail, setDetail] = useState({
    conform: '',
    featured: '',
    more_info: [],
    park: '',
    space: '',
    convenient: '',
    shuttle: '',
    pickup: [],
    stop: [],
    book: '',
    note: '',
    time: '',
    menu: []
  });
  const [activeStep, setActiveStep] = useState(0);
  const step = getStep();

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleNext = () => {
    if (context.name === '' || !context.type || !context.province) {
      setError('Vui lòng điền các thông tin cần thiết');
      return;
    }
    setError('');
    setActiveStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      setError('Cần thêm ít nhất 1 ảnh');
      return;
    }
    setLoading(true);
    console.log(detail);
    dispatch(
      updateService(
        auth.token,
        auth.user._id,
        context._id,
        {
          ...context,
          attribute: { ...detail },
          position: [context.position.lng, context.position.lat],
          province: context.province._id
        },
        images,
        () => {
          history.push(`/u/${auth.user._id}`);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    if (location.provinces?.length === 0) {
      dispatch(getProvinces());
    }
  }, [dispatch, location.provinces]);

  const getService = useCallback(() => {
    setLoadingService(true);
    customAxios()
      .get(`/service/${id}`)
      .then(res => {
        console.log(res.data.service);
        setContext({
          ...res.data.service,
          position: {
            lng: res.data.service.position[0],
            lat: res.data.service.position[1]
          }
        });
        setDetail(res.data.service?.attribute);
        setImages(res.data.service?.images);
        setLoadingService(false);
      })
      .catch(() => {
        setLoadingService(false);
        history.push('/');
        dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
      });
  }, [id, history, dispatch]);

  useEffect(() => {
    if (id) {
      getService();
    }
  }, [id, getService]);

  useEffect(() => {
    document.title = 'Thêm dịch vụ';
  }, []);

  const rfToken = getToken();
  if (!rfToken) return <Redirect to="/login" />;

  if (auth?.user && auth?.user.role !== 1) return <Redirect to="/" />;

  if (loadingService) return <Loading />;

  return (
    <>
      {auth?.user && (
        <Container className={classes.root}>
          <Stepper activeStep={activeStep}>
            {step.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <div>
              {getStepContent(activeStep, {
                images: images,
                setImages: setImages,
                context: context,
                setContext: setContext,
                detail: detail,
                setDetail: setDetail
              })}
            </div>
            <span style={{ color: 'red', fontSize: '15px' }}>{error}</span>
            <div className={classes.buttonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                color="primary"
              >
                Quay lại
              </Button>
              {activeStep === step.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress color="inherit" /> : 'Hoàn tất'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                >
                  Tiếp
                </Button>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
