<template>
  <div>
    <div class="w-5/6 mx-auto mt-10 flex">
      <div class="w-2/3 bg-white p-5">
        <router-link to="/talks" class="text-xs text-gray-400"
          >&lt;Back
        </router-link>
        <h1 class="capitalize text-3xl leading-loose">{{ talk.title }}</h1>
        <p class="text-gray-500 leading-relaxed">{{ talk.description }}</p>

        <p class="mt-6 text-accent" v-if="alreadyJoined">Already Joined</p>
        <button
          v-else
          class="mt-6 bg-primary text-white rounded-full py-3 px-7"
          @click="joinTalk"
        >
          Attend
        </button>

        <div>
          <h3 class="text-xl mt-10 mb-6">About the Speaker</h3>
          <div class="flex">
            <div class="w-1/3">
              <img
                class="w-full rounded-md mr-10 p-5"
                :src="
                  (talk.speaker && talk.speaker.photoUrl) ||
                  require('../assets/images/default-photo.jpeg')
                "
                :alt="`${talk.speaker.name} photo`"
              />
              <!-- Twitter and Linkedin goes here -->
              <div class="flex">
                <a v-if="talk.speaker.socials && talk.speaker.socials.twitter" :href="talk.speaker.socials.twitter" target="_blank">
                  <img class="w-8" src="../assets/images/icons8-twitter.svg" alt="" />
                </a>
                <a v-if="talk.speaker.socials && talk.speaker.socials.linkedin" :href="talk.speaker.socials.linkedin" target="_blank">
                  <img class="w-8" src="../assets/images/icons8-linkedin.svg" alt="" />
                </a>
              </div>
            </div>
            <div class="p-5">
              <p class="text-lg">{{ talk.speaker.name }}</p>
              <p class="text-primary">
                {{ talk.speaker.professionalTitle }}
                {{ talk.speaker.company ? `at ${talk.speaker.company}` : "" }}
              </p>
              <p class="mt-6 text-sm text-gray-500">
                {{ talk.speaker.bio }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3 px-5">
        <div class="bg-white py-5 px-5 min-h-full max-h-full relative">
          <h1>Discussions</h1>
          <p class="text-sm text-gray-500 mt-10" v-if="!alreadyJoined">
            Only attendees can join the discussion
          </p>
          <div v-else class="flex flex-col mt-4 min-h-full">
            <div class="messages max-h-96 overflow-hidden overflow-y-scroll">
              <div
                v-for="message in messages"
                :key="message._id"
                class="bubble-container"
                :class="
                  message.from && message.from._id === user._id
                    ? 'myMessage'
                    : ''
                "
              >
                <div class="bubble">
                  <div class="name">
                    <p>{{ message.from.name }}</p>
                    <span> {{ message.createdAt | moment }} </span>
                  </div>
                  <div class="message">{{ message.text }}</div>
                </div>
              </div>
            </div>
            <div
              class="input absolute bottom-0 w-11/12 left-0 mt-3 mx-2 mb-2 flex justify-between"
            >
              <input
                v-model="text"
                class="w-full p-3 text-gray-700 leading-tight focus:outline-none border border-gray-300 rounded-lg"
                placeholder="Type message"
                type=""
              />
              <button class="mx-2 text-primary" @click="sendMessage">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import TalkAPI from "../api/talks";
import { toast } from "../utils";

export default {
  name: "talk-details",
  data() {
    return {
      talk: {
        speaker: {},
      },
      messages: [],
      text: "",
    };
  },
  async created() {
    const slug = this.$route.params.slug;
    const response = await TalkAPI.getTalk(slug);
    this.talk = response.data.data;

    if (this.alreadyJoined) {
      const messageResponse = await TalkAPI.getChats(this.talk._id);
      this.messages = [...this.messages, ...messageResponse.data.data];
    }
  },
  sockets: {
    chat_message(msg) {
      console.log("Got message", msg);
      this.messages = [
        ...this.messages,
        {
          ...msg,
          createdAt: new Date(),
        },
      ];
    },
  },
  computed: {
    ...mapState(["googleAuth", "isLoggedIn", "user"]),
    alreadyJoined() {
      return this.user && this.user.talks.includes(this.talk._id);
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMM Do YY, h:mm:ss a");
    },
  },
  methods: {
    async joinTalk() {
      // eslint-disable-next-line no-undef
      if (!this.isLoggedIn || !this.user) {
        let idToken;
        if (!this.googleAuth) {
          // eslint-disable-next-line no-undef
          const GoogleAuth = gapi.auth2.getAuthInstance();
          const response = await GoogleAuth.signIn();
          this.$store.commit("setGoogleAuth", response.wc);
        }
        idToken = this.googleAuth.id_token;
        await this.$store.dispatch("googleSignIn", idToken);
      }
      if (!this.alreadyJoined) {
        await this.$store.dispatch("joinTalk", this.$route.params.slug);
        toast.success("Successfully joined talk");
      }
      location.reload();
    },
    async sendMessage() {
      await this.$socket.client.emit("chat_message", {
        room: this.talk._id,
        msg: this.text,
      });
      this.messages = [
        ...this.messages,
        {
          from: this.user,
          text: this.text,
          date: new Date(),
        },
      ];
      this.text = "";
    },
  },
};
</script>

<style scoped>
.bubble-container {
  text-align: left;
}

.bubble {
  background-color: #eff0f3;
  color: #5a5f7d;
  margin: 10px 0;
  float: left;
  max-width: 100%;
  font-size: 15px;
  border-radius: 0 15px 15px;
  padding: 18px 20px;
  line-height: 1.67;
}

.bubble::after {
  clear: both;
  display: block;
}

.name {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.name p {
  padding-right: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0px;
}

.name span {
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
  color: #9299b8;
}

.myMessage .bubble {
  background-color: #3bac70;
  float: right;
  color: #fff;
  border-radius: 15px 15px 0 15px;
}

.myMessage .bubble .name span {
  color: #c9c9cb;
}
</style>
