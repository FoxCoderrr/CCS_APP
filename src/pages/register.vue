<template>
  <div class="login login1">
        <div class="t_top">
            <img class="img" @click="back" src="../assets/bk.png" alt="">
            <p>注册</p>
        </div>
        <div class="logoimg ovh">
            <img class="logo" src="../assets/APPlogo.png" alt="">
        </div>
      <div class="form">
          <div class="div ovh bb">
              <span class="fl iconfont icon-jiahaoyou"></span>
              <x-input class="fl" type="text" placeholder="推荐人手机号或邀请码" v-model="tjm"></x-input>
          </div>
          <div class="div ovh bb mt20">
              <span class="fl iconfont icon-geren"></span>
              <x-input class="fl" type="text" placeholder="请输入昵称" v-model="uname"></x-input>
          </div>
          <div class="div ovh bb mt20">
              <img class="fl" src="../assets/phone.png" alt="">
              <x-input class="fl" type="text" v-model="mobile" placeholder="请输入手机号码"></x-input>
          </div>
          <div class="div ovh bb mt20">
              <span class="fl iconfont icon-icon_password_yes"></span>
              <x-input class="fl" type="password" v-model="upwd" placeholder="登录密码(至少6位数字或字母)"></x-input>
          </div>
          <div class="div ovh bb mt20">
              <span class="fl iconfont icon-icon_password_yes"></span>
              <x-input class="fl" type="password"  max="6" v-model="upwd1" placeholder="安全密码(6位数字)"></x-input>
          </div>
          <div class="div ovh yzm mt20">
                <img class="fl" src="../assets/msg.png" alt="">
                <span class="fr" :class="{fc000:btnmsg!='获取验证码'}" @click="getcode">{{btnmsg}}</span>
                <x-input class="fl" type="text"  v-model="code" placeholder="请输入验证码"></x-input>
          </div>
          <!-- <p class="mt20"><check-icon :value.sync="agree"></check-icon> <span>我已同意<span class="fc0000" @click="showxx">《平台相关服务协议》</span></span> </p> -->
          <p class="btn" @click="sub">立即注册</p>
          <p class="fr mt20 xx" @click="tologin">已有账号？点击登录</p>
      </div>
      <div class="xycon">
        <div class="xytop">
          <p>平台相关服务协议</p>
        </div>
          <span class="iconfont icon-2guanbi" @click="hidexx"></span>
        <div class="xyconn">
          <p class="xtitle">平台相关服务协议</p>
          <div v-html="pp"></div>
        </div>
      </div>
  </div>
