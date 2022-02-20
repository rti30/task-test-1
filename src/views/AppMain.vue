<template>
  <main class="page">
    <main-header></main-header>
    <main-found v-if="currentSearch" />
    <main-start v-else></main-start>
  </main>
</template>
<script>
import MainHeader from "@/components/common/CommonHeader.vue";
import MainStart from "@/components/main/MainStart.vue";
import MainFound from "@/components/main/MainFound.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    MainHeader,
    MainStart,
    MainFound,
  },
  computed: {
    ...mapGetters("content", {
      currentSearch: "currentSearch",
    }),
  },
};
</script>
<style lang="scss">
</style>