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
                <h1>歌单：{{playList.name}}</h1>
                <div class="playlist-creator">
                  <img v-lazy="playList.creator.avatarUrl" width="36px" alt />
                  <span>{{playList.creator.nickname}}&nbsp;&nbsp;于&nbsp;&nbsp;{{playList.createTime}}&nbsp;&nbsp;创建</span>
                  <a-button @click.once="addMusicList" style="margin-left: 20px">加入播放列表</a-button>
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
import { getPlaylistDetail } from "@/api/playList.js";
import { getSongUrl } from "@/api/song.js";
import { mapMutations } from "vuex";
import Bus from "@/utils/bus.js"
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
      },
      songList: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getListDetail(this.$route.query.id);
    await this.getSong();
    this.loading = false;
  },

  methods: {
    ...mapMutations(["SET_MUSIC_LIST","ADD_MUSIC"]),
    async getListDetail(data) {
      //获取歌单信息
      let res = await getPlaylistDetail(data);
      // this.playList = res.playlist;
      this.playList.id = res.playlist.id;
      this.playList.creator = res.playlist.creator;
      this.playList.createTime = this.$moment(res.playlist.createTime).format(
        "YYYY-M-DD"
      );
      this.playList.trackIds = res.playlist.trackIds;
      this.playList.tracks = res.playlist.tracks.map(item => {
        let artist = [];
        for (const ar of item.ar) {
          artist.push(ar.name);
        }
        return {
          title: item.name,
          id: item.id,
          artist: artist.join("/"),
          pic: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id
        };
      });
      this.playList.tags = res.playlist.tags;
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
            this.playList.tracks[j].src = this.songList[i].url;
            this.playList.tracks[j].key = j;
          }
        }
      }
    },
    addMusicList() {
      this.SET_MUSIC_LIST(this.playList.tracks);
    },
    addMusic(song){
      this.ADD_MUSIC(song);
      // console.log(song)
      Bus.$emit('play',song);
    }
  }
};
</script>
<style lang='scss' scoped>
.playlist-detail-container {
  padding-bottom: 80px;
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
  padding-bottom: 80px;
  h1 {
    font-size: 24px;
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
  .tag {
    font-size: 14px;
    margin: 14px 0;
  }
}
</style>