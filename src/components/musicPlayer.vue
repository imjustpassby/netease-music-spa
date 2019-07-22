<template>
  <div>
    <aplayer
      :music="currentMusic"
      repeat="repeat-all"
      listMaxHeight="200px"
      :list="musicList"
      :listFolded="true"
      theme="pic"
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
      /* 获取歌的url 可以传多个id 用 ',' 隔开*/
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
      /* 设置播放列表 */
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
          pic: item.song.album.blurPicUrl,
          theme: 'pic'
        };
      });
      this.musicList = list;
      this.currentMusic = this.musicList[0];
    },
    playing() {
      /* 点击列表的歌会切歌，获取musicPlayer当前播放的歌的信息 */
      this.currentMusic = this.$refs.player.currentMusic;
      /* 找到对应的歌的index，更新currentIndex */
      let length = this.musicList.length;
      for (let i = 0; i < length; i++) {
        if(this.currentMusic.id === this.musicList[i].id){
          this.currentIndex = i;
          return;
        }
      }
    },
    next() {
      /* 确保currentIndex在list长度之内 */
      if (this.currentIndex === this.musicList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      /* 获取下一首歌的信息 */
      this.currentMusic = this.musicList[this.currentIndex];
      /* 
      踩坑计 
      报错AbortError: The play() request was interrupted by a new load request
      网上说load资源需要时间，确保play()在load()后发生
      */
     /* 调用musicPlayer组件方法，即下一首 */
      setTimeout(()=>{
        this.$refs.player.onSelectSong(this.currentMusic)
      },1000) 
    }
  }
};
</script>
<style lang='scss' scoped>
</style>