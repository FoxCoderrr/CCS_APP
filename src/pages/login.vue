<template>
    <div class="login">
        <div class="logoimg ovh">
            <img class="logo" src="../assets/APPlogo.png" alt="">
        </div>
        <div class="form">
            <div class="div ovh">
                <img class="fl" src="../assets/phone.png" alt="">
                <x-input class="fl" type="text"  v-model="phone" placeholder="请输入手机号码"></x-input>
            </div>
            <div class="div ovh mt30">
                <span class="fl iconfont icon-icon_password_yes"></span>
                <span class="fr iconfont icon-yanjing" @touchstart="showpwd" @touchend="hidepwd"></span>
                <x-input class="fl" :type="seepwd"  v-model="pwd" placeholder="请输入密码"></x-input>
            </div>
            <p class="mt10 ovh fc1">
                </router-link>
                <span class="fl" @click="toforget">忘记密码？</span>
                <span class="fr" @click="toregister">立即注册</span>
            </p>
            <p class="btn" @click="sub">立即登录</p>
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
      seepwd: "password",
    };
  },
  components: {
    XInput
  },
  mounted() {
    let that = this;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".login").css("height", height);
    if (window.localStorage.getItem("acc")) {
      that.phone = window.localStorage.getItem("acc");
    }
    var first = null;
    mui.back = function() {
      //首次按键，提示‘再按一次退出应用’
      if (!first) {
        first = new Date().getTime(); //记录第一次按下回退键的时间
        mui.toast("再按一次退出应用"); //给出提示
        history.go(-1); //回退到上一页面
        setTimeout(function() {
          //1s中后清除
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //如果两次按下的时间小于1s，
          plus.runtime.quit(); //那么就退出app
        }
      }
      error;
    };
    // var ws = new WebSocket("ws://ccsserve.qilinpz.com/loginh");
    // ws.onopen = function() {
    //   console.log("111");
    //   ws.send("Hello Server!");
    // };
  },
  methods: {
    showpwd() {
      this.seepwd = "text";
    },
    hidepwd() {
      this.seepwd = "password";
    },
    toregister() {
      this.$router.push({
        name: "register",
        params: {
          pre: 0
        }
      });
    },
    toforget() {
      this.$router.push({
        name: "forget"
      });
    },
    sub() {
      let that = this;
      let reg = /^[a-zA-Z0-9]{6,30}$/;
      if (that.phone != "" && that.pwd != "") {
        that.$vux.loading.show({
          text: "正在登录..."
        });
        that
          .$http({
            url: "/loginh",
            method: "post",
            data: {
              phone: that.phone,
              password: that.pwd
            }
          })
          .then(function(res) {
            that.$store.state.uinfo = res.data;
            that.$vux.loading.hide();
            if (res.data.id) {
              $.cookie("link", res.data.link);
              $.cookie("id", res.data.id);
              $.cookie("first", res.data.first);
              window.localStorage.setItem("acc", that.phone);
              that.$store.state.uinfo = res.data;
              if (res.data.first == 0) {
                that.$router.push({
                  name: "jishi"
                });
              } else {
                that.$vux.alert.show({
                  title: "确认",
                  content: "登录成功，快来购买糖果币吧！",
                  onShow() {},
                  onHide() {}
                });
                that.$router.push({
                  name: "zhongchou"
                });
              }
            } else if (res.data.code == -1) {
              that.$vux.toast.show({
                text: "密码错误！",
                type: "warn",
                position: "middle",
                time: 1000
              });
            } else if (res.data.code == -2) {
              that.$vux.toast.show({
                text: "用户不存在！",
                type: "warn",
                position: "middle",
                time: 1000
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息！",
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
  /* position: absolute; */
  width: 100%;
  /* height: 100%; */
  background: url("../assets/bg0.png");
  background-size: 100% 100%;
  color: white;
}
.logoimg {
  width: 100%;
}
.logo {
  display: block;
  width: 4rem;
  margin: 1.4rem auto 1rem;
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
</style>
