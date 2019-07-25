import { getLyric } from "@/api/song.js"
const player = {
  state: {
    currentMusic: {},
    musicList: [],
    currentIndex: 0
  },
  mutations: {
    SET_CURRENT_MUSIC(state,song){
      state.currentMusic = song;
    },
    SET_MUSIC_LIST(state,list) {
      state.musicList = [...state.musicList,...list];
    },
    SET_CURRENT_INDEX(state, idx) {
      state.currentIndex = idx;
    },
    ADD_MUSIC(state, song) {
      state.musicList.push(song);
    }
  },
  actions: {
    SET_CURRENT_MUSIC_ACTION({commit },song) {
      /* 获取歌词 */
      return new Promise((resolve, reject) => {
        getLyric(song.id).then((res) => {
          let songInfo = song;
          songInfo.lrc = res.lrc.lyric;
          commit('SET_CURRENT_MUSIC', songInfo);
          resolve()
        }).catch((err) => {
          reject();
        });
      })
    }
  }
}

export default player