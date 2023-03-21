import axios from "axios";

const instance = axios.create({
  baseURL: "https://graphilizer.vercel.app",
});

export default instance;
