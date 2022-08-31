import { combineReducers } from 'redux';

import createTour from './createTourReducer';
import alert from './alertReducer';
import location from './locationReducer';
import auth from './authReducer';
import user from './userReducer';
import post from './postReducer';
import tour from './tourReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import volunteer from './volunteerReducer';
import service from './serviceReducer';
import help from './helpReducer';
import hot from './hotReducer';

const rootReducer = combineReducers({
  post,
  createTour,
  alert,
  location,
  auth,
  socket,
  user,
  tour,
  notify,
  message,
  volunteer,
  service,
  help,
  hot
});

export default rootReducer;
