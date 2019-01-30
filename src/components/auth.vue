<template>
    <div class="auth-wrap" :class="showAuth ? 'showAuth':''">
      <div class="mask" @click="close"></div>
      <!-- 用户授权 -->
      <div class="auth_content" v-show="status===1">
        <p class="auth_content_title">提示</p>
        <p class="auth_content_tips">为了您更好的用户体验，牛小野需要您微信授权后才能使用全部功能，建议您开启授权</p>
        <div class="auth_content_btn">
          <button @click="useAnth(false)" class='getAuth cancelAuth' >取消</button>
          <button @click="useAnth" class='getAuth' open-type="getUserInfo"  @getuserinfo="getInfo">开启授权</button>
        </div>
      </div>
      <!-- 用户登录 -->
      <div v-show='status===2 || showLogin' class='loginForm'>
        <p class="loginForm_title">提示</p>
        <div class='loginForm_content'>
          <p class='mobile'><input v-model="mobile" class="mobile_input" placeholder-class="input-placeholder" type="number" pattern="\d*" placeholder="请输入手机号"></p>
          <p class='password'>
            <input class="password_input" v-model='code' placeholder-class="input-placeholder" type="number" pattern="\d*"  placeholder="请输入验证码">
            <span class='getCode' @click='getCode'>{{codeWord}}</span>
          </p>
        </div>
        <div class="loginForm_btn">
          <span class="login_btn login_cancel" @click="cancel">取消</span>
          <span class="login_btn" @click="login">登录</span>
        </div>
      </div>

      <toast-component :message="toast.message" :visible.sync="toast.visible"></toast-component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { USERINFO_GET } from '@/store/types'
