<template>
  <div>
    <a-row>
      <a-col :span="4" :offset="5">
        <user-playlist @showPlaylist="showPlaylist"></user-playlist>
      </a-col>
      <a-col :span="10">
        <playlist-detail v-if="isShow" :playList="playList"></playlist-detail>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserPlaylist from "./components/userPlaylist"
import PlaylistDetail from "./components/playlistDetail"
import { getPlaylistDetail } from "@/api/playList.js";
import { mapGetters } from "vuex";
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
      songList: []
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

  mounted() {
      
  },

  methods: {
    async showPlaylist(data){
      await this.getListDetail(data.id)
      this.isShow = true;
    },
    async getListDetail(data) {
      //获取歌单信息
      let res = await getPlaylistDetail(data);
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
          name: item.name,
          id: item.id,
          artist: artist.join("/"),
          cover: item.al.picUrl,
          albumName: item.al.name,
          albumId: item.al.id,
          key: item.id,
          theme: [255,255,255]
        };
      });
      this.playList.tags = res.playlist.tags;
      this.playList.picUrl = res.playlist.coverImgUrl;
      this.playList.name = res.playlist.name;
      this.playList.description = res.playlist.description;
    },
  }
};
</script>
<style lang='scss' scoped>

</style>