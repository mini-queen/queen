<template>
  <div class="wrap">
    <span v-if="num" class="btn-add" @click="reduce">-</span>
    <span v-if="num" class="text" @click="numHandle">{{num}}</span>
    <span class="btn-add" @click="add">+</span>
  </div>
</template>

<script>
export default {
  name: 'add',
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    add () {
      console.log('add modules------------------>', this)
      this.$emit('add')
      // this.$store.commit({type: 'COUNTER_INCREMENT'})
    },
    reduce () {
      this.$emit('reduce')
    },
    numHandle () {
      this.$emit('numHandle')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
    display: inline-block;
    float:right;
}
.btn-add {
  padding: 1px 3px;
  font-size: 15px;
  color: rgba(255,0,0,.5);
  border: 1px solid rgba(255,0,0,.5);
  border-radius: 50%;
}
.text {
  margin: 0 10px;
  font-size: 15px;
}
</style>
