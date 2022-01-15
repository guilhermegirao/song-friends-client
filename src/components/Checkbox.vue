<template>
  <label class="cursor-pointer label justify-start px-0 py-2">
    <input
      :name="name"
      :v-model="name"
      :required="required"
      type="checkbox"
      class="checkbox checkbox-primary mr-3"
    />
    <span class="label-text text-left">{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: String,
    label: String,
    checked: Boolean,
    required: Boolean,
  },
};
</script>
