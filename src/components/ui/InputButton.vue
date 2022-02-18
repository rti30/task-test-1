<template>
  <div class="input-button">
    <slot
      name="input"
      class="input-button__input"
    ></slot>
    <button class="input-button__button btn--none">
      <slot class="input-button__icon"></slot>
    </button>
  </div>
</template>
<script>
import UiInput from "@/components/ui/Input.vue";

export default {
  props: {},
  components: {
    UiInput,
  },
  data() {
    return {
      // viewPassword: false,
      /*     hubValue: this.value,
      focused: false, */
    };
  },
  methods: {},
};
</script>
<style lang="scss">
.input-button {
  // .password__toggle
  position: relative;

  &__icon {
    transform: translate(-100%, -50%);
    padding: 0px 15px 0px 0px;
    position: absolute;
    top: 50%;
    //right: 50%;
  }
}
.btn--none {
}
.icon-eye-close {
}
</style>