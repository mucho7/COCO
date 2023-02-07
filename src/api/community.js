import axios from "axios";

// axios 객체 생성
const api = axios.create({
// env로 대체할 것
// baseURL: "http://APIgateway:8000/",
// 
  baseURL: "http://i8a703.p.ssafy.io:8111",

  headers: {
    "Content-Type": "application/json",
  },
});


async function boardPaging(pageInfo,success, fail) {
  const res = await api.get(`/board`, {params: {size: pageInfo.size, page: pageInfo.page}}).then(success).catch(fail);
  return res
}

async function boardDetail(article_pk, success, fail) {
  const res = await api.get(`/board/${article_pk}`).then(success).catch(fail);
  return res
}

async function articleCreate(article, success, fail) {
  await api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

async function articleDelete(article_pk, success, fail) {
  await api.delete(`/board/${article_pk}`).then(success).catch(fail);
}

async function articleUpdate(article, success, fail) {
  await api.put(`/board/${article.id}`, JSON.stringify(article)).then(success).catch(fail);
}

async function commentCreate(comment, success, fail) {
  await api.post(`/comment/${comment.board_id}`, JSON.stringify(comment)).then(success).catch(fail);
}

async function commentDelete(comment, success, fail) {
  await api.delete(`/comment/${comment.board_id}/delete/${comment.pk}`).then(success).catch(fail);
}

async function commentUpdate(comment, success, fail) {
  await api.put(`/comment/${comment.board_id}/modify/${comment.pk}`, JSON.stringify(comment.content)).then(success).catch(fail);
}

export { boardPaging, boardDetail, articleCreate, articleDelete, articleUpdate, commentCreate, commentDelete, commentUpdate }