<template>
  <div>关于</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ]),
    test: function () {
      return 'testtest'
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>


</style>
