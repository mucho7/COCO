import axios from "axios";

// axios 객체 생성
export default axios.create({
// env로 대체할 것
// docker측에 push할땐 변경할 것
  // baseURL: "http://localhost:8000/member",

// develope할때 사용할 
baseURL: "http://i8a703.p.ssafy.io:8011/board",

  headers: {
    "Content-Type": "application/json",
  },
});