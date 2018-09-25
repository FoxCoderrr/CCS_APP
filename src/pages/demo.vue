<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
    </div>
    <footer>
      <!-- <button @click="startRecognize">1.创建控件</button>
      <button @click="startScan">2.开始扫描</button>
      <button @click="cancelScan">3.结束扫描</button>
      <button @click="closeScan">4.关闭控件</button> -->
      <p class="d-flex">
      <span class="flex1 tac" @click='scanImg'>从相册中选取图片</span>
      <span class="flex1 tac" @click="back">取消</span>
      </p>
    </footer>
  </div>
</template>

<script type='text/ecmascript-6'>
import $ from "jquery"
var scan = null;
export default {
  data() {
    return {
      codeUrl: ""
    };
  },
  mounted() {
    let that = this;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $("#bcid").css("height", height-44);
    that.startRecognize();
    that.startScan();
    mui.back=function () {
      if(that.$route.name == "demo"){
        that.back();
        error;
      }
    }
  },
  methods: {
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        alert(result);
        // that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },
    back(){
      this.closeScan();
      this.$router.back();
    },
    // 从相册中选择二维码图片
    scanImg() {
      mui.plusReady(function() {
        plus.gallery.pick(
          function(path) {
            plus.barcode.scan(
              path,
              function(type, result) {
                alert("Scan success:(" + type + ")" + result);
              },
              function(error) {
                alert(error.message);
              }
            );
          },
          function(err) {
            plus.nativeUI.alert("Failed: " + err.message);
          }
        );
      });
    }
  }
};
</script>
<style lang="less" scoped>
.scan {
  width: 100%;
  height: 100%;
  // background: black;
  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: black;
  }
  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 44px;
    line-height: 44px;
    z-index: 2;
    background: white;
  }
}
.d-flex .flex1:first-child {
  border-right: 1px solid #ccc;
}
</style>