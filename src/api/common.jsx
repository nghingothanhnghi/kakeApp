import axios from "axios";


const BASE_URL = 'https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
    "Content-type": "application/json"
  }
});
export const api = axios.create({
  baseURL: BASE_URL
})