<template>
  <div class="container">
    <div class="result-title h1">适合您的语言课</div>
    <div class="fields">
      <div class="field field-border">
        <span class="title">学习课程时长：</span>
        <FormField
          name="period"
          :value="formData.period+' 周  ' + (casMap[formData.cas] || '')"
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
          :value="formData.fee+'英镑'"
          :disabled="true"
        />
      </div>
    </div>
    <div class="bottom-tips">
      
      <span class="info" selectable='true' @tap='copy'>* 更多语言课详情请登录英国女王大学官网 {{site}}，输入pre-sessional进行查看。</span>
  
      <span class="duty">
        * 免责条款：小程序推荐结果仅供参考，学生申请后并取得录取的课程以INTO Queen's入学部的录取通知书为准。
      </span>
      <!-- <span class="info">* 更多语言课详情请阅读微信文章或官网</span>
      <span class="site" selectable='true' @tap='copy'>* {{site}}</span>
      <span class="duty" decode="copy">* &copy; 2019 英国女王大学 版权所有</span> -->
    </div>
  </div>
</template>
<script>
  import FormField from '@/components/FormField'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        // formData: {
        //   period: '3',
        //   applyDeadline: '5月17日',
        //   sureDeadline: '5月24日',
        //   arrivalDate: '7月1日',
        //   courseDate: '6月24日 — 8月30日',
        //   fee: 4250
        // },
        casMap: {
          'single': '单个CAS',
          'union': '联合CAS'
        },
        site: 'http://www.qub.ac.uk'
      }
    },
    computed: {
      ...mapGetters({
        formData: 'courseInfo'
      })
    },
    components: {
      FormField
    },
    mounted () {
  
    },
    onShow () {
  
    },
    methods: {
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
    padding: 0 30rpx;
    background-color: @color-white;
    border-bottom: 1rpx solid @line;
    text-align: left;
    min-height: 100rpx;
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
    width: 220rpx;
    height: 60rpx;
    line-height: 60rpx;
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
    .info,.site {
      width: 600rpx;
      text-align: left;
      display: block;
      margin: 30rpx auto;
    }
    .duty {
      width: 600rpx;
      display: block;
      margin: 0 auto;
      text-align: left;
    }
  }
}
</style>
