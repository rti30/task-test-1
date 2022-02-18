<template>
  <search-input
    @input="changeSearch($event.target.value)"
    class="input--search"
    :value="search"
  ></search-input>
</template>
<script>
import SearchInput from "@/components/ui/Input.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SearchInput,
  },
  computed: {
    ...mapGetters("content", { search: "search" }),
  },
  methods: {
    ...mapActions("content", { changeSearch: "changeSearch" }),
  },
};
</script>
<style lang="scss">
</style>