<template>
  <main>
    <router-view />
  </main>
</template>
<script>
export default {
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Song Friends";
      },
    },
  },
};
</script>
