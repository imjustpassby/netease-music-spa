<template>
  <div>
    <banner></banner>
    <recommend></recommend>
  </div>
</template>

<script>
import Banner from "@/components/banner.vue";
import Recommend from "./components/recommend.vue"
var _this = this;
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {
    Banner,
    Recommend
  },

  computed: {},

  watch: {},

  methods: {}
};
</script>
<style lang='scss' scoped>

</style>