</template>
<script>
import { XInput, CheckIcon } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      pp: "",
      agree: false,
      uname: "",
      tjm: "",
      mobile: "",
      code: "",
      ccode: "",
      upwd: "",
      upwd1: "",
      btnmsg: "获取验证码",
      time: 60
    };
  },
  components: {
    XInput,
    CheckIcon
  },
  mounted() {
    let getQueryString = function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.href
        .split("?")[1]
        .toString()
        .match(reg);
      if (r != null) return r[2];
      return "";
    };
    let that = this;
    mui.back = function() {
      that.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".login").css("minHeight", height);
    if (window.location.href.indexOf("?") != -1) {
      that.tjm = getQueryString("pre");
    }
    if (that.$route.params.pre) {
      that.tjm = that.$route.params.pre;
    }
  },
  methods: {
    back() {
      this.$router.push({
        name:"login"
      });
      clearInterval(window.t1);
    },
    showxx() {
      $(".xycon").fadeIn("fast");
    },
    hidexx() {
      $(".xycon").fadeOut("fast");
    },
    tologin() {
      this.$router.push({
        name: "login"
      });
      clearInterval(window.t1);
    },
    sub() {
      let that = this;
      let reg = /^[a-zA-Z0-9]{6,30}$/;
      let reg1 = /^[0-9]{6}$/;
      if (
        that.uname != "" &&
        that.mobile != "" &&
        that.upwd != "" &&
        that.upwd1 != "" &&
        that.code != null &&
        that.tjm != ""
      ) {
        if (reg.test(that.upwd) && reg1.test(that.upwd1)) {
          if (that.btnmsg == "获取验证码" || that.code != that.ccode) {
            that.$vux.toast.show({
              text: "请输入有效的验证码",
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else {
            that
              .$http({
                url: "/inserth",
                method: "post",
                data: {
                  name: that.uname,
                  phone: that.mobile,
                  password: that.upwd,
                  paypwd: that.upwd1,
                  links: that.tjm,
                  yzm: that.code
                }
              })
              .then(function(res) {
                if (res.data.code == 0) {
                  that.$vux.alert.show({
                    title: "确认",
                    content: "注册成功，快去登录吧！",
                    onShow() {},
                    onHide() {
                      that.$router.push({
                        name: "login"
                      });
                      clearInterval(window.t1);
                    }
                  });
                } else if (res.data.code == -1) {
                  that.$vux.toast.show({
                    text: "该账户已经被注册过",
                    type: "warn",
                    position: "middle",
                    time: 1000
                  });
                } else if (res.data.code == -2) {
                  that.$vux.toast.show({
                    text: "邀请码不存在",
                    type: "warn",
                    position: "middle",
                    time: 1000
                  });
                } else if (res.data.code == -3) {
                  that.$message({
                    message: "请输入有效的验证码！",
                    type: "error",
                    duration: 1500
                  });
                } else if (res.data.code == -4) {
                  that.$message({
                    message: "昵称已存在！",
                    type: "error",
                    duration: 1500
                  });
                }
              });
          }
        }else{
        that.$vux.toast.show({
          text: "请设置正确格式的密码",
          type: "warn",
          position: "middle",
          time: 1000
        });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
    },
    getcode() {
      let that = this;
      let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.btnmsg == "获取验证码" && reg1.test(that.mobile)) {
        that
          .$http({
            url: "/yzmh",
            method: "get",
            params: {
              phone: that.mobile
            }
          })
          .then(function(res) {
            console.log(res.data.yzm);
            that.ccode = res.data.yzm;
            that.code = res.data.yzm;
          });
        that.btnmsg = that.time + "秒后重新发送";
        window.t1 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = "获取验证码";
            clearInterval(window.t1);
          } else {
            that.time--;
            that.btnmsg = that.time + "秒后重新发送";
          }
        }, 1000);
      } else if (that.btnmsg != "获取验证码" && reg1.test(that.mobile)) {
      } else {
        that.$vux.toast.show({
          text: "请输入正确的手机号",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.login {
  position: absolute;
  padding-bottom: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  background: url("../assets/bg0.png");
  background-size: 100% 100%;
  color: white;
  overflow: hidden;
}
.form {
  width: 70%;
  margin: 0 auto;
  font-size: 0.36rem;
}
.form .div {
  border-bottom: 1px solid white;
  line-height: 0.5rem;
}
.form .div img {
  width: 0.7rem;
}
.form .div:nth-child(2) img {
  width: 0.6rem;
  margin: 0 0.06rem 0;
}
.form .div:nth-child(6) img {
  width: 0.54rem;
  margin: 0.16rem 0.08rem 0;
}
.form .div:nth-child(6) span {
  line-height: 0.8rem;
}
.form .div .iconfont {
  color: white;
  width: 0.7rem;
  font-size: 0.6rem;
  line-height: 0.6rem;
  padding-top: 0.0533rem;
  text-align: center;
}
.btn {
  text-align: center;
  line-height: 1rem;
  background: #6656f4;
  border-radius: 20px;
  margin-top: 0.8rem;
}
.fc000 {
  color: #ccc;
}
.cc {
  color: #999;
}
.fc2 {
  color: #d6ae78;
}
.x {
  width: 1.8rem;
}
.logoimg {
  width: 100%;
}
.logo {
  display: block;
  width: 4rem;
  margin: 1.4rem auto 1rem;
}
.xycon {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/bg1.jpg");
  background-size: 100% 100%;
  top: 0;
  box-sizing: border-box;
  display: none;
  padding-top: 1.2rem;
}
.xytop {
  line-height: 40px;
}
.xycon .xytop p {
  font-size: 0.46rem;
  text-align: center;
  margin-bottom: 30px;
}
.xyconn {
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: left;
  border: 1px solid white;
  border-radius: 10px;
  padding: 22px 16px 16px 16px;
  box-shadow: 0px 0px 8px 1px #6656f4;
  position: relative;
}
.xtitle {
  background: #6656f4;
  border-radius: 6px;
  text-align: center;
  margin: -36px auto 0;
  width: 50%;
  line-height: 0.7rem;
}
.xyconn div {
  background: white;
  border-radius: 6px;
  box-shadow: 0px 0px 8px 1px #6656f4;
  padding: 10px;
  margin-top: 20px;
}
.fc0000 {
  color: #f42ed4;
}
.icon-2guanbi {
  position: relative;
  float: right;
  margin-right: 10px;
  margin-top: -10px;
  font-size: 0.6rem;
  z-index: 100;
  z-index: 10;
  background: #251440;
}
</style>
