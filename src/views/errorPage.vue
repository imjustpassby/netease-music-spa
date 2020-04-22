<template>
  <div id="error">
    <p>404 Page Not Found. Sorry.</p>
    <button class="more" @click="goHome">{{time}}秒后即将返回首页，或直接点击此处</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5
    };
  },
  mounted() {
    let interval = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        window.clearInterval(interval);
        this.goHome();
      }
    }, 1000);
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/home"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
#error {
  width: 100%;
  p {
    text-align: center;
    margin: 100px 0;
    font-size: 56px;
  }
  .more {
    font-size: 28px;
    line-height: 2.5em;
    outline: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    color: blueviolet;
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>