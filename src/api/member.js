import http from "./http.js";

const api = http;

async function signup(user, success, fail) {
  await api.post(`/register`, JSON.stringify(user)).then(success).catch(fail);
}

async function login(user, success, fail) {
  await api.post(`/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(token, success, fail) {
  api.defaults.headers["Authorization"] = token["Authorization"]
  api.defaults.headers["refreshToken"] = token["refreshToken"]
  await api.post(`/logout`, JSON.stringify()).then(success).catch(fail);
}

async function readUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  const res = await api.get(`/info/${user.userId}`, JSON.stringify(user)).then(success).catch(fail);
  return res
}

async function updateUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/info/${user.userId}`, JSON.stringify(user)).then(success).catch(fail);
}

async function changeUserPassword(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/changePassword`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUserInfo(user, success, fail) {
  api.defaults.headers["Authorization"] = user["Authorization"]
  api.defaults.headers["refreshToken"] = user["refreshToken"]
  await api.post(`/delete/${user.userId}`, JSON.stringify(user.userId)).then(success).catch(fail);
}
  


export { signup, login, logout, readUserInfo, updateUserInfo, changeUserPassword, deleteUserInfo } ; 