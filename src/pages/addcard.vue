<template>
    <div class="allinfo">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <p>添加银行卡</p>
        </div>
        <div class="xx">
            <div class="ll ovh">
                <span class="fl">真实姓名</span><input class="fl" type="text" v-model="uname">
            </div>
            <div class="ll ovh">
                <span class="fl">银行卡号</span><input class="fl" type="number" v-model="ucard">
            </div>
             <div class="ll ovh">
                <span class="fl">开户银行</span><input class="fl" type="text" v-model="ubank">
            </div>
            <p class="fc000 tac">请确保姓名和银行卡开户人为同一人</p>
        </div>
            <div>
            <div class="shili" v-if="!data1">
                <div>
                    <img class="sl" :src="path" alt="">示例
                </div>
              <img class="slimg" :src="path" alt="">
            </div>
            <div class="imgArea">
              <div class="imgs">
                      <div class="f-div">
                          <span v-if="data1 == ''" class="iconfont icon-iconfont7"></span>
                          <span v-if="data1 == ''" class="tipc">上传手持身份证正面</span>
                            <img v-if="data1 != ''" :src="data1||''" >
                            <input :disabled="data1!=''" type="file" id="pay" @change="pushImg($event)" accept="image/jpeg,image/png,image/gif" alt="">
                            <span class="clear" v-if="data1 != ''" @click="delImg($event)">
                              <span class="vux-close"></span>
                            </span>
                      </div>
              </div>
          </div>
        </div>
        <p class="btn" @click="sub">确定</p>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      data1: "",
      path: "",
      urll: "",
      uname: "",
      ucard: "",
      ubank: ""
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
        url: "/carouselh",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.path = "http://"+res.data.msg.yinhang;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    pushImg: function(e) {
      var that = this;
      let mm = this.mmm,
        file = e.target,
        reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      if (file.files[0].size > 10 * 1024 * 1024) {
        that.$vux.toast.show({
          text: "请上传小于10M的图片！",
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else {
        that.$vux.loading.show({
          text: "正在上传..."
        });
        reader.onload = function() {
          that.data1 = this.result;
          var image = new FormData();
          image.append("image", e.target.files[0]);
          that
            .$http({
              url: "/fileh",
              method: "post",
              data: image
            })
            .then(function(res) {
              that.$vux.loading.hide();
              that.urll = res.data.data;
            });
        };
      }
    },
    delImg: function(e) {
      this.data1 = "";
      let dom = document.getElementById("pay");
      dom.value = "";
    },
    sub() {
      let that = this;
      if (
        that.uname != "" &&
        that.ucard != "" &&
        that.ubank != "" &&
        that.urll != ""
      ) {
        that
          .$http({
            url: "/bankh",
            method: "get",
            params: {
              id: $.cookie("id"),
              real_name: that.uname,
              bankcard: that.ucard,
              bankname: that.ubank,
              bank_path: that.urll
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.alert.show({
                title: "确认",
                content: "提交成功，请等待审核！",
                onShow() {},
                onHide() {
                  that.$router.push({
                    name: "vinfo"
                  });
                }
              });
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "warn",
                position: "middle",
                time: 1000
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息！",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
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
.allinfo {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: scroll;
  min-height: 100%;
  background: #f5f5f5;
  font-size: 0.36rem;
  padding-top: 1.8rem;
  box-sizing: border-box;
}
.xx .ll:last-child {
  margin-top: 0.5rem;
}
.btn {
  width: 70%;
  text-align: center;
  line-height: 1rem;
  background: linear-gradient(to right, #4a7afe, #6b50f2);
  border-radius: 20px;
  color: white;
  margin: 0.8rem auto 1rem;
}
input {
  line-height: 1.1rem;
  padding-left: 0.2rem;
}
.fc000 {
  color: #e51c23;
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
}
.imgArea {
  width: 100%;
  box-sizing: border-box;
  padding: 0 14% 0;
  position: relative;
}
.imgArea img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.imgArea input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.imgArea .clear {
  font-size: 0.4rem;
  position: absolute;
  right: -0.3rem;
  top: 0;
  cursor: pointer;
}
.imgs {
  width: 100%;
  box-sizing: border-box;
}
.f-div {
  width: 100%;
  height: 4rem;
  position: relative;
  border: 1px dashed #ccc;
  background: white;
}
.icon-iconfont7 {
  position: absolute;
  color: #999;
  font-size: 2rem;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.tipc {
  position: absolute;
  color: #999;
  font-size: 0.3rem;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
}
.shili {
  width: 100%;
  box-sizing: border-box;
  padding: 0 14% 0;
  margin-bottom: 0.3rem;
}
.sl {
  width: 0.5rem;
  margin-right: 0.1rem;
}
.slimg {
  display: block;
  width: 100%;
  height: 4rem;
}
</style>

