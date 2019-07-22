<template>
  <div class="recommend">
    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-song-sheet></recommend-song-sheet>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-private-content></recommend-private-content>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-new-song></recommend-new-song>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-mv></recommend-mv>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <recommend-dj></recommend-dj>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import RecommendSongSheet from "./reccommendSongSheet.vue"
import RecommendDj from "./recommendDj.vue"
import RecommendMv from "./recommendMv.vue"
import RecommendNewSong from "./recommendNewSong.vue"
import RecommendPrivateContent from "./recommendPrivateContent.vue"
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {
    RecommendSongSheet,
    RecommendDj,
    RecommendMv,
    RecommendNewSong,
    RecommendPrivateContent
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {}
};
</script>

<style lang='scss'>
.recommend{
  padding-bottom: 80px;
}
.recommend-item {
  text-align: left;
  padding: 16px;
  & > div {
    width: 100%;
    font-size: 24px;
    line-height: 1.5em;
    border-bottom: 1px solid #dddddd;
  }
  .more {
    float: right;
    font-size: 14px;
    line-height: 2.5em;
    outline: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0);
  }
  .img-box{
    width: 100%;
    position: relative;
    height: 0;
    padding-bottom: 100%;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .recommend-title {
    margin-top: 7px;
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
  .recommend-new-songs {
    border-bottom: 1px solid #ddd;
    margin-right: 16px;
    .play {
      position: absolute;
      height: 60%;
      width: 60%;
      left: 17px;
      top: 17px;
      z-index: 99;
      cursor: pointer;
    }
  }
}
</style>
