<template>
    <div class="txmx">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">提现明细({{s||0}})</p>
        </div>
        <div class="tt">
            <p>预计佣金：+{{s||0.00}}元</p>
        </div>
        <div class="tab">
            <tab custom-bar-width="40px" :scroll-threshold="5" bar-active-color="#6459f5" active-color="#6459f5" default-color="black">
                <tab-item selected  @click.native="navTap(1)">全部</tab-item>
                <tab-item @click.native="navTap(2)">待审核</tab-item>
                <!-- <tab-item @click.native="navTap(3)">待打款</tab-item> -->
                <tab-item @click.native="navTap(3)">已打款</tab-item>
                <tab-item @click.native="navTap(4)">无效</tab-item>
            </tab>
        </div>
        <div class="cc">
            <div v-if="show" class="cc1" v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
              <div v-if="info1">
                <div v-for="(item,index) in info1" :key="index">
                <p class="ttime">{{item.title}}</p>
                <div class="ll" v-for="(item2,index) in item.con" :key="index">
                    <p class="ovh">
                        <span class="fl">佣金提现--到{{item2.bank}}</span>
                        <span class="fr">{{item2.money}}</span>
                    </p>
                    <p class="ovh">
                        <span class="fl fc11">{{item2.time}}</span>
                        <span v-if="item2.type==1" class="fr fc00">待审核</span>
                        <!-- <span v-if="item2.type==2" class="fr fc00">待打款</span> -->
                        <span v-if="item2.type==2" class="fr fc00">已打款</span>
                        <span v-if="item2.type==3" class="fr fc00">无效</span>
                    </p>
                </div>
                </div>
              </div>
              <load-more v-if="lif1" :show-loading="load1" tip="正在加载"></load-more>
              <load-more v-if="nif1" :show-loading="none1" tip="没有更多数据了" background-color="black"></load-more>
            </div>
            <div v-if="show2" v-infinite-scroll="loadMore1" infinite-scroll-disabled="loading1" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
              <div class="cc2" v-if="info2"  v-for="(item,index) in info2" :key="index">
                <p class="ovh ct2">
                    <span class="fl">出账金额</span>
                    <span class="fr">￥{{item.num}}</span>
                </p>
                <div class="list">
                    <p class="ovh cl2">
                        <span class="fl">当前状态</span>
                        <span v-if="nid==2" class="fr fc00">待审核</span>
                        <!-- <span v-if="nid==3" class="fr fc00">待打款</span> -->
                        <span v-if="nid==3" class="fr fc00">已打款</span>
                        <span v-if="nid==4" class="fr fc00">无效</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">商品</span>
                        <span class="fr">提现</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">提现金额</span>
                        <span class="fr">{{item.money}}</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">预计佣金</span>
                        <span class="fr">{{item.poundage}}</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">提现申请时间</span>
                        <span class="fr">{{item.time}}</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">预计到账时间</span>
                        <span class="fr">{{item.times}}</span>
                    </p>
                    <p class="ovh cl2">
                        <span class="fl">提现银行卡</span>
                        <span class="fr">{{item.bank}}</span>
                    </p>
                    <p class="ovh cl2" v-if="nid==4">
                        <span class="fl">无效原因</span>
                        <span class="fr">{{item.reason}}</span>
                    </p>
                </div>
              </div>
            <load-more v-if="lif1" :show-loading="load1" tip="正在加载"></load-more>
            <load-more v-if="nif1" :show-loading="none1" tip="没有更多数据了" background-color="black"></load-more>
            </div>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, LoadMore } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      show: true,
      show2: false,
      info1: [],
      info2: [],
      s: "",
      page: 1,
      load1: true,
      none1: false,
      lif1: false,
      nif1: false,
      loading1: false,
    };
  },
  components: {
    Tab,
    TabItem,
    LoadMore
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.back();
      error;
    };
    that.getc1();
  },
  methods: {
    back() {
      this.$router.push({
        name:"tgyj"
      });
    },
    loadMore1() {
      let that = this;
      that.lif1 = true;
      that.page++;
      if (that.nid == 1) {
        that.getc1();
      } else {
        that.getc2(that.nid);
      }
    },
    navTap(i) {
      let that = this;
      that.loading1 = false;
      that.page=1;
      that.lif1 = true;
      that.nif1 = false;
      that.info1=[];
      that.info2=[];
      that.nid = i;
      if (i == 1) {
        this.show = true;
        this.show2 = false;
        that.getc1();
      } else {
        that.show = false;
        that.show2 = true;
        that.getc2(i);
      }
    },
    getc1() {
      let that = this;
      that
        .$http({
          url: "/cashh",
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
            that.s = parseFloat(res.data.data).toFixed(2);
              let arr = [];
              let obj = {};
              let x = 0;
              for (let i in res.data.msg) {
                obj = {};
                obj.title = i;
                obj.con = res.data.msg[i];
                arr.push(obj);
              }
              arr.sort(function(a, b) {
                return a.title - b.title;
              });
              if (that.page > 1) {
                console.log(that.info1);
                console.log(that.info1[that.info1.length - 1].title);
                console.log(arr[0].title);
                if (that.info1[that.info1.length - 1].title == arr[0].title) {
                  that.info1[that.info1.length - 1].con = that.info1[
                    that.info1.length - 1
                  ].con.concat(arr[0].con);
                  arr.shift();
                  that.info1 = that.info1.concat(arr);
                } else {
                  that.info1 = that.info1.concat(arr);
                }
              } else {
                that.info1 = arr;
              }
          } else {
            if(that.page==1){
              that.show = false;
            }else{
              that.nif1=true;
              that.loading1=true;
            }
          }
        });
    },
    getc2(i) {
      let that = this;
      that
        .$http({
          url: "/cashsh",
          method: "get",
          params: {
            id: $.cookie("id"),
            page:that.page,
            type:i-1,
            limit:5,
          }
        })
        .then(function(res) {
          that.lif1 = false;
          if (res.data.code != -1) {
            that.info2 = that.info2.concat(res.data.msg);
          } else {
            if(that.page==1){
              that.show2 = false;
            }else{
              that.nif1=true;
              that.loading1=true;
            }
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
.txmx {
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
.tt {
  font-size: 0.36rem;
  color: white;
  background: #6459f5;
  box-sizing: border-box;
  padding: 0.3rem 0 0.3rem 6%;
}
.tab {
  box-shadow: 0px 4px 6px -1px #f0e3fa;
  overflow: hidden;
}
.cc {
  padding: 0.4rem 2% 0.4rem;
}
.cc2 {
  width: 96%;
  margin: 0 auto 0.2rem;
  box-shadow: 0px 0px 6px 0px #f0e3fa;
  background: white;
  border-radius: 6px;
  border: 1px solid #f0e3fa;
  padding-bottom: 0.2rem;
}
.ct2,
.list {
  padding: 0 4% 0;
}
.ct2 {
  font-size: 0.46rem;
  line-height: 1.2rem;
  border-bottom: 1px solid #f0e3fa;
}
.cl2 {
  color: #999;
  line-height: 0.8rem;
}
.cc1 .ll {
  line-height: 0.6rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  font-size: 0.34rem;
  margin-bottom: 1px;
}
.fc11 {
  color: #999;
}
.ttime {
  line-height: 0.8rem;
}
</style>
