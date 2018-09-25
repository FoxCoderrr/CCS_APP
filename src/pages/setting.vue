<template>
    <div class="set">
        <div class="t_top">
        <span class="iconfont icon-return" @click="back"></span>
        <p class="fc00">系统设置</p>
        </div>

        <div class="c">
        <div class="ll ovh" v-if="info" v-for="(item,index) in info" :key="index" @click="todetail(item.id)">
            <p class="fl">{{item.title}}</p>
            <p class="fr"><span class="iconfont icon-arrow"></span></p>
        </div>
        <div class="ll ovh">
            <p class="fl">当前版本</p>
            <p class="fr">1.10</p>
        </div>
    </div>
    <p class="btn" @click="exit">退出登录</p>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    if (!$.cookie("id")) {
      that.$vux.toast.show({
        text: "请登录！",
        type: "cancel",
        position: "middle",
        time: 1000
      });
      that.$router.push({
        name:"login"
      })
    }
    that
      .$http({
        url: "/sysh",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if (res.data.code != -1) {
          that.info = res.data.msg;
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    todetail(id) {
      this.$router.push({
        name: "sysdetail",
        params: {
          id: id,
          type: "sys"
        }
      });
    },
    exit() {
      var that = this;
      that.$vux.confirm.show({
        title: "确认",
        content: "确定要退出登录吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$router.push({
            name: "login"
          });
          $.cookie("id", "");
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
.btn {
  width: 80%;
  background: linear-gradient(to right, #6b4ffa, #b519f3);
  text-align: center;
  line-height: 1rem;
  text-align: center;
  color: white;
  margin: 1.4rem auto 0;
}
</style>
