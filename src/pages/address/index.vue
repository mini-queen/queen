<template id="address">
  <div class="address-container">
    <div class="empty-list" v-if="addressData.length === 0">
      <i class="empty-icon"></i>
    </div>
    <div class="address-list" v-else>
      <ul v-for="(item, idx) in addressData" :key="item.id">
        <li @touchstart="touchStart($event)" @touchend="touchEnd($event, idx)" :data-type="item.type">
          <div class="front" @click="recover(idx)">
            <div class="left">
              <div class="top">
                <p class="name">{{ item.name }}</p>
                <p class="phone">{{ item.phone }}</p>
              </div>
              <div class="bottom">
                <p class="address">{{ item.address }}</p>
              </div>
            </div>
            <div class="right" @click="toEdit">
              <i class="edit-btn icon-addr_edit"></i>
            </div>
          </div>
          <div class="delete" @click="delete(item.id)">
            <i class="delete-btn icon-addr_del"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="create-address">
      <button
        id="create_address"
        class="create-address-btn"
        type="button"
        name="button"
        v-on:click="toCreateAddress"
        >
        新建收货地址
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        activetedIdx: null,
        addressData: [
          { id: 1, name: '测试', phone: '18201042468', address: '北京市朝阳区潘家园华威北里', type: 0 },
          { id: 2, name: '测试', phone: '18201042468', address: '北京市朝阳区潘家园华威北里', type: 0 },
          { id: 3, name: '测试', phone: '18201042468', address: '北京市朝阳区潘家园华威北里', type: 0 }
        ]
      }
    },
    methods: {
      touchStart (e) {
        // 获取移动距离，可以通过打印出e，然后分析e的值得出
        this.startX = e.mp.changedTouches[0].clientX
      },
      // 滑动结束
      touchEnd (e, idx) {
        // 获取移动距离
        this.endX = e.mp.changedTouches[0].clientX
        if (this.startX - this.endX > 10) {
          for (let i = 0; i < this.addressData.length; i++) {
            this.addressData[i].type = 0
          }
          console.log(idx)
          this.activetedIdx = idx
          this.addressData[idx].type = 1
        } else if (this.startX - this.endX < -10) {
          for (let i = 0; i < this.addressData.length; i++) {
            this.addressData[i].type = 0
          }
        }
      },
      // 点击回复原状
      recover (idx) {
        this.addressData[idx].type = 0
      },
      delete (idx) {},
      toEdit () {},
      toCreateAddress () {
        wx.navigateTo({
          url: '/pages/createAddress/main'
        })
      }
    },
    onUnload: function () {
      this.recover(this.activetedIdx)
    }
  }
</script>

<style lang="less" scoped media="screen">

  .address-container {
    width: 750rpx;
    height: 100vh;
    padding-top: 20rpx;
    background-color: #f3f3f3;
  }

  .empty-list {
    margin-top: 116rpx;
    text-align: center;
    .empty-icon {
      width: 276rpx;
      height: 136rpx;
      margin-bottom: 40rpx;
    }
    .empty-text {
      font-size: 30rpx;
      color: #333333;
    }
  }

  .address-list ul {
    width: calc(750rpx + 186rpx);
    height: inherit;
  }

  .address-list ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #eeeeee;
    background-color: #ffffff;
    transition: transform 200ms;
    p {
      display: inline-block;
      color: #333333;
    }
    .name {
      font-size: 30rpx;
      margin-right: 50rpx;
    }
    .phone {
      font-size: 30rpx;
    }
    .address {
      font-size: 24rpx;
    }
    .front {
      width: 750rpx;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 40rpx 30rpx 30rpx;
    }
    .top {
      margin-bottom: 20rpx;
    }
    .right {
      .edit-btn {
        width: 42rpx;
        height: 42rpx;
        color: #F3A300;
      }
    }
    .delete {
      width: 186rpx;
      height: 186rpx;
      background-color: #F6634A;
      text-align: center;
      display:flex;
      align-items:center;
      justify-content:center;
      .delete-btn {
        color: #FFFFFF;
      }
    }
  }

  li[data-type="0"] {
      transform: translateX(0);
  }
  li[data-type="1"] {
      transform: translateX(-186rpx);
  }

  .create-address {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 60rpx;
    text-align: center;
    .create-address-btn {
      width: 550rpx;
      height: 88rpx;
      line-height: 88rpx;
      color: #FFFFFF;
      font-size: 30rpx;
      background-color: #F3A300;
      box-shadow: 1rpx 2rpx 10rpx #F3A300;
      border-radius: 44rpx;
    }
  }

</style>
