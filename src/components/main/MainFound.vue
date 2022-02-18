<template>
  <section
    class="found"
    :class="{'found-list': view==='list'}"
  >
    <div class="content-width">
      <h1 class="found__title title2">Поиск видео</h1>
      <form
        @submit.prevent
        action="#"
        class="found__form input-button search-form"
      >
        <div class="found__input search-form__input">
          <input-search class="input--search"></input-search>
          <div class="found__fav fav-block">
            <button
              type="button"
              class="input__icon btn--none"
            >
              <svg
                @click="openSaveForm"
                class="icon-favorite"
              >
                <use xlink:href="@/assets/img/ui/search/searchSprite.svg#icon-favorite"></use>
              </svg>
            </button>
            <transition name="fade">
              <div
                v-if="showCloudInfo"
                class="fav-block__info info-cloud"
              >
                <div class="info-cloud__text text-info">Поиск сохранён в разделе «Избранное»</div>
                <div class="info-cloud__link">
                  <router-link :to="{name: 'fav'}">Перейти в избранное</router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <search-button
          class="search__button  btn--search search-form__button"
          :text="'Найти'"
        >
        </search-button>
      </form>
      <div class="found__content content">
        <header class="content__header">
          <div class="content__info">
            <div class="content__string"><span>Видео по запросу <strong class="content__query">«{{currentSearch}}» </strong></span>
              <span class="content__count">{{totalResults}}</span>
            </div>
          </div>
          <div class="content__controllers">
            <svg
              @click="changeView('list')"
              class="icon-list content__icon"
              :class="{'icon-list--active':view==='list'}"
            >
              <use xlink:href="@/assets/img/ui/search/searchSprite.svg#icon-list"></use>
            </svg>
            <svg
              @click="changeView('grid')"
              class="icon-grid content__icon"
              :class="{'icon-grid--active':view==='grid'}"
            >
              <use xlink:href="@/assets/img/ui/search/searchSprite.svg#icon-grid"></use>
            </svg>
          </div>
        </header>
        <ul
          v-if="hasVideos"
          class="content__body"
        >
          <video-card
            class="video-card"
            v-for="(video) in videos"
            :video="video"
            :key="video.id.videoId"
          ></video-card>
        </ul>
        <div
          v-else
          class="title"
        >По Вашему запросу ничего не найдено</div>
      </div>
    </div>
    <popap-fav
      @save="toggleCloudInfo"
      ref="popap"
    />
  </section>
</template>
<script>
import VideoCard from "@/components/main/VideoCard.vue";
import SearchButton from "@/components/ui/ButtonSearch.vue";
import InputSearch from "@/components/ui/InputSearch.vue";
import PopapFav from "@/components/main/PopapFavorite.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SearchButton,
    InputSearch,
    PopapFav,
    VideoCard,
  },
  data() {
    return {
      view: "grid",
      showCloudInfo: false,
    };
  },
  computed: {
    ...mapGetters("content", {
      content: "content",
      hasVideos: "hasContent",
      currentSearch: "currentSearch",
    }),
    videos() {
      return this.content?.items;
    },
    totalResults() {
      return this.content?.pageInfo.totalResults;
    },
  },
  methods: {
    ...mapActions("alert", {
      addAlert: "add",
    }),
    changeView(param) {
      this.view = param;
    },
    openSaveForm() {
      if (this.currentSearch) {
        this.$refs.popap.open();
        this.showCloudInfo = false;
      } else {
        //! сюда не попасть, но пусть будет
        this.addAlert({
          text: "Начните поиск, чтобы сохранить его результат в 'Избаранное'",
        });
      }
    },
    toggleCloudInfo() {
      this.showCloudInfo = true;
      setTimeout(() => {
        this.showCloudInfo = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss">
.found {
  // .found__form
  &__form {
    margin: 0 0 40px 0;
  }

  // .found__input
  &__input {
    position: relative;
  }
}

.search-form {
  // .search-form__input
  &__input {
    display: flex;
  }
}

.content {
  // .content__header
  &__header {
    display: flex;
    justify-content: space-between;
  }

  // .content__info
  &__info {
    font-size: 12px;
    margin: 0 0 20px 0;
    @media (min-width: $tabletWidth + "px") {
      font-size: 16px;
    }
  }
  &__query {
    font-weight: 500;
  }

  // .content__string
  &__string {
    display: flex;
    flex-wrap: wrap;
    gap: 0 15px;
  }

  // .content__count
  &__count {
    color: $c-second;
    display: block;
    @media (min-width: $tabletWidth + "px") {
    }
  }

  // .content__controllers
  &__controllers {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 0 20px;
  }

  // .content__body
  &__body {
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: $tabletWidth + "px") {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: $PCWidth + "px") {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    //flex-wrap: wrap;
    gap: 25px 0;
    @media (min-width: $tabletWidth + "px") {
      gap: 25px 20px;
    }
  }
}

.card-desc__text {
  flex: 1 1 auto;
}

//* List
.found-list {
  .found__form {
    @media (min-width: $PCWidth + "px") {
      margin: 0 0 80px 0;
    }
  }
  .content {
    &__body {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 25px 0;
      @media (min-width: $tabletWidth + "px") {
        gap: 25px 0;
      }
    }
  }
}

.fav-block {
  &__info {
    bottom: 0;
    transform: translate(-60%, 104%);
    position: absolute;
  }
}

.info-cloud {
  border-radius: $main-radius;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  width: 220px;
  padding: 20px 15px;
  background-color: #ffffff;
  z-index: 1;
  &__text {
    margin: 0 0 15px 0;
  }

  // .info-cloud__link
  &__link {
    a {
      color: $c-Light;
      font-family: "PT Sans";
    }
  }
  &::before {
    content: "";
    background: url("~@/assets/img/ui/util/union.svg") no-repeat;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
    width: 14px;
    height: 4px;
  }
}
</style>