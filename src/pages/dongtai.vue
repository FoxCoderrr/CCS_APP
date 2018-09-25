<template>
    <div class="dt">
      <div class="w">
      <!-- <div class="div" v-for="(item,index) in list" :key="index">
        <a :href="item.link">
          <img :src="item.path" alt="">
          <p>{{item.name}}</p>
        </a>
      </div> -->
      <iframe :src="link" frameborder="0" width="100%" :height="h"></iframe>
      </div>
    </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      nid: 1,
      link: "",
      h:"",
    };
  },
  components: {},
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
    let height1 = $(".footer").height();
    that.h=height-height1;
    that
      .$http({
        url: "/shoplinkh ",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if (res.data.code == 0) {
          that.link = res.data.msg[0].link;
          // window.location.href = res.data.msg[0].link;
        }
      });
  },
  methods: {
    navTap(i) {}
  }
};
</script>
<style scoped>
.dt {
  /* position: absolute; */
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  color: black;
  font-size: 0.4rem;
  overflow: hidden;
}
.w {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
}
.div {
  float: left;
  text-align: center;
  padding: 0 0.2rem 0;
}
.w img {
  display: block;
  /* width: 1.1rem;
  height: 1.1rem; */
  border-radius: 10px;
  margin: 0 auto 0.1rem;
}
</style>
