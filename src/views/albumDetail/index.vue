<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="album-detail">
            <a-row>
              <a-col :span="5">
                <img v-lazy="albumInfo.picUrl" width="100%" alt="专辑" />
              </a-col>
              <a-col :span="18" :offset="1">
                <h1>专辑：{{albumInfo.name}}</h1>
                <div>
                  <p>
                    歌手：
                    <span v-for="(art,idx) in albumInfo.artists" :key="idx">
                      {{art.name}}
                      <span v-if="idx!== albumInfo.artists.length">/</span>
                    </span>
                  </p>
                  <p>发行时间：{{albumInfo.publishTime}}</p>
                  <p>发行公司：{{albumInfo.company}}</p>
                  <p>介绍：{{albumInfo.description}}</p>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="album-tracks"></div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAlbum } from "@/api/album.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: true,
      albumInfo: {
        picUrl: "",
        company: "",
        description: "",
        name: "",
        id: "",
        type: "",
        publishTime: "",
        artists: [],
        songs: []
      }
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    await this.getAlbumInfo();
    this.loading = false;
  },

  methods: {
    async getAlbumInfo() {
      //获取专辑信息
      let res = await getAlbum(this.$route.query.id);
      let {
        picUrl,
        company,
        description,
        name,
        id,
        type,
        publishTime,
        artists
      } = res.album;
      this.albumInfo.picUrl = picUrl;
      this.albumInfo.company = company;
      this.albumInfo.description = description;
      this.albumInfo.name = name;
      this.albumInfo.id = id;
      this.albumInfo.type = type;
      this.albumInfo.publishTime = this.$moment(publishTime).format(
        "YYYY-M-DD"
      );
      this.albumInfo.artists = artists;
      let songs = res.songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          artist: item.ar[0].name
        };
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.album-detail{
  text-align: left;
  margin-top: 16px;
  padding-bottom: 80px;
  h1{
    font-size: 24px;
    margin: 16px 0;
  }
}
</style>