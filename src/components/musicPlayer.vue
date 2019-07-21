<template>
  <div>
    <aplayer
      :music="currentMusic"
      repeat="repeat-all"
      listMaxHeight="200px"
      :list="musicList"
      :listFolded="true"
      @playing="playing"
      @ended="next"
      ref="player"
    ></aplayer>
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
import { getPersonalizedNewSong } from "@/api/home.js";
import { getSongUrl } from "@/api/song.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      currentMusic: {},
      musicList: [],
      newSongs: [],
      currentIndex: 0
    };
  },

  components: {
    Aplayer
  },

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let newSongs = await getPersonalizedNewSong();
    this.newSongs = newSongs.result;
    await this.getUrl();
    this.setMusicList();
  },

  methods: {
    async getUrl() {
      let songIds = [];
      for (const item of this.newSongs) {
        songIds.push(item.id);
      }
      let ids = songIds.join(",");
      let songData = await getSongUrl(ids);
      /* api有点坑，并不是按传过去musicID的顺序返回 */
      let length = songIds.length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (songData.data[i].id == this.newSongs[j].id) {
            this.newSongs[j].songUrl = songData.data[i].url;
          }
        }
      }
    },
    setMusicList() {
      let list = this.newSongs.map(item => {
        let artist = [];
        for (const ar of item.song.artists) {
          artist.push(ar.name);
        }
        return {
          id: item.id,
          src: item.songUrl,
          title: item.name,
          artist: artist.join("/"),
          pic: item.song.album.blurPicUrl
        };
      });
      this.musicList = list;
      this.currentMusic = this.musicList[0];
    },
    playing() {
      this.currentMusic = this.$refs.player.currentMusic;
      let length = this.musicList.length;
      for (let i = 0; i < length; i++) {
        if(this.currentMusic.id === this.musicList[i].id){
          this.currentIndex = i;
          return;
        }
      }
    },
    next() {
      if (this.currentIndex === this.musicList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      // this.currentMusic = this.$refs.player.currentMusic;
      this.currentMusic = this.musicList[this.currentIndex];
      setTimeout(()=>{
        this.$refs.player.onSelectSong(this.currentMusic)
      },1000) 
    }
  }
};
</script>
<style lang='scss' scoped>
</style>