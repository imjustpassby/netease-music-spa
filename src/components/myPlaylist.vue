<template>
  <div>
    <a-tooltip placement="left">
      <template slot="title">
        <span>播放列表</span>
      </template>
      <div class="switch-playlist">
        <svg class="icon" aria-hidden="true" style="font-size:36px" @click="showDrawer">
          <use xlink:href="#icon-play-list-line" />
        </svg>
      </div>
    </a-tooltip>
    <div class="player-operation">
      <span>
        <svg class="icon operation" aria-hidden="true" @click="lastSong">
          <use xlink:href="#icon-shangyishou" />
        </svg>
      </span>
      <span>
        <svg class="icon operation" aria-hidden="true" @click="nextSong">
          <use xlink:href="#icon-xiayishou" />
        </svg>
      </span>
    </div>
    <a-drawer
      :title="'播放列表 '+ playlist.length + '首'"
      placement="right"
      :closable="false"
      @close="onClose"
      width="25%"
      :visible="visible"
    >
      <a-list itemLayout="horizontal" :dataSource="playlist">
        <a-list-item
          slot="renderItem"
          slot-scope="item, index"
          :class="currentIndex==index? 'activeItem' : ''"
        >
          <a slot="actions" style="color:#333333;">
            <a-icon
              type="caret-right"
              style="font-size:16px"
              @click="playSong({song:item,idx:index})"
            />
          </a>
          <a slot="actions" style="color:#999999">
            <a-icon
              type="delete"
              style="font-size:16px"
              @click="deleteSong({song:item,idx:index})"
            />
          </a>
          <a-list-item-meta :description="item.artist">
            <p slot="title">{{item.name}}</p>
            <a-avatar slot="avatar" class="cover-img" :src="item.cover" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      visible: false
    };
  },

  components: {},

  computed: {
    ...mapGetters(["playlist", "currentIndex"])
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    ...mapMutations(["DELETE_SONG"]),
    ...mapActions(["SET_CURRENT_MUSIC_ACTION"]),
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    playSong(data) {
      this.SET_CURRENT_MUSIC_ACTION(data.song)
        .then(result => {
          Bus.$emit("play", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteSong(data) {
      this.DELETE_SONG(data.idx);
    },
    lastSong(){
      Bus.$emit("lastSong");
    },
    nextSong(){
      Bus.$emit("nextSong");
    }
  }
};
</script>
<style lang='scss' scoped>
.player-operation {
  position: fixed;
  left: 110px;
  bottom: 24px;
  .operation {
    font-size: 24px;
    margin-right: 6px;
    cursor: pointer;
  }
}
.switch-playlist {
  position: fixed;
  right: 8%;
  bottom: 110px;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
.cover-img {
  width: 46px;
  height: 46px;
}
.activeItem {
  background-color: rgba(233, 233, 233, 0.5);
}
</style>