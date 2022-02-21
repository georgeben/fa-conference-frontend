import httpClient from "../lib/httpClient";

const endpoint = "/talks"

export default {
  listTalks() {
    return httpClient.get(endpoint)
  },
  getTalk(slug) {
    return httpClient.get(`${endpoint}/${slug}`)
  },
  attend(slug) {
    return httpClient.post(`${endpoint}/${slug}/attend`)
  },
  getChats(roomId) {
    return httpClient.get(`${endpoint}/${roomId}/chats`)
  }
}