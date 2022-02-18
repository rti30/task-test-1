<template>
  <input
    class="input"
    :type="type"
    :name="name"
    @input="changeValue"
    @focus="focused"
    @blur="blur"
    :value="value"
  >
</template>
<script>
export default {
  props: {
    name: {
      default: "",
    },
    type: {
      default: "text",
    },
    value: {
      default: "",
    },
    isFocus: {
      default: false,
    },
  },
  methods: {
    changeValue(e) {
      this.$emit("update:value", e.target.value);
    },
    focused() {
      this.$emit("update:isFocus", true);
    },
    blur() {
      this.$emit("update:isFocus", false);
    },
  },
};
</script>
<style lang="scss">
</style>