<template>
<div>
  <a-table :dataSource="hotSongs">
    <a-table-column title key="action" width="10%">
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
        <a-popover placement="top">
          <template slot="content">
            <span>{{record.name}}</span>
          </template>
          <span @click="goSongDetail(record)" style="cursor:pointer">{{record.name}}</span>
        </a-popover>
      </template>
    </a-table-column>
    <a-table-column title="热度" width="20%" key="hot" align="center">
      <template slot-scope="text, record">
        <a-progress :percent="record.pop" size="small" status="active" strokeColor="red" :format="percent => percent" />
      </template>
    </a-table-column>

    <a-table-column title="歌手" align="center" width="20%" key="artist">
      <template slot-scope="text, record">
        <a-popover placement="top">
          <template slot="content">
            <span style="cursor:pointer" v-for="(ar,idx) in record.artists" :key="idx" @click="goArtistDetail(record.artistId[idx])">
              {{ar}}
              <span v-show="idx !== record.artists.length -1">/</span>
            </span>
          </template>
          <span>{{record.artist}}</span>
        </a-popover>
      </template>
    </a-table-column>

    <a-table-column title="专辑" key="album">
      <template slot-scope="text, record">
        <a-popover placement="top">
          <template slot="content">
            <span>{{record.albumName}}</span>
          </template>
          <span @click="goAlbumDetail(record)" style="cursor:pointer">{{record.albumName}}</span>
        </a-popover>
      </template>
    </a-table-column>

  </a-table>
</div>
</template>

<script>
import Bus from "@/utils/bus.js";
import {
  mapActions
} from "vuex";
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
    goSongDetail(data) {
      this.$router.push({
        path: "/song-detail",
        query: {
          id: data.id
        }
      });
    },
    goAlbumDetail(data) {
      this.$router.push({
        path: "/album-detail",
        query: {
          id: data.albumId
        }
      });
    },
    goArtistDetail(data) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          id: data
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.play-icon {
  margin-left: 40%;
  font-size: 24px;
  cursor: pointer;
}
</style>
