<template>
    <div class="set">
        <div class="t_top">
        <span class="iconfont icon-return" @click="back"></span>
        <p class="fc00">我要众筹</p>
        </div>
        <div class="c">
            <p class="tar">￥{{info.r_price}}</p>
            <div class="in ovh">
                <p class="fl br">众筹数量</p>
                <div class="fl input">
                    <input type="number" v-model="num">
                </div>
                <p class="fr bl">枚</p>
            </div>
            <p class="tac sy">众筹剩余数量：{{info.z_num}}枚</p>
            <p class="tar mt30">共计：<span class="fc">￥{{sum||0.00}}</span></p>
        </div>
        <p class="fc222 fc00">{{info.r_price}}元/枚，{{nummin}}枚起购，每人限购{{nummax}}枚</p>
        <p class="ovh bb">
            <span class="fr pay" @click="topay">立即支付</span>
            <span class="fr">需付：<span class="fc">${{sum||0.00}}</span></span>
        </p>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      num: "",
      nummin: "",
      nummax: "",
      info: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.back();
      error;
    };
    that
      .$http({
        url: "/consh",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.info = res.data;
        that.num = res.data.pay_min;
        that.nummin = res.data.pay_min;
        that.nummax = res.data.pay_max;
      });
  },
  computed: {
    sum() {
      let that = this;
      return parseFloat(that.num * 0.1).toFixed(2);
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: "mine"
      });
    },
    topay() {
      let that = this;
      if (
        Number(that.num) <= Number(that.nummax) &&
        Number(that.num) >= Number(that.nummin)
      ) {
        that
          .$http({
            url: "/payh",
            method: "get",
            params: {
              id: $.cookie("id"),
              num: that.num,
              money: that.sum
            }
          })
          .then(function(res) {
            let m = res.data.money;
            let n = res.data.num;
            let o = res.data.order;
            that.$router.push({
              name: "pay",
              params:{
                money:m,
                num:n,
                order:o
              }
            });
          });
      } else {
        that.$vux.toast.show({
          text: "请输入合理数量！",
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
.set {
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
  background: white;
  padding: 0.6rem 10% 0.6rem;
}
.in {
  border: 1px solid #ccc;
  line-height: 0.8rem;
  padding: 0 0.2rem 0;
  margin-top: 0.1rem;
}
input {
  width: 100%;
  line-height: 0.8rem;
  padding-left: 0.2rem;
}
.br {
  border-right: 1px solid #ccc;
  padding-right: 0.2rem;
}
.bl {
  border-left: 1px solid #ccc;
  padding-left: 0.2rem;
}
.sy {
  color: #999;
  margin-top: 0.2rem;
}
.fc {
  color: #ff5555;
}
.bb {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: white;
  box-shadow: 1px 0px 6px 0 #ccc;
  line-height: 1.2rem;
}
.pay {
  background: #ff5555;
  color: white;
  padding: 0 0.8rem 0;
  margin-left: 0.2rem;
  text-align: center;
}
.fc222 {
  font-size: 0.36rem;
  text-align: center;
  margin-top: 0.1rem;
}
</style>
