import * as LOC_TYPES from '../constants/locationConstant';

const INIT_STATE = {
  locations: [],
  provinces: [],
  services: [],
  hot: [],
  allProvince: null,
  loadingProvinces: false,
  loadingLocations: false,
  loadingServices: false,
  error: false
};

const locationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOC_TYPES.GET_PROVINCE_LIST: {
      return {
        ...state,
        provinces: action.payload.provinces,
        loadingProvinces: false
      };
    }
    case LOC_TYPES.GET_LOCATION_LIST: {
      return {
        ...state,
        locations: action.payload.locations,
        loadingLocations: false
      };
    }
    case LOC_TYPES.GET_SERVICE_LIST: {
      return {
        ...state,
        services: action.payload.services,
        loadingServices: false
      };
    }
    case LOC_TYPES.LOADING_LOCATIONS: {
      // loading danh sach dia diem hot
      return {
        ...state,
        loadingLocations: true
      };
    }
    case LOC_TYPES.LOADING_PROVINCES: {
      // loading danh sach dia diem hot
      return {
        ...state,
        loadingProvinces: true,
        error: false
      };
    }
    case LOC_TYPES.LOADING_SERVICES: {
      return {
        ...state,
        loadingServices: true
      };
    }
    case LOC_TYPES.PROVINCE_PAGE: {
      return {
        ...state,
        allProvince: action.payload.provinces,
        loadingProvinces: false
      };
    }
    case LOC_TYPES.PROVINCE_ERROR: {
      return {
        ...state,
        error: true
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
