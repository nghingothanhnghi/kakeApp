import axios from "axios";

// real API
const API_URL = "https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate";

const registeUser = async (fullname, username, phone_number, password) => {
  return axios.post(API_URL + "/sign-up", {
    fullname,
    username,
    phone_number,
    password,
  })
};

const login = async (username, password) => {
  const response = await axios
        .post(API_URL + "/login", {
            username,
            password,
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    // return response.data;
    console.log(response.data, "Response Login")
};

const confirmSignUp = async (username, confirm_code) => {
  const response = await axios
        .post(API_URL + "/confirm-sign-up", {
            username,
            confirm_code,
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    // return response.data;
    console.log(response.data, "Response Confirmed Code")
};



const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registeUser,
  confirmSignUp,
  login,
  logout,
};

export default authService;
