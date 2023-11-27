import { data } from "autoprefixer";
import axios from "axios";


const BASE_URL = 'https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate';

export default axios.create({
    baseURL: BASE_URL,
    // timeout: 1000,
    headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
    "access-control-allow-origin":"*"
  }

});
export const api = axios.create({
  baseURL: BASE_URL
})
export const userLogin = async () => {
  const response = await api.post('/login')
  return response.data
}