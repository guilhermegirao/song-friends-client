<template>
  <div class="navbar shadow-lg h-20 bg-black text-neutral-content">
    <div class="max-w-7xl mx-auto w-full">
      <div class="flex w-full items-center">
        <div class="flex px-2 mx-2 items-center">
          <a href="/">
            <div class="flex items-center">
              <img src="/public/images/logo.svg" class="h-12" />
            </div>
          </a>
        </div>
        <div class="flex-1 px-2 mx-2"></div>
        <div class="flex-none">
          <button
            @click="handleLogin"
            class="btn btn-link btn-md text-neutral-content text-base no-animation hover:text-primary normal-case"
          >
            Entre
          </button>
        </div>
      </div>
    </div>
  </div>
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
