<template>
    <div class="wk">
       <div class="t_img">
         <img src="../assets/t1.png" alt="">
       </div>
        <p class="tac nonecon">即将上线，尽情期待！</p>
        <!-- <div class="con">
            <div class="cc" v-if="info"  v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10"  infinite-scroll-immediate-check=true>
              <a v-for="(item,index) in info" :key="index" :href="item.skipURL||item.url">
               <div class="d-flex">
                 <div class="flex3 tal">
                   <p>{{item.title}}</p>
                    <p class="tal ptime">{{item.ptime}}</p>
                 </div>
                 <div class="flexx tar">
                   <img :src="item.imgsrc" alt="">
                 </div>
               </div>
              </a>
              <load-more v-if="lif1" :show-loading="load1" tip="正在加载"></load-more>
              <load-more v-if="nif1" :show-loading="none1" tip="没有更多数据了"></load-more>
            </div>
        </div>
        <span class="iconfont icon-tubiao02" @click="totop"></span> -->
    </div>
</template>
<script>
import $ from "jquery";
import { LoadMore } from "vux";
export default {
  data() {
    return {
      info: [],
      page: 10,
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
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".wk").css("minHeight", height);
    that.getc();
  },
  methods: {
    back() {
      this.$router.back();
    },
    tap(e) {
      this.nid = e;
    },
    totop(){
      $("html,body").animate({scrollTop:0},200);
    },
    loadMore1() {
      let that = this;
      that.lif1 = true;
      that.page += 10;
      that.getc();
    },
    getc() {
      let that = this;
      that
        .$http({
          url: "/xinwen",
          method: "get",
          params: {
            page: that.page
          }
        })
        .then(function(res) {
          that.lif1 = false;
          if (res.data.msg != "新闻为空") {
            let a = '{"' + res.data.msg + "}";
            let obj = JSON.parse(a);
            that.info = that.info.concat(obj.BBM54PGAwangning);
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
.wk {
  /* position: absolute; */
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  /* background: url("../assets/bg1.jpg");
  background-size: 100% 100%;
  color: white; */
  overflow: hidden;
  font-size: 0.4rem;
}
.t_top {
  background-color: rgba(100, 89, 245, 0.5);
}
.fs000 {
  font-size: 0.5rem;
}
.con {
  padding: 0 0.2rem 1.4rem;
  font-size: 0.42rem;
}
.con img {
  width: 90%;
}
.d-flex {
  margin-top: 0.2rem;
}
.flexx {
  flex: 1.6;
}
.ptime{
  color: #999;
  font-size: 0.34rem;
  padding-top: 0.2rem;
}
.icon-tubiao02{
  position: fixed;
  right: 2%;
  bottom: 1.8rem;
  font-size: 1rem;
  color: #b519f3;
}
</style>

