import http from "./http";

const api = http;

async function boardRead(success, fail) {
  const res = await api.get(`/`).then(success).catch(fail);
  console.log(res)
  return res
}


export { boardRead, }