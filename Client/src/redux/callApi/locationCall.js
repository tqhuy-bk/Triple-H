import * as locationActions from '../actions/locationAction';
import * as alertAction from '../actions/alertAction';
import customAxios from '../../utils/fetchData';

export const getProvinces = data => async dispatch => {
  // dispatch(alertActions.callStart());
  dispatch(locationActions.loadingProvinces());
  try {
    const res = await customAxios().get('/province/provinces');
    dispatch(locationActions.getProvinces({ provinces: res.data.provinces }));
    // dispatch(alertAction.callSuccess({ message: "" }))
  } catch (err) {
    // dispatch(notifyActions.callFail({ error: err }))
    dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

// export const getLocations = data => async dispatch => {
//   dispatch(locationActions.loadingLocations());
//   try {
//     const res = await customAxios().get('/location/all');
//     dispatch(locationActions.getLocations({ locations: res.data.locations }));
//   } catch (err) {
//     dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
//   }
// };

export const getServices = data => async dispatch => {
  dispatch(locationActions.loadingServices());
  try {
    const res = await customAxios().get('/service/all');
    dispatch(locationActions.getServices({ services: res.data.services }));
  } catch (err) {
    dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const getAllProvince = resolve => async dispatch => {
  try {
    dispatch(locationActions.loadingProvinces());
    const res = await customAxios().get('/province/all');
    dispatch(
      locationActions.getAllProvinces({ provinces: res.data.provinces })
    );
  } catch (err) {
    dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};
