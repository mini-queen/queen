<template>
    <div class="popover-wrapper" :class="[isShow?'show':'',isAnim?'anim':'']">
        <div class="popover-body" :class="[className, popType]">
            <div class="popover-header">
                <slot name="title"></slot>
            </div>
            <div class="promotional-content" v-if="popType=='promotional'">
                <ul class="promotional-list">
                  <li class="promotional-item" v-for="(n,i) in promotionalList" :key="i">
                    <span>{{n}}</span>
                  </li>
                </ul>
            </div>
            <div class="modal-content" v-if="popType=='add'">
                <div class="operation-wrap">
                    <span class="icon-minus operation-btn" @click="decrease"></span>
                    <input class="argument" type="number" v-model="number" @blur="changeVal(number)"/>
                    <span class="icon-add operation-btn" @click="increase"></span>
                </div>
            </div>
            <div class="popover-content" v-if="popType=='sendType'">
                <div class="type-list">
                  <div class="type-item" v-for="(type,index) in types" :key="index">
                    <span>{{type.name}}</span>
                    <comCheckbox :value="type.isChecked" @changeHandle="changeHandle(type)"/>
                  </div>
                </div>
            </div>
            <div class="send_time-content" v-if="popType=='sendTime'">
                <div class="send-days">
                  <div class="day-item" v-for="(item,index) in days" :key="index" :class="{active:currentDay==item.name}" @click="changeDay(item)">
                    <span class="day-text">{{item.name}}</span>
                  </div>
                </div>
                <div class="send-time" v-for="(item,index) in times" :key="index">
                  <div class="time-item" @click="changeTime(item)">
                    <div class="time-left" :class="{active:item.isChecked}">
                      <span class="time-noon">{{item.noon}}</span>
                      <span class="time-period">{{item.period}}</span>
                    </div>
                    <comCheckbox :value="item.isChecked"/>
                  </div>
                </div>
            </div>
            <div  v-if="popType == 'promotional'" class="popover-footer">
                <span class="btn" @click="close">知道了</span>
            </div>
            <div  v-if="popType != 'promotional'" class="popover-footer">
                <span class="btn" @click="close">取消</span>
                <span class="btn btn-primary" @click="submit">确定</span>
            </div>
        </div>
        <div class="mask" @click="close('mask')"></div>
    </div>
</template>

<script>
import comCheckbox from './checkbox'
export default {
  data () {
    return {
      number: 0,
      types: [
        {
          isChecked: true,
          name: '配送'
        },
        {
          isChecked: false,
          name: '仓库自提'
        }
      ],
      days: [
        {name: '今天'},
        {name: '明天'},
        {name: '后天'}
      ],
      currentDay: '今天',
      times: [
        {noon: '上午', period: '09:00-12:00', isChecked: true},
        {noon: '下午', period: '13:00-19:00', isChecked: false},
        {noon: '晚上', period: '19:00-22:00', isChecked: false}
      ]
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 0
    },
    popType: {
      type: String,
      default: 'add'
    },
    isAnim: {
      type: Boolean,
      default: false
    },
    isUnPass: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    promotionalList: {
      type: Array,
      default: []
    }
  },
  components: {
    comCheckbox
  },
  watch: {
    num (v) {
      this.number = v
    },
    number (v) {
      this.number = v < 0 ? 0 : v
    }
  },
  methods: {
    increase () {
      this.number++
      console.log(this.number)
    },
    decrease () {
      if (this.number > 0) {
        this.number--
      }
    },
    changeVal (v) {
      const val = isNaN(v * 1) ? 0 : v
      // 输入值非法则不做任何变更
      this.number = val || this.num
    },
    close (val) {
      if (val === 'mask' && this.isUnPass) return
      this.$emit('closeModal')
    },
    submit () {
      this.popType === 'add' && this.$emit('submit', this.number)
      this.popType === 'sendType' && this.$emit('checkedHandle', this.types.find(item => item.isChecked))
      this.popType === 'sendTime' && this.$emit('timeHandle', {day: this.currentDay, time: this.times.find(item => item.isChecked)})
    },
    changeHandle (type) {
      if (type.name === this.types.find(item => item.isChecked).name) return
      this.types = this.types.map(item => {
        item.isChecked = !item.isChecked
        return item
      })
    },
    changeTime (time) {
      if (time.noon === this.times.find(item => item.isChecked).noon) return
      this.times = this.times.map(item => {
        item.isChecked = false
        return item
      })
      time.isChecked = true
    },
    changeDay (day) {
      this.currentDay = day.name
    }
  }
}
</script>

