<template>
  <div class="jishi">
    <!-- <div class="imgs">
            <img src="../assets/huanying.png" alt="">
            <img src="../assets/huoxing.png" alt="">
        </div>
        <p class="fc00">你是火星第<span class="fc">1568504</span>位移民</p>
        <div class="con">
             <swiper loop auto :interval=2500 class="scroll" :show-dots="false">
                <swiper-item v-for="(item,index) in list" :key="index">
                    <div>
                        <img src="../assets/kj.png" alt="">
                        <p class="mname">{{item.name}}</p>
                        <p>算力：0.90~1.00</p>
                        <p>运行周期：330天</p>
                        <p>收益总量：0.90~1.00</p>
                        <p>24小时产量：0.90~1.00</p>
                        <div class="buybtn">
                            <span class="iconfont icon-gouwucheman"></span>
                            <span>{{item.price}}CCS</span>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>
       -->
    <div class="t_img">
      <img @click="toDemo" src="../assets/t1.png" alt="">
    </div>
    <p class="tac nonecon">即将上线，尽情期待！</p>
  </div>
</template>
<script>
import $ from "jquery";
import { Swiper, SwiperItem } from "vux";
export default {
  data() {
    return {
      list: ""
    };
  },
  components: {
    Swiper,
    SwiperItem
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
    $(".jishi").css("minHeight", height);
    // 矿机
    // that
    //   .$http({
    //     url: "/indexm",
    //     method: "get",
    //     params: {}
    //   })
    //   .then(function(res) {
    //     that.list = res.data.msg;
    //   });
  },
  methods:{
    toDemo(){
      this.$router.push({
        name:"demo"
      })
    }
  }
};
</script>
<style scoped>
.jishi {
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

.imgs img:first-child {
  display: block;
  width: 60%;
  margin: 0.6rem auto 0;
}

.imgs img:last-child {
  display: block;
  width: 24%;
  margin: 0.2rem auto 0;
}

p {
  text-align: center;
  letter-spacing: 0.02rem;
}

.scroll {
  width: 80%;
  margin: 0.6rem auto;
  background-color: rgba(100, 89, 245, 0.6);
  border-radius: 10px;
  padding: 0.9rem 0 0.8rem;
}
.scroll img {
  display: block;
  margin: 0 auto;
}

.con {
  margin-bottom: 2rem;
}

.con p {
  line-height: 0.6rem;
}

.con .mname {
  font-size: 0.44rem;
  font-weight: 700;
  line-height: 1rem;
}

.buybtn {
  width: 46%;
  margin: 0.4rem auto 0;
  border-radius: 20px;
  background: #6c4ffb;
  line-height: 1rem;
  text-align: center;
}
</style>