import { isvalidMobile, isvalidCode } from '@/utils'
import toastComponent from '@/components/toast'
import {getCode, login} from '@/utils/api'
export default {
  name: 'auth',
  props: {
    showAuth: {
      type: Boolean,
      default: false
    }
  },
  components: {
    toastComponent
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  data () {
    return {
      haveAuth: false,
      status: 1,
      showLogin: false,
      codeWord: '获取验证码',
      isGetCode: false,
      timer: null,
      loginCode: '',
      mobile: '13426340847',
      code: '2332',
      toast: {
        visible: false,
        message: ''
      }
    }
  },
  methods: {
    useAnth () {
      //  用户使用授权按钮
      this.showLogin = true
    },
    getInfo (e) {
      if (e.mp.detail.userInfo) {
        this.status = 2
        this.getUserInfo.avatarUrl = e.mp.detail.userInfo.avatarUrl
        this.getUserInfo.nickName = e.mp.detail.userInfo.nickName
        console.log(this.getUserInfo)
        this.$store.commit(USERINFO_GET, this.getUserInfo)
      }
      this.showLogin = true
    },
    close () {
      // 初始化相关参数、传递相关参数
      this.$emit('closeAuth', this.status)
      this.showLogin = false
      this.code = ''
      this.mobile = ''
      this.codeWord = '获取验证码'
      clearInterval(this.timer)
    },
    getCode () {
      // 获取验证码、验证手机号
      if (!isvalidMobile(this.mobile)) {
        this.toast = {
          visible: true,
          message: '请输入正确的手机号'
        }
        return
      }
      // 防止重复请求
      if (this.isGetCode) return
      this.isGetCode = true
      let time = 60
      this.timer = setInterval(() => {
        if (time > 0) {
          time--
          this.codeWord = time + 's'
        } else {
          // 开放重新获取验证码
          this.isGetCode = false
          this.codeWord = '重新获取验证码'
          clearInterval(this.timer)
        }
      }, 1000)
      let data = {
        phoneNumber: this.mobile
      }
      getCode(data).then(resp => {

      }).catch(err => {
        console.log(err)
        this.isGetCode = false
        this.codeWord = '重新获取验证码'
        clearInterval(this.timer)
      })
    },
    login () {
      // 调用登录接口
      if (!isvalidMobile(this.mobile)) {
        this.toast = {
          visible: true,
          message: '请输入正确的手机号'
        }
        return
      }
      if (!isvalidCode(this.code)) {
        this.toast = {
          visible: true,
          message: '请输入正确的验证码'
        }
        return
      }
      // TODO 没有传送昵称和头像-2018-08-30 10:06
      let data = {
        wxCode: this.loginCode,
        phoneNumber: this.mobile,
        authCode: this.code,
        avatarUrl: this.getUserInfo.avatarUrl,
        nickName: this.getUserInfo.nickName
      }
      login(data).then(resp => {
        console.log(resp)
        let userInfo = Object.assign({}, this.getUserInfo, resp)
        console.log(userInfo)
        this.$store.commit(USERINFO_GET, userInfo)
        this.status = 3
        this.close()
      }).catch(err => {
        console.log('login------------->' + err)
      })
    },
    cancel () {
      this.close()
    }
  },
  watch: {
    showAuth () {
      if (this.showAuth && this.getUserInfo.avatarUrl && this.status === 1) {
        this.status = 2
      }
    }
  },
  mounted () {
    console.log(1111)
    wx.login({
      success: (login) => {
        this.loginCode = login.code
        wx.getUserInfo({
          success: (res) => {
            this.getUserInfo.avatarUrl = res.userInfo.avatarUrl
            this.getUserInfo.nickName = res.userInfo.nickName
            this.$store.commit(USERINFO_GET, this.getUserInfo)
            this.status = 2
          },
          fail: (error) => {
            console.log('errUserInfo=>', error)
          }
        })
      },
      fail: (error) => {
        console.log('errlogin=>', error)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.auth-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom:0;
  z-index:998;
  transform: rotate3d(1,0,0,-90deg);
  transition: all .3s ease-in-out;
  transform-origin: 50% 0%;
  height: 0;
  &.showAuth{
    height: 100vh;
    transform: rotate3d(0,0,0,0deg);
  }
  .mask {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
  }
  .auth_content{
    position: absolute;
    background: #fff;
    width:550rpx;
    height: 384rpx;
    /* border-radius: 2px; */
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index:1000;
    font-size: 30rpx;
    line-height: 1.4;
    border-radius: 20rpx;
    color: @color_text_333;
    overflow: hidden;
    .auth_content_title{
      padding: 32rpx 0;
    }
    .auth_content_tips{
      border-top: 1rpx solid @color_lin;
      border-bottom: 1rpx solid @color_lin;
      text-align: left;
      padding: 24rpx 34rpx;
    }
    .auth_content_btn{
      display: flex;
      flex-flow: nowrap row;
      justify-content: flex-start;
      align-items: center;
      .getAuth{
        width:50%;
        border: none;
        border-radius: 0;
        color: @color_main_100;
        font-size: 30rpx;
        line-height: 1.4;
        padding: 29rpx 0;
        background: @color-white;
      }
      .cancelAuth{
        color: @color_text_666;
        border-right: 1rpx solid @color_lin;
      }
    }

  }
  .loginForm{
    position: absolute;
    background: #fff;
    width:550rpx;
    height: 486rpx;
    /* border-radius: 2px; */
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index:1000;
    font-size: 30rpx;
    line-height: 1.4;
    border-radius: 20rpx;
    color: @color_text_333;
    overflow: hidden;
    .loginForm_title{
      padding: 32rpx 0;
    }
    .loginForm_content{
      border-top: 1rpx solid @color_lin;
      border-bottom: 1rpx solid @color_lin;
      text-align: left;
      padding: 39rpx 31rpx;
      ._p{
        height: 86rpx;
        border: 1rpx solid @color_lin;
        border-radius: 10rpx;
        input{
          display: block;
          height: 100%;
          padding-left: 32rpx;
        }
      }
      .password{
        display: flex;
        flex-flow: nowrap row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20rpx;
        .password_input{
          flex-grow: 1;
        }
        .getCode{
          color: @color_main_100;
          font-size: 24rpx;
          line-height: 1;
          text-align: center;
          padding: 30rpx 10rpx;
          width: 200rpx;
        }
      }
    }
    .loginForm_btn{
      display: flex;
      flex-flow: nowrap row;
      justify-content: flex-start;
      align-items: center;
      .login_btn{
        width:50%;
        border: none;
        border-radius: 0;
        color: @color_main_100;
        font-size: 30rpx;
        line-height: 1.4;
        padding: 29rpx 0;
        background: @color-white;
      }
      .login_cancel{
        color: @color_text_666;
        border-right: 1rpx solid @color_lin;
      }
    }
  }
}
</style>
