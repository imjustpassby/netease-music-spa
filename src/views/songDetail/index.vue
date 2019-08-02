<template>
  <div>
    <a-back-top style="bottom: 100px;left:10%" />
    <a-row>
      <a-col :span="14" :offset="5">
        <song-info></song-info>
      </a-col>
      <br>
      <a-col :span="14" :offset="5">
        <song-comment></song-comment>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SongInfo from "./components/songInfo";
import SongComment from "./components/songComment";
export default {
  name: "",
  props: [""],
  data() {
    return {
      
    };
  },

  components: {
    SongInfo,
    SongComment
  },

  computed: {},

  watch: {
    

  },

  beforeMount() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>