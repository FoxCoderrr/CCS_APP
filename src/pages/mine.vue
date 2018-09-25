<template>
    <div class="m">
        <div class="t_top">
           <div class="qd fl" @click="toqd">
             <img src="../assets/qd.png" alt=""> 签到
           </div>
           <!-- <div class="xx fr">
             <img src="../assets/xx.png" alt="">
           </div> -->
        </div>
        <div class="uinfo">
          <img @click="tovinfo" class="logo" src="../assets/APPlogo.png" alt="">
          <div class="d-flex">
            <!-- <div class="flex1 tac">
              <p>ID: 102564582</p>
              <p class="mt10">等级: 普通矿工</p>
            </div>
            <div class="flex1 tac s">
              <img @click="tosys" src="../assets/sys.png" alt="">
              <img src="../assets/ewm.png" alt="">
            </div> -->
            <div class="flex1 tac">
              <p>今日增值</p>
              <p class="fc00">0.00</p>
              <p class="t_btn" @click="tojyzx">交易大厅</p>
            </div>
            <div class="flex2 tac">
              <p>{{info.name}}</p>
              <p>[每日糖果价格：{{info.r_price||0.00}}元]</p>
            </div>
            <div class="flex1 tac">
              <p>糖果</p>
              <p class="fc00">{{info.rxb||0}}</p>
              <p class="t_btn" @click="tozc">我要众筹</p>
            </div>
          </div>
          <div class="mm">
            <!-- <p>
              <img src="../assets/qb.png" alt="">
              <span>钱包地址: </span>
              <span class="madr">qwdgfavsdasdsdasdsadasda</span>
              <span class="fzbtn fr">复制</span>
            </p> -->
            <div class="ovh">
              <p class="fl tal">
                <img src="../assets/ky.png" alt="">
                可用糖果数量: <span class="fc00">{{money[0]||0.000}}</span> 
              </p>
              <p class="fr tar">
                <img src="../assets/dj.png" alt="">
                冻结糖果数量: <span class="fc00">{{money[1]||0.000}}</span> 
              </p>
            </div>
          </div>
        </div>
          <div class="nav">
            <div class="d-flex">
              <div class="flex1 tac">
                <router-link :to="{name:'tuiguang',params:{x:tjm}}">
                <div>
                  <img src="../assets/m1.png" alt="">
                  <p>推广二维码<span></span></p>
                </div>
                </router-link>
              </div>
              <div class="flex1 tac">
                <router-link :to="{name:'team'}">
                <div>
                  <img src="../assets/m6.png" alt="">
                  <p>我的战队<span></span></p>
                </div>
                </router-link>
              </div>
              <div class="flex1 tac">
                <router-link :to="{name:'czjl'}">
                <div>
                  <img src="../assets/cz.png" alt="">
                  <p>充值记录<span></span></p>
                </div>
                </router-link>
              </div>
            </div>
            <div class="d-flex">
              <div class="flex1 tac">
                <router-link :to="{name:'tgyj'}">
                <div>
                  <img src="../assets/m3.png" alt="">
                  <p>推广佣金<span></span></p>
                </div>
                </router-link>
              </div>
              <div class="flex1 tac">
                <router-link :to="{name:'yjmx'}">
                <div>
                  <img src="../assets/m4.png" alt="">
                  <p>佣金明细<span></span></p>
                </div>
                </router-link>
              </div>
              <div class="flex1 tac">
                <router-link :to="{name:'mydeal'}">
                <div>
                  <img src="../assets/m2.png" alt="">
                  <p>我的交易<span></span></p>
                </div>
                </router-link>
              </div>
            </div>
            <div class="d-flex">
              <div class="flex1 tac">
                <router-link :to="{name:'setting'}">
                <div>
                  <img src="../assets/m9.png" alt="">
                  <p>系统设置<span></span></p>
                </div>
                </router-link>
              </div>
             <div class="flex1 tac">
                <router-link :to="{name:'kefu'}">
                <div>
                  <img src="../assets/m7.png" alt="">
                  <p>客户服务<span></span></p>
                </div>
                </router-link>
              </div>
              <div class="flex1 tac">
                <router-link :to="{name:'help'}">
                <div>
                  <img src="../assets/m8.png" alt="">
                  <p>帮助说明<span></span></p>
                </div>
                </router-link>
              </div>
            </div>
            <!-- <div class="d-flex">
              <div class="flex1 tac">
                <div>
                  <img src="../assets/m10.png" alt="">
                  <p>商城<span></span></p>
                </div>
              </div>
              <div class="flex1 tac">
                <div>
                  <img src="../assets/m11.png" alt="">
                  <p>好友<span></span></p>
                </div>
              </div>
              <div class="flex1 tac">
                <div>
                  <img src="" alt="">
                  <p></p>
                </div>
              </div>
            </div> -->
          </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info:"",
      umoney:[],
      tjm:$.cookie("link")
    };
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
    $(".m").css("minHeight", height);
    that
      .$http({
        url: "/myh",
        method: "get",
        params: {
         id:$.cookie("id")
        }
      })
      .then(function(res) {
        that.info = res.data;
        that.umoney.push(parseFloat(res.data.use));
        that.umoney.push(parseFloat(res.data.freeze));
      });
  },
  computed: {
    money() {
      let that = this;
      let arr = [];
      for (let i = 0, l = that.umoney.length; i < l; i++) {
        if (!that.umoney[i] || that.umoney[i] == 0) {
          arr.push("0.000");
        } else {
          let intPart = Math.floor(Number(that.umoney[i])); //获取整数部分
          let intPartFormat = intPart
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

          let floatPart = ".000"; //预定义小数部分
          let value2Array = that.umoney[i].toString().split(".");

          //=2表示数据有小数位
          if (value2Array.length == 2) {
            floatPart = value2Array[1].toString(); //拿到小数部分

            if (floatPart.length == 1) {
              //补0,实际上用不着
              arr.push(intPartFormat + "." + floatPart + "00");
            } else if (floatPart.length == 2) {
              arr.push(intPartFormat + "." + floatPart + "0");
            } else {
              arr.push(intPartFormat + "." + floatPart);
            }
          } else {
            arr.push(intPartFormat + floatPart);
          }
        }
      }
      return arr;
    }
  },
  methods: {
    tosys() {
      this.$router.push({
        name: "demo"
      });
    },
    toqd() {
      this.$router.push({
        name: "qiandao"
      });
    },
    tovinfo() {
      this.$router.push({
        name: "vinfo"
      });
    },
    tozc() {
      this.$router.push({
        name: "zhongchou"
      });
    },
    tojyzx(){
      this.$router.push({
        name:"jyzx"
      })
    }
  }
};
</script>
<style scoped>
.m {
  /* position: absolute; */
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  background: white;
  background-size: 100% 100%;
  color: white;
  font-size: 0.4rem;
  overflow: hidden;
}
.t_top {
  height: 4.4rem;
  position: relative;
  width: 100%;
  background: url("../assets/bg0.png") no-repeat;
  font-size: 0.34rem;
  padding: 0.2rem 4% 0;
  box-sizing: border-box;
  background-size: 100%;
}
.t_top .qd img,
.t_top .xx img {
  width: 0.64rem;
  vertical-align: sub;
}
.uinfo {
  width: 90%;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  /* transform: translateY(-2.4rem); */
  margin-top: -2.4rem;
  box-sizing: border-box;
  padding: 1.1rem 0 0.6rem;
  position: relative;
  box-shadow: 0px 0px 8px 1px #f0e3fa;
  color: black;
  font-size: 0.32rem;
  display: block;
  z-index: 9999;
}
.uinfo .logo {
  position: absolute;
  width: 3rem;
  top: 0;
  left: 50%;
  transform: translate(-50%, -44%);
}
.uinfo .s img {
  padding-top: 0.1rem;
  width: 1rem;
  z-index: 999;
}
.uinfo .s img:first-child {
  margin-right: 0.4rem;
}
.mm {
  width: 100%;
  box-sizing: border-box;
  padding: 0 2% 0;
  font-size: 0.32rem;
}
.mm img {
  width: 0.54rem;
  vertical-align: sub;
}
.nav {
  color: black;
  padding: 0.6rem 4% 1rem;
}
.nav img {
  width: 1.4rem;
}

.nav .flex1 div p {
  margin: 0.34rem 0 0.5rem;
}
.madr {
  font-size: 0.3rem;
  display: inline-block;
  border: 1px solid #ccc;
  padding: 2px 6px;
  width: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.fzbtn {
  border-radius: 10px;
  background: linear-gradient(to top right, #795afa, #b848f4);
  color: white;
  padding: 4px 10px;
  font-size: 0.32rem;
  vertical-align: bottom;
}
.uinfo .flex1 {
  transform: translateY(-0.6rem);
}
.uinfo p {
  line-height: 0.5rem;
}
.uinfo .t_btn {
  display: inline-block;
  line-height: 0.6rem;
  padding: 0 8px 0;
  border-radius: 10px;
  background: #795afa;
  margin-top: 0.2rem;
  color: white;
}
@media screen and (max-width: 360px) {
  .mm .ovh p {
    float: none;
    text-align: left;
    margin-top: 4px;
  }
}
</style>
