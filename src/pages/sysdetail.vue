<template>
    <div class="set">
        <div class="t_top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{info.title}}</p>
        </div>
        <div class="c">
            <div v-html="info.content"></div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        info:""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    var url = "";
    if(that.$route.params.type=="sys"){
        url = "xiangxih"
    }else{
        url = "xiangqingh"
    }
    that
      .$http({
        url: "/"+url,
        method: "get",
        params: {
            id: that.$route.params.id,
        }
      })
      .then(function(res) {
          that.info = res.data.msg;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    todetail(id){
      
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
.c{
    padding: 0.2rem 4% 0.2rem;
}
</style>
