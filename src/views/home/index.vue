<template>
  <div>
    <layout></layout>
    <banner></banner>
    <recommend></recommend>
  </div>
</template>

<script>
import Layout from "@/components/layout.vue";
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
    Layout,
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