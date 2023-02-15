import http from "./http.js";
import axios from "axios";

const api = http;

async function boardPaging(pageInfo, success, fail) {
  const res = await api.get(`/board`, {params: {size: pageInfo.size, page: pageInfo.page}}).then(success).catch(fail);
  return res
}

async function boardSearching(searchInfo, success, fail) {
  const res = await api.get(`/board/search`, {params: {[searchInfo.searchTarget]: searchInfo.searchWord, size: searchInfo.size,  page: searchInfo.page}}).then(success).catch(fail);
  return res
}

async function boardDetail(article, success, fail) {
  const res = await api.get(`/board/${article.pk}`, {params: {page: article.pageNumber}}).then(success).catch(fail);
  return res
}

async function articleCreate(article, success, fail) {
  // api.defaults.headers["Authorization"] = article.jwt_token
  // api.defaults.headers["refreshToken"] = article.refresh_token
  // await api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
  const formData = new FormData();
  
  // formData 형성
  formData.append("board", JSON.stringify(article))
  formData.append("file", article.profile_img)

  axios.create({
    baseURL: "https://ssafy.cossafyco.kro.kr/api/", 
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": article.jwt_token,
      "refreshToken": article.refresh_token
    }
  }).post(`/board`, formData).then(success).catch(fail)
}

async function articleDelete(article, success, fail) {
  api.defaults.headers["Authorization"] = article.jwt_token
  api.defaults.headers["refreshToken"] = article.refresh_token
  await api.delete(`/board/${article.pk}`).then(success).catch(fail);
}

async function articleUpdate(article, success, fail) {
  api.defaults.headers["Authorization"] = article.jwt_token
  api.defaults.headers["refreshToken"] = article.refresh_token
  await api.put(`/board/${article.id}`, JSON.stringify(article)).then(success).catch(fail);
}

async function commentCreate(comment, success, fail) {
  await api.post(`/comment/${comment.board_id}`, JSON.stringify(comment)).then(success).catch(fail);
}

async function commentDelete(comment, success, fail) {
  await api.delete(`/comment/${comment.board_id}/delete/${comment.pk}`).then(success).catch(fail);
}

async function commentUpdate(comment, success, fail) {
  await api.put(`/comment/${comment.board_id}/modify/${comment.pk}`, JSON.stringify(comment)).then(success).catch(fail);
}

export { boardPaging, boardSearching, boardDetail, articleCreate, articleDelete, articleUpdate, commentCreate, commentDelete, commentUpdate }