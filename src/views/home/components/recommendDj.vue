<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
          <use xlink:href="#icon-circle" />
        </svg>电台节目
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col
          :span="3"
          v-for="(item,index) in personalizedDJProgram"
          :key="index"
          style="margin-bottom:16px"
        >
          <div class="img-box">
            <img v-lazy="item.cover" alt="img" @click.once="addMusic(item)" />
          </div>
          <p class="recommend-title">{{item.name}}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script>
import { getPersonalizedDJProgram } from "@/api/home.js";
import { getSongUrl } from "@/api/song.js";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      personalizedDJProgram: [],
      loading: true
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let personalizedDJProgram = await getPersonalizedDJProgram();
    this.personalizedDJProgram = personalizedDJProgram.result.map(item => {
      return {
        name: item.name,
        id: item.program.mainSong.id,
        artist: item.program.dj.nickname,
        cover: item.picUrl
      };
    });
    this.loading = false;
  },

  methods: {
    async getSong(id) {
      /* 获取音乐url */
      let res = await getSongUrl(id);
      let songList = res.data.map(item => {
        return { url: item.url, id: item.id };
      });
      let length = this.personalizedDJProgram.length;
      for (let j = 0; j < length; j++) {
        if (this.personalizedDJProgram[j].id === songList[0].id) {
          this.personalizedDJProgram[j].url = songList[0].url;
          return this.personalizedDJProgram[j];
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
</style>