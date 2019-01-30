<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/example/index/main" class="home">{{test}}去往首页</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Store from '@/utils/myStore'
export default {
  data () {
    return {
      motto: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      count: 'getCount'
    }),
    test: function () {
      return 'testtest'
    }
  },
  mounted () {
    this.store = new Store()
    this.store.dispatch()
  },
  methods: {
    increment () {
      // this.$store.dispatch('COUNTER_INCREMENT')
      this.store.get().next('COUNTER_INCREMENT')
    },
    decrement () {
      // this.$store.dispatch('COUNTER_DECREMENT')
      this.store.get().next('COUNTER_DECREMENT')
    }
  }
}
</script>

<style lang="less">
.counter-warp {
  text-align: center;
  margin-top: 100px;
  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
}

</style>
