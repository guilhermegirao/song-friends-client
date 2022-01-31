<template>
  <div class="btn btn-lg btn-circle loading" v-if="loading"></div>
  <div
    class="text-center flex flex-col items-center"
    v-else-if="
      suggestions.length === 0 || actualSuggestion > suggestions.length - 1
    "
  >
    <div class="flex w-[100px] h-[100px] relative">
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
      ></span>
      <img
        :src="userAvatar"
        alt="Avatar"
        class="w-[100px] h-[100px] mask mask-circle mr-3"
      />
    </div>
    <h3 class="my-10">
      Acabaram as sugestões de amizade no momento. <br />Estamos procuramos por
      novas...
    </h3>
  </div>
  <user-card
    :data="{
      _id: suggestions[actualSuggestion]._id,
      name: suggestions[actualSuggestion].name,
      avatar: suggestions[actualSuggestion].avatar,
      similar_genres: suggestions[actualSuggestion].similar_genres,
    }"
    @decline-action="declineAction"
    @accept-action="acceptAction"
    v-else-if="!errored"
  />
  <div class="alert alert-error" v-else-if="errored">
    <div class="flex-1">
      <label
        >Houve um erro ao carregar as sugestões de usuários... Tente
        novamente.</label
      >
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import api from "@/utils/api";

export default {
  components: { UserCard },
  data() {
    return {
      userAvatar: this.$store.state.user.avatar || "/images/avatar-round.svg",
      actualSuggestion: 0,
      suggestions: [],
      loading: true,
      errored: false,
    };
  },
  created() {
    this.$socket.client.on("onMatch", (match) => {
      if (match?.match && match?.status === 200) {
        if (match?.type === "MATCH_SUCCESS") {
          if (
            match?.match?.user_2?._id.toString() === this.$store.state.user._id
          )
            setTimeout(() => {
              this.actualSuggestion++;
            }, 500);
        } else {
          setTimeout(() => {
            this.actualSuggestion++;
          }, 500);
        }
      } else if (match?.error) {
        console.log({ error: match?.error });
      }
    });
  },
  mounted() {
    this.getSuggestions();
  },
  methods: {
    declineAction(userId) {
      api
        .post("/match/decline", { user: userId })
        .then(() => {
          setTimeout(() => {
            this.actualSuggestion++;
          }, 500);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    acceptAction(userId) {
      this.$socket.client.emit("emitMatch", userId);
    },
    getSuggestions() {
      this.suggestions = 0;

      api
        .get("/users/find/by/suggestions")
        .then((response) => {
          this.suggestions = response.data.suggestions;
        })
        .catch((error) => {
          this.errored = true;
          console.log({ error });
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
