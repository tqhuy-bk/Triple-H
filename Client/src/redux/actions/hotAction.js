import * as HOT_ACTION from '../constants/hotConstant';

export const getEvent = props => {
  return {
    type: HOT_ACTION.GET_EVENT,
    payload: props
  };
};

export const getHotLocation = props => {
  return {
    type: HOT_ACTION.GET_HOT_LOCATION,
    payload: props
  };
};

export const getRecommendLocation = props => {
  return {
    type: HOT_ACTION.GET_RECOMMEND_LOCATION,
    payload: props
  };
};
