<template>
  <div
    v-if="messages.length"
    class="alert text"
  >
    <transition-group name="fade">
      <div
        class="alert__text"
        v-for="message in messages"
        :key="message.id"
      >
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("alert", { messages: "messages" }),
  },
};
</script>

<style lang="scss">
.alert {
  margin-top: 50px;
  position: fixed;
  width: 100%;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: center;

  // .alert__text
  &__text {
    background-color: #ffffff;
    color: $c-Light;
    border: 1px solid $c-Light;
    text-align: center;
    padding: 20px 15px;
    width: 40%;
  }
}
</style>