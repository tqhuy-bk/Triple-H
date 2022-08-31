import customAxios from '../../utils/fetchData';
import * as hotAction from '../actions/hotAction';

export const getEvent = (resolve, reject) => dispatch => {
  try {
    customAxios()
      .get('/event/current')
      .then(res => {
        // setEvents(res.data.events);
        dispatch(hotAction.getEvent(res.data.events));
        // setStateEvent({
        //   loading: false,
        //   error: false
        // });
        resolve();
      })
      .catch(err => {
        dispatch(hotAction.getEvent([]));
        reject();
      });
  } catch (err) {
    dispatch(hotAction.getEvent([]));
    reject();
  }
};

export const getHotLocation = (resolve, reject) => dispatch => {
  try {
    customAxios()
      .get('/location/hot')
      .then(res => {
        // setLocations(res.data.locations);
        dispatch(hotAction.getHotLocation(res.data.hot));
        console.log(res.data.hot);
        resolve();
      })
      .catch(err => {
        dispatch(hotAction.getHotLocation([]));
        reject();
        // setStateLocation({
        //   loading: false,
        //   error: true
        // });
      });
  } catch (err) {
    dispatch(hotAction.getHotLocation([]));
    reject();
  }
};

export const getRecommendLocation = (token, resolve, reject) => dispatch => {
  try {
    customAxios(token)
      .get('/location/foryou')
      .then(res => {
        dispatch(hotAction.getRecommendLocation(res.data.locations));
        resolve();
      })
      .catch(() => {
        dispatch(hotAction.getRecommendLocation([]));
        reject();
      });
  } catch (error) {
    dispatch(hotAction.getHotLocation([]));
    reject();
  }
};
