<template>
  <div>
    <a-table :dataSource="hotSongs">
      <a-table-column title key="action" width="5%">
        <template slot-scope="text, record">
          <span>
            <svg class="icon play-icon" aria-hidden="true" @click="addMusic(record)">
              <use xlink:href="#icon-play1" />
            </svg>
          </span>
        </template>
      </a-table-column>
      <a-table-column title="歌曲标题" width="30%" key="name">
        <template slot-scope="text, record">
          <span @click="goSongDetail(record)" style="cursor:pointer">{{record.name}}</span>
        </template>
      </a-table-column>
      <a-table-column title="热度" width="20%" key="hot" align="center">
        <template slot-scope="text, record">
          <a-progress
            :percent="record.pop"
            size="small"
            status="active"
            strokeColor="red"
            :format="percent => percent"
          />
        </template>
      </a-table-column>
      <a-table-column title="歌手" align="center" data-index="artist" width="20%" key="artist" />
      <a-table-column title="专辑" key="albumName">
        <template slot-scope="text, record">
          <span @click="goAlbumDetail(record)" style="cursor:pointer">{{record.albumName}}</span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import Bus from "@/utils/bus.js";
import { mapActions } from "vuex";
export default {
  name: "",
  props: ["hotSongs"],
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
    async addMusic(song) {
      this.SET_CURRENT_MUSIC_ACTION(song)
        .then(result => {
          Bus.$emit("play", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goSongDetail(song) {
      this.$router.push({
        path: "/song-detail",
        query: {
          id: song.id
        }
      });
    },
    goAlbumDetail(song) {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: song.albumId
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.play-icon {
  margin-left: 40%;
  font-size: 24px;
  cursor: pointer;
}
</style>