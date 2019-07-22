<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg class="icon" aria-hidden="true" style="font-size:16px;margin-right:16px;">
          <use xlink:href="#icon-circle" />
        </svg>主播电台
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col
          :span="3"
          v-for="(item,index) in personalizedDJProgram"
          :key="index"
          style="margin-bottom:16px"
        >
          <img v-lazy="item.picUrl" alt="img" width="100%" style="cursor: pointer;" />
          <p class="recommend-title">{{item.name}}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script>
import { getPersonalizedDJProgram } from "@/api/home.js";
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
    this.personalizedDJProgram = personalizedDJProgram.result;
    this.loading = false;
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>