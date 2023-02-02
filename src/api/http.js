import axios from "axios";

// axios 객체 생성
export default axios.create({
// env로 대체할 것
  baseURL: "http://host.docker.internal:8000/member",
  headers: {
    "Content-Type": "application/json",
  },
});