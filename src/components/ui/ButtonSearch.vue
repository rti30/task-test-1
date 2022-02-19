<template>
  <button
    class="btn hover-color"
    @click.prevent="getContent"
    :disabled="searchInProcessing"
  ><span class="btn__text">Найти</span></button>
</template>
<script>
///import ButtonSearch from "@/components/ui/Button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("content", { searchInProcessing: "searchInProcessing" }),
  },
  methods: {
    ...mapActions("content", { getContent: "getContent" }),
  },
};
</script>
<style lang="scss">
</style>