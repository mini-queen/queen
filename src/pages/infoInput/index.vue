<template>
  <div class="container">
    <div class="first-wrapper">
      <div class="first-title h1">第一步</div>
      <div class="first-desp h2">选择您的学位课程雅思要求</div>
      <div class="select-score">
        <div class="field location field-border">
          <span class="title">学位课程要求</span>
          <div class="content">
            <picker class="picker"  @change="bindPickerChange" mode="selector" :value="index" range-key="name" :range="objectArray">
              <span class="packer-label">{{selectName || '请选择'}}</span>
            </picker>
          </div>
        </div>
      </div>
    </div>
    <div class="second-wrapper">
      <div class="second-title h1">第二步</div>
      <div class="second-desp h2">填写您的雅思成绩</div>
      <div class="sub-desp h3">(需是一张成绩单，不接受拼分)</div>
    </div>
    <div class="fields">
      <div class="field field-border">
        <span class="title">雅思总分：</span>
        <FormField
          type="digit"
          name="totalScore"
          :value="formData.totalScore"
          placeholder="请填写雅思总分"
          @onInputBlur="onInputBlur"
        />
      </div>
      <div class="field">
        <span class="title" decode="emsp">听&emsp;&emsp;力：</span>
        <FormField
          type="digit"
          name="listeningScore"
          :value="formData.listeningScore"
          placeholder="请填写听力分数"
          @onInputBlur="onInputBlur"
        />
      </div>
      <div class="field">
        <span class="title" decode="emsp">阅&emsp;&emsp;读：</span>
        <FormField
          type="digit"
          name="readingScore"
          :value="formData.readingScore"
          placeholder="请填写阅读分数"
          @onInputBlur="onInputBlur"
        />
      </div>
      <div class="field">
        <span class="title" decode="emsp">写&emsp;&emsp;作：</span>
        <FormField
          type="digit"
          name="writingScore"
          :value="formData.writingScore"
          placeholder="请填写写作分数"
          @onInputBlur="onInputBlur"
        />
      </div>
      <div class="field">
        <span class="title" decode="emsp">口&emsp;&emsp;语：</span>
        <FormField
          type="digit"
          name="speakingScore"
          :value="formData.speakingScore"
          placeholder="请填写口语分数"
          @onInputBlur="onInputBlur"
        />
      </div>

    </div>
    <div class="sure-info">
      <comCheckbox :value="formData.isSubmit" @changeHandle="checkHandler">  您是否已向大学提交本科学位证+本科毕业证+大学四年完整成绩单+已缴纳录取通知书上要求的£400押金（如申请专业有押金要求）?</comCheckbox>
    </div>
    <div class="view-btn" @click="resultHandler">
        查看结果
    </div>
    <popover @closeModal="closeModal" :isShow="isShow" :promotionalList="list" popType="promotional" :isUnPass="true">
      <span slot="title">温馨提示</span>
      <span slot="content">很抱歉，没有适合你的语言课</span>
    </popover>
  </div>
</template>
<script>
  import FormField from '@/components/FormField'
  import comCheckbox from '@/components/checkbox'
  import popover from '@/components/popover'

  export default {
    data () {
      return {
        isShow: false,
        formData: {
          requireId: -1,
          isSubmit: false
        },
        selectName: '',
        objectArray: [
          {
            id: 0,
            name: '雅思总分6.5，且各单项不低于5.5'
          },
          {
            id: 1,
            name: '雅思总分6.0，且各单项不低于5.5'
          },
          {
            id: 2,
            name: '雅思总分6.5，且各单项不低于6.0'
          }
        ]
      }
    },
    computed: {

    },
    components: {
      FormField, comCheckbox, popover
    },
    mounted () {

    },
    onShow () {

    },
    methods: {
      closeModal () {
        this.isShow = false
      },
      resultHandler () {
        if (this.formData.requireId === -1) {
          return wx.showToast({title: '请选择学位课程要求', icon: 'none'})
        }
        if (!this.formData.totalScore) {
          return wx.showToast({title: '请填写雅思总分', icon: 'none'})
        }
        if (!this.formData.listeningScore) {
          return wx.showToast({title: '请填写听力分数', icon: 'none'})
        }
        if (!this.formData.readingScore) {
          return wx.showToast({title: '请填写阅读分数', icon: 'none'})
        }
        if (!this.formData.writingScore) {
          return wx.showToast({title: '请填写写作分数', icon: 'none'})
        }
        if (!this.formData.speakingScore) {
          return wx.showToast({title: '请填写口语分数', icon: 'none'})
        }
        let arr = Object.values(this.formData).filter(item => typeof item === 'string')
        if (arr.some(item => item < 5)) {
          this.isShow = true
          return false
          // return wx.showToast({title: '很抱歉，没有适合你的语言课', icon: 'none'})
        }
        wx.cloud.callFunction({name: 'course', data: this.formData}).then((res) => {
          if (res.result.courses.length === 0) {
            this.isShow = true
            return false
            // return wx.showToast({title: '很抱歉，没有适合你的语言课', icon: 'none'})
          } else {
            console.log('res>>', res.result.courses)
            this.$store.commit('COURSEINFO_GET', res.result.courses)
            wx.navigateTo({
              url: '/pages/infoShow/main'
            })
          }
        })
      },
      bindPickerChange (e) {
        let index = e.target.value
        this.formData.requireId = this.objectArray[index].id // 这个id就是选中项的id
        this.selectName = this.objectArray[index].name
      },
      onInputBlur (field) {
        this.formData[field.name] = field.value
      },
      checkHandler () {
        this.formData.isSubmit = !this.formData.isSubmit
      }
    }
  }
</script>

<style lang="less" scope>
.container {
  .first-wrapper {
    padding-top: 10rpx;
    padding-bottom: 50rpx;
    .first-title {
      margin: 30rpx;
    }
    .first-desp{
      margin-bottom: 80rpx;
    }
    .select-score {

    }
  }
  .second-wrapper {
    // padding-top: 10rpx;
    margin-bottom: 10rpx;
    .second-title {
      margin: 30rpx;
    }
    .second-desp{

    }
    .sub-desp {
      margin: 8rpx;
    }
  }
  .sure-info {
    margin-top: 60rpx;
    font-size: 30rpx;
    text-align: left;
    color: @btn-gray;
    padding: 0 20rpx;
  }
  .view-btn {
      display: inline-block;
      width: 61.8%;
      // padding: 0 60rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 45rpx;
      margin-top: 80rpx;
      margin-bottom: 80rpx;
      text-align: center;
      color: @color-white;
      font-size: @fsh2;
      background-color: @light-primary;
  }

  .fields {
    margin-top: 80rpx;
  }

  .field {
    // width: 100%;
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
    width: calc(100% - 190rpx);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    text-align:right;
    color: @disabled;
  }

  .field.location .picker {
    width: 100%;
  }

  .field .title {
    width: 190rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    color: @text;
  }

  .field .content {
    flex: 1;
    font-size: 30rpx;
    .packer-label {
      vertical-align: middle;
    }
  }
}
</style>
