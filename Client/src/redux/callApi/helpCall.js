import customAxios from '../../utils/fetchData';
import { getHelpsAction } from '../actions/helpAction';

export const getHelps = (id, lat, lng, ip) => async dispatch => {
  try {
    let params = '';
    if (!lat || !lng) params = `ip=${ip}`;
    else params = `lat=${lat}&lng=${lng}`;
    const res = await customAxios().get(`/help?${params}`);
    if (!res.data.success) {
      return;
    }
    dispatch(
      getHelpsAction(res.data.helps.filter(item => item.userId._id !== id))
    );
  } catch (err) {
    console.log(err);
  }
};

export const addHelp = async (token, data, socket) => {
  try {
    const res = await customAxios(token).post('/help', data);
    if (!res.data.success) return;
    socket.emit('createHelp', res.data.help);
  } catch (err) {}
};

export const updateHelp = async (token, id, data, socket) => {
  try {
    const res = await customAxios(token).put(`/help/${id}`, data);
    if (!res.data.success) return;
    socket.emit('updateHelp', res.data.help);
  } catch (err) {}
};

export const deleteHelp = async (token, id, socket) => {
  try {
    const res = await customAxios(token).delete(`/help/${id}`);
    if (!res.data.success) return;
    socket.emit('deleteHelp', id);
  } catch (err) {}
};
