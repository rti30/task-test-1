<template>
  <router-view v-slot="{ Component }">
    <transition
      name="anim-page"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import "@/assets/scss/index.scss";

export default {};
</script>

<style lang="scss">
</style>
