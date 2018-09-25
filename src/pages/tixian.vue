<template>
    <div class="tixian">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">我要提现</p>
        </div>
        <div class="c">
            <p>佣金到账银行卡 <span class="fc00 ml">{{bank}}</span></p>
            <p class="mt">提现金额</p>
            <div>
                ￥<input type="number" v-model="num">
            </div>
            <p class="tip">当前余额{{x}}元 <span class="ii">(手续费{{ratee}})</span>  <span class="fc00" @click="all">全部提现</span></p>
            <p class="btn" @click="sub">提现</p>
        </div>
      <x-dialog v-model="show" class="dialog">
        <p class="xt">安全密码</p>
        <div class="ll ovh">
          <input class="fl" type="text" placeholder="输入您的安全密码" maxlength="6" v-model="pwd" @input="input">
        </div>
        <p class="tar ff" @click="tofor1">忘记密码?</p>
        <p class="d-flex">
          <span class="flex1 tac" @click="hided">取消</span>
          <span class="flex1 tac fc00" @click="sub1">确认</span>
        </p>
      </x-dialog>
    </div>
</template>
<script>
import { XDialog } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      num: "",
      show: false,
      x: this.$route.params.e,
      pwd: "",
      bank: this.$route.params.bank,
      rate: this.$route.params.rate,
    };
  },
  components: {
    XDialog
  },
  computed:{
    ratee(){
      return parseFloat(this.num*this.rate).toFixed(1)
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    tofor1(){
      this.$router.push({
        name:"forget1"
      })
    },
    input(){
      let that= this;
      let pwdd = "";
      for(let i = 0,l = that.pwd.split("").length;i<l;i++){
        pwdd+="*";
      }
      that.pwd = pwdd;
    },
    all() {
      this.num = parseFloat(this.x/(this.rate+1)).toFixed(1);
    },
    hided() {
      let that = this;
      this.show = false;
      that.pwd="";
    },
    sub1() {
      let that = this;
      that
        .$http({
          url: "/cashaddh",
          method: "get",
          params: {
            id: $.cookie("id"),
            money: that.num,
            paypwd: that.pwd
          }
        })
        .then(function(res) {
          that.pwd="";
          if (res.data.code == 0) {
            that.$vux.toast.show({
              text: "提现成功，请等待审核！",
              type: "success",
              position: "middle",
              time: 1000
            });
            that.$router.push({
              name: "txmx"
            });
          } else if (res.data.code == -2) {
            that.$vux.toast.show({
              text: "密码错误！",
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else {
            that.$vux.toast.show({
              text: "提现失败！",
              type: "warn",
              position: "middle",
              time: 1000
            });
          }
        });
      that.show = false;
    },
    sub() {
      let that = this;
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1}?$)/;
      if (reg.test(that.num)&&Number(that.num)>0) {
        if (parseFloat(that.num)+Number(parseFloat(that.num*that.rate).toFixed(1)) > parseFloat(that.x)) {
          that.$vux.toast.show({
            text: "余额不足！",
            type: "warn",
            position: "middle",
            time: 1000
          });
        } else {
          that.show = true;
        }
      } else {
        that.$vux.toast.show({
          text: "请输入合理数据！",
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
.t_top {
  background: white;
  box-shadow: 0px 1px 6px 0 #ccc;
}
.icon-return {
  position: absolute;
  left: 4%;
  font-size: 0.6rem;
}
.tixian {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: 0.36rem;
  padding-top: 1.4rem;
  box-sizing: border-box;
}
.c {
  width: 96%;
  margin: 0 auto;
  box-shadow: 0px 0px 6px 2px #f0e3fa;
  background: white;
  box-sizing: border-box;
  padding: 0.6rem;
}
.ml {
  margin-left: 0.6rem;
}
.mt {
  margin-top: 1.2rem;
}
.c div {
  font-size: 0.8rem;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 0.2rem;
}
input {
  width: 6rem;
  padding-left: 0.2rem;
}
.tip {
  font-size: 0.3rem;
  color: #999;
  margin: 0.1rem 0 1.4rem;
}
.btn {
  width: 80%;
  background: #6459f5;
  color: white;
  text-align: center;
  line-height: 1rem;
  margin: 0 auto;
}
.xt {
  line-height: 1.2rem;
  font-size: 0.4rem;
}
.dialog .flex1 {
  line-height: 1.2rem;
  border-top: 1px solid #eaeaea;
}
.dialog .d-flex .flex1:first-child {
  border-right: 1px solid #eaeaea;
}
.dialog input {
  width: 90%;
  line-height: 1.1rem;
}
.x {
  color: #999;
}
.fc00 {
  color: #6459f5;
}
.ff {
  font-size: 0.3rem;
  color: #e51c23;
  margin-bottom: 0.2rem;
  padding-right: 4%;
}
.ii{
    color: #e51c23;
}
</style>
