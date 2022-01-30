<template>
  <footer class="p-10 footer bg-base-300 text-primary-content footer-center">
    <div>
      <img src="/public/images/logo.svg" alt="Logo Song Friends" class="w-8" />
      <p class="font-bold">Song Friends. <br />Faça amigos com músicas!</p>
      <p>
        Copyright © {{ year }} -
        <a
          :href="github_link"
          target="_blank"
          rel="noopener norefer"
          class="
            btn btn-link btn-sm
            no-animation
            hover:text-primary
            px-0
            normal-case
          "
          >Guilherme Girão Alves</a
        >
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      github_link: "https://github.com/guilhermegirao",
    };
  },
};
</script>
