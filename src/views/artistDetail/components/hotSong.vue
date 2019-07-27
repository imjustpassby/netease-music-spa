<template>
  <div>
    <a-table :dataSource="hotSongs">
      <a-table-column title key="action" width="5%">
        <template slot-scope="text, record">
          <span>
            <svg class="icon play-icon" aria-hidden="true" @click="addMusic(record)">
              <use xlink:href="#icon-play1" />
            </svg>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="歌曲标题" data-index="title" width="50%" key="title" />
      <a-table-column title="歌手" data-index="artist" width="25%" key="artist" />
      <a-table-column title="专辑" data-index="albumName" key="albumName" />
    </a-table>
  </div>
</template>

<script>
import { getSongUrl,getLyric } from "@/api/song.js";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: ["hotSongs"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getSong(id) {
      /* 获取音乐url */
      let res = await getSongUrl(id);
      let lyric = await getLyric(id);
      let songList = res.data.map(item => {
        return { url: item.url, id: item.id };
      });
      let length = this.hotSongs.length;
      for (let j = 0; j < length; j++) {
        if (this.hotSongs[j].id === songList[0].id) {
          this.hotSongs[j].url = songList[0].url;
          if(lyric.hasOwnProperty('lrc')){
            this.hotSongs[j].lrc = lyric.lrc.lyric;
          }
          return this.hotSongs[j];
        }
      }
    },
    async addMusic(song) {
      let res = await this.getSong(song.id);
      Bus.$emit("play", res);
    }
  }
};
</script>
<style lang='scss' scoped>
.play-icon {
  margin-left: 40%;
  font-size: 24px;
  cursor: pointer;
}
</style>