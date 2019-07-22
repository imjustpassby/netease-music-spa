<template>
  <a-skeleton active :loading="loading">
    <div class="dj-list">
      <div class="dj-list-top-title">
        <svg class="icon" aria-hidden="true" style="font-size:16px; margin-right:16px;">
          <use xlink:href="#icon-circle" />
        </svg>今日优选
      </div>
      <a-row type="flex" justify="space-around">
        <a-col
          :span="4"
          style="margin:0 2px 16px 0"
          class="dj-list-item"
          v-for="(item,index) in todayDj"
          :key="index"
        >
          <img v-lazy="item.picUrl" width="100%" alt="img" />
          <p class="dj-list-title">{{item.name}}</p>
        </a-col>
      </a-row>
    </div>
  </a-skeleton>
</template>

<script>
import { getTodayDj } from "@/api/dj.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: true,
      todayDj: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getTodayDj();
    this.loading = false;
  },

  methods: {
    async getTodayDj() {
      let todayDj = await getTodayDj();
      this.todayDj = todayDj.data.map(item => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl
        };
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.dj-list {
  font-size: 16px;
  margin-top: 16px;
  height: 100%;
  padding-bottom: 80px;
  .dj-list-top-title {
    text-align: left;
    width: 100%;
    font-size: 24px;
    line-height: 1.5em;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 16px;
  }
  .dj-list-item {
    margin-top: 16px;
    img {
      cursor: pointer;
    }
  }
  .dj-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>