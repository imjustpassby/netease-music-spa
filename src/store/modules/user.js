import {
  loginCellphone,
  loginStatus,
  logout,
  loginRefresh
} from '@/api/user'
import Cookie from "js-cookie"
const user = {
  state: {
    account: window.sessionStorage.getItem('account'),
    profile: window.sessionStorage.getItem('profile'),
    bindings: window.sessionStorage.getItem('bindings'),
    uid: window.sessionStorage.getItem('uid'),
    nickname: window.sessionStorage.getItem('nickname'),
    avatarUrl: window.sessionStorage.getItem('avatarUrl'),
    loginSuccess: window.sessionStorage.getItem('loginSuccess') ? window.sessionStorage.getItem('loginSuccess') : false,
    cookie: window.sessionStorage.getItem('cookie')
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
      window.sessionStorage.setItem('account', account);
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
      window.sessionStorage.setItem('profile', profile);
    },
    SET_BINDINGS(state, bindings) {
      state.bindings = bindings;
      window.sessionStorage.setItem('bindings', bindings);
    },
    SET_UID(state, uid) {
      state.uid = uid;
      window.sessionStorage.setItem('uid', uid);
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
      window.sessionStorage.setItem('nickname', nickname);
    },
    SET_AVATAR_URL(state, url) {
      state.avatarUrl = url;
      window.sessionStorage.setItem('avatarUrl', url);
    },
    SET_LOGIN_SUCCESS(state, isSuccess) {
      state.loginSuccess = isSuccess;
      window.sessionStorage.setItem('loginSuccess', isSuccess);
    },
    INIT_STATE(state) {
      window.sessionStorage.setItem('account', '');
      window.sessionStorage.setItem('profile', '');
      window.sessionStorage.setItem('bindings', '');
      window.sessionStorage.setItem('uid', '');
      window.sessionStorage.setItem('nickname', '');
      window.sessionStorage.setItem('avatarUrl', '');
      window.sessionStorage.setItem('loginSuccess', '');
      window.sessionStorage.setItem('cookie', {});
      state.account = {},
      state.profile = {},
      state.bindings = {},
      state.bindings = {},
      state.uid = null;
      state.nickname = "";
      state.avatarUrl = "";
      state.loginSuccess = false;
      state.cookie = {};
    },
    SET_COOKIE(state, cookie) {
      state.cookie = cookie;
      window.sessionStorage.setItem('cookie', cookie);
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
          commit('SET_COOKIE', Cookie.get());//保存登录后返回的cookie到vuex
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
    }
  }
}

export default user
