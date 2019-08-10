<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <a-skeleton active :loading="loading">
          <div class="banner">
            <a-carousel effect="fade" autoplay>
              <div v-for="(item,index) in banner" :key="index" @click="bannerClick(item)">
                <img :src="item.imageUrl" width="100%" alt="banner" />
              </div>
            </a-carousel>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getBanner } from "@/api/home.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      banner: [],
      loading: true
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let banner = await getBanner();
    this.banner = banner.banners;
    this.loading = false;
  },

  methods: {
    bannerClick(banner){
      switch (banner.targetType) {
        case 1:
          this.goSongDetail(banner);
          break;
        case 10:
          this.goAlbumDetail(banner);
          break;
        case 100:
          this.goArtistDetail(banner);
          break;
        case 1000:
          this.goPlaylistDetail(banner);
          break;
        case 1004:
          this.goMvDetail(banner);
          break;
        case 3000:
          window.open(banner.url);
          break;
        default:
          break;
      } 
    },
    goSongDetail(song) {
      this.$router.push({
        path: "/song-detail",
        query: {
          id: song.targetId
        }
      });
    },
    goAlbumDetail(album) {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: album.targetId
        }
      });
    },
    goMvDetail(mv) {
      this.$router.push({
        path: "/mv-detail",
        query: {
          id: mv.targetId
        }
      });
    },
    goArtistDetail(ar) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          id: ar.targetId
        }
      });
    },
    goPlaylistDetail(pl) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id: pl.targetId
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 400px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>