<template>
  <div class="app">
    <Header />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Panel from "./layout/panel.vue";

export default {
  components: { Header, Panel },
  name: "app",
};
</script>

<style lang='less'>
.app {
  background-image: url("./assets/images/body-bg.jpg");
  background-attachment: fixed;
  margin-top: 100px;
}
</style>
