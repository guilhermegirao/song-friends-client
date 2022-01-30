<template>
  <slot></slot>
</template>

<script>
export default {
  created() {
    const token = this.$store.state.user.token;
    this.$socket.client.auth = { token };

    this.$socket.client.connect();
  },
};
</script>
