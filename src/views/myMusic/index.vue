<template>
  <div>
    <a-back-top style="bottom: 100px;left:10%" />
    <a-row>
      <a-col :span="4" :offset="4">
        <user-playlist
          @showPlaylist="showPlaylist"
          @closePlaylist="closePlaylist"
        ></user-playlist>
      </a-col>
      <a-col :span="12">
        <div class="spinning-container" v-if="spinning">
          <a-spin :spinning="spinning" size="large" />
        </div>
        <playlist-detail
          v-if="isShow && !spinning"
          :playList="playList"
          :showUnsubscribeBtn="showUnsubscribeBtn"
        ></playlist-detail>
      </a-col>
      <a-col :span="12" v-if="!isShow">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserPlaylist from "./components/userPlaylist";
import PlaylistDetail from "./components/playlistDetail";
import { getPlaylistDetail } from "@/api/playList.js";
import { getSongDetail } from "@/api/song.js";
import { mapGetters } from "vuex";
import { formatTime } from "@/utils/index";
export default {
  name: "",
  props: [""],
  data() {
    return {
      isShow: false,
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
      showUnsubscribeBtn: true,
      spinning: false
    };
  },

  components: {
    UserPlaylist,
    PlaylistDetail
  },

  computed: {
    ...mapGetters(["account", "profile", "uid", "nickname", "avatarUrl"])
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async showPlaylist(data) {
      if (data.type === "self") {
        this.showUnsubscribeBtn = false;
      } else if (data.type === "other") {
        this.showUnsubscribeBtn = true;
      }
      this.isShow = true;
      this.spinning = true;
      await this.getListDetail(data.playlist.id);
    },
    async getListDetail(data) {
      //获取歌单信息
      let res = await getPlaylistDetail(data);
      this.playList.id = res.playlist.id;
      this.playList.creator = res.playlist.creator;
      this.playList.createTime = formatTime(
        res.playlist.createTime,
        "{y}-{m}-{d}"
      );
      this.playList.trackIds = res.playlist.trackIds;
      let ids = res.playlist.trackIds.map(item => {
        return item.id;
      });
      let res1 = await getSongDetail(ids.join(","));
      this.playList.tracks = res1.songs;
      this.playList.tracks = this.playList.tracks.map(item => {
        let artist = [];
        let artistId = item.ar.map(a => {
          return a.id;
        });
        for (const ar of item.ar) {
          artist.push(ar.name);
        }
        return {
          name: item.name,
          id: item.id,
          artist: artist.join("/"),
          artists: artist,
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
      this.spinning = false;
    },
    closePlaylist() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.spinning-container {
  text-align: center;
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 4px;
  padding-top: 50%;
  margin: 50px 0;
  height: 100vh;
}
</style>
