import {
  loginCellphone,
  loginStatus,
  userDetail,
  logout,
  loginRefresh
} from '@/api/login'

const user = {
  state: {
    account: window.localStorage.getItem('account'),
    profile: window.localStorage.getItem('profile'),
    bindings: window.localStorage.getItem('bindings'),
    uid: window.localStorage.getItem('uid'),
    nickname: window.localStorage.getItem('nickname'),
    avatarUrl: window.localStorage.getItem('avatarUrl'),
    loginSuccess: window.localStorage.getItem('loginSuccess') ? window.localStorage.getItem('loginSuccess') : false
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
      window.localStorage.setItem('account', account);
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
      window.localStorage.setItem('profile', profile);
    },
    SET_BINDINGS(state, bindings) {
      state.bindings = bindings;
      window.localStorage.setItem('bindings', bindings);
    },
    SET_UID(state, uid) {
      state.uid = uid;
      window.localStorage.setItem('uid', uid);
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
      window.localStorage.setItem('nickname', nickname);
    },
    SET_AVATAR_URL(state, url) {
      state.avatarUrl = url;
      window.localStorage.setItem('avatarUrl', url);
    },
    SET_LOGIN_SUCCESS(state, isSuccess) {
      state.loginSuccess = isSuccess;
      window.localStorage.setItem('loginSuccess', isSuccess);
    },
    INIT_STATE(state) {
      window.localStorage.setItem('account', '');
      window.localStorage.setItem('profile', '');
      window.localStorage.setItem('bindings', '');
      window.localStorage.setItem('uid', '');
      window.localStorage.setItem('nickname', '');
      window.localStorage.setItem('avatarUrl', '');
      window.localStorage.setItem('loginSuccess', '');
      state.account = {},
      state.profile = {},
      state.bindings = {},
      state.bindings = {},
      state.uid = null;
      state.nickname = "";
      state.avatarUrl = "";
      state.loginSuccess = false;
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
          commit('SET_LOGIN_SUCCESS', true);
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
