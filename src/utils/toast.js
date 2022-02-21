import Vue from 'vue'
export default {
  error(message) {
    Vue.toasted.show(message, {
      position: 'bottom-center',
      duration: 3000,
      type: 'error',
    });
  },
  success(message) {
    Vue.toasted.show(message, {
      position: 'bottom-center',
      duration: 3000,
      type: 'success',
    });
  }
}