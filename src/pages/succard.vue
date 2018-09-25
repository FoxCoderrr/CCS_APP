<template>
  <div class="bankCard">
      <div class="t_top">
          <span class="iconfont icon-return" @click="back"></span>
          <p class="fc00">我的银行卡</p>
      </div>
      <div class="c">
        <img :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+jiancheng"/>
        <div class="card">
          <p class="tip fc000 ovh">
            <span class="fl">{{banktype}}</span>
            <span class="fl fs000">{{banknum}}</span>
          </p>
        </div>
      </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      bnum: "",
      jiancheng: "",
      msg: ""
    };
  },
  computed: {
    banktype() {
      if (this.msg) {
        let l = this.msg.bankname.toString().split("-").length;
        return this.msg.bankname.toString().split("-")[l - 1];
      }
    },
    banknum() {
      if(this.msg){
        let l = this.msg.bankcard.toString().split("").length;
        if(l==16){
          return "**** **** **** "+this.msg.bankcard.toString().substr(-4);
        }else{
          let str = "";
          let s = Math.floor(l/4);
          let y = l%4;
          for(let i=0;i<s;i++){
            str+="**** ";
          }
          return str+this.msg.bankcard.toString().substr(-y);
        }
      }
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/jianchengh",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        that.msg = res.data.msg;
        that.jiancheng = res.data.msg.jiancheng;
      });
    that.$vux.alert.show({
      title: "确认",
      content: "若要更换银行卡绑定，请联系客服！",
      onShow() {},
      onHide() {}
    });
  },
  methods: {
    back() {
      this.$router.back();
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
.bankCard {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: 0.36rem;
  padding-top: 1.8rem;
  box-sizing: border-box;
}
.c {
  position: relative;
  width: 92%;
  height: 2.6rem;
  margin: 0 auto 0.3rem;
}
.card {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 10px -2px #6453f5;
  border-radius: 10px;
  overflow: hidden;
}
img {
  z-index: 1;
  position: absolute;
  left: 1rem;
  top: 0.4rem;
}
.tip {
  position: absolute;
  left: 1.6rem;
  bottom: 0.2rem;
}
.fc000 {
  color: #666;
}
.fs000 {
  font-size: 0.54rem;
  margin-left: 0.2rem;

}
</style>
