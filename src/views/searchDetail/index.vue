<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar @getSearchResult="getSearchResult"></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">歌曲</span>
            <song-result :songResult="songResult"></song-result>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">歌手</span>
            <artist-result :artistResult="artistResult"></artist-result>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">专辑</span>
            <album-result :albumResult="albumResult"></album-result>
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab">歌单</span>
            <playlist-result :playlistResult="playlistResult"></playlist-result>
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab">MV</span>
            <mv-result :mvResult="mvResult"></mv-result>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SearchBar from "./components/searchBar";
import AlbumResult from "./components/albumResult";
import ArtistResult from "./components/artistResult";
import MvResult from "./components/mvResult";
import PlaylistResult from "./components/playlistResult";
import SongResult from "./components/songResult";
import { searchSuggest } from "@/api/search.js";
import { getAlbum } from "@/api/album.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      songResult: [],
      artistResult: [],
      albumResult: [],
      playlistResult: [],
      mvResult: []
    };
  },

  components: {
    SearchBar,
    AlbumResult,
    ArtistResult,
    MvResult,
    PlaylistResult,
    SongResult
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getSearchResult(val) {
      let res = await searchSuggest(val);
      for (let i = 0; i < res.result.order.length; i++) {
        let type = res.result.order[i];
        switch (type) {
          case "albums":
            this.albumResult = res.result[type];
            if (this.albumResult) {
              for (let i = 0; i < this.albumResult.length; i++) {
                this.albumResult[i].picUrl = await this.getAlbum(
                  this.albumResult[i].id
                );
              }
            }
            break;
          case "artists":
            this.artistResult = res.result[type];
            break;
          case "songs":
            this.songResult = res.result[type].map(item => {
              let artist = [];
              for (const ar of item.artists) {
                artist.push(ar.name);
              }
              return {
                id: item.id,
                name: item.name,
                artist: artist.join("/"),
                cover: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                albumName: item.album.name,
                albumId: item.album.id,
                theme: [255, 255, 255]
              };
            });
            break;
          case "mvs":
            this.mvResult = res.result[type];
            break;
          case "playlists":
            this.playlistResult = res.result[type];
          default:
            break;
        }
      }
    },
    async getAlbum(id) {
      let res = await getAlbum(id);
      return res.album.picUrl;
    }
  }
};
</script>
<style lang='scss' scoped>
.search-container {
  min-height: 800px;
}
</style>