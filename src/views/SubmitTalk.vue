<template>
  <div class="my-10 md:w-1/2 mx-auto">
    <h1 class="text-center text-2xl font-semibold">Submit Talk</h1>
    <p class="text-sm text-gray-500 leading-relaxed mt-2 text-center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi obcaecati
      vitae voluptates illum doloribus explicabo exercitationem repudiandae.
    </p>

    <div class="bg-white mt-10 p-5 text-gray-600 text-md text-center" v-if="submitted">
      <p>Thank you for submitting your talk to the Future Africa Conference. See you there!</p>

      <router-link class="text-primary inline-block mt-4" to="/">Go home</router-link>
    </div>

    <form v-else class="bg-white mt-4 mb-10 p-5">
      <div class="input-group mb-6">
        <label for="title" class="block text-gray-600 text-sm font-medium mb-2"
          >Title</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'email' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="Title of your talk"
            v-model="talk.title"
          />
        </div>
      </div>
      <div class="input-group mb-6">
        <label
          for="description"
          class="block text-gray-600 text-sm font-medium mb-2"
          >Description</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'email' ? 'border-b border-red-600' : ''"
        >
          <textarea
            v-model="talk.description"
            cols="30"
            rows="2"
            class="w-full py-2 px-3 text-gray-600 leading-tight border-b border-gray-300 focus:outline-none focus:shadow-outline resize-none"
            :class="fieldWithError === 'description' ? 'border-red-500' : ''"
          ></textarea>
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="title" class="block text-gray-600 text-sm font-medium mb-2"
          >Duration</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="
            fieldWithError == 'durationInMinutes'
              ? 'border-b border-red-600'
              : ''
          "
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="number"
            placeholder="How many minutes?"
            v-model="talk.durationInMinutes"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="title" class="block text-gray-600 text-sm font-medium mb-2"
          >Name</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'name' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="What's your name?"
            v-model="talk.name"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Email</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'email' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="email"
            placeholder="Enter email"
            v-model="talk.email"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Professional Title / Job</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="
            fieldWithError == 'professionalTitle'
              ? 'border-b border-red-600'
              : ''
          "
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="What do you do?"
            v-model="talk.professionalTitle"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="bio" class="block text-gray-600 text-sm font-medium mb-2"
          >Bio</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'email' ? 'border-b border-red-600' : ''"
        >
          <textarea
            v-model="talk.bio"
            placeholder="Tell us about yourself"
            cols="30"
            rows="2"
            class="w-full py-2 px-3 text-gray-600 leading-tight border-b border-gray-300 focus:outline-none focus:shadow-outline resize-none"
            :class="fieldWithError === 'bio' ? 'border-red-500' : ''"
          ></textarea>
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Company</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'company' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="Company"
            v-model="talk.company"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Linkedin</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'linkedin' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="Link to your linkedin profile"
            v-model="talk.socials.linkedin"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Twitter</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'twitter' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="Link to your twitter profile"
            v-model="talk.socials.twitter"
          />
        </div>
      </div>

      <div class="input-group mb-6">
        <label for="email" class="block text-gray-600 text-sm font-medium mb-2"
          >Photograph Link</label
        >
        <div
          class="flex items-center border-b border-gray-400"
          :class="fieldWithError == 'photoUrl' ? 'border-b border-red-600' : ''"
        >
          <input
            class="w-full p-2 text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="A photo showing your face"
            v-model="talk.photoUrl"
          />
        </div>
      </div>

      <button
        type="button"
        @click="handleSubmit"
        class="bg-primary text-white rounded-full py-3 px-7 mr-4"
      >
       <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "submit-talk",
  data() {
    return {
      talk: {
        title: "",
        description: "",
        durationInMinutes: 0,
        name: "",
        email: "",
        professionalTitle: "",
        company: "",
        bio: "",
        socials: {
          linkedin: "",
          twitter: "",
        },
        photoUrl: "",
      },
      fieldWithError: "",
      errorMessage: "",
      submitted: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["submitTalk"]),
    clearErrorMessages() {
      this.fieldWithError = "";
      this.errorMessage = "";
    },
    async handleSubmit(e) {
      e.preventDefault();
      try {
        this.clearErrorMessages();
        const payload = this.talk;
        this.isLoading = true
        const success = await this.submitTalk(payload);
        this.isLoading = false;
        if (success) {
          this.submitted = true;
        }
      } catch (error) {
        this.isLoading = false;
        if (error.name === "ValidationError") {
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
      }
    },
  },
};
</script>

<style scoped></style>
