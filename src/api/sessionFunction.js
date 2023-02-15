import axios from "axios";

const api = axios.create({
  baseURL: "http://i8a703.p.ssafy.io:8013/function",

  headers: {
    "Content-Type": "application/json",
  },
});

async function compileCode(compileDto, success, fail) {
  const res = await api.post(compileDto).then(success).catch(fail);
  return res
}


export { 
  compileCode
};