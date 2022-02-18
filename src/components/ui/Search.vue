<template>
  <div class="search">
    <form
      class="search__form search-form"
      action="#"
      @submit.prevent="onSubmit"
    >
      <start-input
        class="search-form__input input--search"
        v-model:value.trim="search"
        placeholder="Что хотите посмотреть?"
      >
      </start-input>
      <start-button
        class="search-form__button  btn--search"
        :text="'Найти'"
      >
      </start-button>
    </form>
  </div>
</template>
<script>
import StartInput from "@/components/ui/InputSearch.vue";
import StartButton from "@/components/ui/ButtonSearch.vue";
export default {
  components: {
    StartButton,
    StartInput,
  },
  props: {},
  data() {
    return {
      search: null,
    };
  },
};
</script>
<style lang="scss">
.search-form {
  display: flex;
  justify-content: center;
  &__input {
    flex: 1 1 auto;
    input {
      width: 100%;
    }
    //  position: relative;
  }
  &__button {
    align-self: stretch;
  }
}
</style>