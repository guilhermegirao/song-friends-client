<template>
  <p>Redirecionando...</p>
</template>

<script>
import { Base64 } from "js-base64";

import isValidJSON from "@/utils/isValidJSON";

export default {
  mounted() {
    const encodedData = this.$route.query?.data;

    if (encodedData) {
      const decodedData = Base64.decode(encodedData);

      if (isValidJSON(decodedData)) {
        const user = JSON.parse(decodeURIComponent(decodedData));

        this.$store.dispatch("saveUser", user);

        return this.$router.replace("/app");
      }
    }

    this.$router.replace("/");
  },
};
</script>
