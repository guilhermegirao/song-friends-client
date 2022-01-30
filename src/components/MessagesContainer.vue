<template>
  <div
    class="w-full h-[60px] flex items-center bg-neutral px-1.5 justify-start border-b border-stone-800"
  >
    <button
      type="button"
      class="rounded-full h-[42px] w-[42px] flex justify-center items-center opacity-90 hover:opacity-100 hover:bg-neutral-focus"
      @click="goBack()"
    >
      <img
        src="/images/back-icon.svg"
        alt="Sair"
        class="w-[30px] h-[30px] object-cover"
      />
    </button>
    <a
      :href="'/app/profile/' + userMatchId"
      class="px-2 rounded-full opacity-90 hover:opacity-100 hover:bg-neutral-focus"
    >
      <div class="flex items-center max-w-full overflow-hidden h-[42px]">
        <img
          :src="userMatchAvatar || '/images/avatar-round.svg'"
          alt="Avatar"
          class="w-[30px] h-[30px] mask mask-circle mr-3"
        />
        <div class="w-full truncate">
          <h3 class="font-semibold text-sm truncate">
            {{ userMatchName }}
          </h3>
          <p class="font-semibold text-xs truncate hidden md:block">
            Porque vocês gostam de {{ similarGenres.slice(0, 3).join(", ") }}...
          </p>
        </div>
      </div>
    </a>
    <div class="!ml-auto">
      <button
        @click="removeMatch"
        type="button"
        :class="['btn', 'btn-error', 'btn-xs', loadingUnmatch ? 'loading' : '']"
        :disabled="loadingUnmatch"
      >
        Desfazer
      </button>
    </div>
  </div>
  <div class="w-full items-start h-[calc(100%-132px)] overflow-auto p-3">
    <div
      class="w-full flex flex-1 flex-col justify-between space-y-4"
      v-if="messages.length > 0 && !errored && !loading"
    >
      <message-balloon
        v-for="message in messages"
        :key="message?._id"
        :message="message?.message"
        :me="myUserId === message?.author"
      />
    </div>
    <div
      class="alert alert-info"
      v-else-if="messages.length === 0 && !errored && !loading"
    >
      <div class="flex-1">
        <label>Envie uma mensagem para {{ userMatchName }}</label>
      </div>
    </div>
    <div class="alert alert-error" v-else-if="errored">
      <div class="flex-1">
        <label
          >Houve um erro ao carregar as mensagens desse match... Tente
          novamente</label
        >
      </div>
    </div>
  </div>
  <div
    class="flex flex-row w-full items-center h-[72px] bg-neutral border-t border-stone-800 absolute bottom-0 px-5"
  >
    <form
      method="POST"
      class="w-full flex flex-row items-center"
      v-on:submit="sendMessage"
    >
      <input
        type="text"
        placeholder="Digite uma mensagem"
        class="input w-full !ring-0"
        v-model="message"
        maxlength="500"
        required
      />
      <button
        type="submit"
        class="btn btn-primary rounded-full w-[48px] ml-5 !p-0"
        :disabled="!buttonActive"
      >
        <img src="/images/send-icon.svg" class="w-[32px] h-[32px]" />
      </button>
    </form>
  </div>
</template>

<script>
import api from "@/utils/api";
import MessageBalloon from "./MessageBalloon.vue";

export default {
  components: { MessageBalloon },
  data() {
    return {
      myUserId: this.$store.state.user._id,
      message: "",
      buttonActive: false,
      messages: [],
      loading: true,
      errored: false,
      loadingUnmatch: false,
    };
  },
  created() {
    if (this.$route.params.id) {
      this.$socket.client.emit("join", `${this.$route.params.id}`);
      this.$socket.client.on("onMessage", (msg) => {
        if (msg?.message) this.messages.push(msg?.message);
      });
      this.$socket.client.on("onRemoveMatch", (match) => {
        if (match?.match && match?.status === 200) {
          if (match?.type === "MATCH_DELETED") {
            setTimeout(() => {
              this.$router.push("/app");
            }, 800);
          } else if (match?.type === "MATCH_OTHER_DELETED") {
            if (this.$route.params.id === match?.match?._id) {
              setTimeout(() => {
                this.$router.push("/app");
              }, 800);
            }
          }
        } else if (match?.error) {
          console.log({ error: match?.error });
        }
      });
    }
  },
  props: {
    userMatchAvatar: {
      type: String,
    },
    userMatchName: {
      type: String,
      required: true,
    },
    userMatchId: {
      type: String,
      required: true,
    },
    similarGenres: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    api
      .get(`/messages/find/by/match/${this.$route.params.id}`)
      .then((response) => {
        this.messages = response.data.messages;
      })
      .catch((error) => {
        this.errored = true;
        console.log({ error: error.response });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      const msg = this.message;

      if (msg) this.$socket.client.emit("emitMessage", this.message);

      this.messages.push({
        author: this.myUserId,
        message: msg,
        _id: new Date(),
      });

      this.message = "";
    },
    removeMatch() {
      this.$socket.client.emit("emitRemoveMatch", this.$route.params.id);
      this.loadingUnmatch = true;
    },
  },
  watch: {
    message(newValue) {
      if (newValue) this.buttonActive = true;
      else this.buttonActive = false;
    },
  },
};
</script>
