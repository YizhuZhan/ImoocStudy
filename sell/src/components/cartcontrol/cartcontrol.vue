<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)">
      <i class="icon-remove_circle_outline"></i>
    </div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript6">
  import Vue from 'Vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if(!event._constructed) {
          return;
        }
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else{
          this.food.count++;
        }
        console.log(this.food.count);
      },
      decreaseCart(event) {
        if(!event._constructed) {
          return;
        }
        if(this.food.count > 0) {
          this.food.count--;
        }
        console.log(this.food.count);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    color: rgb(0,160,220)
    .cart-decrease
      display: inline-block
      height: 24px
      margin: 0 6px
      line-height: 24px
      font-size: 24px
    .cart-count
      display: inline-block
      height: 24px
      width: 12px
      line-height: 24px
      vertical-align: top
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      margin: 0 6px
      line-height: 24px
      line-height: 24px
      font-size: 24px
</style>
