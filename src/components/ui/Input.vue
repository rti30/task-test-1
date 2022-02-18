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
.input {
  border-radius: $main-radius;
  border: 1px rgba(39, 39, 39, 0.1) solid;
  padding: 15px 36px 15px 10px;

  &:focus {
    background-color: $c-focus;
  }
  &--password {
  }
  &::placeholder {
    color: $c-second;
  }
  &--search {
    border-radius: $main-radius 0 0 $main-radius;
  }

  &__icon {
    transform: translate(-100%, -50%);
    padding: 10px 10px;
    position: absolute;
    top: 50%;
  }
}
</style>