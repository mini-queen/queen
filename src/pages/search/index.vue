<template>
  <div class="search-warp">
    <div class="search-wrap_input">
      <p class="search_input">
          <span class="icon-search" v-if="!searchVal"></span>
          <input @focus="onFocus" class="input_box" type="text" placeholder="请输入要搜索的内容" v-model="searchVal" @input="seachInput">
          <i class="search_close icon-delete" v-if='searchVal' @click='delSearchVal'></i>
      </p>
      <span v-if='searchVal' class="search_cancel" @click="searchFn">搜索</span>
    </div>

    <div class='search_hot' v-if="serchStatus===1">
      <p class='search_hot_title'>热门搜索</p>
      <ul class='search_hot_word_box'>
        <li class='search_hot_word' v-for="(hotWord, index) in hotWords" :key="index"  @click="quickSearch(hotWord.value)">{{hotWord.value}}</li>
      </ul>
    </div>

    <div class='search_history' v-if="serchStatus===1">
      <p class='search_history_title'>搜索历史<span class='fr' @click="cancelHistory">清除</span></p>
      <ul class='search_history_word_box'>
        <li class='search_history_word' v-for="(history, index) in searchHistory" :key="index" @click="quickSearch(history.value)">{{history.value}}</li>
      </ul>
    </div>

    <ul class='fuzzy_search_list' v-if="serchStatus===2">
       <li class='fuzzy_search_item clearfix' v-for="(result, index) in fuzzySearchResult" :key="index" @click="search(result.id)">
         <span class='fl'>{{result.name}} </span>
         <i class="fr arrow_right icon-arrow_right"></i>
         <span class='fr'>{{result.brand}}</span>
       </li>
    </ul>
    <div class="search_result" v-if="serchStatus===3">
      <div class="search_result_bar">
        <p class="search_result_bar_item" :class="currentIndex===0?'currentBar':''" @click="tabClick(0)"><span>综合</span></p>
        <p class="search_result_bar_item" :class="currentIndex===1?'currentBar':''" @click="tabClick(1)"><span class="weui-navbar__title">价格</span></p>
        <p class="search_result_bar_item" :class="currentIndex===2?'currentBar':''" @click="tabClick(2)"><span class="weui-navbar__title">分类</span></p>
      </div>   
      <div class="search_result_type_box" v-if='show_type'>
        <ul class="search_result_type" :style="{width:7*170+30+'rpx'}">
          <li class="search_result_type_item" :class="currentId===item.id?'current_search_result_type_item':''" v-for="(item, index) in resultType" :key="index" @click="changeType(item.id)">{{item.name}}</li>
        </ul>
      </div>
      <div class="search_result_list">
        <item-component mark="index" :market="market" @openModal="showModal"></item-component>
      </div>   
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import itemComponent from '@/components/item'
import { debounce } from '@/utils'
import {searchWord} from '@/utils/api'
export default {
  data () {
    return {
      searchVal: '',
      hotWords: [],
      searchHistory: [],
      fuzzySearchResult: [],
      serchStatus: 1,
      currentIndex: 0,
      currentId: 1,
      resultType: [], // 分类数组
      market: [],
      show_type: false,
      is_show: false
    }
  },
  computed: {
    ...mapGetters([]),
    test: function () {
      return 'testtest'
    }
  },
  components: {
    itemComponent
  },
  methods: {
    showModal () {
      this.is_show = true
    },
    delSearchVal () {
      this.searchVal = ''
      this.serchStatus = 1
    },
    searchFn () {
      this.serchStatus = 3
      this.getMarket()
    },
    quickSearch (word) {
      this.searchVal = word
      this.serchStatus = 3
      this.getMarket()
    },
    getSearchWord () {
      searchWord().then(resp => {
        this.hotWords = resp.hotList
        this.searchHistory = resp.historyList
      })
    },
    fuzzySearch () {
      this.serchStatus = 2
      setTimeout(() => {
        this.fuzzySearchResult = [{
          name: '地暖管',
          brand: '乔治',
          id: 1
        },
        {
          name: '地暖管',
          brand: '乔治',
          id: 2
        }]
      }, 2000)
    },
    search (id) {
      this.serchStatus = 3
      this.getMarket()
    },
    cancelHistory () {
      this.$store.dispatch('SEARCH_HISTORY', [])
      console.log(this.searchHistory)
    },
    tabClick (index) {
      if (index === 2) this.show_type = true
      if (this.currentIndex === index) return
      this.currentIndex = index
    },
    changeType (id) {
      if (this.currentId === id) return
      this.currentId = id
      this.show_type = false
      this.getMarket()
    },
    getResultType () {
      setTimeout(() => {
        this.resultType = [
          {name: '全部', id: 1},
          {name: 'PVC', id: 2},
          {name: 'PPR', id: 3},
          {name: 'PVB', id: 4},
          {name: 'PBB', id: 5},
          {name: 'PVV', id: 6},
          {name: 'PRC', id: 7}
        ]
      })
    },
    getMarket () {
      const list = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
        return {
          id: el,
          //   tips: i % 2 ? ['满返', '热销中'] : ['秒杀', '热销中'],
          explain: `${new Array(i % 2 ? 8 : 2).fill(i % 2 ? '地暖管' : '净水器').join('/')}-${el}`,
          src: i % 2 ? 'http://publish.kuchuan.com/activity/header/item4.png' : 'http://publish.kuchuan.com/activity/header/item2.png',
          price: i % 2 ? 40 : 50,
          num: 0
        }
      })
      this.market = list
    },
    onFocus () {
      this.serchStatus = 1
    },
    clearSetting () {
      this.searchVal = ''
      this.serchStatus = 1
    }
  },
  mounted () {
    this.getSearchWord()
    this.getResultType()
  },
  onShow () {
    this.seachInput = debounce(() => {
      if (!this.searchVal) {
        this.serchStatus = 1
      }
      this.fuzzySearch()
    }, 200)

    console.log(this.seachInput)
  },
  onHide () {
    this.clearSetting()
  },
  onUnload () {
    this.clearSetting()
  }
}
</script>

