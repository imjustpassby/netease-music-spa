<template>
  <div>
    <a-row class="search-container">
      <a-col :span="14" :offset="5">
        <search-bar @search="search"></search-bar>
      </a-col>
      <a-col :span="14" :offset="5">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab" >歌曲</span>
            <song-result :keywords="keywords"></song-result>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">歌手</span>
            <artist-result :keywords="keywords"></artist-result>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">专辑</span>
            <album-result :keywords="keywords"></album-result>
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab">歌单</span>
            <playlist-result :keywords="keywords"></playlist-result>
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab">MV</span>
            <mv-result :keywords="keywords"></mv-result>
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
export default {
  name: "",
  props: [""],
  data() {
    return {
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

  methods: {
    search(data){
      this.keywords = data;
    }
  }
};
</script>
<style lang='scss' scoped>
.search-container {
  min-height: 800px;
}
</style>