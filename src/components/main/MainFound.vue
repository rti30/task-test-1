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
            <div
              v-if="showCloudInfo"
              class="fav-block__info info-cloud"
            >
              <div class="info-cloud__text text-info">Поиск сохранён в разделе «Избранное»</div>
              <div class="info-cloud__link">
                <router-link :to="{name: 'fav'}">Перейти в избранное</router-link>
              </div>
            </div>
          </div>
        </div>
        <search-button
          class="search__button  btn--search search-form__button"
          :text="'Найти'"
        >
        </search-button>

      </form>

      <div class="found__content content">
        <header class="found__header">
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
          <li
            class="video-card"
            v-for="(video) in videos"
            :key="video.id.videoId"
          >
            <iframe
              class="video-card__frame"
              :src="`https://www.youtube.com/embed/${video.id.videoId}`"
              :srcdoc="`${iframeStyle}<a href=https://www.youtube.com/embed/${video.id.videoId}?autoplay=1><img src=${video.snippet.thumbnails.medium.url} alt=${video.snippet.description}><span>▶</span></a>`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              :title="video.snippet.title"
            ></iframe>
            <div class="video-card__title sub-title">{{video.snippet.title}}</div>
            <div class="video-card__desc text"><span class="card-desc__text">{{video.snippet.description}}</span>
              <span>786 тыс. просмотров</span>
            </div>
          </li>
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
//import Search from "@/components/ui/Search.vue";
import SearchButton from "@/components/ui/ButtonSearch.vue";
import InputSearch from "@/components/ui/InputSearch.vue";
import PopapFav from "@/components/main/PopapFavorite.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    //  Search,
    SearchButton,
    InputSearch,
    PopapFav,
  },
  data() {
    return {
      view: "grid",
      showCloudInfo: false,
      // iframeStyle: `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>`,
      iframeStyle: `
    <style>
      html,body{
        height:100%;
        overflow: hidden;
      }
        img {
      position: absolute;
      width: 100%;
      height: 100%;
      max-height: 138px;
      object-fit: cover;
    }
      span {
    position: absolute;
    font: 48px/1.5 sans-serif;
    color: white;
    text-shadow: 0 0 0.5em black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
      </style>`,
    };
  },
  computed: {
    ...mapGetters("content", {
      content: "content",
      search: "search",
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
    changeView(param) {
      this.view = param;
    },
    openSaveForm() {
      if (this.search) {
        this.$refs.popap.open();
        console.log("Открыть");
        this.showCloudInfo = false;
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
//!ToDo Надо было отделить классы Grid И List

.found {
  // .found__title

  &__title {
  }

  // .found__form

  &__form {
    margin: 0 0 40px 0;
  }

  // .found__input

  &__input {
    position: relative;
  }

  // .found__content

  &__content {
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }
}
.content-width {
}
.title2 {
}
.input-button {
}
.search-form {
  // .search-form__input

  &__input {
    display: flex;
  }

  // .search-form__button

  &__button {
  }
}
.input-icon {
  // .input-icon__icon

  &__icon {
  }
}
.input--search {
}
.btn--none {
}
.icon-favorite {
}
.search {
  // .search__button

  &__button {
  }
}
.btn--search {
}
.content {
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

  // .content__icon

  &__icon {
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
.icon-list {
}
.icon-grid {
}
.video-card {
  display: flex;
  flex-direction: column;
  gap: 8px 0;

  // .video-card__frame

  &__frame {
    width: 100%;
  }

  // .video-card__title

  &__title {
  }

  // .video-card__desc

  &__desc {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
}
.card-desc__text {
  flex: 1 1 auto;
}
.sub-title {
}
.text {
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
  .video-card {
    display: grid;
    grid-template-areas:
      "img title"
      "img desc";
    gap: 8px 20px;
    grid-template-columns: auto 1fr;
    // .video-card__frame

    &__frame {
      grid-area: img;
      height: 88px;
      width: 157px;
    }

    // .video-card__title
    &__title {
      grid-area: title;
    }

    // .video-card__desc
    &__desc {
      grid-area: desc;
    }
  }
}

.fav-block {
  &__info {
    /*     position: absolute;
    bottom: 0;
    transform: translate(-100%, 0); */
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
    background: url("~@/assets/img/ui/union.svg") no-repeat;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
    width: 14px;
    height: 4px;
  }
  /*  &::after,
  &::before {
    content: "";
    width: 25px;
    height: 10px;
    background-color: red;
    position: absolute;
    top: 4px;
    right: 50%;
    z-index: 1;
  }

  &::after {
    border-radius: 100% 0% 0% 0%;
    transform: translate(25%, -100%);
  }
  &::before {
    border-radius: 0% 100% 0% 0%;
    transform: translate(75%, -100%);
  } */
}
</style>