<style lang="less" scoped>
.search-warp {
  background: @bg;
  min-height: 100vh;
  line-height: 1;
  font-size: 28rpx;
  .search-wrap_input{
    display: flex;
    flex-flow: nowrap row;
    padding: 20rpx 30rpx;
    background: @color-white;
    align-items: center;
    .search_input{
      display: flex;
      flex-flow: nowrap row;
      align-items: center;
      background: @color_lin;
      border-radius: 10rpx;
      color: @sub;
      font-weight: lighter;
      padding: 27rpx 30rpx;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      width: 80%;
      flex-grow: 1;
      .icon-search {
        margin-right: 10rpx;
        font-size: 40rpx;
      }
      .search_close{
          font-size: 36rpx;
      }  
      .input_box{
        flex-grow: 1
      }   
    }
    .search_cancel{
      font-size: 30rpx;
      padding: 28rpx 25rpx 28rpx 55rpx;
      text-align: center;
      color: @btn;
    }
  }
  .search_hot{
    color: @color_main_100;
    padding: 30rpx;
    border-bottom: 1rpx solid @content;
    font-weight: bold;
    .search_hot_word_box{
      display: flex;
      flex-flow: wrap row;
      justify-content: flex-start;
      align-items: center;
      .search_hot_word{
        width: 150rpx;
        padding: 17rpx 0;
        color: @color-white;
        background: @color_main_100;
        margin-top: 30rpx;
        text-align: center;
        border-radius: 6rpx;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 30rpx;
        &:nth-child(4n){
          margin-right: 0;
        }
      }
    }
  }
  .search_history{
    color: @content;
    padding: 30rpx;
    font-weight: bold;
    .search_history_word_box{
      display: flex;
      flex-flow: wrap row;
      justify-content: flex-start;
      .search_history_word{
        font-weight: normal;
        width: 150rpx;
        padding: 17rpx 0;
        border: 1rpx solid @content;
        margin-top: 30rpx;
        text-align: center;
        border-radius: 6rpx;
        margin-right:30rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
        &:nth-child(4n){
          margin-right: 0;
        }
      }
    }
    .search_history_title{
      display: flex;
      flex-flow: nowrap;
      align-items: center;
      justify-content: space-between;
      .fr{
        padding: 10rpx 20rpx;
      }
    }
  }
  .fuzzy_search_list{
    .fuzzy_search_item{
      padding: 36rpx 30rpx 36rpx 58rpx;
      background: @color-white;
      border-top:1rpx solid @color_lin;
      .fr{
        color: @color_text_999;
        font-size: 24rpx;
        line-height: 28rpx;
      }
      .arrow_right{
        font-size: 35rpx;
        margin-left: 35rpx;
        
      }
    }
  }
  .search_result{
    .search_result_bar{
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-around;
      align-items: center;
      background: @color-white;
      font-size: 36rpx;
      line-height: 1;
      .search_result_bar_item{
        width: 160rpx;
        border-bottom: 4rpx solid transparent;
        padding: 30rpx 0;
        text-align: center;
      }
      .currentBar{
        border-bottom: 4rpx solid @color_main_100;
        color: @color_main_100
      }
    }
    .search_result_type_box{
      overflow-y: auto;
      width: 100%;
      padding:30rpx 0;
      .search_result_type{
        .search_result_type_item{
          width: 140rpx;
          text-align: center;
          padding: 20rpx 0;
          background: @color-white;
          color: @content;
          display: inline-block;
          margin-left:30rpx;
        }
        .current_search_result_type_item{
          background: @color_main_100;
          color: @color-white
        }
      }
    }

  }

}

</style>
