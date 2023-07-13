<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
        label-position="left">

        <div class="title-container">
          <h3 class="title">后台管理系统登录</h3>
        </div>

        <el-form-item prop="login_id">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="login_id" v-model="loginForm.login_id" placeholder="用户名" name="login_id" type="text" tabindex="1"
            auto-complete="on" />
        </el-form-item>

        <el-form-item prop="login_pwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.login_pwd" :type="passwordType" placeholder="密码"
            name="login_pwd" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin">登录</el-button>

        <div class="tips">
          <span style="margin-right:20px;">login_id: admin</span>
          <span> login_pwd: any</span>
        </div>

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

$bg: #283443;
$light_gray: rgba(0, 0, 0, 0.85);
$cursor: #000;

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
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ebeef5;
    background: transparent;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #283443;
$dark_gray: rgba(0, 0, 0, 0.85);
$light_gray: rgba(0, 0, 0, 0.85);

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
    border-radius: 10px;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
