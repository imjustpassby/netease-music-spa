<template>
  <a-skeleton active :loading="loading">
    <div class="recommend-item">
      <div>
        <svg class="icon" aria-hidden="true" style="font-size:16px; margin-right:16px;">
          <use xlink:href="#icon-circle" />
        </svg>推荐歌单
        <button class="more">更多&gt;</button>
      </div>
      <a-row type="flex" justify="space-around" style="padding: 14px 0 0 0">
        <a-col
          :span="4"
          v-for="(item,index) in personalized"
          :key="index"
          style="margin:0 2px 16px 0"
        >
          <div class="img-box">
            <img v-lazy="item.picUrl" alt="img" />
          </div>
          <p class="recommend-title">{{item.name}}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script>
import { getPersonalized } from "@/api/home.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      personalized: [],
      loading: true
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let personalized = await getPersonalized();
    this.personalized = personalized.result;
    this.personalized.splice(10);
    this.loading = false;
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>