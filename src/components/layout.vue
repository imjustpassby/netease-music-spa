<template>
  <div>
    <div class="g-topbar">
      <div class="m-top">
        <div class="logo">
          <h1>
            <router-link to="/">
              <svg class="icon icon-netease" aria-hidden="true">
                <use xlink:href="#icon-netease-music" />
              </svg>网易云音乐
            </router-link>
          </h1>
        </div>
        <div class="m-nav">
          <ul>
            <li
              v-for="(item,index) in topLink"
              :key="index"
              :class="checkedTopLink==index ?'isTopChecked' : ''"
              @click="clickTopLink(index)"
            >
              <router-link :to="item.link">
                <span>{{item.span}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="m-nav-login">
          <button v-if="!loginSuccess" class="underline-btn" @click="showLoginForm">登录</button>
          <div v-else>
            <button class="underline-btn" @click="logout">登出</button>
            <button class="underline-btn">{{nickname}}</button>
            <img class="avatar" v-lazy="avatarUrl" alt="avatar" />
          </div>
        </div>
      </div>
      <div class="m-subnav">
        <div class="m-subnav-list">
          <ul>
            <li
              v-for="(item,index) in subLink"
              :key="index"
              :class="checkedSubLink==index ?'isSubChecked' : ''"
              @click="clickSubLink(index)"
            >
              <router-link :to="item.link">
                <em>{{item.span}}</em>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <login-form v-if="loginShow" @confirmLogin="confirmLogin"></login-form>
      <music-player class="music-player"></music-player>
    </div>
    <router-view />
  </div>
</template>

<script>
import LoginForm from "./login.vue";
import MusicPlayer from "./musicPlayer.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {
      topLink: [
        {
          span: "发现音乐",
          link: "#"
        },
        {
          span: "我的音乐",
          link: "#"
        },
        {
          span: "朋友",
          link: "#"
        },
        {
          span: "商城",
          link: "#"
        },
        {
          span: "音乐人",
          link: "#"
        }
      ],
      checkedTopLink: window.sessionStorage.getItem(
        "checkedSubLink",
        this.checkedTopLink
      )
        ? window.sessionStorage.getItem("checkedSubLink", this.checkedTopLink)
        : 0,
      subLink: [
        {
          span: "推荐",
          link: "/"
        },
        {
          span: "排行榜",
          link: "/ranking-list"
        },
        {
          span: "歌单",
          link: "/playlist"
        },
        {
          span: "主播电台",
          link: "/dj-radios"
        },
        {
          span: "歌手",
          link: "#"
        },
        {
          span: "新碟上架",
          link: "#"
        }
      ],
      checkedSubLink: window.sessionStorage.getItem(
        "checkedSubLink",
        this.checkedSubLink
      )
        ? window.sessionStorage.getItem("checkedSubLink", this.checkedSubLink)
        : 0,
      loginShow: false
    };
  },

  components: {
    LoginForm,
    MusicPlayer
  },

  computed: {
    ...mapGetters({
      uid: "uid",
      nickname: "nickname",
      avatarUrl: "avatarUrl",
      loginSuccess: "loginSuccess"
    })
  },

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    ...mapActions(["LOGOUT"]),
    clickTopLink(idx) {
      this.checkedTopLink = idx;
      window.sessionStorage.setItem("checkedTopLink", this.checkedTopLink);
    },
    clickSubLink(idx) {
      this.checkedSubLink = idx;
      window.sessionStorage.setItem("checkedSubLink", this.checkedSubLink);
    },
    showLoginForm() {
      this.loginShow = true;
    },
    confirmLogin() {
      this.loginShow = false;
    },
    async logout() {
      await this.LOGOUT()
        .then(result => {
          this.$message.success("已退出登录");
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang='scss' scoped>
.g-topbar {
  position: relative;
  z-index: 99;
  width: 100%;
  background-color: #242424;
  color: 333;
}
.m-top {
  position: relative;
  z-index: 1000;
  height: 70px;
  min-width: 1000px;
  box-sizing: border-box;
  color: #ccc;
  background: #242424;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  .logo {
    min-width: 10%;
    .icon-netease {
      margin: 0 4px;
    }
    a {
      font-weight: 100;
      font-size: 24px;
      line-height: 70px;
      color: #fff;
      text-decoration: none;
      padding: 0 19px;
    }
  }
  .m-nav li,
  li span,
  a,
  a em {
    display: inline-block;
    color: #ccc;
    height: 70px;
    font-size: 14px;
    line-height: 70px;
  }
  .m-nav span {
    padding: 0 19px;
  }
  .m-nav-login {
    width: 30%;
    position: relative;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 20px 2px;
      float: right;
    }
    .underline-btn {
      float: right;
      margin: 0 2px;
      height: 70px;
      line-height: 70px;
      color: #ccc;
      background-color: rgba($color: #000000, $alpha: 0);
      outline: none;
      border: none;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .isTopChecked {
    background-color: #000;
    & a span {
      color: #fff;
    }
  }
}
.m-subnav {
  background-color: #c20c0c;
  position: relative;
  min-width: 800px;
  height: 34px;
  & .m-subnav-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin-left: -12%;
  }
  li {
    display: inline-block;
    margin: 4px;
    text-align: center;
    width: 84px;
    height: 24px;
    outline: none;
    cursor: pointer;
    line-height: 24px;
    em {
      color: #fff;
    }
  }
  .isSubChecked {
    background-color: #9b0909;
    border-radius: 20px;
  }
}
.music-player {
  position: fixed;
  bottom: -4px;
  left: 0;
  right: 0;
}
</style>