<template>
  <nav class="p-4 bg-white">
    <div class="w-5/6 mx-auto flex justify-between">
      <div>
        <router-link to="/">
          <img src="../../assets/images/FA.svg" class="w-72" alt="logo" />
        </router-link>
      </div>

      <div v-if="user">
        <img class=" w-14 rounded-full" :src="user.photoUrl" alt="User photo" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style></style>
