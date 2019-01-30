<template>
  <div class="page-body">
    <div class="page-body-wrapper">
      <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
      <div class="btn-area">
        <button type="primary" @click="startRecord">开始录像</button>
      </div>
      <div class="btn-area">
        <button type="primary" @click="stopRecord">结束录像</button>
      </div>
      <div class="preview-tips">预览</div>
      <video v-if="videoSrc" class="video" :src="videoSrc"></video>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoCtx: null,
      videoSrc: null
    }
  },
  onLoad () {
    if (wx.createCameraContext) {
      this.videoCtx = wx.createCameraContext()
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  methods: {
    startRecord () {
      this.videoCtx.startRecord({
        success: (res) => {
          console.log('startRecord')
        }
      })
    },
    stopRecord () {
      this.videoCtx.stopRecord({
        success: (res) => {
          this.videoSrc = res.tempVideoPath
        // this.setData({
        //   src: res.tempThumbPath,
        //   videoSrc: res.tempVideoPath
        // })
        }
      })
    }
  },
  error (e) {
    console.log(e.detail)
  }
}
</script>

<style lang="less">
.preview-tips {
  text-align: center; 
}

.video {
  margin: 50px auto;
  width: 100%;
  height: 300px;
}

.btn-area {
  width: 61.8%;
  margin: 30rpx auto;
}

</style>
