<template>
  <div>
    <a-row class="play-list">
      <a-col :span="14" :offset="5">
        <a-dropdown v-if="!loading" class="categories">
          <a class="ant-dropdown-link" href="#">
            全部分类
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-sub-menu v-for="(cate,index) in categories" :key="index" :title="cate.name">
              <a-menu-item
                v-for="(sub,idx) in cate.list"
                :key="idx"
                @click="getList(sub.name)"
              >{{sub.name}}</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-dropdown>

        <a-skeleton active :loading="loading">
          <a-row type="flex" justify="space-around">
            <a-col :span="5" class="play-list-item" v-for="(item,index) in playlists" :key="index">
              <img v-lazy="item.coverImgUrl" width="100%" alt="img" />
              <p class="play-list-title">{{item.name}}</p>
            </a-col>
          </a-row>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getPlayList, getPlayListCatlist } from "@/api/playList.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      playlists: [],
      categories: [
        {
          name: "语种",
          list: []
        },
        {
          name: "风格",
          list: []
        },
        {
          name: "场景",
          list: []
        },
        {
          name: "情感",
          list: []
        },
        {
          name: "主题",
          list: []
        }
      ],
      loading: true
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getList();
    let categories = await getPlayListCatlist();
    for (const item of categories.sub) {
      this.categories[item.category].list.push(item);
    }
    this.loading = false;
  },

  methods: {
    async getList(cat) {
      let playlists = await getPlayList(cat);
      this.playlists = playlists.playlists.map(item => {
        return {
          coverImgUrl: item.coverImgUrl,
          name: item.name,
          id: item.id
        };
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.categories {
  margin-left: -88%;
  font-size: 18px;
  color: #333333 !important;
}
.play-list {
  font-size: 16px;
  margin-top: 16px;
  padding-bottom: 80px;
  .play-list-item {
    margin-top: 16px;
    img {
      cursor: pointer;
    }
  }
  .play-list-title {
    font-size: 14px;
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>