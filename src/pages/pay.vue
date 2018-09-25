<template>
    <div class="team">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">支付方式</p>
        </div>
        <div class="ovh order">
            <span class="fl fc88">订单编号</span>
            <span class="fr">{{order}}</span>
        </div>
        <div class="ovh order">
            <span class="fl fc88">订单金额</span>
            <span class="fr fc99">￥{{money}}</span>
        </div>
        <div class="ovh p mt30" @click="pay(1)">
            <div class="img fl">
                <img src="../assets/wx.png" alt="">
            </div>
            <div class="fl ovh c">
                <p>微信支付</p>
                <p><span></span><span class="fc88">微信安全支付</span></p>
            </div>
            <span class="fr iconfont icon-arrow"></span>
        </div>
        <div class="ovh p mt1" @click="pay(2)">
            <div class="img fl">
                <img src="../assets/zfb.png" alt="">
            </div>
            <div class="fl ovh c">
                <p>支付宝支付</p>
                <p><span></span><span class="fc88">支付宝安全支付</span></p>
            </div>
            <span class="fr iconfont icon-arrow"></span>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      order: this.$route.params.order,
      money: this.$route.params.money
    };
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
    pay(i) {
      let that = this;
      that
        .$http({
          url: "/paysh",
          method: "get",
          params: {
            id: $.cookie("id"),
            num: that.$route.params.num,
            money: that.$route.params.money,
            type: i,
            order: that.$route.params.order
          }
        })
        .then(function(res) {
          if (res.data.code == 0) {
            if ($.cookie("first") == 1) {
              that.$vux.toast.show({
                text: "支付成功,快去分享给朋友吧！",
                type: "success",
                position: "middle",
                time: 1000
              });
              $.cookie("first", 0);
              that.$router.push({
                name: "tuiguang",
                params: {
                  x: $.cookie("link")
                }
              });
            } else {
              that.$vux.toast.show({
                text: "支付成功！",
                type: "success",
                position: "middle",
                time: 1000
              });
              that.$router.push({
                name: "zhongchou"
              });
            }
          } else {
            that.$vux.toast.show({
              text: "支付失败！",
              type: "warn",
              position: "middle",
              time: 1000
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.team {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #eaeaea;
  padding-top: 1.4rem;
  box-sizing: border-box;
}
.t_top {
  background: white;
  box-shadow: 0px 1px 6px 0px #ccc;
}
.icon-return {
  position: absolute;
  left: 4%;
  font-size: 0.6rem;
}
.fc99 {
  color: #ff5555;
}
.fc88 {
  color: #999;
}
.order {
  line-height: 1rem;
  padding: 0 4% 0;
  font-size: 0.36rem;
  background: white;
  margin-top: 1px;
}
.p {
  height: 1.8rem;
  padding: 0 4% 0;
  font-size: 0.36rem;
  background: white;
}
.icon-arrow {
  font-size: 0.5rem;
  line-height: 1.8rem;
  color: #999;
}
.c {
  padding-top: 0.3rem;
}
.c p {
  line-height: 0.6rem;
  border-left: 2px solid #eaeaea;
  padding-left: 0.3rem;
}
.img {
  line-height: 1.8rem;
  padding-right: 0.2rem;
}
img {
  /* display: block; */
  width: 0.9rem;
  vertical-align: middle;
}
.mt1 {
  margin-top: 1px;
}
</style>
