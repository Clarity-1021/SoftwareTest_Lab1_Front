<style src="../assets/css/Login.css" lang="css" scoped></style>
<template>
  <div id="loginHtml">
    <h1 class="log-title" data-spotlight="Login!">Login</h1>

    <div class="log-box-outer">
      <div class="log-container">
        <div class="log-left-container">
          <div class="title"><span class="underline-yellow">登录</span></div>

          <div class="input-container">
            <input type="text" v-model="username" placeholder="用户名" />
            <p v-if="status==2" class="error-message"><i class="fa fa-exclamation-circle"></i>请将用户名填写完整！<br></p>
            <input type="password" v-model="password" placeholder="密码" />
            <!--              <br />-->
            <p v-if="status==3" class="error-message"><i class="fa fa-exclamation-circle"></i>找不到该用户<br></p>
            <p v-if="status==4" class="error-message"><i class="fa fa-exclamation-circle"></i>请将密码填写完整！<br></p>
            <p v-if="status==1" class="error-message"><i class="fa fa-exclamation-circle"></i>密码错误<br></p>
          </div>

          <div class="last-row">
            <div class="message yellow-small">忘记密码</div>
            <div id="login_btn" class="login-btn" ghost @click="login">登录</div>
          </div>
        </div>

        <div class="log-right-container">
          <div class="title reg"><span class="underline-yellow">注册</span></div>

          <div class="message reg-hint">
            <span class="yellow-small">没有账号，去注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      status: 0
    }
  },
  methods: {
    login () {
      // this.$message({
      //     showClose: true,
      //     message: '成功登陆',
      //     type: 'success'
      // });
      this.$router.push({
        path: '/',
        params: { nagDrawer: 'true' }
      })
    //   if (this.username==='') {
    //     this.status=2;
    //   }else if (this.password===''){
    //     this.status=4;
    //   }else {
    //     this.$axios.post('/login', {
    //       username: this.username,
    //       password: this.password
    //     })
    //       .then(resp => {
    //         if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
    //           localStorage.setItem("username",this.username);
    //           this.$store.commit('login', resp.data);
    //             this.$router.replace({path: '/'});
    //           this.status=0;
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         if (error.data.message==="user not found"){
    //           this.status=3;
    //         } else if(error.data.message==="wrong password"){
    //           this.status=1;
    //         }else
    //           console.log(error);
    //
    //       })
    //   }
    },
  }
}
</script>
