<template>
    <div class="team">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">充值记录</p>
        </div>
        <div class="con">
            <!-- <p class="d-flex tt">
                <span class="flex1 tac" :class="{se:nid==1}" @click="tap(1)">所有订单</span>
                <span class="flex1 tac" :class="{se:nid==2}" @click="tap(2)">交易成功</span>
            </p> -->
            <div class="cc" v-if="info">
               <div class="cl" v-for="(item,index) in info" :key="index">
                   <div class="ovh"><span class="fl">{{item.name}}</span><span class="level">{{"V"+item.level}}</span> </div>
                   <p class="ovh">
                       <span class="fl">众筹时间：{{item.time}}</span>
                       <span class="fr">订单号：{{item.order}}</span>
                   </p>
                   <p class="ovh">
                       <span class="fl">众筹金额：{{item.money}}</span>
                   </p>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      info:""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/infoh",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        if (res.data.code != -1) {
            for(let i=0,l=res.data.msg.length;i<l;i++){
                res.data.msg[i].time=res.data.msg[i].time.split(" ")[0];
            }
            that.info = res.data.msg;
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    tap(e) {
      this.nid = e;
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
  padding-top: 1.2rem;
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
  color: #9a9a9a;
}
.con .tt {
  font-size: 0.4rem;
  line-height: 0.8rem;
  background: white;
}
.tt span {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.cc {
  font-size: 0.36rem;
}
.tt .se {
  background: #6459f5;
  color: white;
  border-top: 1px solid #6459f5;
  border-bottom: 1px solid #6459f5;
}
.cl {
  padding: 0.4rem;
  background: white;
  box-shadow: 0px 0px 6px 2px #f0e3fa;
  margin: 0.3rem 0 0.3rem;
  line-height: 0.7rem;
}
.level{
    float: left;
    color: white;
    background: red;
    border-radius: 50%;
    text-align: center;
    line-height: 0.6rem;
    width: 0.6rem;
    margin-left: 0.1rem;
}
</style>
