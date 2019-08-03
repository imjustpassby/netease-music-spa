<template>
  <div class="album-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="album-detail">
            <a-row>
              <a-col :span="5">
                <img v-lazy="albumInfo.picUrl" style="margin-top:30px;" width="100%" alt="专辑" />
              </a-col>
              <a-col :span="18" :offset="1" style="margin-top:26px;">
                <svg class="icon" aria-hidden="true" style="font-size:46px; margin-right:16px;">
                  <use xlink:href="#icon-zhuanji" />
                </svg>
                <h1>{{albumInfo.name}}</h1>
                <div :class="!expand ? 'album-detail-info' : ''">
                  <p>
                    歌手：
                    <span v-for="(art,idx) in albumInfo.artists" :key="idx">
                      {{art}}
                      <span v-if="idx!== albumInfo.artists.length-1">/</span>
                    </span>
                    <a-button @click.once="addMusicList" class="add-playlist-btn">
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="font-size:16px; margin-right:16px;"
                      >
                        <use xlink:href="#icon-play1" />
                      </svg>加入播放列表
                    </a-button>
                  </p>
                  <p>发行时间：{{albumInfo.publishTime}}</p>
                  <p>发行公司：{{albumInfo.company}}</p>
                  <button class="more" @click="showMore">{{expandText}}</button>
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
              <a-table-column title="歌曲标题" width="40%" key="title">
                <template slot-scope="text, record">
                  <span @click="goSongDetail(record)" style="cursor:pointer">{{record.name}}</span>
                </template>
              </a-table-column>
              <a-table-column title="歌手" width="25%" key="artist">
                <template slot-scope="text, record">
                  <span @click="goArtistDetail(record)" style="cursor:pointer">{{record.artist}}</span>
                </template>
              </a-table-column>
              <a-table-column title="专辑" key="albumName" data-index="albumName"></a-table-column>
            </a-table>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAlbum } from "@/api/album.js";
import Bus from "@/utils/bus.js";
import { mapActions } from "vuex";
import { formatTime } from "@/utils/index";
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
      },
      expand: false,
      expandText: "展开"
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getAlbumInfo();
    this.loading = false;
  },

  methods: {
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
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
      this.albumInfo.publishTime = formatTime(publishTime, "{y}-{m}-{d}");
      for (const ar of artists) {
        this.albumInfo.artists.push(ar.name);
      }

      /* 获取专辑的歌曲 */
      this.albumInfo.tracks = res.songs.map(item => {
        let ars = [];
        let artistId = item.ar[0].id;
        for (const art of item.ar) {
          ars.push(art.name);
        }
        return {
          id: item.id,
          name: item.name,
          artist: ars.join("/"),
          artistId: artistId,
          cover: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id,
          key: item.id,
          theme: [255, 255, 255]
        };
      });
    },
    addMusicList() {
      Bus.$emit("add", { list: this.albumInfo.tracks, type: "album" });
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
    },
    showMore() {
      if (this.expand) {
        this.expand = false;
        this.expandText = "展开";
      } else {
        this.expand = true;
        this.expandText = "收起";
      }
    },
    goSongDetail(song) {
      this.$router.push({
        path: "/song-detail",
        query: {
          id: song.id
        }
      });
    },
    goArtistDetail(song) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          id: song.artistId
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.album-detail-container {
  position: relative;
  padding-bottom: 100px;
  font-size: 14px;
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
  padding-bottom: 30px;
  h1 {
    font-size: 24px;
    margin: 16px 0;
    display: inline;
    position: relative;
    top: -8px;
  }
  .add-playlist-btn {
    margin-left: 100px;
  }
  .album-detail-info {
    height: 210px;
    overflow: hidden;
  }
}
.more {
  position: absolute;
  bottom: -16px;
  right: 0;
  font-size: 14px;
  line-height: 2.5em;
  outline: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
}
</style>