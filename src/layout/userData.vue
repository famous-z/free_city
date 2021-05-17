<template>
  <div class="userData">
    <panel>
      <template #header>
        <div class="title">
          <h2>个人信息</h2>
        </div>
      </template>

      <template #content>
        <div class="content" v-if="$store.state.userData && token">
          <div class="user">
            <router-link
              :to="{
                name: 'UserDetails',
                params: { loginname: userData.loginname },
              }"
              ><el-avatar
                shape="square"
                :src="$store.state.userData.avatar_url"
              ></el-avatar
            ></router-link>

            <span class="userName">{{ $store.state.userData.loginname }}</span>
          </div>
          <br />
          <span>积分：330</span>
          <br />
          <span class="sign">这家伙很懒,什么个性签名都没有留下。</span>
        </div>
        <div class="content" v-else>
          <!-- <el-button type="primary"><router-link style="color: white" to="login">登录</router-link></el-button> -->
          <router-link class="singIn" to="login" tag="button">登录</router-link>
          <p>点击“登录”获得更好的体验</p>
        </div>

      </template>
    </panel>
  </div>
</template>

<script>
import panel from "./panel.vue";
export default {
  components: { panel },
  data() {
    return {
      userData: '',
      token:''
    }
  },
  created() {
    this.userData=JSON.parse(sessionStorage.getItem("userData"))
    this.token=sessionStorage.getItem('token')
  },
};
</script>

<style lang="less" scoped>
.userData {
  .title {
    h2 {
      margin: 0;
      line-height: 50px;
      font-weight: normal;
      text-align: center;
    }
  }
  .content {
    padding: 10px 0 0 10px;
    height: 200px;
    background-color: rgb(247, 243, 243);
    .singIn{
      margin-left: 32%;
      width: 88px;
      height: 40px;
    }
    p{
      text-align: center;
    }
    .user {
      display: flex;
      .userName {
        line-height: 40px;
      }
    }
    .sign {
      display: block;
      margin-top: 10px;
    }
  }
}
</style>