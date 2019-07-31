<template>
  <div>
    <a-row type="flex" justify="start">
      <a-col :span="4" :offset="1" v-for="(pl,idx) in playlistResult" :key="idx">
        <div class="img-box">
          <img v-lazy="pl.coverImgUrl" width="100%" alt="img" @click="goPlaylistDetail(pl.id)" />
        </div>
        <p class="artist-list-title">{{pl.name}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["playlistResult"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    goPlaylistDetail(id) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id: id
        }
      });
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
.artist-list-title {
  font-size: 14px;
  cursor: pointer;
  line-height: 1.5em;
}
</style>