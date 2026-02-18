// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://student-connect-l0or.onrender.com/api"
});

export default API;
