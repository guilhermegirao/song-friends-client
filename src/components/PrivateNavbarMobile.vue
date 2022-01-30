<template>
  <div
    class="w-full h-[60px] flex items-center bg-neutral px-1.5 justify-between border-b border-stone-800"
  >
    <a
      href="/app/profile"
      class="px-2 rounded-full opacity-90 hover:opacity-100 hover:bg-neutral-focus"
    >
      <div class="flex items-center max-w-[225px] overflow-hidden h-[42px]">
        <img
          :src="userAvatar"
          alt="Avatar"
          class="w-[30px] h-[30px] mask mask-circle mr-3"
        />
        <h3 class="font-semibold text-sm truncate">
          {{ userName }}
        </h3>
      </div>
    </a>
    <button
      type="button"
      class="rounded-full h-[42px] w-[42px] flex justify-center items-center opacity-90 hover:opacity-100 hover:bg-neutral-focus"
      @click="handleLogout"
    >
      <img
        src="/images/exit-icon.svg"
        alt="Sair"
        class="w-[30px] h-[30px] object-cover"
      />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAvatar: this.$store.state.user.avatar || "/images/avatar-round.svg",
      userName: this.$store.state.user.name,
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("resetUser");
      this.$router.replace("/");
    },
  },
};
</script>
