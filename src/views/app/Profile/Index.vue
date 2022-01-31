<template>
  <socket-wrapper>
    <container>
      <private-navbar class="md:flex hidden" />
      <private-navbar-mobile class="flex md:hidden" />
      <div
        class="flex w-full items-center justify-center h-[calc(100%-120px)] md:h-full"
        v-if="userData"
      >
        <user-card :data="userData" :buttons="false" />
      </div>
    </container>
    <bottom-bar />
  </socket-wrapper>
</template>

<script>
import Container from "@/components/Container.vue";
import PrivateNavbar from "@/components/PrivateNavbar.vue";
import UserCard from "@/components/UserCard.vue";
import api from "@/utils/api";
import PrivateNavbarMobile from "@/components/PrivateNavbarMobile.vue";
import BottomBar from "@/components/BottomBar.vue";
import SocketWrapper from "@/components/SocketWrapper.vue";

export default {
  components: {
    Container,
    PrivateNavbar,
    UserCard,
    PrivateNavbarMobile,
    BottomBar,
    SocketWrapper,
  },
  name: "ProfileIndex",
  data() {
    return {
      userData: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    const param = this.$route.params.id || "by/user-logged";

    api
      .get(`/users/find/${param}`)
      .then((response) => {
        this.userData = response.data.user;
      })
      .catch((error) => {
        this.errored = true;
        console.log({ error });
      })
      .finally(() => (this.loading = false));
  },
};
</script>
