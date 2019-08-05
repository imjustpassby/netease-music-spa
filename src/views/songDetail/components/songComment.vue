<template>
  <div class="song-comment">
    <h1>
      <svg class="icon" aria-hidden="true" style="font-size:24px; margin:0 6px;">
        <use xlink:href="#icon-home_comment_fill" />
      </svg>&nbsp;热门评论
    </h1>
    <a-comment v-for="(item,index) in hotComments" :key="index" class="song-comment-list">
      <p slot="author" style="font-size:14px;">{{item.user.nickname}}</p>
      <a-avatar slot="avatar" :src="item.user.avatarUrl" alt="avatar" />
      <p slot="content">{{item.content}}</p>
      <a-comment v-for="(beReplied,idx) in item.beReplied" :key="idx">
        <p slot="author" style="font-size:14px;">{{beReplied.user.nickname}}</p>
        <a-avatar slot="avatar" :src="beReplied.user.avatarUrl" alt="avatar" />
        <p slot="content">{{beReplied.content}}</p>
      </a-comment>
    </a-comment>
  </div>
</template>

<script>
import { getCommentMusic } from "@/api/song.js";
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

  watch: {
    $route(to, from) {
      this.getComments(to.query.id);
    }
  },

  beforeMount() {},

  async mounted() {
    await this.getComments(this.$route.query.id);
  },

  methods: {
    async getComments(data) {
      let res = await getCommentMusic(data);
      this.comments = res.comments;
      this.hotComments = [...res.hotComments, ...res.comments];
    }
  }
};
</script>
<style lang='scss' scoped>
.song-comment {
  text-align: left;
  margin: 16px 0;
  padding-bottom: 100px;
  &-list {
    border-bottom: 1px dashed #ccc;
  }
  h1 {
    font-size: 24px;
    line-height: 2em;
    border-bottom: 1px solid #ccc;
  }
}
</style>