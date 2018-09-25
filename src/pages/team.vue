<template>
    <div class="team">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p class="fc00">我的战队({{info.tcount}})</p>
        </div>
        <div class="con">
            <p class="d-flex tt">
                <span class="flex1 tac" :class="{se:nid==1}" @click="tap(1)">直推({{info.count}})</span>
                <span class="flex1 tac" :class="{se:nid==2}" @click="tap(2)">团队({{info.tcount}})</span>
            </p>
              <div class="cc" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
                  <div class="d-flex" v-for="(item,index) in list" :key="index">
                      <span class="flex1 tac"><span class="limit">{{item.name}}</span></span>
                      <span class="flex1 tal">ID:{{item.id}}</span>
                      <span class="flex4 tar">注册时间：{{item.createtime}}</span>
                  </div>
                  <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
                  <load-more v-if="nif" :show-loading="none" tip="没有更多数据了" background-color="black"></load-more>
              </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { LoadMore } from "vux";
export default {
  data() {
    return {
      nid: 1,
      info: "",
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: false,
      nif: false,
      loading: false
    };
  },
  components: {
    LoadMore
  },
  mounted() {
    let that = this;
    that.getc1();
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/xinxih",
        method: "get",
        params: {
          id: $.cookie("id")
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
    tap(e) {
      let that = this;
      that.lif = true;
      that.nif = false;
      that.list = [];
      that.loading = false;
      that.page = 1;
      this.nid = e;
      if (e == 1) {
        that.getc1();
      } else {
        that.getc2();
      }
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      if (that.nid == 1) {
        that.getc1();
      } else {
        that.getc2();
      }
    },
    getc1() {
      let that = this;
      that
        .$http({
          url: "/zhituih",
          method: "get",
          params: {
            id: $.cookie("id"),
            page: that.page,
            limit: 20
          }
        })
        .then(function(res) {
          if (res.data.code != -1) {
            that.lif = false;
            if (res.data.code == -2) {
              that.nif = true;
              that.loading = true;
            } else {
              that.list = that.list.concat(res.data.msg);
            }
          } else {
            that.list = "";
          }
        });
    },
    getc2() {
      let that = this;
      that
        .$http({
          url: "/teamh",
          method: "get",
          params: {
            id: $.cookie("id"),
            page: that.page,
            limit: 20
          }
        })
        .then(function(res) {
          if (res.data.code != -1) {
            that.lif = false;
            if (res.data.code == -2) {
              that.nif = true;
              that.loading = true;
            } else {
              that.list = that.list.concat(res.data.msg);
            }
          } else {
            that.list = "";
          }
        });
    }
  }
};
</script>
<style scoped>
.team {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #eaeaea;
  padding-top: 1.5rem;
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
.con {
  padding: 0 4% 0;
  box-sizing: border-box;
}
.con .tt {
  font-size: 0.4rem;
  line-height: 0.8rem;
  background: white;
}
.tt span {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.tt span:first-child {
  border-left: 1px solid #ccc;
}
.tt span:last-child {
  border-right: 1px solid #ccc;
}
.cc {
  font-size: 0.36rem;
  color: #5c5c5c;
  padding-top: 0.1rem;
}
.cc .d-flex {
  line-height: 0.9rem;
}
.tt .se {
  background: #6459f5;
  color: white;
  border: 1px solid #6459f5 !important;
}
.limit {
  display: inline-block;
  vertical-align: bottom;
  max-width: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
