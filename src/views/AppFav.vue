<template>
  <main class="page">
    <header-fav></header-fav>
    <fav-main />
  </main>

</template>
<script>
import FavMain from "@/components/favorite/FavoriteMain.vue";
import HeaderFav from "@/components/common/CommonHeader.vue";
export default {
  components: { FavMain, HeaderFav },
};
</script>
<style lang="scss">
</style>