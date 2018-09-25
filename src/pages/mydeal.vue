<template>
    <div class="set">
        <div class="t_top">
        <span class="iconfont icon-return" @click="back"></span>
        <p class="fc00">交易记录</p>
        </div>
        <p class="tac nonecon">即将上线，尽情期待！</p>
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

  },
  methods: {
    back() {
      this.$router.back();
    },

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

</style>
