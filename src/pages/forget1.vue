<template>
    <div class="forget">
        <div class="t_top">
            <img class="img" @click="back" src="../assets/bk.png" alt="">
            <p>修改安全密码</p>
        </div>
        <div class="form form1">
            <div class="div ovh">
                <img class="fl" src="../assets/phone.png" alt="">
                <x-input class="fl" type="text"  v-model="phone" placeholder="请输入手机号码"></x-input>
            </div>
            <div class="div ovh mt30">
                <span class="fl iconfont icon-icon_password_yes"></span>
                <x-input class="fl" type="password"  v-model="pwd" max="6" placeholder="请输入新密码(6位数字)"></x-input>
            </div>
            <div class="div ovh mt30">
                <span class="fl iconfont icon-icon_password_yes"></span>
                <x-input class="fl" type="password"  v-model="pwd1"  max="6" placeholder="请再次输入密码"></x-input>
            </div>
            <div class="div ovh mt30 yzm">
                <img class="fl" src="../assets/msg.png" alt="">
                <span class="fr" :class="{fc000:btnmsg!='获取验证码'}" @click="getcode">{{btnmsg}}</span>
                <x-input class="fl" type="text"  v-model="code" placeholder="请输入验证码"></x-input>
            </div>
            <p class="btn" @click="sub">确定</p>
        </div>
    </div>
</template>
<script>
import { XInput } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      pwd1: "",
      btnmsg: "获取验证码",
      time: 60,
      code: "",
      ccode: ""
    };
  },
  components: {
    XInput
  },
  created() {},
  mounted() {
    let that = this;
    mui.back=function () {
      that.back();
      error;
    }
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".forget").css("height", height);
  },
  methods: {
    back() {
      this.$router.back();
      clearInterval(window.t0);
    },
    getcode() {
      let that = this;
      let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.btnmsg == "获取验证码" && reg1.test(that.phone)) {
        that
          .$http({
            url: "/yzmh",
            method: "get",
            params: {
              phone: that.phone
            }
          })
          .then(function(res) {
            console.log(res.data.yzm);
            that.ccode = res.data.yzm;
            that.code = res.data.yzm;
          });
        that.btnmsg = that.time + "秒后重新发送";
        window.t0 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = "获取验证码";
            clearInterval(window.t0);
          } else {
            that.time--;
            that.btnmsg = that.time + "秒后重新发送";
          }
        }, 1000);
      } else if (that.btnmsg != "获取验证码") {
      } else {
        that.$vux.toast.show({
          text: "请输入正确的手机号！",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
    },
    sub() {
      let that = this;
      let reg = /^[0-9]{6}$/;
      if (
        that.phone != "" &&
        that.pwd != "" &&
        that.pwd1 != "" &&
        that.code != ""
      ) {
        if (that.btnmsg == "获取验证码" || that.code != that.ccode) {
          that.$vux.toast.show({
            text: "请输入有效的验证码",
            type: "warn",
            position: "middle",
            time: 1000
          });
        } else if (that.pwd != that.pwd1) {
          that.$vux.toast.show({
            text: "两次密码输入不一致！",
            type: "warn",
            position: "middle",
            time: 1000
          });
        } else if (!reg.test(that.pwd)) {
          that.$vux.toast.show({
            text: "密码格式错误！",
            type: "warn",
            position: "middle",
            time: 1000
          });
        } else {
          that
            .$http({
              url: "/forgetsh",
              method: "post",
              data: {
                phone: that.phone,
                paypwd: that.pwd
              }
            })
            .then(function(res) {
              if (res.data.code == 0) {
                that.$vux.alert.show({
                  title: "确认",
                  content: "修改成功，快去登录吧！",
                  onShow() {},
                  onHide() {
                    that.$router.push({
                      name: "login"
                    });
                    clearInterval(window.t0);
                  }
                });
              } else if (res.data.code == -1) {
                that.$vux.toast.show({
                  text: "修改失败！",
                  type: "warn",
                  position: "middle",
                  time: 1000
                });
              }
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
    }
  }
};
</script>
<style scoped>
.forget {
  /* position: absolute; */
  padding-top: 5rem;
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  background: url("../assets/bg1.jpg");
  background-size: 100% 100%;
  color: white;
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
.form .div:nth-child(4) img {
  width: 0.54rem;
  margin: 0.16rem 0.08rem 0;
}
.form .div:nth-child(4) span {
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
</style>
