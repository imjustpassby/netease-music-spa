<template>
  <div>
    <layout></layout>
  </div>
</template>

<script>
import Layout from '@/components/layout.vue'
import {getBanner} from '@/api/home.js'
var _this = this;
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
      Layout
    },

    computed: {},

    watch: {},

    beforeMount() {},

    mounted() {
      // getBanner();
    },

    methods: {}

  }

</script>
<style lang='scss' scoped>

</style>