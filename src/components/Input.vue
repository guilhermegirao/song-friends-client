<template>
  <label class="label" :for="name">
    <span class="label-text">{{ label }}</span>
  </label>
  <input
    :id="name"
    :type="type"
    :name="name"
    :placeholder="placeholder || label"
    :required="required"
    :value="modelValue"
    class="input input-bordered mb-2"
  />
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
    required: Boolean,
    placeholder: String,
    label: String,
    modelValue: String,
  },
};
</script>
