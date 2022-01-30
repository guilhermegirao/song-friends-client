<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<template>
  <public-navbar />
  <div class="hero bg-green text-blue" style="min-height: calc(95vh - 80px)">
    <div class="text-center hero-content">
      <div class="max-w-xl flex flex-col items-center">
        <h1 class="mb-7 text-7xl font-bold">
          Faça amigos com...
          <span class="underline decoration-wavy"> músicas</span>!
        </h1>
        <p class="mb-7 text-xl">
          Descubra novas pessoas através do seu gosto musical!
        </p>
        <button
          @click="handleLogin"
          type="button"
          class="btn btn-primary btn-wide rounded-full"
        >
          <img
            src="/images/spotify-icon.svg"
            alt="Ícone Spotify"
            class="w-[20px] h-[20px] mr-2"
          />
          Entre ou Cadastre-se
        </button>
        <span class="my-2"> ou </span>
        <a href="/login/guest" class="underline underline-offset-1">
          Entre como convidado
        </a>
      </div>
    </div>
  </div>
  <base-footer />
</template>

<script>
import { baseURL } from "@/utils/api";

export default {
  components: { PublicNavbar, BaseFooter },
  mounted() {
    if (this.$store.getters.isAuthenticated) this.$router.replace("/app");
  },
  methods: {
    handleLogin: async () => {
      try {
        window.location.replace(`${baseURL}/login`);
      } catch (err) {
        alert("Erro ao conectar com o servidor!");
      }
    },
  },
};
</script>
