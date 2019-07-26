<template>
  <div class="mv-comment">
    <h1>
      <svg class="icon" aria-hidden="true" style="font-size:24px; margin-right:6px;">
        <use xlink:href="#icon-home_comment_fill" />
      </svg>热门评论
    </h1>
    <a-comment v-for="(item,index) in hotComments" :key="index">
      <a slot="author">{{item.user.nickname}}</a>
      <a-avatar slot="avatar" :src="item.user.avatarUrl" alt="avatar" />
      <p slot="content">{{item.content}}</p>
      <a-comment v-for="(beReplied,idx) in item.beReplied" :key="idx">
        <a slot="author">{{beReplied.user.nickname}}</a>
        <a-avatar slot="avatar" :src="beReplied.user.avatarUrl" alt="avatar" />
        <p slot="content">{{beReplied.content}}</p>
      </a-comment>
    </a-comment>
  </div>
</template>

<script>
import { getCommentMv } from "@/api/mv.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      hotComments: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getCommentMv();
  },

  methods: {
    async getCommentMv() {
      let res = await getCommentMv(this.$route.query.id);
      this.hotComments = res.hotComments;
    }
  }
};
</script>
<style lang='scss' scoped>
.mv-comment {
  text-align: left;
  margin: 16px 0;
  padding-bottom: 100px;
  h1 {
    font-size: 24px;
    line-height: 2em;
    border-bottom: 1px solid #ccc;
  }
}
</style>