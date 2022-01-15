import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./tailwind.css";

const app = createApp(App);

app.use(store);
app.use(router);

app.mixin({
  methods: {
    goBack() {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
});

app.mount("#app");
