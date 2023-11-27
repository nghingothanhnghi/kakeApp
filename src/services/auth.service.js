import axios from "axios";

const API_URL = "https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate";

const register = (fullName, username, email, phone, password) => {
  return axios.post(API_URL + "/sign-up", {
    fullName,
    username,
    email,
    phone,
    password,
  });
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



const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
