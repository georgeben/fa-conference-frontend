import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import Toasted from "vue-toasted";
import { io } from 'socket.io-client';
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/tailwind.css";
import "../node_modules/nprogress/nprogress.css";
import { TOKEN } from "./utils/constants";
import { setAuthHeader } from "./lib/httpClient";
import { storage } from "./utils";

Vue.use(Toasted);
const socket = io('http://localhost:9001', {
  auth: {
    token: storage.loadState(TOKEN)
  }
});
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false

let isLoggedIn = store.getters.authStatus;
let token = storage.loadState(TOKEN);

console.log({ token })
if (isLoggedIn && token) {
  setAuthHeader();
  store.dispatch("getUserData")
}
console.log({ isLoggedIn })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
