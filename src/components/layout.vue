<template>
  <div class="g-topbar">
    <div class="m-top">
      <div class="logo">
        <h1>
          <router-link to="#">
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
        <button class="login-btn" @click="showLoginForm">登录</button>
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
    <login-form class="" v-if="loginShow" @confirmLogin="confirmLogin"></login-form>
  </div>
</template>

<script>
import LoginForm from './login.vue'
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
      checkedTopLink: 0,
      subLink: [
        {
          span: "推荐",
          link: "#"
        },
        {
          span: "排行榜",
          link: "#"
        },
        {
          span: "歌单",
          link: "#"
        },
        {
          span: "主播电台",
          link: "#"
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
      checkedSubLink: 0,
      loginShow: false
    };
  },

  components: {
    LoginForm
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    clickTopLink(idx) {
      this.checkedTopLink = idx;
    },
    clickSubLink(idx) {
      this.checkedSubLink = idx;
    },
    showLoginForm(){
      this.loginShow = true;
    },
    confirmLogin(){
      this.loginShow = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.g-topbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 70px;
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
    .login-btn {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
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
</style>