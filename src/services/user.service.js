import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getCandidates = () => {
  return axios.get(API_URL + "candidates", { headers: authHeader() });
};

const getModerators = () => {
  return axios.get(API_URL + "moderators", { headers: authHeader() });
};

const getUserDetails = (username) => {
  let data = JSON.stringify({
    username: username
  });
  //return axios.get(API_URL + "getuser", { headers: authHeader(), data: data });
  return axios.request({
    method: 'GET',
    url: API_URL + "getuser",
    headers: authHeader(),
    params: {
      username: username
    },
  
  })
};

const updateProfile = (
  username, 
  firstname,
  lastname,
  email,
  address,
  educationlevel,
  workexperience,
  technicalknowledge,
  cvattachment
  ) => {
  return axios.post(API_URL + "updateprofile", {
    username,
    firstname,
    lastname,
    email,
    address,
    educationlevel,
    workexperience,
    technicalknowledge,
    cvattachment
  });
};

const resetPassword = (
  username,
  password
  ) => {
  return axios.post(API_URL + "resetpassword", {
    username,
    password
  });
};

const createUser = (username, email, password, role) => {
  return axios.post(API_URL + "createuser", {
    username,
    email,
    password,
    role
  });
};


export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateProfile,
  getUserDetails,
  resetPassword,
  getCandidates,
  createUser,
  getModerators
};
