<template >
  <iframe
    :src="`https://www.youtube.com/embed/${video.id.videoId}`"
    :srcdoc="`${iframeStyle}<a href=https://www.youtube.com/embed/${video.id.videoId}?autoplay=1><img src=${video.snippet.thumbnails.medium.url} alt=${video.snippet.description}><span>▶</span></a>`"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    :title="video.snippet.title"
  ></iframe>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
    },
  },
  data() {
    return {
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
};
</script>
