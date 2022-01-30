<script setup>
import { mapState } from "vuex";
import api from "@/utils/api";
</script>

<template>
  <div
    class="flex flex-col h-full overflow-y-auto"
    style="max-height: calc(100vh - 60px)"
  >
    <div
      class="flex flex-col items-center justify-center w-full h-full font-semibold text-primary-300"
      v-if="matches.length === 0"
    >
      <p>Você não fez match ainda...</p>
      <p class="mt-2">Faça amigos curtindo as sugestões!</p>
    </div>
    <div v-else-if="matches.length > 0 && !errored">
      <a
        :href="'/app/messages/' + match?._id"
        :class="[
          'h-[80px]',
          'min-h-[80px]',
          'w-full',
          'flex',
          'items-center',
          'hover:bg-neutral',
          'px-1.5',
          'border-b',
          'border-stone-800',
          'opacity-90',
          'hover:opacity-100',
          matchIdSelected === match?._id ? 'border-r-primary' : '',
          matchIdSelected === match?._id ? 'border-r-4' : '',
        ]"
        v-for="match in matches"
        :key="match?._id"
      >
        <div class="flex items-center space-x-4 px-2">
          <img
            :src="match?.matched_user?.avatar || '/images/avatar-round.svg'"
            class="w-[45px] h-[45px] mask mask-circle"
          />
          <div class="flex-auto max-w-[225px] overflow-hidden">
            <div class="text-base font-semibold truncate">
              {{ match?.matched_user?.name }}
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="alert alert-error" v-else-if="errored">
      <div class="flex-1">
        <label>
          Houve um erro ao carregar seus Matches... Tente novamente.
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matchIdSelected: "",
      loading: true,
      errored: false,
    };
  },
  created() {
    this.$socket.client.on("onMatch", (match) => {
      if (match?.match && match?.status === 200) {
        if (match?.type === "MATCH_SUCCESS") {
          this.$store.dispatch("updateMatches", {
            _id: match?.match?._id,
            matched_user: match?.matched_user,
          });
        }
      } else if (match?.error) {
        console.log({ error: match?.error });
      }
    });

    this.$socket.client.on("onRemoveMatch", (match) => {
      if (match?.match && match?.status === 200) {
        if (
          match?.type === "MATCH_DELETED" ||
          match?.type === "MATCH_OTHER_DELETED"
        ) {
          this.$store.dispatch(
            "saveMatches",
            this.$store.state.matches.filter(
              (stateMatch) =>
                stateMatch?._id.toString() !== match?.match?._id.toString()
            )
          );
        }
      } else if (match?.error) {
        console.log({ error: match?.error });
      }
    });
  },
  mounted() {
    api
      .get("/matches/find/by/user-logged")
      .then((response) => {
        this.$store.dispatch("saveMatches", response.data.matches);
      })
      .catch((error) => {
        this.errored = true;
        console.log({ error });
      })
      .finally(() => (this.loading = false));

    this.matchIdSelected = this.$route?.params?.id || "";
  },
  computed: {
    ...mapState({ matches: (state) => state.matches }),
  },
};
</script>
