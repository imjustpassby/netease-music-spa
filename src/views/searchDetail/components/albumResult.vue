<template>
  <div>
    <a-row type="flex" justify="start">
      <a-col :span="4" :offset="1" v-for="(ab,idx) in albumResult" :key="idx">
        <div class="img-box">
          <img v-lazy="ab.picUrl" width="100%" alt="img" @click="goAlbumDetail(ab.id)" />
        </div>
        <p class="album-list-title">{{ab.name}}</p>
        <p class="album-list-title">{{ab.artist.name}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["albumResult"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    goAlbumDetail(id){
      this.$router.push({
        path: '/album-detail',
        query: {
          id: id
        }
      })
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