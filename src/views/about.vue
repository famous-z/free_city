<template>
  <div class="about">
    <panel>
      <template #header>
        <div class="title">
          <span>主页\关于</span>
        </div>
      </template>
      <template #content>
        <div class="content">
          <h2>关于</h2>
          <span
            >CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于
            Node.js 的技术研究。</span
          >
          <span
            >CNode 社区由一批热爱 Node.js
            技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对
            Node.js 感兴趣的朋友。</span
          >
          <span>CNode 的 SLA 保证是，一个9，即 90.000000%。</span>
          <span
            >社区目前由 @alsotang 在维护，有问题请联系：<a
              href="https://github.com/alsotang"
              >https://github.com/alsotang</a
            ></span
          >
          <span
            >请关注我们的官方微博：<a href="http://weibo.com/cnodejs"
              >http://weibo.com/cnodejs</a
            ></span
          >
          <h2>移动客户端</h2>
          <span>客户端由 @soliury 开发维护。</span>
          <span
            >源码地址：
            <a href="https://github.com/soliury/noder-react-native"
              >https://github.com/soliury/noder-react-native</a
            >
            。</span
          >
          <span>立即体验 CNode 客户端，直接扫描页面右侧二维码。</span>
          <span
            >另，安卓用户同时可选择：https://github.com/TakWolf/CNode-Material-Design
            ，这是 Java 原生开发的安卓客户端。</span
          >
        </div>
      </template>
    </panel>
    <user-data />
  </div>
</template>

<script>
import panel from "../layout/panel.vue";
import UserData from "../layout/userData.vue";
export default {
  components: { panel, UserData },

  created() {
    this.$store.commit("getUserData", JSON.parse(sessionStorage.getItem("userData")));
  },
};
</script>

<style lang="less" scoped>
.about {
  opacity: 0.75;
  width: 60%;
  margin: 0 auto;
  margin-left: 13%;
  .title {
    padding-left: 1%;
    span {
      font-size: 14pt;
      line-height: 50px;
    }
  }
  .content {
    padding-left: 2%;
    span {
      display: block;
      font-size: 12pt;
      padding: 5px 0;
    }
  }
  .userData {
    position: absolute;
    right: 80px;
    top: 100px;
  }
}
</style>