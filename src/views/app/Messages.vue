<script setup>
import Container from "@/components/Container.vue";
import PrivateNavbar from "@/components/PrivateNavbar.vue";
import PrivateNavbarMobile from "@/components/PrivateNavbarMobile.vue";
import MessagesContainer from "@/components/MessagesContainer.vue";
import api from "@/utils/api";
import SocketWrapper from "@/components/SocketWrapper.vue";
</script>

<template>
  <socket-wrapper>
    <container>
      <private-navbar class="md:flex hidden" />
      <div class="flex flex-col h-full relative w-full">
        <div class="btn btn-lg btn-circle loading" v-if="loading"></div>
        <messages-container
          :userMatchAvatar="match?.matched_user?.avatar"
          :userMatchId="match?.matched_user?._id"
          :userMatchName="match?.matched_user?.name"
          :similarGenres="match?.similar_genres"
          v-else-if="match !== null && !errored"
        />
        <div class="alert alert-error" v-else-if="errored">
          <div class="flex-1">
            <label
              >Houve um erro ao carregar esse match... Tente novamente</label
            >
          </div>
        </div>
      </div>
    </container>
  </socket-wrapper>
</template>

<script>
export default {
  components: {
    Container,
    PrivateNavbar,
    MessagesContainer,
    PrivateNavbarMobile,
    SocketWrapper,
  },
  data() {
    return {
      match: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    api
      .get(`/match/${this.$route.params.id}/find/by/user-logged`)
      .then((response) => {
        this.match = response.data.match;
      })
      .catch((error) => {
        this.errored = true;

        if (error.response.status === 404) this.$router.replace("/404");
      })
      .finally(() => (this.loading = false));
  },
};
</script>
