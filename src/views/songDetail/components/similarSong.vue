<template>
  <div style="padding-top: 36px">
    <a-row>
      <a-col>
        <p class="title">相似歌曲</p>
        <hr />
        <a-list itemLayout="horizontal" :dataSource="songs" :locale="locale">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            style="padding-left: 6px;text-align:left;"
          >
            <a-list-item-meta :description="item.artist+'——'+item.albumName">
              <p slot="title">{{item.name}}</p>
              <a-avatar
                slot="avatar"
                class="cover-img"
                :src="item.cover"
                @click="goSongDetail(item)"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col style="margin-top: 30px">
        <p class="title">包含这首歌的歌单</p>
        <hr />
        <a-list itemLayout="horizontal" :dataSource="playlist" :locale="locale">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            style="padding-left: 6px;text-align:left;"
          >
            <a-list-item-meta :description="'by - '+item.creator.nickname">
              <p slot="title">{{item.name}}</p>
              <a-avatar
                slot="avatar"
                class="cover-img"
                :src="item.cover"
                @click="goPlaylistDetail(item.id)"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getSimilarSong } from "@/api/song.js";
import { getSimilarPlaylist } from "@/api/playList.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      songs: [],
      playlist: [],
      locale: { emptyText: "" }
    };
  },

  components: {},

  computed: {},

  watch: {
    $route(to, from) {
      this.getSimilarSong(to.query.id);
      this.getSimilarPlaylist(to.query.id);
    }
  },

  beforeMount() {},

  async mounted() {
    await this.getSimilarSong(this.$route.query.id);
    await this.getSimilarPlaylist(this.$route.query.id);
  },

  methods: {
    async getSimilarSong(data) {
      let res = await getSimilarSong(data);
      this.songs = res.songs.map(item => {
        let artist = [];
        let artistId = item.artists[0].id;
        for (const ar of item.artists) {
          artist.push(ar.name);
        }
        return {
          id: item.id,
          name: item.name,
          artist: artist.join("/"),
          artistId: artistId,
          cover:
            "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
          albumName: item.album.name,
          albumId: item.album.id,
          theme: [255, 255, 255]
        };
      });
    },
    async getSimilarPlaylist(data) {
      let res = await getSimilarPlaylist(data);
      this.playlist = res.playlists.map(item => {
        return {
          id: item.id,
          creator:item.creator,
          cover: item.coverImgUrl,
          name: item.name
        };
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
    goPlaylistDetail(id) {
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.cover-img {
  width: 46px;
  height: 46px;
  cursor: pointer;
}
.title {
  text-align: left;
  font-size: 16px;
}
</style>