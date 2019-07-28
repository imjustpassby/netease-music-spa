<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="playlist-detail">
            <a-row>
              <a-col :span="5">
                <img v-lazy="playList.picUrl" width="100%" alt="歌单" />
              </a-col>
              <a-col :span="18" :offset="1">
                <svg class="icon" aria-hidden="true" style="font-size:36px; margin-right:16px;">
                  <use xlink:href="#icon-paihangbang" />
                </svg>
                <h1>{{playList.name}}</h1>
                <div class="playlist-creator">
                  <img v-lazy="playList.creator.avatarUrl" width="36px" alt />
                  <span>{{playList.creator.nickname}}&nbsp;&nbsp;最近更新&nbsp;&nbsp;{{playList.updateTime}}</span>
                  <a-button @click.once="addMusicList" style="margin-left: 20px">
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-play1" />
                    </svg>加入播放列表
                  </a-button>
                </div>
                <div>
                  介绍：
                  <p>{{playList.description}}</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>

        <a-skeleton active :loading="loading">
          <div>
            <div class="list-title">
              <span style="font-size:24px">歌曲列表</span>
              <span>共{{playList.tracks.length}}首</span>
            </div>
            <a-table :dataSource="playList.tracks">
              <a-table-column title key="action" width="5%">
                <template slot-scope="text, record">
                  <span>
                    <svg class="icon play-icon" aria-hidden="true" @click="addMusic(record)">
                      <use xlink:href="#icon-play1" />
                    </svg>
                  </span>
                </template>
              </a-table-column>
              <a-table-column title="歌曲标题" data-index="name" width="50%" key="title" />
              <a-table-column title="歌手" data-index="artist" width="25%" key="artist" />
              <a-table-column title="专辑" data-index="albumName" key="albumName" />
            </a-table>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getRankingList } from "@/api/rankingList.js";
import { getSongUrl, getLyric } from "@/api/song.js";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      playList: {
        id: "",
        creator: {},
        updateTime: "",
        trackIds: [],
        tracks: [],
        picUrl: "",
        name: "",
        description: ""
      },
      songList: [],
      loading: true
    };
  },

  components: {},

  computed: {
    idx() {
      return this.$route.query.idx;
    }
  },

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getList();
    await this.getSong();
    this.loading = false;
  },

  methods: {
    async getList() {
      let res = await getRankingList(this.idx);
      this.playList.id = res.playlist.id;
      this.playList.creator = res.playlist.creator;
      this.playList.updateTime = this.$moment(res.playlist.updateTime).format(
        "YYYY-M-DD"
      );
      this.playList.trackIds = res.playlist.trackIds;
      this.playList.tracks = res.playlist.tracks.map(item => {
        let artist = [];
        for (const ar of item.ar) {
          artist.push(ar.name);
        }
        return {
          name: item.name,
          id: item.id,
          artist: artist.join("/"),
          cover: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id
        };
      });
      this.playList.picUrl = res.playlist.coverImgUrl;
      this.playList.name = res.playlist.name;
      this.playList.description = res.playlist.description;
    },
    async getSong() {
      let ids = [];
      this.playList.trackIds.forEach(item => {
        ids.push(item.id);
      });
      /* 获取音乐url */
      let res = await getSongUrl(ids.join(","));
      this.songList = res.data.map(item => {
        return { url: item.url, id: item.id };
      });
      /* 音乐url加入到playList.tracks */
      let length = this.songList.length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (this.songList[i].id == this.playList.tracks[j].id) {
            this.playList.tracks[j].url = this.songList[i].url;
            this.playList.tracks[j].key = j;
          }
        }
      }
    },
    addMusicList() {
      Bus.$emit("add", { list: this.playList.tracks, type: "ranking" });
    },
    async addMusic(song) {
      let lyric = await getLyric(song.id);
      if (lyric.hasOwnProperty("lrc")) {
        //该首歌有歌词
        song.lrc = lyric.lrc.lyric;
      }
      Bus.$emit("play", song);
    }
  }
};
</script>
<style lang='scss' scoped>
.playlist-detail-container {
  padding-bottom: 100px;
  text-align: left;
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
  margin-top: 46px;
  padding-bottom: 100px;
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -4px;
  }
  .playlist-creator {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: 16px 0;
    img {
      margin-right: 16px;
      float: left;
      clear: both;
      border-radius: 50%;
    }
  }
}
</style>