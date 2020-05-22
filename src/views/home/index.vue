<template>
  <div>
    <a-back-top style="bottom: 100px;left:10%" />
    <banner></banner>
    <recommend></recommend>
    <page-footer></page-footer>
  </div>
</template>

<script>
import Banner from "@/components/banner.vue";
import Recommend from "./components/recommend.vue";
import PageFooter from "@/components/pageFooter.vue";
export default {
  components: {
    Banner,
    Recommend,
    PageFooter
  }
};
</script>
