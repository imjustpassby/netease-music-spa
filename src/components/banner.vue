<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <div class="banner">
          <a-carousel effect="fade" autoplay>
            <div v-for="(item,index) in banner" :key="index">
              <img v-lazy="item.imageUrl" alt="banner" />
            </div>
          </a-carousel>
        </div>
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
      recommendSongs: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  async mounted() {
    let banner = await getBanner();
    this.banner = banner.banners;
  },

  methods: {}
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