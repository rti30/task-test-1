<template>
  <section class="favorite">
    <div class="content-width">
      <h1 class="favorite__title title2">Избранное</h1>
      <ul
        v-if="favorite.length"
        class="favorite__body"
      >
        <li
          v-for="(item, i) in favorite"
          :key="item.id"
          class="favorite__item item-fav"
        >
          <div class="item-fav__name">{{item.name}}</div>
          <div class="item-fav__controls">
            <button
              type="button"
              class="fav-controll fav-controll--change btn--none"
              @click="goSearch(item)"
            >Выполнить</button>
            <button
              type="button"
              class="fav-controll fav-controll--change btn--none"
              @click="change(item, i)"
            >Изменить</button>
            <button
              type="button"
              class="fav-controll fav-controll--delete btn--none"
              @click="remove(item.id)"
            >Удалить</button>
          </div>
        </li>
      </ul>
      <div
        v-else
        class="subtitle"
      >У Вас ни одного сохраненного запроса</div>
    </div>
    <popap-fav ref="popap" />
  </section>
</template>
<script>
import PopapFav from "@/components/main/PopapFavorite.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PopapFav,
  },
  computed: {
    ...mapGetters("user", { favorite: "favorite" }),
  },
  methods: {
    ...mapActions("user", { remove: "removeRequest" }),
    ...mapActions("content", { getContent: "getContent" }),
    change(item, i) {
      this.$refs.popap.key = i;
      this.$refs.popap.form = { ...item };
      this.openForm();
    },
    openForm() {
      this.$refs.popap.open("change");
    },
    goSearch(item) {
      this.getContent({
        string: item.request,
        order: item.order,
        maxResults: item.range,
      });
      this.$router.push({ name: "main" });
    },
  },
};
</script>
<style lang="scss">
.favorite {
  // .favorite__title
  &__title {
    margin: 40px 0;
  }
  // .favorite__body
  &__body {
    display: flex;
    flex-direction: column;
  }
  // .favorite__item
  &__item {
    &:first-child {
      border-top: 1px $c-second solid;
    }
    border-bottom: 1px $c-second solid;
  }
}
.item-fav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  // .item-fav__name
  &__name {
    font-weight: 500;
    padding: 15px 20px;
  }
  // .item-fav__controls
  &__controls {
    flex: 1 1 auto;
    display: flex;
    gap: 0 10px;
    justify-content: flex-end;
  }
}
.fav-controll {
  // .fav-controll__change
  &--change {
    color: $c-Light;
  }
  // .fav-controll__delete
  &--delete {
    color: #ff0000;
  }
}
</style>