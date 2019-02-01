<template>
  <div class="container">
    <div class="result-title h1">适合您的语言课</div>
    <div class="fields">
      <div class="field field-border">
        <span class="title">学习课程时长：</span>
        <FormField
          name="period"
          :value="formData.period+' 周'"
          :disabled="true"
        />
      </div>
      <div class="field">
        <span class="title">申请截止日期：</span>
        <FormField
          name="applyDeadline"
          :value="formData.applyDeadline"
          :disabled="true"
        />
      </div>
      <div class="field">
        <span class="title">确认截止日期：</span>
        <FormField
          name="sureDeadline"
          :value="formData.sureDeadline"
          :disabled="true"
        />
      </div>
      <div class="field">
        <span class="title">最晚抵校日期：</span>
        <FormField
          name="arrivalDate"
          :value="formData.arrivalDate"
          :disabled="true"
        />
      </div>
      <div class="field">
        <span class="title">学习课程日期：</span>
        <FormField
          name="courseDate"
          :value="formData.courseDate"
          :disabled="true"
        />
      </div>
      <div class="field">
        <span class="title" decode="emsp">学&emsp;&emsp;&emsp;&emsp;费：</span>
        <FormField
          name="fee"
          :value="formData.fee+'￡'"
          :disabled="true"
        />
      </div>
    </div>
    <div class="bottom-tips">
      <span class="info">* 更多语言课详情请阅读微信文章或官网</span>
      <span class="site" selectable='true' @tap='copy'>* {{site}}</span>
      <span class="duty" decode="copy">* &copy; 2019 英国女王大学 版权所有</span>
    </div>
  </div>
</template>
<script>
  import FormField from '@/components/FormField'

  export default {
    data () {
      return {
        formData: {
          period: '3',
          applyDeadline: '5月17日',
          sureDeadline: '5月24日',
          arrivalDate: '7月1日',
          courseDate: '6月24日 — 8月30日',
          fee: 4250
        },
        site: 'http://www.qub.ac.uk'
      }
    },
    computed: {
  
    },
    components: {
      FormField
    },
    mounted () {
  
    },
    onShow () {
  
    },
    methods: {
      startHandler: function () {
        console.log('开始')
      },
      copy: function (e) {
        console.log(e)
        wx.setClipboardData({
          data: this.site,
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .result-title {
    padding: 30rpx 0 40rpx 0;
  }
  .field {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 30rpx;
    background-color: @color-white;
    border-bottom: 1rpx solid @line;
    text-align: left;
    &.field-border {
      border-top: 1rpx solid @line;
    }
  }

  .field.location {
    justify-content: space-between;
  }

  .field.location .content {
    width: calc(100% - 176rpx);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    text-align:right;
  }

  .field.location .picker {
    width: 100%;
  }

  .field .title {
    width: 290rpx;
    height: auto;
    font-size: 30rpx;
    color: @text;
  }

  .field .content {
    flex: 1;
    font-size: 30rpx;
  }

  .bottom-tips {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30rpx;
    font-size: @fsbase;
    color: @grey;
    .info,.site,.duty {
      width: 500rpx;
      text-align: left;
      display: block;
    }
  }
}
</style>
