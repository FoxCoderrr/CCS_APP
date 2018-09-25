<template>
    <div class="team">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <span class="mx" @click="tomx">提现明细</span>
            <p class="fc00">推广佣金</p>
        </div>
        <div class="tt tac">
            <p>{{info[4]}}</p>
            <p>累计佣金 {{info[0]}} (元)</p>
        </div>
        <div class="l">
            <div class="ll">
                <span class="fl">可提现佣金</span>
                <span class="fr">{{info[4]}}</span>
            </div>
            <div class="ll">
                <span class="fl">已申请佣金</span>
                <span class="fr">{{info[1]}}</span>
            </div>
            <!-- <div class="ll">
                <span class="fl">待打款佣金</span>
                <span class="fr">{{info[2].money}}</span>
            </div> -->
            <div class="ll">
                <span class="fl">无效佣金</span>
                <span class="fr">{{info[3]}}</span>
            </div>
            <div class="ll">
                <span class="fl">成功提现佣金</span>
                <span class="fr">{{info[2]}}</span>
            </div>
            <div class="ll">注意：可用佣金满1元后才可以提现</div>
        </div>
        <p class="btn" @click="totixian">我要提现</p>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      info: []
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
        url: "/zongh",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        if (res.data.code != -1) {
          for (let i in res.data.msg) {
            that.info.push(parseFloat(res.data.msg[i]).toFixed(1));
          }
        }
      });
  },
  methods: {
    back() {
      this.$router.push({
        name:"mine"
      });
    },
    tomx() {
      this.$router.push({
        name: "txmx"
      });
    },
    totixian() {
      let that = this;
      that
        .$http({
          url: "/datash",
          method: "get",
          params: {
            id: $.cookie("id")
          }
        })
        .then(function(res) {
          if (res.data.bank_type != 0) {
            that.$vux.toast.show({
              text: "您还未通过银行卡绑定审核！",
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else if (1) {
            that.$router.push({
              name: "tixian",
              params:{
                e:that.info[4],
                bank:res.data.bank,
                rate:res.data.bili,

              }
            });
          } else {
            that.$vux.toast.show({
              text: "可用佣金未满1元！",
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
.mx {
  font-size: 0.36rem;
  line-height: 1.3rem;
  position: absolute;
  right: 4%;
}
.tt {
  font-size: 0.4rem;
  color: white;
  background: #6459f5;
  padding: 0.6rem 0 0.4rem;
}
.tt p:first-child {
  font-size: 0.5rem;
  line-height: 0.8rem;
}
.l {
  padding: 0.6rem 0 0;
}
.l .ll {
  margin-bottom: 1px;
}
.l .ll:first-child {
  margin-bottom: 0.6rem;
}
.l .ll:last-child {
  margin-top: 0.6rem;
  margin-bottom: 1rem;
}
.btn {
  width: 100%;
  text-align: center;
  color: white;
  background: #6459f5;
  line-height: 1rem;
  font-size: 0.36rem;
}
</style>
