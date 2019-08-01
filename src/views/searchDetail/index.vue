<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">歌曲</span>
            <song-result></song-result>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">歌手</span>
            <artist-result></artist-result>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">专辑</span>
            <album-result></album-result>
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab">歌单</span>
            <playlist-result></playlist-result>
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab">MV</span>
            <mv-result></mv-result>
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
      mvResult: [],
      keywords: ""
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

  methods: {}
};
</script>
<style lang='scss' scoped>
.search-container {
  min-height: 800px;
}
</style>