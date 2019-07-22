<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
          <use xlink:href="#icon-circle" />
        </svg>最新音乐
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col :span="12" v-for="(item,index) in personalizedNewSong" :key="index">
          <a-row type="flex" justify="start" class="recommend-new-songs">
            <a-col :span="4" style="position:relative;">
              <div>
                <svg
                  class="icon play"
                  aria-hidden="true"
                  style="font-size:16px; margin-right:16px;"
                >
                  <use xlink:href="#icon-play" />
                </svg>
                <img
                  v-lazy="item.song.album.blurPicUrl"
                  height="68px"
                  alt="img"
                  style="margin:9px 0 0 9px;cursor: pointer;z-index:-1"
                />
              </div>
            </a-col>
            <a-col :span="20">
              <p class="recommend-title" style="line-height:43px;cursor:text">{{item.name}}</p>
              <span
                class="recommend-title"
                v-for="(artist,index1) in item.song.artists"
                :key="index1"
                style="line-height:43px;cursor:text"
              >
                {{artist.name}}
                <em v-if="index1<item.song.artists.length-1">/</em>
              </span>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script>
import { getPersonalizedNewSong } from "@/api/home.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      personalizedNewSong: [],
      loading: true
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let personalizedNewSong = await getPersonalizedNewSong();
    this.personalizedNewSong = personalizedNewSong.result;
    this.loading = false;
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>