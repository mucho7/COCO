import axios from "axios";

// axios 객체 생성
export default axios.create({
// env로 대체할 것
// docker측에 push할땐 변경할 것
  baseURL: "http://MemberService/member",

// develope할때 사용할 
// baseURL: "http://i8a703.p.ssafy.io:8012/MemberService",
// 
  headers: {
    "Content-Type": "application/json",
  },
});