import axios from "axios";

export default axios.create({
  baseURL: "https://semaphore-synchronization.vercel.app/api/semaphore"
});