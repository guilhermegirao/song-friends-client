<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<template>
  <public-navbar />
  <div class="hero bg-green text-blue" style="min-height: calc(95vh - 80px)">
    <div class="text-center hero-content">
      <div class="max-w-xl flex flex-col items-center">
        <h1 class="mb-2 text-4xl font-bold">Entrar como convidado:</h1>
        <p class="mb-7 text-xl">Entre sem precisar se conectar com Spotify.</p>
        <div class="max-w-[440px] w-full">
          <div class="alert bg-error text-white mb-3" v-if="errored">
            <div class="flex-1">
              <label>
                {{ errored }}
              </label>
            </div>
          </div>
          <form
            method="POST"
            class="w-full flex flex-col items-center"
            v-on:submit="sendLogin"
          >
            <input
              type="text"
              placeholder="Nome de Usuário"
              class="input w-full bg-white text-blue border-2 border-white rounded-full !ring-0 mb-3"
              v-model="username"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              class="input w-full bg-white text-blue border-2 border-white rounded-full !ring-0 mb-4"
              v-model="password"
              required
            />
            <button
              type="submit"
              class="btn btn-primary btn-wide rounded-full"
              :disabled="!buttonActive"
            >
              Entrar
            </button>
            <span class="my-2"> ou </span>
            <a href="/register/guest" class="underline underline-offset-1">
              Cadastre-se como convidado
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
  <base-footer />
</template>

<script>
import api from "@/utils/api";

export default {
  components: { PublicNavbar, BaseFooter },
  data() {
    return {
      buttonActive: true,
      errored: "",
      username: "",
      password: "",
    };
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) this.$router.replace("/app");
  },
  methods: {
    sendLogin(e) {
      e.preventDefault();
      this.buttonActive = false;

      api
        .post("/login/guest", {
          username: this.username,
          password: this.password,
        })
        .then((data) => {
          this.$store.dispatch("saveUser", data.data);
          this.$router.replace("/app");
        })
        .catch((error) => {
          this.errored = error.response.data.error;
          this.buttonActive = true;
        });

      this.username = "";
      this.password = "";
    },
  },
};
</script>
