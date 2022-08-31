import customAxios from '../../utils/fetchData';
import * as serviceAction from '../actions/serviceAction';
import * as alertAction from '../actions/alertAction';
import * as imageUtils from '../../utils/uploadImage';
import { getRecommendService } from '../actions/createTourAction';

export const getServices = (id, page, next) => async dispatch => {
  dispatch(serviceAction.loading());
  try {
    var res;
    if (id) {
      res = await customAxios().get(`/service/coop/${id}?page=${page}`);
    } else {
      res = await customAxios().get(`/service/list?offset=${page}`);
    }
    if (page === 0) {
      dispatch(serviceAction.getServices({ services: res.data.services }));
    } else {
      dispatch(serviceAction.getMoreServices({ services: res.data.services }));
    }
    next();
  } catch (error) {
    // console.log(error);
    dispatch(serviceAction.error());
  }
};

// export const getDetail = (id, next, error) => async dispatch => {
//   try {
//     const res = await customAxios().get(`/service/rate/${id}`);
//     // console.log(res);
//     dispatch(
//       serviceAction.getDetail({
//         rate: res.data.rate,
//         attribute: res.data.attribute,
//         id: id
//       })
//     );
//     // console.log(res.data.rate);
//     next();
//   } catch (err) {
//     error();
//   }
// };

export const reviewService =
  (id, auth, rate, content, images, next) => async dispatch => {
    try {
      let arrImage = [];

      if (images && images.length > 0) {
        arrImage = await imageUtils.uploadImages(images);
      }

      // console.log(arrImage);

      const res = await customAxios(auth.token).post(`/service/review/${id}`, {
        rate,
        content,
        images: arrImage
      });

      const newReview = {
        userId: {
          _id: auth.user._id,
          fullname: auth.user.fullname,
          avatar: auth.user.avatar
        },
        content: content,
        rate: rate,
        images: arrImage
      };

      dispatch(
        serviceAction.reviewService({
          id: id,
          review: newReview,
          star: res.data.star
        })
      );
      if (next) next(newReview);
    } catch (err) {
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra!' }));
    }
  };

export const createService =
  (token, userId, data, images_data, next, error) => async dispatch => {
    try {
      let images = await imageUtils.uploadImages(images_data);
      const res = await customAxios(token).post('/service/create', {
        ...data,
        images: images
      });
      next();
      if (userId === res.data.newService.cooperator) {
        dispatch(serviceAction.addService({ newService: res.data.newService }));
      }
    } catch (err) {
      error();
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra!' }));
    }
  };

export const updateService =
  (token, userId, serviceId, data, images_data, next, error) =>
  async dispatch => {
    try {
      let images = await imageUtils.uploadImages(images_data);
      const res = await customAxios(token).put(`/service/${serviceId}`, {
        ...data,
        images: images
      });
      dispatch(alertAction.success({ message: 'Cập nhật thành công!' }));
      next();
      if (userId === res.data.service.cooperator) {
        dispatch(serviceAction.updateService({ service: res.data.service }));
      }
    } catch (err) {
      error();
      dispatch(alertAction.error({ message: 'Có lỗi xảy ra!' }));
    }
  };

export const deleteService = (token, id, next, error) => async dispatch => {
  customAxios(token)
    .delete(`/service/${id}`)
    .then(() => {
      dispatch(serviceAction.deleteService({ id }));
      next();
    })
    .catch(() => error());
};

export const getRecommend = (position, indexDate, indexEvent) => dispatch => {
  const { lat, lng } = position;
  if (!lat || !lng) return;
  customAxios()
    .get(`/service/top_near?lat=${lat}&lng=${lng}`)
    .then(res => {
      dispatch(
        getRecommendService({ list: res.data.services, indexDate, indexEvent })
      );
    });
};
