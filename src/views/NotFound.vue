<script setup>
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<template>
  <div class="hero bg-blue min-h-screen text-green">
    <div class="text-center hero-content">
      <div class="max-w-xl">
        <h1 class="mb-7 text-7xl font-bold">Oh no! 404 :(</h1>
        <p class="mb-7 text-xl">Esta página não existe ou foi excluída.</p>
        <button
          class="btn btn-primary btn-wide rounded-full no-animation bg-blue text-green hover:bg-green hover:text-blue"
          @click="goBack()"
        >
          Voltar
        </button>
      </div>
    </div>
  </div>
  <base-footer />
</template>
