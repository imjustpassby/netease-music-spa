<template>
  <div>
    <a-row type="flex" justify="start">
      <a-col :span="4" :offset="1" v-for="(ar,idx) in artistResult" :key="idx">
        <div class="img-box">
          <img v-lazy="ar.img1v1Url" width="100%" alt="img" @click="goArtistDetail(ar.id)" />
        </div>
        <p class="artist-list-title">{{ar.name}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["artistResult"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    goArtistDetail(id) {
      this.$router.push({
        path: "/artist-detail",
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