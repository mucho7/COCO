import axios from "axios";

// axios 객체 생성
const api = axios.create({
// env로 대체할 것
// baseURL: "http://APIgateway:8000/",
// 
  baseURL: "http://i8a703.p.ssafy.io:8011/board",

  headers: {
    "Content-Type": "application/json",
  },
});
async function boardRead(success, fail) {
  const res = await api.get(`/list`).then(success).catch(fail);
  return res
}

async function boardDetail(article_pk, success, fail) {
  const res = await api.get(`/${article_pk}`).then(success).catch(fail);
  return res
}

async function articleCreate(article, success, fail) {
  await api.post(`/`, JSON.stringify(article)).then(success).catch(fail);
}

async function articleDelete(article, success, fail) {
  await api.post(`/`, JSON.stringify(article)).then(success).catch(fail);
}

async function articleUpdate(article, success, fail) {
  await api.post(`/`, JSON.stringify(article)).then(success).catch(fail);
}



export { boardRead, boardDetail, articleCreate, articleDelete, articleUpdate}