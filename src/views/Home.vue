<script setup>
import PublicNavbar from "@/components/PublicNavbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <PublicNavbar />
  <div class="hero bg-green text-blue" style="min-height: calc(95vh - 80px)">
    <div class="text-center hero-content">
      <div class="max-w-xl">
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
          Cadastre-se
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { baseURL } from "@/utils/api";

export default {
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
