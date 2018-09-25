<template>
    <div class="vinfo">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p @click="test">会员中心</p>
        </div>
        <img class="vhead" src="../assets/head.png" alt="">
        <p class="tac">{{info.name}}</p>
        <div class="l">
            <div class="ll">
                <div class="d-flex">
                    <span class="flex1 tal">手机号验证</span>
                    <span class="flex2 tac">{{phone}}</span>
                    <span class="flex1 tar"><span class="o n">已验证</span></span>
                </div>
            </div>
            <div class="ll">
                <div class="d-flex">
                    <span class="flex1 tal">修改安全密码</span>
                    <span class="flex1 tar iconfont icon-arrow" @click="tofor1"></span>
                </div>
            </div>
            <div class="ll">
                <div class="d-flex">
                    <span class="flex1 tal">完善信息</span>
                    <span class="flex1 tar" @click="toallinfo"><span class="o" :class="{n:info.type!=2}">{{tip}}</span></span>
                </div>
            </div>
            <div class="ll">
                <div class="d-flex">
                    <span class="flex1 tal">银行卡账号</span>
                    <!-- <span class="iconfont icon-arrow"></span> -->
                    <span class="flex1 tar oo" :class="{nn:info.bank_type==0}" @click="tocard">{{bank}}</span>
                </div>
            </div>
        </div>
        <p class="exitbtn" @click="exit">退出登录</p>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info: "",
      phone: ""
    };
  },
  computed: {
    tip() {
      if (this.info.type == 0) {
        return "已完善";
      } else if (this.info.type == 1) {
        return "审核中";
      } else {
        return "未完善";
      }
    },
    bank() {
      let that = this;
      if (this.info.bank_type == 0) {
        return that.info.bank;
      } else if (this.info.bank_type == 1) {
        return "审核中";
      } else {
        return "点击绑定";
      }
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    if (!$.cookie("id")) {
      that.$vux.toast.show({
        text: "请登录！",
        type: "cancel",
        position: "middle",
        time: 1000
      });
      that.$router.push({
        name: "login"
      });
    }
    that
      .$http({
        url: "/datash",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        that.info = res.data;
        that.phone =
          res.data.phone.substr(0, 3) + "****" + res.data.phone.substr(7);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    test(){
      this.$router.push({
        name:"demo"
      })
    },
    tofor1(){
      this.$router.push({
        name:"forget1"
      })
    },
    toallinfo() {
      let that = this;
      if (that.info.type == 2) {
        that.$router.push({
          name: "allinfo"
        });
      }
    },
    tocard() {
      let that = this;
      if (that.info.type == 0) {
        if (that.info.bank_type == 1) {
          that.$vux.toast.show({
            text: "绑定信息审核中，请耐心等待！",
            type: "warn",
            position: "middle",
            time: 1000
          });
        } else if (that.info.bank_type == 0) {
          that.$router.push({
            name: "succard"
          });
        } else if (that.info.bank_type == 2) {
          that.$router.push({
            name: "addcard"
          });
        }
      } else {
        that.$vux.toast.show({
          text: "您还未通过实名信息的审核！",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
    },
    exit() {
      var that = this;
      that.$vux.confirm.show({
        title: "确认",
        content: "确定要退出登录吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$router.push({
            name: "login"
          });
          $.cookie("id","")
        }
      });
    }
  }
};
</script>
<style scoped>
.t_top {
  background: white;
  box-shadow: 0px 1px 6px 0 #ccc;
}
.icon-return {
  position: absolute;
  left: 4%;
  font-size: 0.6rem;
}
.vinfo {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: 0.36rem;
}
.vhead {
  display: block;
  width: 2rem;
  margin: 2rem auto 0.3rem;
}
.l {
  margin-top: 1rem;
}
.oo {
  color: #999;
}
.nn {
  color: #6459f5;
}
.o {
  color: #999;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 0 8px 0;
  line-height: 0.4rem;
}
.n {
  color: #6459f5;
  border: 1px solid #6459f5;
}
.exitbtn {
  width: 100%;
  text-align: center;
  line-height: 1.2rem;
  background: linear-gradient(to right, #6b4ffa, #b519f3);
  color: white;
  font-size: 0.44rem;
  margin-top: 1.6rem;
}
</style>
