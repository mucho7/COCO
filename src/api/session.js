import axios from "axios";

// axios 객체 생성
const api = axios.create({
// env로 대체할 것
// baseURL: "http://APIgateway:8000/",
// 
  // baseURL: "http://i8a703.p.ssafy.io:8013",
  baseURL: "http://localhost:8013",

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `http://localhost:3000`,
    'Access-Control-Allow-Credentials':"true",
  },
});

// 목록 조회: /room?mode={mode}&hostId={host_id}&title={title}
async function getSessionList(mode, success, fail) {
  const res = await api.get(`/room?mode=${mode}`).then(success).catch(fail);
  return res
}

// 상세 조회: /room?mode={mode}&hostId={host_id}&title={title}
async function getSessionDetail(roomId, success, fail) {
  const res = await api.get(`/room/${roomId}`).then(success).catch(fail);
  return res
}

// 생성 
// {
// roomId: ‘’,
// hostId: ‘’,
// title: ‘’,
// content: ‘’,
// hostRating: ‘’,
// mode: ‘’,
// max: ‘’,
// }
async function createSession(sessionInfo, success, fail) {
  const res = await api.post(`/room`, sessionInfo).then(success).catch(fail);
  return res
}

async function deleteSession(roomId, success, fail) {
  const res = await api.delete(`/room/${roomId}`).then(success).catch(fail);
  return res
}


export { getSessionList, getSessionDetail, createSession, deleteSession };