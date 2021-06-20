import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:3000/api/users/';
//const API_URL = 'https://priyankapatel-oz-upwork.herokuapp.com/api/users/';
const API_URL = process.env.REACT_APP_SERVER_ENDPOINT + "/api/users";

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

   getAdminBoard() {
     return axios.get(API_URL + 'admin', { headers: authHeader() });
   }
}

export default new UserService();
