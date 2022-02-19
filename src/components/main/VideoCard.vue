<template>
  <li class="video-card">
    <video-frame
      :video="video"
      class="video-card__frame"
    ></video-frame>
    <div class="video-card__title sub-title">{{video.snippet.title}}</div>
    <div class="video-card__desc text"><span class="card-desc__text">{{video.snippet.description}}</span>
      <span>{{viewCount}}</span>
    </div>
  </li>
</template>
<script>
import VideoFrame from "@/components/main/MainFrame.vue";
import { videoInfo } from "@/api/youtube.js";
export default {
  props: {
    video: {
      type: Object,
    },
  },
  data() {
    return {
      detail: 0,
    };
  },
  computed: {
    viewCount() {
      if (!this.detail?.viewCount) {
        return 0;
      } else {
        const viewCount = this.detail.viewCount.toString();
        return viewCount.length > 11
          ? viewCount.substr(0, 3) + " млрд просмотров"
          : viewCount.length > 10
          ? viewCount.substr(0, 2) + " млрд просмотров"
          : viewCount.length > 9
          ? viewCount.substr(0, 1) + " млрд просмотров"
          : viewCount.length > 8
          ? viewCount.substr(0, 3) + " млн просмотров"
          : viewCount.length > 7
          ? viewCount.substr(0, 2) + " млн просмотров"
          : viewCount.length > 6
          ? viewCount.substr(0, 1) + " млн просмотров"
          : viewCount.length > 5
          ? viewCount.substr(0, 3) + " тыс просмотров"
          : viewCount.length > 4
          ? viewCount.substr(0, 2) + " тыс просмотров"
          : viewCount.length > 3
          ? viewCount.substr(0, 1) + " тыс просмотров"
          : viewCount.length + " просмотров";

        /*  return this.detail.viewCount >= 100000000000
          ? this.detail.viewCount.toString().substr(0, 3) + " млрд просмотров"
          : this.detail.viewCount >= 10000000000
          ? this.detail.viewCount.toString().substr(0, 2) + " млрд просмотров"
          : this.detail.viewCount >= 1000000000
          ? this.detail.viewCount.toString().substr(0, 1) + " млрд просмотров"
          : this.detail.viewCount >= 100000000
          ? this.detail.viewCount.toString().substr(0, 3) + " млн просмотров"
          : this.detail.viewCount >= 10000000
          ? this.detail.viewCount.toString().substr(0, 2) + " млн просмотров"
          : this.detail.viewCount >= 1000000
          ? this.detail.viewCount.toString().substr(0, 1) + " млн просмотров"
          : this.detail.viewCount >= 100000
          ? this.detail.viewCount.toString().substr(0, 3) + " тыс просмотров"
          : this.detail.viewCount >= 10000
          ? this.detail.viewCount.toString().substr(0, 2) + " тыс просмотров"
          : this.detail.viewCount >= 1000
          ? this.detail.viewCount.toString().substr(0, 1) + " тыс просмотров"
          : this.detail.viewCount + " просмотров"; */
      }
    },
  },
  components: {
    VideoFrame,
  },
  async beforeMount() {
    const { items } = await videoInfo(this.video.id.videoId);
    this.detail = items[0]?.statistics;
  },
};
</script>
<style lang="scss">
.video-card {
  display: flex;
  flex-direction: column;
  gap: 8px 0;

  // .video-card__frame
  &__frame {
    width: 100%;
  }

  // .video-card__desc
  &__desc {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
}
.found-list {
  .video-card {
    display: grid;
    grid-template-areas:
      "img title"
      "img desc";
    gap: 8px 20px;
    grid-template-columns: 1fr 1fr;
    @media (min-width: $tabletWidth + "px") {
      grid-template-columns: auto 1fr;
    }
    // .video-card__frame

    &__frame {
      grid-area: img;
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
</style>