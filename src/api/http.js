import axios from "axios";

// axios 객체 생성
export default axios.create({
// env로 대체할 것
// baseURL: "http://APIgateway:8000/",

// 
baseURL: "http://i8a703.p.ssafy.io:8000/",

  headers: {
    "Content-Type": "application/json",
  },
});