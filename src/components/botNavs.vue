<template>
  <div class="footer">
    <div class="con d-flex">
        <router-link tag="div"  class="flex1 tac" :to="{ name:'jishi' }">
          <p>
            <span class="icon1"></span>
          </p>
          社群
        </router-link>
        <router-link tag="div"  class="flex1 tac" :to="{ name:'wakuang' }">
          <p>
            <span class="icon2"></span>
          </p>
          资讯
        </router-link>
        <router-link tag="div"  class="flex1 tac" :to="{ name:'dongtai' }">
          <p>
            <span class="icon3"></span>
          </p>
          商城
        </router-link>
        <router-link tag="div"  class="flex1 tac" :to="{ name:'jiaoyi' }">
          <p>
            <span class="icon4"></span>
          </p>
          行情
        </router-link>
        <router-link tag="div"  class="flex1 tac" :to="{ name:'mine' }">
          <p>
            <span class="icon5"></span>
          </p>
          我的
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nid: 0,
      bshow:true
    };
  },
  mounted(){
    let that = this;
  },
  methods: {
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 1.1rem;
  position: fixed;
  bottom: 0;
  padding-top: 6px;
  background: #130d35;
  z-index: 999;
  color: white;
  margin: 0 auto;
}
.con{
  width: 100%;
}
.flex1 p{
  width: 100%;
  text-align: center;
}
.flex1 span {
  display: block;
  margin: 0 auto;
  width: 0.58rem;
  height: 0.58rem;
  background-size: 100% 100%;
}
.flex1 .icon1{
  background-image: url("../assets/sq.png");
}
.flex1 .icon2{
  background-image: url("../assets/zx.png");
}
.flex1 .icon3{
  background-image: url("../assets/sc.png");
}
.flex1 .icon4{
  background-image: url("../assets/hq.png");
}
.flex1 .icon5{
  background-image: url("../assets/wd.png");
}
.router-link-exact-active .icon1{
  background-image: url("../assets/sq1.png");
}
.router-link-exact-active .icon2{
  background-image: url("../assets/zx1.png");
}
.router-link-exact-active .icon3{
  background-image: url("../assets/sc1.png");
}
.router-link-exact-active .icon4{
  background-image: url("../assets/hq1.png");
}
.router-link-exact-active .icon5{
  background-image: url("../assets/wd1.png");
}
</style>

