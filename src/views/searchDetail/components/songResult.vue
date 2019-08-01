<template>
  <div style="padding-bottom: 100px">
    <a-back-top style="bottom: 100px;left:10%" />
    <a-row>
      <a-col>
        <a-list itemLayout="horizontal" :dataSource="exactSearch" :locale="locale">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            style="padding-left: 6px;text-align:left;"
          >
            <a slot="actions">
              <a-icon
                type="caret-right"
                class="actions-item"
                @click="playSong({song:item,idx:index})"
              />
            </a>
            <a-list-item-meta :description="item.artist+'——'+item.albumName">
              <p slot="title">{{item.name}}</p>
              <a-avatar slot="avatar" class="cover-img" :src="item.cover" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { search } from "@/api/search";
import { mapActions } from "vuex";
import Bus from "@/utils/bus.js";
export default {
  name: "",
  data() {
    return {
      locale: { emptyText: "" },
      exactSearch: []
    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    Bus.$on("searchSong",async data =>{
      await  this.search(data);
    })
  },

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
    async search(data) {
      let res = await search({ keywords: data, type: 1 });
      this.exactSearch = res.result.songs.map(item => {
        let artist = [];
        for (const ar of item.artists) {
          artist.push(ar.name);
        }
        return {
          id: item.id,
          name: item.name,
          artist: artist.join("/"),
          cover:
            "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
          albumName: item.album.name,
          albumId: item.album.id,
          theme: [255, 255, 255]
        };
      });
    }
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