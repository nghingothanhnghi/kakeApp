import axios from "axios";

const API_URL = "https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate";

const register = (username, email, password) => {
  return axios.post(API_URL + "/sign-up", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
