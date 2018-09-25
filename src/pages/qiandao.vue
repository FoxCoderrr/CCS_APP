<template>
    <div class="qd">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <!-- <p class="btn btn1" :class="{btn2:msg=='今日已签到'}" @click="qiandao">{{msg}}</p> -->
            <p class="fc00">每日签到</p>
        </div>
        <!-- <div class="rl">
            <inline-calendar
                ref="calendar"
                class="rl"
                show.sync
                highlight-weekend
                :return-six-rows="six"
                hide-header
                @on-change="change"
                :render-function="buildSlotFn">
            </inline-calendar>
        </div> -->
       <p class="tac nonecon">即将上线，尽情期待！</p>
    </div>
</template>
<script>
import $ from "jquery";
import { InlineCalendar } from "vux";
export default {
  data() {
    return {
      msg: "",
      six: false,
      list: []
    };
  },
  components: {
    InlineCalendar
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/look",
        method: "get",
        params: {
          id: $.cookie("id"),
          year: new Date().getFullYear(),
          month: Number(new Date().getMonth()) + 1
        }
      })
      .then(function(res) {
        that.list = res.data.msg;
        if (res.data.data == 1) {
          that.msg = "今日已签到";
        } else {
          that.msg = "签到";
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    buildSlotFn(line, index, data) {
      let that = this;
      return that.list.indexOf(data.date) != -1
        ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>'
        : '<div style="height:19px;"></div>';
    },
    qiandao() {
      let that = this;
      if (that.msg == "签到") {
        that
          .$http({
            url: "/sign",
            method: "get",
            params: {
              id: $.cookie("id")
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.toast.show({
                text: "签到成功！",
                type: "success",
                position: "middle",
                time: 1000
              });
              that.msg = "今日已签到";
              that.list.push(new Date().getDate());
              that.buildSlotFn(line, index, data);
            }
          });
      }
    },
    change() {}
  }
};
</script>
<style scoped>
.qd {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  overflow: scroll;
  background: #eaeaea;
  padding-top: 1.8rem;
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
.rl {
  background: #f5f5f5;
  width: 96%;
  margin: 0 auto;
  border-radius: 4px;
}
.btn {
  font-size: 0.36rem;
  line-height: 1.3rem;
  position: absolute;
  right: 4%;
}
.btn1 {
  color: #6459f5;
}
.btn2 {
  color: #999;
}
</style>
