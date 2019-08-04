<template>
  <div class="playlist-detail-container">
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="playlist-detail">
            <a-row>
              <a-col :span="5">
                <img v-lazy="playList.picUrl" style="margin-top:30px" width="100%" alt="歌单" />
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
                    <svg
                      class="icon"
                      aria-hidden="true"
                      style="font-size:16px; margin-right:16px;"
                    >
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
        </a-skeleton>

        <a-skeleton active :loading="loading">
          <div>
            <div class="list-title">
              <span style="font-size:24px">歌曲列表</span>
              <span>共{{playList.tracks.length}}首</span>
            </div>
            <a-table :dataSource="playList.tracks">
              <a-table-column title key="action" width="10%">
                <template slot-scope="text, record">
                  <span>
                    <svg class="icon play-icon" aria-hidden="true" @click.once="addMusic(record)">
                      <use xlink:href="#icon-play1" />
                    </svg>
                  </span>
                </template>
              </a-table-column>
              <a-table-column title="歌曲标题" width="40%" key="title">
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span>{{record.name}}</span>
                    </template>
                    <span @click="goSongDetail(record)" style="cursor:pointer">{{record.name}}</span>
                  </a-popover>
                </template>
              </a-table-column>
              <a-table-column title="歌手" width="25%" key="artist">
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span>{{record.artist}}</span>
                    </template>
                    <span @click="goArtistDetail(record)" style="cursor:pointer">{{record.artist}}</span>
                  </a-popover>
                </template>
              </a-table-column>
              <a-table-column title="专辑" key="albumName">
                <template slot-scope="text, record">
                  <a-popover placement="top">
                    <template slot="content">
                      <span>{{record.albumName}}</span>
                    </template>
                    <span @click="goAlbumDetail(record)" style="cursor:pointer">{{record.albumName}}</span>
                  </a-popover>
                </template>
              </a-table-column>
            </a-table>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getPlaylistDetail } from "@/api/playList.js";
import Bus from "@/utils/bus.js";
import { mapActions } from "vuex";
import { formatTime } from "@/utils/index";
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: true,
      playList: {
        id: "",
        creator: {},
        createTime: "",
        trackIds: [],
        tracks: [],
        tags: [],
        picUrl: "",
        name: "",
        description: ""
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getListDetail(this.$route.query.id);
    this.loading = false;
  },

  methods: {
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
    async getListDetail(data) {
      //获取歌单信息
      let res = await getPlaylistDetail(data);
      // this.playList = res.playlist;
      this.playList.id = res.playlist.id;
      this.playList.creator = res.playlist.creator;
      this.playList.createTime = formatTime(
        res.playlist.createTime,
        "{y}-{m}-{d}"
      );
      this.playList.trackIds = res.playlist.trackIds;
      this.playList.tracks = res.playlist.tracks.map(item => {
        let artist = [];
        let artistId = item.ar[0].id;
        for (const ar of item.ar) {
          artist.push(ar.name);
        }
        return {
          name: item.name,
          id: item.id,
          artist: artist.join("/"),
          artistId: artistId,
          cover: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id,
          key: item.id,
          theme: [255, 255, 255]
        };
      });
      this.playList.tags = res.playlist.tags;
      this.playList.picUrl = res.playlist.coverImgUrl;
      this.playList.name = res.playlist.name;
      this.playList.description = res.playlist.description;
    },
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
    },
    goAlbumDetail(song) {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: song.albumId
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.playlist-detail-container {
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
.playlist-detail {
  text-align: left;
  margin-top: 16px;
  padding-bottom: 30px;
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