<template>
  <div>
    <div class="song-detail">
      <a-row>
        <a-col :span="5">
          <img v-lazy="songInfo.cover" class="album-cover" alt="歌曲" />
        </a-col>
        <a-col :span="18" :offset="1">
          <div style="margin-top:46px">
            <svg class="icon" aria-hidden="true" style="font-size:46px; margin-right:16px;">
              <use xlink:href="#icon-song-red" />
            </svg>
            <h1>{{songInfo.name}}</h1>
          </div>

          <div class="song-artist">
            <span style="cursor:pointer" @click="goArtistDetail">歌手：{{songInfo.artist}}</span>
            <a-button @click.once="addMusic" style="margin-left: 20px">
              <svg class="icon" aria-hidden="true" style="font-size:16px; margin-right:16px;">
                <use xlink:href="#icon-play1" />
              </svg>播放
            </a-button>
          </div>
          <div>
            <span style="cursor:pointer" @click="goAlbumDetail">专辑：{{songInfo.albumName}}</span>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getSongDetail } from "@/api/song.js";
import Bus from "@/utils/bus.js";
import { mapActions } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {
      songInfo: {
        id: null,
        name: "",
        artist: "",
        artistId: "",
        cover: "",
        albumName: "",
        albumId: null,
        theme: [255, 255, 255]
      }
    };
  },

  components: {},

  computed: {},

  watch: {
    $route(to, from) {
      this.getSongDetail(to.query.id);
    }
  },

  beforeMount() {},

  async mounted() {
    await this.getSongDetail(this.$route.query.id);
  },

  methods: {
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
    async getSongDetail(data) {
      let res = await getSongDetail(data);
      let song = res.songs[0];
      let artist = [];
      let artistId = song.ar[0].id;
      for (const ar of song.ar) {
        artist.push(ar.name);
      }
      this.songInfo.id = song.id;
      this.songInfo.name = song.name;
      this.songInfo.artist = artist.join("/");
      this.songInfo.artistId = artistId;
      this.songInfo.cover = song.al.picUrl;
      this.songInfo.albumName = song.al.name;
      this.songInfo.albumId = song.al.id;
    },
    async addMusic() {
      this.SET_CURRENT_MUSIC_ACTION(this.songInfo)
        .then(result => {
          Bus.$emit("play", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goArtistDetail() {
      this.$router.push({
        path: "/artist-detail",
        query: {
          id: this.songInfo.artistId
        }
      });
    },
    goAlbumDetail() {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: this.songInfo.albumId
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.song-detail {
  font-size: 14px;
  text-align: left;
  margin-top: 16px;
  .album-cover {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transition-delay: 2s;
    animation: spinDisc 30s linear infinite;
    &:hover {
      animation-play-state: paused;
    }
    @keyframes spinDisc {
      100% {
        transform: rotate(1turn);
      }
    }
  }
  h1 {
    font-size: 24px;
    display: inline;
    position: relative;
    top: -10px;
  }
  .song-artist {
    font-size: 14px;
    line-height: 3em;
    height: 40px;
    margin: 16px 0;
  }
}
</style>