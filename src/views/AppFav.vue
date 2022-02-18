<template>
  <main class="page">
    <main-header></main-header>
    <main-fav />
  </main>

</template>
<script>
import MainFav from "@/components/main/MainFavorite.vue";
import MainHeader from "@/components/main/MainHeader.vue";
export default {
  components: { MainFav, MainHeader },
};
</script>
<style lang="scss">
</style>