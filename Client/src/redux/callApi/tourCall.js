import * as tourAction from '../actions/tourAction';
import customAxios from '../../utils/fetchData';
import * as imageUtils from '../../utils/uploadImage';
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction';
import {
  extractLocationTour,
  extractProvinceTour,
  sortTourDate
} from '../../utils/utils';
import { resetTour } from '../actions/createTourAction';

export const getTours = query => async dispatch => {
  dispatch(tourAction.loadingFirst());
  // console.log(dispatch)
  try {
    var res;
    if (query) {
      const { maxCost, minCost, q } = query;
      var que = '';
      if (maxCost && maxCost !== 100) que += `maxCost=${maxCost}&`;
      if (minCost && minCost !== 0) que += `minCost=${minCost}&`;
      if (q && q !== '') que += `q=${q}`;
      res = await customAxios().get(`/tour/tours?${que}`);
    } else {
      res = await customAxios().get(`/tour/tours`);
    }

    var tours = res.data.tours.map(item => sortTourDate(item));
    dispatch(tourAction.getTours({ tours: tours, id: 0 }));
  } catch (err) {
    // console.log(err);
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getMoreTours = (page, query) => async dispatch => {
  dispatch(tourAction.loading());
  try {
    var res;
    if (query) {
      const { maxCost, minCost, q } = query;
      var que = '';
      if (maxCost && maxCost !== 100) que += `maxCost=${maxCost}&`;
      if (minCost && minCost !== 0) que += `minCost=${minCost}&`;
      if (q && q !== '') que += `q=${q}&`;
      res = await customAxios().get(`/tour/tours?${que}offset=${page}`);
    } else {
      res = await customAxios().get(`/tour/tours?offset=${page}`);
    }

    var tours = res.data.tours.map(item => sortTourDate(item));
    dispatch(tourAction.getMoreTour({ tours: tours }));
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getTourHashtag = (page, hashtag) => async dispatch => {
  if (!hashtag) return;
  if (page > 0) dispatch(tourAction.loading());

  return customAxios()
    .get(`/tour/hashtag?hashtag=${hashtag}&page=${page}`)
    .then(res => {
      const tours = res.data.tours.map(item => sortTourDate(item));
      if (page > 0) {
        dispatch(tourAction.getMoreTour({ tours: tours }));
      } else dispatch(tourAction.getTours({ tours: tours }));
    })
    .catch(err => {
      dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
    });
};

export const getUserTour = (id, token, page) => async dispatch => {
  // dispatch(tourAction.getTours({ tour: [] }));
  if (page === 0) {
    dispatch(tourAction.loadingFirst());
  } else dispatch(tourAction.loading());
  try {
    var res;
    if (page && page > 0) {
      res = await customAxios(token).get(`/tour/user/${id}?offset=${page}`);
      let tours = res.data.tours.map(item => sortTourDate(item));
      // console.log(res.data.tours);
      dispatch(tourAction.getMoreTour({ tours: tours }));
    } else {
      res = await customAxios(token).get(`/tour/user/${id}`);
      let tours = res.data.tours.map(item => sortTourDate(item));
      // console.log(res.data.tours);
      dispatch(tourAction.getTours({ tours: tours, id: id }));
    }
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
    // console.log(err);
  }
};

export const saveTour =
  (tour, image, auth, socket, next, error) => async dispatch => {
    try {
      // call api to save tour
      let imageUpload = [];
      if (image) imageUpload = await imageUtils.uploadImages([image]);
      // location id
      const data = {
        ...tour,
        tour: tour.tour.map(item => ({
          ...item,
          events: item.events.map(event => ({
            ...event,
            location: event.location?._id || null,
            service: event.service?._id || null
          }))
        })),
        provinces: Array.from(extractProvinceTour(tour.tour)),
        locations: Array.from(extractLocationTour(tour.tour)),
        image: image ? imageUpload[0] : '',
        joinIds: [
          {
            id: auth.user,
            isJoin: true,
            isEdit: true
          }
        ]
      };

      console.log(data);

      const res = await customAxios(auth.token).post('/tour/create', data);

      dispatch(alertAction.success({ message: 'Lưu lịch trình thành công!' }));
      dispatch(resetTour());
      next(res.data.newTour._id);
    } catch (err) {
      console.log(err);
      error();
    }
  };

export const updateTour =
  (id, tour, image, token, next, error) => async dispatch => {
    try {
      let imageUpload = [image];
      if (image && typeof image !== 'string') {
        imageUpload = await imageUtils.uploadImages([image]);
      }

      const data = {
        ...tour,
        tour: tour.tour.map(item => ({
          ...item,
          events: item.events.map(event => ({
            ...event,
            location: event.location?._id || null,
            service: event.service?._id || null
          }))
        })),
        provinces: Array.from(extractProvinceTour(tour.tour)),
        locations: Array.from(extractLocationTour(tour.tour)),
        image: image ? imageUpload[0] : ''
      };
      const res = await customAxios(token).patch(`/tour/${id}`, data);
      next();
      // console.log(res.data.newTour)
      dispatch(tourAction.updateTour({ id: id, tour: res.data.newTour }));
      dispatch(alertAction.success({ message: 'Cập nhật thành công!' }));
      dispatch(resetTour());
    } catch (err) {
      // console.log(err);
      console.log(err);
      error();
      // if (err.response && err.response.data && err.response.data.message)
      //   dispatch(alertAction.error({ message: err.response.data.message }));
      // else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const deleteTour =
  (tour, token, socket, next, error) => async dispatch => {
    try {
      // Notify
      // const dataNotify = {
      //   id: tour._id,
      //   url: `/tour/${tour._id}`,
      //   type: 'deleteTour'
      // };
      // dispatch(deleteNotify(dataNotify, token, socket));

      await customAxios(token).delete(`/tour/${tour._id}`);
      next();
      dispatch(tourAction.deleteTour({ id: tour._id }));
      dispatch(alertAction.success({ message: 'Xóa thành công!' }));
    } catch (err) {
      // dispatch(tourAction.error({ error: err.response.data.message }));
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const likeTour = (id, auth, socket, next) => async dispatch => {
  try {
    const res = await customAxios(auth.token).patch(`/tour/${id}/like`);
    dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
    // console.log(res.data.likes);
    socket.emit('like', { type: 'tour', id: id, likes: res.data.likes });

    //notify
    if (auth.user._id !== res.data.tour.userId) {
      const dataNotify = {
        id: auth.user._id,
        text: ' thích hành trình của bạn',
        recipients: [res.data.tour.userId],
        content: res.data.tour.name,
        image: res.data.tour.image,
        url: `/tour/${id}`
      };
      dispatch(createNotify(dataNotify, auth.token, socket));
    }
  } catch (err) {
    next();
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const unlikeTour = (id, auth, socket, next) => async dispatch => {
  try {
    const res = await customAxios(auth.token).patch(`/tour/${id}/unlike`);
    dispatch(tourAction.updateLike({ id: id, likes: res.data.likes }));
    socket.emit('unlike', { type: 'tour', id: id, likes: res.data.likes });
    // Notify
    const dataNotify = {
      id: auth.user._id,
      url: `/tour/${id}`
    };
    dispatch(deleteNotify(dataNotify, auth.token, socket));
  } catch (err) {
    next();
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const inviteJoinTour =
  (id, users, auth, socket, next, error) => async dispatch => {
    try {
      const res = await customAxios(auth.token).patch(
        `/tour/${id}/invite`,
        users
      );
      // dispatch(tourAction.updateJoin({ id: id, joinIds: res.data.joinIds }));
      // dispatch(alertAction.success({ message: 'Tham gia thành công' }));
      next();

      const dataNotify = {
        id: res.data.tour._id,
        text: ' mời bạn tham gia hành trình',
        recipients: users.map(item => item.id._id),
        content: res.data.tour.name,
        image: res.data.tour.image,
        url: `/tour/${id}`
      };
      dispatch(createNotify(dataNotify, auth.token, socket));
    } catch (err) {
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const changeIsEdit =
  (id, user, token, next, error) => async dispatch => {
    try {
      console.log('data', user.id._id, '+', user.isEdit);
      await customAxios(token).patch(`/tour/${id}/change_isEdit`, {
        id: user.id._id,
        isEdit: user.isEdit
      });
      next();
    } catch (err) {
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const acceptJoinTour = (id, token, next, error) => async dispatch => {
  try {
    await customAxios(token).patch(`/tour/${id}/accept`);
    next();
  } catch (err) {
    error();
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const unAcceptJoinTour = (id, token, next, error) => async dispatch => {
  try {
    await customAxios(token).patch(`/tour/${id}/unAccept`);
    next();
  } catch (err) {
    error();
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const removeMemberTour =
  (id, user, token, socket, next, error) => async dispatch => {
    try {
      await customAxios(token).patch(`/tour/${id}/remove_member`, {
        id: user.id._id
      });
      // dispatch(tourAction.updateJoin({ id: tourId, joinIds: res.data.joinIds }));
      // dispatch(alertAction.success({ message: 'Loại bỏ thành công' }));
      next();

      const dataNotify = {
        id: id,
        url: `/tour/${id}`
      };
      dispatch(deleteNotify(dataNotify, token, socket));
    } catch (err) {
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const removeReview =
  (tourDateId, token, locationId) => async dispatch => {
    try {
      await customAxios(token).patch(`/tour/${tourDateId}/remove_review`, {
        locationId
      });
    } catch (err) {}
  };

export const getTourSaved = token => async dispatch => {
  try {
    const res = await customAxios(token).get(`/user/tour_saved`);
    var tours = res.data.tours.map(item => sortTourDate(item));
    // console.log(res.data.tours);
    dispatch(tourAction.getTours({ tours: tours, id: -1 }));
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const joinLocation =
  (token, tourDateId, locationId, next, error) => async dispatch => {
    try {
      await customAxios(token).patch(`/tour/${tourDateId}/join_loc`, {
        locationId
      });
      dispatch(
        alertAction.success({ message: 'Tham gia 1 địa điểm thành công' })
      );
      next();
    } catch (err) {
      console.log(err);
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
      error();
    }
  };

export const unjoinLocation =
  (token, tourDateId, locationId, next, error) => async dispatch => {
    try {
      await customAxios(token).patch(`/tour/${tourDateId}/unjoin_loc`, {
        locationId
      });
      dispatch(
        alertAction.success({ message: 'Hủy tham gia 1 địa điểm thành công' })
      );
      next();
    } catch (err) {
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
      error();
    }
  };

export const removejoinLocation =
  (token, tourDateId, locationId, next, error) => async dispatch => {
    try {
      await customAxios(token).patch(`/tour/${tourDateId}/remove_join_loc`, {
        locationId
      });
      dispatch(alertAction.success({ message: 'Loại bỏ thành công' }));
      next();
    } catch (err) {
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
      error();
    }
  };

export const getTourHot = () => async dispatch => {
  dispatch(tourAction.loading());
  try {
    const res = await customAxios().get('/tour/hot');
    var tours = res.data.tours.map(item => sortTourDate(item));
    console.log('data_tour_hot', tours);
    dispatch(tourAction.getTourHot(tours));
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};
export const searchTourHot = query => async dispatch => {
  dispatch(tourAction.loading());
  try {
    var res;
    const { maxCost, minCost, q } = query;
    var que = '';
    if (maxCost && maxCost !== 100) {
      que += `max=${maxCost}&`;
    }
    if (minCost && minCost !== 0) {
      que += `min=${minCost}&`;
    }
    if (q && q !== '') {
      que += `q=${q}`;
    }
    res = await customAxios().get(`/tour/search_hot?${que}`);

    var tours = res.data.tours.map(item => sortTourDate(item));
    dispatch(tourAction.getTourHot(tours));
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

// export const getTourSimilar = (auth, id, next) => async dispatch => {
//   try {
//     const res = await customAxios(auth?.token).get(`/tour/similar/${id}`);
//     console.log('data_tour_similar', res.data.tours);
//     next(res.data.tours);
//   } catch (err) {
//     dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
//   }
// };

export const getTourRecommend = (token, next) => async dispatch => {
  try {
    const res = await customAxios(token).get('/tour/foryou');
    next(res.data.tours);
  } catch (err) {
    dispatch(tourAction.error({ error: 'Có lỗi xảy ra' }));
  }
};
