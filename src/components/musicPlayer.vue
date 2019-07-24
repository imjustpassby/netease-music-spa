<template>
  <div>
    <aplayer
      :music="currentMusic"
      repeat="repeat-all"
      listMaxHeight="500px"
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
import {mapGetters,mapMutations} from "vuex"
import Bus from '@/utils/bus.js'
export default {
  name: "",
  props: [""],
  data() {
    return {
      /* currentMusic: {},
      musicList: [],
      newSongs: [],
      currentIndex: 0 */
    };
  },

  components: {
    Aplayer
  },

  computed: {
    ...mapGetters({
      currentMusic: "currentMusic",
      musicList: "musicList",
      currentIndex: "currentIndex"
    })
  },

  watch: {},

  beforeMount() {},

  mounted() {
    Bus.$on('play',song=>{
      this.$refs.player.onSelectSong(song)
    })
  },

  methods: {
    ...mapMutations(["SET_CURRENT_INDEX","SET_CURRENT_MUSIC"]),
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
    playing() {
      /* 点击列表的歌会切歌，获取musicPlayer当前播放的歌的信息 */
      this.SET_CURRENT_MUSIC(this.$refs.player.currentMusic)
      /* 找到对应的歌的index，更新currentIndex */
      let length = this.musicList.length;
      for (let i = 0; i < length; i++) {
        if(this.currentMusic.id === this.musicList[i].id){
          // this.currentIndex = i;
          this.SET_CURRENT_INDEX(i);
          return;
        }
      }
    },
    next() {
      /* 确保currentIndex在list长度之内 */
      if (this.currentIndex === this.musicList.length - 1) {
        this.SET_CURRENT_INDEX(0);
      } else {
        this.SET_CURRENT_INDEX(this.currentIndex + 1)
      }
      /* 获取下一首歌的信息 */
      this.SET_CURRENT_MUSIC(this.musicList[this.currentIndex])
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