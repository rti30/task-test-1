<template>
  <router-view v-slot="{ Component }">
    <transition
      name="anim-page"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
  <alert />
</template>

<script>
import "@/assets/scss/index.scss";
import Alert from "@/components/ui/Alert.vue";

export default {
  components: {
    Alert,
  },
};
</script>

<style lang="scss">
</style>
