export default {
  development: {
    baseURL: "http://localhost:9001/v1",
    socketServer: "http://localhost:9001"
  },
  production: {
    baseURL: process.env.VUE_APP_API_URL,
    socketServer: "https://fa-conference.herokuapp.com"
  },
}[process.env.VUE_APP_NODE_ENV || "development"];