<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-desc">
        aa
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
        label-position="left">

        <div class="title-container">
          <h3 class="title">登录您的账号</h3>
        </div>

        <el-form-item prop="login_id">
          <el-input ref="login_id" v-model="loginForm.login_id" placeholder="用户名" name="login_id" type="text" tabindex="1"
            auto-complete="on" />
        </el-form-item>

        <el-form-item prop="login_pwd">
          <el-input :key="passwordType" ref="password" v-model="loginForm.login_pwd" :type="passwordType" placeholder="密码"
            name="login_pwd" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="margin-bottom:30px; border-radius: 30px;"
          @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateLoginId = (rule, value, callback) => {
      if (value.length < 2 || value.length > 20) {
        callback(new Error('用户名长度在 2 到 20 个字符'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        login_id: '',
        login_pwd: ''
      },
      loginRules: {
        login_id: [{ required: true, trigger: 'blur', validator: validateLoginId }],
        login_pwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #7559ff;
$cursor: #7559ff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      font-size: 16px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }

      // 设置 placeholder 颜色
      &::-webkit-input-placeholder {
        // color: #917aff; 再浅一点
        color: #aaa;
      }
    }
  }

  .el-form-item {
    background: transparent;
    color: #454545;
    // 只要下面的一条线, 不要其他的边框
    border: none;
    border-bottom: 3px solid #7559ff;
    margin-bottom: 50px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: rgba(0, 0, 0, 0.85);
$light_gray: #7559ff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/images/login_bg.jpg');
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-box {
    background-color: #fff;
    border-radius: 40px;
    display: flex;
    width: 800px;
    height: 600px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.7);

    .login-desc {
      width: 50%;
      padding: 50px 50px 50px 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // 只要右侧阴影, 其他阴影都去掉
      box-shadow: 10px 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .login-form {
    position: relative;
    width: 50%;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #7559ff;
    cursor: pointer;
    user-select: none;
  }
}
</style>
