import httpClient from "../lib/httpClient";

const endpoint = "/auth"

export default {
  signInWithGoogle(id_token) {
    return httpClient.post(`${endpoint}/google`, { id_token })
  },
  getCurrentUser() {
    console.log("Why na")
    return httpClient.get(`${endpoint}/me`)
  }
}