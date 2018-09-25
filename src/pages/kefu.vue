<template>
    <div class="tg">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">客服中心</p>
        </div>
        <div class="c">
            <p class="fc00 tt tac">玩家交流群</p>
            <div class="ovh qun" v-if="qun">
                <p class="fl tac" v-for="(item,index) in qun" :key="index">{{item.names}}：{{item.card}}</p>
            </div>
            <div class="x" v-if="kefu">
            <div class="xx" v-for="(item,index) in kefu" :key="index">
                <img :src="item.path" alt="">
                <p class="fc00 tac q">{{item.names}}:{{item.card}}</p>
            </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import NativeShare from "nativeshare";
export default {
  data() {
    return {
      qun:[],
      kefu:[],
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
        url: "/customerh",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if(res.data.code!=-1){
              for(let i=0,l=res.data.msg.length;i<l;i++){
          if(res.data.msg[i].name==1){
            that.qun.push(res.data.msg[i])
          }else{
            that.kefu.push(res.data.msg[i])
          }
        }
        }
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
.tg {
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
.tt {
  font-size: 0.5rem;
}
.c {
  width: 90%;
  margin: 0 auto;
  background: white;
  box-sizing: border-box;
  padding: 0.6rem;
}
.qun {
  margin: 0.6rem 0 0.6rem;
  flex-wrap: wrap;
}
.qun p {
  /* width: 49%; */
  padding: 0 0.1rem 0;
  margin-bottom: 0.2rem;
}
.xx{
    border-bottom: 1px dashed  #6453f5;
    text-align: center;
}
.x .xx:last-child{
    border: none;
}
.q{
    font-size: 0.32rem;
    margin-bottom: 0.4rem;
}
</style>
