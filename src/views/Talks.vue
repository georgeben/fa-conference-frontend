<template>
  <div class="my-10 w-3/4 mx-auto min-h-screen">
    <div class="w-5/6 mx-auto mb-10">
      <div v-for="talk in talks" :key="talk._id" class="flex mb-6 bg-white">
        <img
          class="w-1/6 rounded-full p-5"
          :src="
            talk.speaker.photoUrl ||
            require('../assets/images/default-photo.jpeg')
          "
          alt=""
        />
        <div class="my-10">
          <router-link :to="`/talks/${talk.slug}`">
            <h5 class="capitalize font-semibold text-gray-600 leading-relaxed hover:text-primary">
              {{ talk.title }}
            </h5>
          </router-link>
          <p class="text-gray-500 leading-relaxed">
            {{ talk.speaker.name }}, {{ talk.speaker.professionalTitle }}
            {{ talk.speaker.company ? `at ${talk.speaker.company}` : "" }}
          </p>
          <p class="text-xs text-gray-500">
            Duration: {{ talk.durationInMinutes }} minutes
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "talks",
  data() {
    return {};
  },
  created() {
    return this.listTalks();
  },
  computed: {
    ...mapState(["talks"]),
  },
  methods: {
    ...mapActions(["listTalks"]),
  },
};
</script>

<style></style>
