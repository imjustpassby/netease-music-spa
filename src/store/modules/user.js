import {
  loginCellphone,
  loginStatus,
  userDetail,
  logout,
  loginRefresh
} from '@/api/login'

const user = {
  state: {
    account: {},
    profile: {},
    bindings: {},
    uid: null,
    nickname: '',
    avatarUrl: ''
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
    SET_BINDINGS(state, bindings) {
      state.bindings = bindings;
    },
    SET_UID(state, uid) {
      state.uid = uid;
    },
    SET_NICKNAME(state, nickName) {
      state.nickname = nickName;
    },
    SET_AVATAR_URL(state, url) {
      state.avatarUrl = url;
    },
    INIT_STATE(state) {
      state.account = {},
      state.profile = {},
      state.bindings = {},
      uid = null;
      nickname = "";
      avatarUrl = "";
    }
  },
  actions: {
    LOGIN({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        loginCellphone({
          phone: userInfo.phone,
          password: userInfo.password
        }).then((res) => {
          console.log("ACTIONS LOGIN")
          commit('SET_ACCOUNT', res.account);
          commit('SET_PROFILE', res.profile);
          commit('SET_BINDINGS', res.bindings);
          resolve(res)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    LOGOUT({
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          console.log("ACTIONS LOGOUT");
          commit('INIT_STATE')
          resolve()
        }).catch(err => {
          reject(err)
        });
      })
    },
    LOGIN_STATUS({
      commit
    }) {
      return new Promise((resolve, reject) => {
        loginStatus().then(res => {
          console.log("ACTIONS LOGIN_STATUS")
          commit("SET_UID", res.profile.userId);
          commit("SET_NICKNAME", res.profile.nickname);
          commit("SET_AVATAR_URL", res.profile.avatarUrl);
          resolve(res)
        }).catch(err => {
          reject(err)
        });
      })
    },
    USER_DETAIL({
      commit
    }, uid) {
      return new Promise((resolve, reject) => {
        userDetail({
          uid
        }).then(res => {
          console.log("ACTIONS USER_DETAIL")
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
