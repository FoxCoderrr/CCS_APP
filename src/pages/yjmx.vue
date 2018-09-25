<template>
    <div class="team">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">佣金明细</p>
        </div>
        <div class="con">
            <div class="cc" v-if="info"  v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
               <div class="cl" v-for="(item,index) in info" :key="index">
                   <div class="ovh"><span class="fl">{{item.name}}</span><span class="level">{{"V"+item.level}}</span> </div>
                   <p class="ovh">
                       <span class="fl">众筹时间：{{item.time}}</span>
                       <span class="fr">订单号：{{item.order}}</span>
                   </p>
                   <p class="ovh">
                       <span class="fl">众筹金额：{{item.num}}</span>
                       <span class="fr">应收佣金：{{item.nums}}</span>
                   </p>
               </div>
               <load-more v-if="lif1" :show-loading="load1" tip="正在加载"></load-more>
              <load-more v-if="nif1" :show-loading="none1" tip="没有更多数据了"></load-more>
            </div>
        </div>
    </div>
</template>
<script>
import { LoadMore } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      info: [],
      page: 1,
      loading1: false,
      load1: true,
      none1: false,
      lif1: false,
      nif1: false
    };
  },
  components: {
    LoadMore
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that.getc();
  },
  methods: {
    back() {
      this.$router.back();
    },
    tap(e) {
      this.nid = e;
    },
    loadMore1() {
      let that = this;
      that.lif1 = true;
      that.page++;
      that.getc();
    },
    getc() {
      let that = this;
      that
        .$http({
          url: "/commissionh",
          method: "get",
          params: {
            id: $.cookie("id"),
            page: that.page,
            limit: 10
          }
        })
        .then(function(res) {
          that.lif1 = false;
          if (res.data.code != -1) {
            for (let i = 0, l = res.data.msg.length; i < l; i++) {
              res.data.msg[i].time = res.data.msg[i].time.split(" ")[0];
            }
            that.info = that.info.concat(res.data.msg);
          } else {
            that.nif1 = true;
            that.loading1 = true;
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
.level {
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
