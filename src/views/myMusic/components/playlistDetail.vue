<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col>
        <div class="playlist-detail">
          <a-row>
            <a-col :span="5">
              <img v-lazy="playList.picUrl" width="100%" style="margin-top:30px" alt="歌单" />
            </a-col>
            <a-col :span="18" :offset="1">
              <svg class="icon" aria-hidden="true" style="font-size:100px; margin-right:16px;">
                <use xlink:href="#icon-qukugedan" />
              </svg>
              <h1>{{playList.name}}</h1>
              <div class="playlist-creator">
                <img v-lazy="playList.creator.avatarUrl" width="36px" alt />
                <span>{{playList.creator.nickname}}&nbsp;&nbsp;于&nbsp;&nbsp;{{playList.createTime}}&nbsp;&nbsp;创建</span>
                <a-button @click.once="addMusicList" style="margin-left: 20px">
                  <svg class="icon" aria-hidden="true" style="font-size:16px; margin-right:16px;">
                    <use xlink:href="#icon-play1" />
                  </svg>加入播放列表
                </a-button>
              </div>
              <div class="tag">
                <span>标签：</span>
                <a-tag color="pink" v-for="(tag,idx) in playList.tags" :key="idx">{{tag}}</a-tag>
              </div>
              <div>
                介绍：
                <p>{{playList.description}}</p>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="album-tracks"></div>

        <div>
          <div class="list-title">
            <span style="font-size:24px">歌曲列表</span>
            <span>共{{playList.tracks.length}}首</span>
          </div>
          <a-table :dataSource="playList.tracks" :pagination="pagination">
            <a-table-column title key="action" width="5%">
              <template slot-scope="text, record">
                <span>
                  <svg class="icon play-icon" aria-hidden="true" @click.once="addMusic(record)">
                    <use xlink:href="#icon-play1" />
                  </svg>
                </span>
              </template>
            </a-table-column>
            <a-table-column title="歌曲标题" data-index="name" width="30%" key="title" />
            <a-table-column title="歌手" data-index="artist" align="center" width="25%" key="artist" />
            <a-table-column title="专辑" data-index="albumName" key="albumName" />
          </a-table>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Bus from "@/utils/bus.js";
import { mapActions } from "vuex";
export default {
  name: "",
  props: ["playList"],
  data() {
    return {
      pagination: { defaultPageSize: 40 }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
    addMusicList() {
      Bus.$emit("add", { list: this.playList.tracks, type: "playlist" });
      this.$message.success("已加入播放列表！");
    },
    async addMusic(song) {
      this.SET_CURRENT_MUSIC_ACTION(song)
        .then(result => {
          Bus.$emit("play", result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.playlist-detail-container {
  padding: 0 0 100px 16px;
  .play-icon {
    margin-left: 40%;
    font-size: 24px;
    cursor: pointer;
  }
  .list-title {
    text-align: left;
    margin-bottom: 10px;
    & > span {
      margin: 10px;
    }
  }
}
.playlist-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 100px;
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -26px;
  }
  .playlist-creator {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: -16px 0 16px 0;
    img {
      margin-right: 16px;
      float: left;
      clear: both;
      border-radius: 50%;
    }
  }
  .tag {
    font-size: 14px;
    margin: 14px 0;
  }
}
</style>