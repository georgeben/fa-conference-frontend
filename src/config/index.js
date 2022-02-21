export default {
  development: {
    baseURL: "http://localhost:9001/v1",
  },
  production: {
    baseURL: process.env.VUE_APP_API_URL,
  },
}[process.env.VUE_APP_NODE_ENV || "development"];