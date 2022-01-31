<template>
  <socket-wrapper>
    <container>
      <private-navbar class="md:flex hidden" />
      <private-navbar-mobile class="flex md:hidden" />
      <div
        class="flex w-full items-center justify-center h-[calc(100%-120px)] md:h-full"
      >
        <suggestions />
      </div>
      <bottom-bar />
    </container>
  </socket-wrapper>
</template>

<script>
import Container from "@/components/Container.vue";
import PrivateNavbar from "@/components/PrivateNavbar.vue";
import Suggestions from "@/components/Suggestions.vue";
import PrivateNavbarMobile from "@/components/PrivateNavbarMobile.vue";
import BottomBar from "@/components/BottomBar.vue";
import SocketWrapper from "@/components/SocketWrapper.vue";

export default {
  components: {
    Container,
    PrivateNavbar,
    Suggestions,
    PrivateNavbarMobile,
    BottomBar,
    SocketWrapper,
  },
  name: "AppIndex",
};
</script>
