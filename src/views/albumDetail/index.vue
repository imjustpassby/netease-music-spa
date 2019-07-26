<template>
  <div class="album-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="album-detail">
            <a-row>
              <a-col :span="5">
                <img v-lazy="albumInfo.picUrl" width="100%" alt="专辑" />
              </a-col>
              <a-col :span="18" :offset="1">
                <svg class="icon" aria-hidden="true" style="font-size:46px; margin-right:16px;">
                  <use xlink:href="#icon-zhuanji" />
                </svg>
                <h1>{{albumInfo.name}}</h1>
                <a-button @click.once="addMusicList" class="add-playlist-btn">
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
                      <use xlink:href="#icon-play1" />
                    </svg>加入播放列表
                  </a-button>
                <div class="album-detail-info">
                  <p>
                    歌手：
                    <span v-for="(art,idx) in albumInfo.artists" :key="idx">
                      {{art}}
                      <span v-if="idx!== albumInfo.artists.length-1">/</span>
                    </span>
                  </p>
                  <p>发行时间：{{albumInfo.publishTime}}</p>
                  <p>发行公司：{{albumInfo.company}}</p>
                  <p style="white-space: pre-wrap;">介绍：{{albumInfo.description}}</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-skeleton>

        <a-skeleton active :loading="loading" class="album-tracks">
          <div>
            <div class="list-title">
              <span style="font-size:24px">歌曲列表</span>
              <span>共{{albumInfo.tracks.length}}首</span>
            </div>
            <a-table :dataSource="albumInfo.tracks">
              <a-table-column title key="action" width="5%">
                <template slot-scope="text, record">
                  <span>
                    <svg class="icon play-icon" aria-hidden="true" @click="addMusic(record)">
                      <use xlink:href="#icon-play1" />
                    </svg>
                  </span>
                </template>
              </a-table-column>
              <a-table-column title="歌曲标题" data-index="title" width="50%" key="title" />
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
import { getAlbum } from "@/api/album.js";
import { getSongUrl,getLyric } from "@/api/song.js";
import { mapMutations } from "vuex";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: true,
      albumInfo: {
        picUrl: "",
        company: "",
        description: "",
        name: "",
        id: "",
        type: "",
        publishTime: "",
        artists: [],
        tracks: []
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getAlbumInfo();
    await this.getSong();
    this.loading = false;
  },

  methods: {
    ...mapMutations(["SET_MUSIC_LIST", "ADD_MUSIC"]),
    async getAlbumInfo() {
      //获取专辑信息
      let res = await getAlbum(this.$route.query.id);
      let {
        picUrl,
        company,
        description,
        name,
        id,
        type,
        publishTime,
        artists
      } = res.album;
      this.albumInfo.picUrl = picUrl;
      this.albumInfo.company = company;
      this.albumInfo.description = description;
      this.albumInfo.name = name;
      this.albumInfo.id = id;
      this.albumInfo.type = type;
      this.albumInfo.publishTime = this.$moment(publishTime).format(
        "YYYY-M-DD"
      );
      for (const ar of artists) {
        this.albumInfo.artists.push(ar.name);
      }

      /* 获取专辑的歌曲 */
      this.albumInfo.tracks = res.songs.map(item => {
        let ars = [];
        for (const art of item.ar) {
          ars.push(art.name);
        }
        return {
          id: item.id,
          title: item.name,
          artist: ars.join("/"),
          pic: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id
        };
      });
    },
    async getSong() {
      let ids = [];
      this.albumInfo.tracks.forEach(item => {
        ids.push(item.id);
      });
      /* 获取音乐url */
      let res = await getSongUrl(ids.join(","));
      let songList = res.data.map(item => {
        return { url: item.url, id: item.id };
      });
      /* 音乐url加入到playList.tracks */
      let length = songList.length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (songList[i].id == this.albumInfo.tracks[j].id) {
            this.albumInfo.tracks[j].src = songList[i].url;
            this.albumInfo.tracks[j].key = j;
            // let lyric = await getLyric(songList[i].id);
            // this.albumInfo.tracks[j].lrc = lyric.lrc.lyric;
          }
        }
      }
    },
    addMusicList() {
      this.SET_MUSIC_LIST(this.albumInfo.tracks);
    },
    async addMusic(song) {
      let lyric = await getLyric(song.id);
      song.lrc = lyric.lrc.lyric;
      this.ADD_MUSIC(song);
      Bus.$emit("play", song);
    }
  }
};
</script>
<style lang='scss' scoped>
.album-detail-container {
  padding-bottom: 100px;
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
.album-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 100px;
  h1 {
    font-size: 24px;
    margin: 16px 0;
    display: inline;
    position: relative;
    top: -8px;
  }
  .add-playlist-btn{
    position: relative;
    top: -10px;
    left: 10px;
  }
  .album-detail-info{
    height: 200px;
    overflow: hidden;
  }
}
</style>