<style lang="less">
@keyframes showPopover {
  0% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
  }
  45% {
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
.popover-wrapper {
  position: fixed;
  z-index: 98;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  &.anim {
    transition: opacity  0.3s linear ;
  }
  &.show {
    height: 100%;
    opacity: 1;
    .mask {
      height: 100%;
    }
    &.anim {
      .popover-body {
        animation: showPopover 0.3s;
      }
    }
  }
  .promotional.popover-body {
    top: calc( 50% - 310rpx);
    .popover-footer {
      color: @color_main_100;
    }
  }
  .mask {
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 0;
  }
  .popover-body {
    position: absolute;
    z-index: 100;
    top: calc( 50% - 200rpx);
    left: calc(50% - 275rpx);
    width: 550rpx;
    font-size: @fs30;
    color: @primary;
    text-align: center;
    border-radius: 20rpx;
    background-color: #fff;
  }
  .popover-header,
  .popover-footer {
    font-size: @fs30;
    text-align: center;
  }
  .popover-header {
    height: 110rpx;
    line-height: 110rpx;
    color: @color_text_333;
    border-bottom: 1rpx solid @color_lin;
  }
  .promotional-content {
    overflow: auto;
    // padding: 40rpx;
    height: 400rpx;
    .promotional-item {
      padding-left: 40rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: left;
      font-size: @fs24;
      color: @color_main_100;
      border-bottom: 1rpx solid @color_lin;
      span {
        padding: 2rpx 8rpx;
        border-radius: 6rpx;
        border: 1rpx solid @color_main_100;
      }
    }
  }
  .modal-content {
    overflow: auto;
    padding: 40rpx;
    .operation-wrap {
      font-size: 22px;
      color: @primary;
      .argument {
          display:inline-block;
          margin: 0 20rpx;
          width: 80rpx;
          height: 60rpx;
          line-height:60rpx;
          font-size: @fs30;
          vertical-align:middle;
          background-color: #f5f5f5;
      }
      .operation-btn {
        display: inline-block;
        width: 35rpx;
        height: 35rpx;
        line-height: 35rpx;
        text-align: center;
        font-size: @fs20;
        vertical-align: middle;
      }
    }
  }
  .send_time-content {
    .send-days {
      height: 116rpx;
      padding: 0 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid @line;
      .day-item {
        width: 140rpx;
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: @unSelect;
        border-radius: 8rpx;
        color: @color-white;
        font-size: @fs24;
        &.active {
          background-color: @light-primary;
        }
      }
    }
    .send-time {
      height: 120rpx;
      border-bottom: 1rpx solid @line;
      &:last-of-type {
        border-bottom: none;
      }
      .time-item {
        height: 120rpx;
        padding: 0 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time-left {
          font-size: @fs24;
          width: 230rpx;
          height: 60rpx;
          border-radius: 8rpx;
          border: 1rpx solid @content;
          display: flex;
          line-height: 60rpx;
          justify-content: space-between;
          padding: 0 30rpx;
          .time-period {
            vertical-align: middle;
          }
          &.active {
            border: 1rpx solid @light-primary;
          }
        }
      }
    }
  }
  .popover-content {
    overflow: auto;
    .type-list {
      .type-item {
        height: 110rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: @fs30;
        border-bottom: solid 1rpx @color_lin;
        padding: 0 30rpx;
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
  .popover-footer {
    height: 100rpx;
    line-height: 100rpx;
    color: @color_text_666;
    border-top: 1rpx solid @color_lin;
    .btn {
      display: inline-block;
      width: calc(50% - 1rpx);
      height: 100%;
      text-align: center;
    }
    .btn-primary {
      border-left: 2rpx solid @color_lin;
      color: @color_main_100;
    }
  }
}
</style>
