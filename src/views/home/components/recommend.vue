<template>
  <div class="recommend">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading.personalized">
          <div class="recommend-item">
            <div>
              <svg class="icon" aria-hidden="true" style="font-size:16px; margin-right:16px;">
                <use xlink:href="#icon-circle" />
              </svg>推荐歌单
              <button class="more">更多&gt;</button>
            </div>
            <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
              <a-col
                :span="4"
                v-for="(item,index) in personalized"
                :key="index"
                style="margin:0 2px 16px 0"
              >
                <img v-lazy="item.picUrl" alt="img" width="100%" style="cursor: pointer;" />
                <p class="recommend-title">{{item.name}}</p>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading.personalizedPrivateContent">
          <div class="recommend-item">
            <div>
              <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
                <use xlink:href="#icon-circle" />
              </svg>独家放送
            </div>
            <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
              <a-col
                :span="7"
                v-for="(item,index) in personalizedPrivateContent"
                :key="index"
                style="margin-bottom: 16px"
              >
                <img v-lazy="item.picUrl" alt="img" width="100%" style="cursor: pointer;" />
                <p class="recommend-title">{{item.name}}</p>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading.personalizedNewSong">
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
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading.personalizedMv">
          <div class="recommend-item">
            <div>
              <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
                <use xlink:href="#icon-circle" />
              </svg>推荐MV
            </div>
            <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
              <a-col
                :span="5"
                v-for="(item,index) in personalizedMv"
                :key="index"
                style="margin-bottom: 16px"
              >
                <img v-lazy="item.picUrl" alt="img" width="100%" style="cursor: pointer;" />
                <p class="recommend-title">{{item.name}}</p>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading.personalizedDJProgram">
          <div class="recommend-item">
            <div>
              <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
                <use xlink:href="#icon-circle" />
              </svg>主播电台
            </div>
            <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
              <a-col
                :span="3"
                v-for="(item,index) in personalizedDJProgram"
                :key="index"
                style="margin-bottom:16px"
              >
                <img v-lazy="item.picUrl" alt="img" width="100%" style="cursor: pointer;" />
                <p class="recommend-title">{{item.name}}</p>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  getPersonalizedMv,
  getPersonalized,
  getPersonalizedNewSong,
  getPersonalizedDJProgram,
  getPersonalizedPrivateContent
} from "@/api/home.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      personalizedMv: [],
      personalized: [],
      personalizedNewSong: [],
      personalizedDJProgram: [],
      personalizedPrivateContent: [],
      loading: {
        personalized: true,
        personalizedPrivateContent: true,
        personalizedNewSong: true,
        personalizedMv: true,
        personalizedDJProgram: true
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let personalized = await getPersonalized();
    this.personalized = personalized.result;
    this.personalized.splice(10);
    this.loading.personalized = false;

    let personalizedPrivateContent = await getPersonalizedPrivateContent();
    this.personalizedPrivateContent = personalizedPrivateContent.result;
    this.loading.personalizedPrivateContent = false;

    let personalizedNewSong = await getPersonalizedNewSong();
    this.personalizedNewSong = personalizedNewSong.result;
    this.loading.personalizedNewSong = false;

    let personalizedMv = await getPersonalizedMv();
    this.personalizedMv = personalizedMv.result;
    this.loading.personalizedMv = false;

    let personalizedDJProgram = await getPersonalizedDJProgram();
    this.personalizedDJProgram = personalizedDJProgram.result;
    this.loading.personalizedDJProgram = false;

  },

  methods: {}
};
</script>

<style lang='scss' scoped>
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
  .recommend-title {
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
