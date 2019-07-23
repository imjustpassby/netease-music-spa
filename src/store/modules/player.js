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
    }
  }
}

export default player