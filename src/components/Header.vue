<template>
  <header>
    <div class="logo"><img src="../assets/images/logo.png" /></div>
    <div class="title"><img src="../assets/images/title.png" alt="" /></div>
    <ul>
      <li>
        <router-link
          :class="{
            'swiper-line': true,
            active: $route.name === 'Home',
          }"
          to="/"
          >首页</router-link
        >
      </li>
      <li>
        <router-link
          :class="{
            'swiper-line': true,
            active: $route.name === 'About',
          }"
          to="/about"
          >关于</router-link
        >
      </li>
      <li>
        <router-link
          :class="{
            'swiper-line': true,
            active: $route.name === 'Message',
          }"
          to="/Message"
          >未读消息</router-link
        >
      </li>
      <li><span class="swiper-line" @click="cancle">注销</span></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Head",
  methods: {
    cancle() {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/global.less");
header {
  position: fixed;
  top: 0;
  z-index: 999;
  background-image: url("../assets/images/header-bg.gif");
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  .logo {
    margin-left: 17%;
    height: 90%;
    img {
      height: 100%;
    }
  }
  .title {
    margin-top: 15px;
    margin-left: 13%;
    height: 70%;
    img {
      height: 100%;
    }
  }
  ul {
    display: flex;
    margin-left: 7%;
    li {
      font-size: 16pt;
      margin: 0 20px;
      text-align: center;
      line-height: 68px;
      .swiper-line.active {
        color: @main-color;
      }
    }
  }
}
</style>