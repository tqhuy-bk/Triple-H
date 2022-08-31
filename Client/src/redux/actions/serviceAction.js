import * as SERVICE_TYPES from '../constants/serviceConstant';

export const getServices = props => {
  return {
    type: SERVICE_TYPES.GET_SERVICES,
    payload: props
  };
};

export const getMoreServices = props => {
  return {
    type: SERVICE_TYPES.LOAD_MORE_SERVICE,
    payload: props
  };
};

export const loading = props => {
  return {
    type: SERVICE_TYPES.LOADING_SERVICE,
    payload: props
  };
};

export const error = props => {
  return {
    type: SERVICE_TYPES.ERROR_SERVICE,
    payload: props
  };
};

export const getDetail = props => {
  return {
    type: SERVICE_TYPES.GET_DETAIL,
    payload: props
  };
};

export const reviewService = props => {
  return {
    type: SERVICE_TYPES.REVIEW_SERVICE,
    payload: props
  };
};

export const addService = props => {
  return {
    type: SERVICE_TYPES.ADD_SERVICE,
    payload: props
  };
};

export const updateService = props => {
  return {
    type: SERVICE_TYPES.UPDATE_SERVICE,
    payload: props
  };
};

export const deleteService = props => {
  return {
    type: SERVICE_TYPES.DELETE_SERVICE,
    payload: props
  };
};
