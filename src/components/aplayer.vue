<template>
  <div id="aplayer"></div>
</template>

<script>
import { getLyric } from "@/api/song.js";
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    let options = {
      container: document.getElementById("aplayer"),
      autoplay: true,
      volume: 1,
      lrcType: 2,
      listFolded: true,
      listMaxHeight: "300px",
      theme: "#FFDB00"
    };
    const ap = new APlayer(options);
    Bus.$on("play", song => {
      /* 
        判断要播放的歌是否在列表里面
        若在，则直接播放该首歌，否则追加到列表并播放
      */
      for (let i = 0; i < ap.list.audios.length; i++) {
        if (ap.list.audios[i].id === song.id) {
          ap.list.switch(i);
          ap.play();
          return;
        }
      }
      ap.list.add(song);
      ap.list.switch(ap.list.audios.length - 1);
      ap.play();
    });
    Bus.$on("add", data => {
      if (data.type !== "program") {
        data.list.forEach(item => {
          getLyric(item.id)
            .then(res => {
              if (res.hasOwnProperty("lrc")) {
                item.lrc = res.lrc.lyric;
              }
              ap.list.add(item);
            })
            .catch();
        });
      } else {
        ap.list.add(data.list);
      }
    });
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
#aplayer {
  text-align: left;
}
</style>