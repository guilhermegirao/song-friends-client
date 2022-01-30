import { createApp } from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { baseURL } from "./utils/api";

import "./tailwind.css";

const app = createApp(App);

app.use(store);
app.use(router);

const token = store.getters.getToken;

const connection = io(baseURL, { autoConnect: false });
connection.auth = { token };

app.use(VueSocketIOExt, connection);

app.mixin({
  methods: {
    goBack() {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
});

app.mount("#app");
