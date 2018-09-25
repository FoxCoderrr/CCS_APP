<template>
    <div class="set">
        <div class="t_top">
        <span class="iconfont icon-return" @click="back"></span>
        <p class="fc00">帮助说明</p>
        </div>
        <div class="c" v-if="info">
        <div class="ll ovh"  v-for="(item,index) in info" :key="index" @click="todetail(item.id)">
            <p class="fl">{{item.title}}</p>
            <p class="fr"><span class="iconfont icon-arrow"></span></p>
        </div>
    </div>
    </div>
</template>
<script>
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
    that
      .$http({
        url: "/helph",
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
          type: "help"
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
.ll {
  line-height: 0.9rem !important;
}
</style>
