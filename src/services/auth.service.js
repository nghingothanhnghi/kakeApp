import axios from "axios";

// real API
const API_URL = "https://hexb6gqxh9.execute-api.us-east-2.amazonaws.com/develop/authenticate";

const registeUser = (fullName, username, email, phone, password) => {
  return axios.post(API_URL + "/sign-up", {
    fullName,
    username,
    email,
    phone,
    password,
  }).then((res) => {
    console.log(res.data, "success")
})
.catch((err) => {
    // handle error
    console.log(err.data, "error")
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



const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registeUser,
  login,
  logout,
};

export default authService;
