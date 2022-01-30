<template>
  <div v-if="me">
    <div class="flex items-end justify-end">
      <div
        class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end"
      >
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary text-white"
            >{{ message }}</span
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex items-end">
      <div
        class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start"
      >
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-black"
            >{{ message }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    me: {
      type: Boolean,
      default: true,
    },
  },
  watch() {},
};
</script>
