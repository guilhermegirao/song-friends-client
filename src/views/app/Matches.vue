<template>
  <socket-wrapper>
    <private-navbar-mobile />
    <matches-list />
    <bottom-bar class="md:!flex" />
  </socket-wrapper>
</template>

<script>
import MatchesList from "@/components/MatchesList.vue";
import PrivateNavbarMobile from "@/components/PrivateNavbarMobile.vue";
import BottomBar from "@/components/BottomBar.vue";
import PrivateNavbar from "@/components/PrivateNavbar.vue";
import SocketWrapper from "@/components/SocketWrapper.vue";

export default {
  components: {
    MatchesList,
    PrivateNavbarMobile,
    BottomBar,
    PrivateNavbar,
    SocketWrapper,
  },
};
</script>
