<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<template>
  <public-navbar />
  <div class="hero bg-green text-blue" style="min-height: calc(95vh - 80px)">
    <div class="text-center hero-content">
      <div class="max-w-xl flex flex-col items-center">
        <h1 class="mb-2 text-4xl font-bold">Cadastre-se como convidado:</h1>
        <p class="mb-7 text-xl">
          Cadastre-se sem precisar se conectar com Spotify.
        </p>
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
            v-on:submit="sendRegister"
          >
            <input
              type="text"
              placeholder="Seu Nome Real"
              class="input w-full bg-white text-blue border-2 border-white rounded-full !ring-0 mb-3"
              v-model="name"
              required
            />
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
              class="input w-full bg-white text-blue border-2 border-white rounded-full !ring-0 mb-3"
              v-model="password"
              required
            />
            <p class="mb-3 text-md">Adicionar Gêneros favoritos:</p>
            <div class="w-full flex mb-1">
              <input
                type="text"
                placeholder="Insira o nome de um gênero musical"
                class="input w-full bg-white text-blue border-2 border-white rounded-full mr-3 !ring-0"
                v-model="genreAdd"
              />
              <button
                type="button"
                class="btn btn-primary w-[48px] rounded-full !p-0"
                @click="addGenre"
              >
                <img src="/images/plus-icon.svg" class="w-[36px] h-[36px]" />
              </button>
            </div>
            <div class="w-full flex mb-4 flex-wrap">
              <div
                class="badge badge-ghost badge-lg mr-[10px] mt-[10px]"
                v-for="genre in genres"
                :key="genre"
              >
                {{ genre }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 ml-2 stroke-current cursor-pointer"
                  @click="removeGenre(genre)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-wide rounded-full"
              :disabled="!buttonActive"
            >
              Cadastrar
            </button>
            <span class="my-2"> ou </span>
            <a href="/login/guest" class="underline underline-offset-1">
              Entrar como convidado
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
      name: "",
      username: "",
      password: "",
      genreAdd: "",
      genres: [],
    };
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) this.$router.replace("/app");
  },
  methods: {
    sendRegister(e) {
      e.preventDefault();
      this.buttonActive = false;

      if (this.genres.length > 0) {
        api
          .post("/register/guest", {
            name: this.name,
            username: this.username,
            password: this.password,
            genres: this.genres,
          })
          .then((data) => {
            this.$store.dispatch("saveUser", data.data);
            this.$router.replace("/app");
          })
          .catch((error) => {
            this.errored = error.response.data.error;
            this.buttonActive = true;
          });

        this.name = "";
        this.username = "";
        this.password = "";
        this.genres = [];
      } else {
        this.errored = "Insira pelo menos 1 gênero musical favorito.";
        this.buttonActive = true;
      }
    },
    addGenre() {
      const value = this.genreAdd;

      if (!this.genres.includes(value) && value !== "") this.genres.push(value);

      this.genreAdd = "";
    },
    removeGenre(genre) {
      this.genres = this.genres.filter((g) => g !== genre);
    },
  },
};
</script>
