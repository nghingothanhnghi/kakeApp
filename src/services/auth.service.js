import axios from "axios";

// real API
const API_URL = "https://hfwupqrtna.execute-api.us-west-1.amazonaws.com/sandbox/authenticate";

const refreshToken = async (username, refresh_token) => {
  const response = await axios
        .post(API_URL + "/refresh-token", {
            username,
            refresh_token
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    // return response.data;
    console.log(JSON.stringify(response), "Response refresh token")
    return response.data;
};


const registeUser = async (fullname, username, phone_number, password) => {
  return axios.post(API_URL + "/sign-up", {
    fullname,
    username,
    phone_number,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios
        .post(API_URL + "/login", {
            username,
            password,
        });

  if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
  
  console.log(JSON.stringify(response), "Response Login");
  return response.data;
    // return console.log(response.data, "Response Login");
    
};

const confirmSignUp = async (username, confirm_code) => {
  const response = await axios
        .post(API_URL + "/confirm-sign-up", {
            username,
            confirm_code,
        });
    console.log(JSON.stringify(response), "Response Confirmed Code")
    return response.data;
};

const resendCodeConfirm = async (username) => {
  const response = await axios
        .post(API_URL + "/resend-code-confirm", {
            username
        });
    // if (response.data.accessToken) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    // }
    // return response.data;
    console.log(JSON.stringify(response), "Response resend Code")
    return response.data;
};


const forgotPassword = async (username) => {
  const response = await axios
        .post(API_URL + "/forgot-password", {
            username
        });
    console.log(JSON.stringify(response), "Response Forgot Password")
    return response.data;
};



const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "/login");
  return response.data;
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

const authService = {
  refreshToken,
  registeUser,
  confirmSignUp,
  resendCodeConfirm,
  login,
  forgotPassword,
  logout,
  getCurrentUser,
};

export default authService;
