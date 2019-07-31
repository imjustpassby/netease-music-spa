<template>
  <div>
    <a-row type="flex" justify="start">
      <a-col :span="6" :offset="1" v-for="(mv,idx) in mvResult" :key="idx">
        <div class="img-box">
          <img v-lazy="mv.cover" width="100%" alt="img" @click="goMvDetail(mv.id)" />
        </div>
        <p class="artist-list-title">{{mv.name}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["mvResult"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

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
.img-box {
  img {
    cursor: pointer;
  }
}
</style>