import axios from "axios"


const request = axios.create({
  baseURL: "http://[::1]:8000"
})


export default request
