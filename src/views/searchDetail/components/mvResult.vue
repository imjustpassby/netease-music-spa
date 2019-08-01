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
          <img v-lazy="ar.cover" width="100%" alt="img" @click="goArtistDetail(ar.id)" />
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
  props: [],
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
    Bus.$on("searchMv", async data => {
      let res = await search({ keywords: data, type: 1004 });
      this.exactSearch = res.result.mvs;
    });
  },

  methods: {
    goMvDetail(id) {
      this.$router.push({
        path: "/mv-detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
img {
  cursor: pointer;
}
</style>