<template>
  <div id="app" class="bg-gray-50 min-h-full">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/shared/Navbar"
export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {

    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    gapi.load("auth2", async () => {
      const auth2 = window.gapi.auth2.init({
        client_id:
          "318212069595-s7j0qdvr18ken4dhbf9s1ko7a55pnrvo.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
      });
      // eslint-disable-next-line no-undef
      const GoogleAuth = gapi.auth2.getAuthInstance()
      auth2.isSignedIn.listen((val) => {
        if (val == true) {
          const googleUser = GoogleAuth.currentUser.get()
          this.$store.commit('setGoogleAuth', googleUser.wc)
        }
      });
    });
  },
  sockets: {
    connect() {
      console.log('Socket connected')
    },
    connect_error(error) {
      console.log('An error from socket IO', error)
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
