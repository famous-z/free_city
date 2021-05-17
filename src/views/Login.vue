<template>
  <div class="loginin">
    <div class="form">
      <label for="token">密钥:</label>
      <input id="token" v-model.trim="token" type="text" />
      <br />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
    // 登录
    login() {
      this.$axios
        .post("/accesstoken", { accesstoken: this.token })
        .then((res) => {
            // this.$store.commit( 'getUserData',res)
            // console.log(res);
            sessionStorage.setItem('token',this.token)
            this.$router.push('/')
        })
        .catch(err=>{
            console.log(err);
            alert('密钥错误')
        });
    },
  },
};
</script>

<style lang="less" scoped>
.loginin {
  background-image: url("../assets/images/login-bg.png");
  background-size: cover;
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  z-index: 999;
  .form{
      margin-top: 15%;
      margin-left: 40%;
      label{
          color: #dc6103;
      }
      input{
          outline: none;
          color: #dc6103;
      }
      button{
          display: block;
          margin-left: 15%;
          margin-top: 10px;
          color: #dc6103;
      }
  }
}
</style>