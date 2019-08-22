<template>
  <div>
    <div class="mv-title">
      <h1>
        <svg class="icon" aria-hidden="true" style="font-size:24px; margin-right:6px;">
          <use xlink:href="#icon-mv1" />
        </svg>
        {{mv.name}}
      </h1>
      <span>{{mv.artistName}}</span>
      <span>{{mv.publishTime}}</span>
    </div>

    <div id="wrapper"></div>
    <div class="mv-detail">
      <span>
        <svg class="icon" aria-hidden="true" style="font-size:24px; margin-right:6px;">
          <use xlink:href="#icon-like" />
        </svg>
        {{mv.playCount}}
      </span>
      <span>
        <svg class="icon" aria-hidden="true" style="font-size:24px; margin-right:6px;">
          <use xlink:href="#icon-star" />
        </svg>
        {{mv.subCount}}
      </span>
      <span>
        <svg class="icon" aria-hidden="true" style="font-size:24px; margin-right:6px;">
          <use xlink:href="#icon-ArtboardCopy" />
        </svg>
        {{mv.shareCount}}
      </span>
    </div>
  </div>
</template>

<script>
// import Chimee from "chimee";
import { getMvUrl, getMvDetail, getCommentMv } from "@/api/mv.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      mv: {
        id: null,
        url: null,
        artistId: null,
        artistName: null,
        name: null,
        playCount: null,
        subCount: null,
        shareCount: null,
        commentCount: null,
        publishTime: null
      }
    };
  },

  components: {},

  computed: {
    mvId() {
      return this.$route.query.id;
    }
  },

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getMv();
    await this.getMvDetail();
    new Chimee({
      wrapper: "#wrapper",
      src: this.mv.url,
      isLive: false,
      box: "native",
      autoplay: true,
      controls: true
    });
  },

  methods: {
    async getMv() {
      let res = await getMvUrl(this.mvId);
      this.mv.id = res.data.id;
      this.mv.url = res.data.url;
    },
    async getMvDetail() {
      let res = await getMvDetail(this.mvId);
      this.mv.artistId = res.data.artistId;
      this.mv.name = res.data.name;
      this.mv.artistName = res.data.artistName;
      this.mv.playCount = res.data.playCount;
      this.mv.subCount = res.data.subCount;
      this.mv.shareCount = res.data.shareCount;
      this.mv.commentCount = res.data.commentCount;
      this.mv.publishTime = res.data.publishTime;
    }
  }
};
</script>
<style lang='scss' scoped>
.mv {
  padding-bottom: 100px;
  .mv-title {
    margin: 16px 0;
    text-align: left;
    h1 {
      font-size: 24px;
      line-height: 2em;
    }
    span {
      margin: 0 6px;
    }
  }
  #wrapper {
    overflow: hidden;
    margin: 16px 0;
  }
  .mv-detail {
    text-align: left;
    span {
      margin-right: 16px;
    }
  }
}
</style>