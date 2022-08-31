import * as LOC_TYPES from '../constants/locationConstant';

export const getProvinces = props => {
  return {
    type: LOC_TYPES.GET_PROVINCE_LIST,
    payload: props
  };
};

export const getLocations = props => {
  return {
    type: LOC_TYPES.GET_LOCATION_LIST,
    payload: props
  };
};

export const getServices = props => {
  return {
    type: LOC_TYPES.GET_SERVICE_LIST,
    payload: props
  };
};

export const loadingProvinces = props => {
  return {
    type: LOC_TYPES.LOADING_PROVINCES
  };
};

export const loadingLocations = props => {
  return {
    type: LOC_TYPES.LOADING_LOCATIONS
  };
};

export const loadingServices = props => {
  return {
    type: LOC_TYPES.LOADING_SERVICES
  };
};

export const getAllProvinces = props => {
  return {
    type: LOC_TYPES.PROVINCE_PAGE,
    payload: props
  };
};

export const provinceError = () => {
  return {
    type: LOC_TYPES.PROVINCE_ERROR
  };
};
