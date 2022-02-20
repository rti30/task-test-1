<template>
  <li class="video-card">
    <video-frame
      :video="video"
      class="video-card__frame"
    ></video-frame>
    <div class="video-card__title sub-title">{{video.snippet.title}}</div>
    <div class="video-card__desc text"><span class="card-desc__text">{{video.snippet.description}}</span>
      <span>{{getViewPhrase}}</span>
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
      detail: null,
      wordDictionary: {
        view: ["просмотр", "просмотра", "просмотров"],
      },
    };
  },
  computed: {
    getViewPhrase() {
      return (
        this.viewCount.count +
        " " +
        this.viewCount.shortCount +
        " " +
        this.getWordView
      );
    },

    getWordView() {
      const words = this.wordDictionary.view;
      const shortCount = this.viewCount.shortCount;
      const value = this.viewCount.count;
      const num = value % 10;
      if (value > 10 && value < 20) return words[2];
      if (num > 1 && num < 5 && !shortCount) return words[1];
      if (num == 1 && !shortCount) return words[0];
      return words[2];
    },
    viewCount() {
      let result = { shortCount: "", count: 0 };
      if (!this.detail?.viewCount) {
        return result;
      } else {
        const viewCount = Math.ceil(this.detail.viewCount);
        if (viewCount > 999 && viewCount < 1000000) {
          result.shortCount = "тыс";
          result.count = Math.trunc(viewCount / 1000);
        } else if (viewCount > 999999 && viewCount < 1000000000) {
          result.shortCount = "млн";
          result.count = Math.trunc(viewCount / 1000000);
        } else if (viewCount > 999999999 && viewCount < 1000000000000) {
          result.shortCount = "млрд";
          result.count = Math.trunc(viewCount / 1000000000);
        } else {
          result.count = viewCount;
        }
        return result;
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
  overflow: hidden;

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
    grid-template-columns: 50% 50%;
    @media (min-width: $tabletWidth + "px") {
      grid-template-columns: minmax(max-content, auto) 1fr;
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