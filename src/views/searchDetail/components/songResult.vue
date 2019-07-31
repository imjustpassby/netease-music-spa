<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="songResult">
      <a-list-item
        slot="renderItem"
        slot-scope="item, index"
        style="padding-left: 6px;text-align:left;"
      >
        <a slot="actions">
          <a-icon type="caret-right" class="actions-item" @click="playSong({song:item,idx:index})" />
        </a>
        <a-list-item-meta :description="item.artist">
          <p slot="title">{{item.name}}</p>
          <a-avatar slot="avatar" class="cover-img" :src="item.cover" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: ["songResult"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
    playSong(data) {
      this.SET_CURRENT_MUSIC_ACTION(data.song)
        .then(result => {
          Bus.$emit("play", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>
<style lang='scss' scoped>
.cover-img {
  width: 46px;
  height: 46px;
}
.actions-item {
  font-size: 16px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    transition: all 0.1s ease-in-out;
    transform: scale(1.5);
  }
}
</style>