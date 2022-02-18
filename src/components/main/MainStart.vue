<template>
  <section class="start">
    <div class="start__body">
      <h1 class="start__title title">Поиск Видео</h1>
      <search></search>
    </div>
  </section>
</template>
<script>
import Search from "@/components/ui/Search.vue";

export default {
  components: {
    Search,
  },
};
</script>
<style lang="scss">
.start {
  // .start__body
  &__body {
    max-width: calcSize(310, 690, $minWidth, $maxWidth);

    margin: 120px auto 0;
    @media (min-width: $tabletWidth + "px") {
      max-width: 690px;
      margin: 220px auto 0;
    }
  }

  // .start__title

  &__title {
    text-align: center;
    margin: 0 0 40px 0;
  }

  // .start__form

  &__form {
    display: flex;
    justify-content: center;
  }

  // .start__input

  &__input {
    flex: 1 1 auto;
  }

  // .start__button

  &__button {
    align-self: stretch;
  }
}
</style>