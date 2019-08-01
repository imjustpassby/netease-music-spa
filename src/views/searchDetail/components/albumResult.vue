<template>
  <div style="padding-bottom:100px;">
    <a-back-top style="bottom: 100px;left:10%" />
    <a-row type="flex" justify="start" style="margin:16px 0">
      <a-col
        :span="4"
        :offset="1"
        v-for="(ar,idx) in exactSearch"
        :key="idx"
        style="margin-bottom:16px"
      >
        <div class="img-box">
          <img v-lazy="ar.picUrl" width="100%" alt="img" @click="goAlbumDetail(ar.id)" />
        </div>
        <p class="artist-list-title">{{ar.name}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { search } from "@/api/search";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: ["albumResult", "keywords"],
  data() {
    return {
      exactSearch: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    Bus.$on("searchAlbum",async data =>{
      await this.search(data);
    })
  },

  methods: {
    goAlbumDetail(id) {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: id
        }
      });
    },
    async search(data) {
      let res = await search({ keywords: data, type: 10 });
      this.exactSearch = res.result.albums;
    }
  }
};
</script>
<style lang='scss' scoped>
.img-box {
  width: 100%;
  position: relative;
  height: 0;
  padding-bottom: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.album-list-title {
  font-size: 14px;
  cursor: pointer;
  line-height: 1.5em;
}
</style>