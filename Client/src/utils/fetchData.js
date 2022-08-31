import axios from 'axios';
// import {refreshToken } from "../redux/callApi/authCall";
// import { useDispatch, useSelector } from "react-redux";

const customAxios = (token = '') => {
  const instance = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: process.env.REACT_APP_HOST_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    timeout: 50 * 1000
  });
  //sau khi response từ server
  // instance.interceptors.response.use( async (response) => {
  //     console.log("token",token)
  //     if(response.config.url.indexOf('/login')>=0
  //     || response.config.url.indexOf('/refresh_token')>=0){
  //         //những route không cần token
  //         return response
  //     }
  //     if(response.data.message === "Access Token Expired"){
  //        const token_new = refreshToken()
  //        console.log("new_token",token_new)
  //        if(token_new){
  //             response.config.headers["Authorization"] = "Bearer " + token_new
  //             return instance(response.config)
  //        }
  //     }
  //     return response;
  // }, (error) => {

  // });
  return instance;
};
export default customAxios;
