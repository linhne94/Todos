import axios from "./axios";
// import axios1 from "axios"

const getUser = () => {
  return axios.get("/users");
};

export {getUser};