<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <a-row>
          <a-col :span="4">
            <choose-category></choose-category>
          </a-col>
          <a-col :span="20">
            <recommend-artist></recommend-artist>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChooseCategory from "./components/chooseCategory"
import RecommendArtist from "./components/recommendArtist"
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
      ChooseCategory,
      RecommendArtist
    },

    computed: {},

    watch: {},

    beforeMount() {},

    mounted() {},

    methods: {}

  }

</script>
<style lang='scss' scoped>

</style>