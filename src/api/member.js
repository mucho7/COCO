import http from "./http.js";

const api = http;

async function signup(user, success, fail) {
  await api.post(`/member/register`, JSON.stringify(user)).then(success).catch(fail);
}

async function login(user, success, fail) {
  await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(token, success, fail) {
  api.defaults.headers["Authorization"] = token["Authorization"]
  api.defaults.headers["refreshToken"] = token["refreshToken"]
  await api.post(`/member/logout`, JSON.stringify()).then(success).catch(fail);
}

async function readUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  const res = await api.get(`/member/info/${user.userId}`, JSON.stringify(user)).then(success).catch(fail);
  return res
}

async function updateUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.put(`/member/info/${user.userId}`, JSON.stringify(user)).then(success).catch(fail);
}

async function changeUserPassword(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/member/changePassword`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/member/delete/${user.userId}`, JSON.stringify(user.userId)).then(success).catch(fail);
}
  
async function visaTempPassword(user, success, fail) {
  await api.post(`/member/tempPassword`, JSON.stringify(user)).then(success).catch(fail);
}

export { signup, login, logout, readUserInfo, updateUserInfo, changeUserPassword, deleteUserInfo, visaTempPassword } ; 