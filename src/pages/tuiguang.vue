<template>
    <div class="tg">
        <div class="t_top">
            <span class="iconfont icon-return" @click="back"></span>
            <!-- <span class="mx" @click="tojl">我的奖励</span> -->
            <p class="fc00">推广二维码</p>
        </div>
        <div class="tgcon">
          <img class="tjimg" src="../assets/tj.png" alt="">
          <div class="ewm tac">
          <qrcode :value="links" type="img" fg-color="#6449e9" :size="90"></qrcode>
          </div>
          <p class="tac fc00 fc000">您的二维码</p>
          <p class="tac fc00 sbtn" @click="showdg">立即分享</p>
          <div class="soshm d-flex tac"></div>
          <p class="line"></p>
          <p class="tac fc11 mt30 fc00">我的推荐链接</p>
          <p class="tac ovh">

          <span class="link fl">{{links}}</span><img v-clipboard:copy="msg"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError" class="fz fl" src="../assets/sh.png" alt="">
          </p>
        </div>
        <div class="mask">
          <div class="dcon">
            <div class="d-flex">
              <div @click="share('qqFriend')" class="flex1 tac">QQ</div>
              <div @click="share('wechatFriend')" class="flex1 tac">微信</div>
              <div @click="share('wechatTimeline')" class="flex1 tac">朋友圈</div>
              <div @click="share('weibo')" class="flex1 tac">微博</div>
            </div>
            <p @click="hides">取消</p>
          </div>
        </div>
    </div>
</template>
<script>
import NativeShare from "nativeshare";
import { Qrcode } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      msg: "",
      dialog: false,
      links: "http://ccsserve.qilinpz.com/ccsh5/#/register/" + $.cookie("link"),
      xx: ""
    };
  },
  components: {
    Qrcode
  },
  created() {
    let that = this;
    if (!$.cookie("link")) {
      that.$router.push({
        name: "register",
        params: {
          pre: that.$route.params.x
        }
      });
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.back();
      $(".mask").fadeOut("fast");
      error;
    };
    that
      .$http({
        url: "/headh",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.xx = res.data.msg.content;
        that.msg = res.data.msg.content + that.links;
      });
  },
  methods: {
    back() {
      this.$router.push({
        name:"mine"
      });
    },
    tojl(){
      this.$router.push({
        name:"tgjl"
      })
    },
    isQQ() {
      var ua = navigator.userAgent.toLowerCase();
      return ua.match(/qqbrowser/i);
    },
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i);
    },
    // 复制成功
    onCopy(e) {
      let that = this;
      that.$vux.toast.show({
        text: "已成功复制我的推荐链接至剪贴板！",
        type: "success",
        position: "middle",
        time: 1000
      });
    },
    // 复制失败
    onError(e) {
      that.$vux.toast.show({
        text: "复制失败",
        type: "warn",
        position: "middle",
        time: 1000
      });
    },
    showdg() {
      let that = this;
      if (0) {
        that.share1();
      } else {
        if (that.is_weixin()) {
          that.$vux.alert.show({
            title: "提示",
            content: "请点击右上角在浏览器打开,以确保分享无误！",
            onShow() {},
            onHide() {}
          });
        } else {
          $(".mask").fadeIn();
        }
      }
    },
    hides() {
      $(".mask").fadeOut();
    },
    share(e) {
      var that = this;
      // 先创建一个实例
      var nativeShare = new NativeShare();
      // 如果你需要在微信浏览器中分享，那么你需要设置额外的微信配置
      // 特别提示一下微信分享有一个坑，不要分享安全域名以外的链接(具体见jssdk文档)，否则会导致你配置的文案无效
      // 创建实例应该带参数
      var nativeShare = new NativeShare({
        wechatConfig: {
          appId: "",
          timestamp: "",
          nonceStr: "",
          signature: ""
        },
        // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
        // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
        syncDescToTag: false,
        syncIconToTag: false,
        syncTitleToTag: false
      });

      // 你也可以在setConfig方法中设置配置参数
      nativeShare.setConfig({
        wechatConfig: {
          appId: "",
          timestamp: "",
          nonceStr: "",
          signature: ""
        }
      });

      // 设置分享文案
      nativeShare.setShareData({
        // icon:
        //   "https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg",
        link: that.links,
        title: that.xx,
        desc: that.xx,
        from: "SNC-APP"
      });

      // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
      try {
        nativeShare.call(e);
        //wechatTimeline朋友圈   wechatFriend微信好友   qqFriend好友   qZone空间   weibo新浪微博
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        // nativeShare.call("default");
        that.$vux.alert.show({
          title: "提示",
          content: "请点击浏览器菜单项中的分享功能实现该分享！",
          onShow() {},
          onHide() {}
        });
        // alert("当前浏览器不支持该分享方式");
      }
    },
    share1() {
      let that = this;
      soshm(".soshm", {
        // 分享的链接，默认使用location.href
        url: that.links,
        // 分享的标题，默认使用document.title
        title: that.xx,
        // 分享的摘要，默认使用<meta name="description" content="">content的值
        digest: that.xx,
        // 分享的图片，默认获取本页面第一个img元素的src
        pic: "",
        // 默认显示的网站为以下六个个,支持设置的网站有
        // weixin,weixintimeline,qq,qzone,yixin,weibo,tqq,renren,douban,tieba
        sites: ["weixin", "weixintimeline", "qq", "qzone", "weibo"]
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
.tg {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: 0.36rem;
  padding-top: 1.8rem;
  box-sizing: border-box;
}
.tgcon {
  width: 90%;
  margin: 0 auto;
  background: white;
  padding: 0.6rem 4% 0.6rem;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 2px #f0e3fa;
  font-size: 0.4rem;
}
.ewm {
  margin-top: 0.6rem;
}
.fc000 {
  font-size: 0.3rem;
}
.fc11 {
  font-size: 0.4rem;
  margin: 1.2rem 0 0.4rem;
}
.tjimg {
  width: 6rem;
  display: block;
  margin: 0 auto;
}
.sbtn {
  width: 60%;
  line-height: 0.8rem;
  color: white;
  border-radius: 10px;
  background: #6c4ffb;
  margin: 0.4rem auto 0.4rem;
}
.line {
  border-top: 1px dashed #6c4ffb;
}
.fz {
  width: 0.6rem;
  vertical-align: bottom;
  margin-left: 10px;
}
.link {
  display: inline-block;
  line-height: 0.6rem;
  border: 1px solid #6c4ffb;
  padding: 0 6px 0;
  box-sizing: border-box;
  width: 88%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mask {
  display: none;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.dcon {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 4% 0;
}
.dcon .d-flex {
  background: white;
  border-radius: 6px;
  line-height: 2rem;
}
.dcon p {
  border-radius: 6px;
  text-align: center;
  line-height: 1.2rem;
  background: white;
  color: #48cda3;
  margin: 0.2rem 0 1px;
  font-size: 0.4rem;
}
.mx {
  font-size: 0.36rem;
  line-height: 1.3rem;
  position: absolute;
  right: 4%;
}
</style>
