<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click="addCart($event)">
      <div class="icon-add_circle"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
          let count = this.food.count + 1;
        Vue.delete(this.food, 'count');
        Vue.set(this.food, 'count', count);
      }
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if(!event._constructed) {
          return;
        }
        if(this.food.count > 0) {
          let count = this.food.count - 1;
          Vue.delete(this.food, 'count');
          if(count > 0) {
            Vue.set(this.food, 'count', count);
          }
        }
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
      margin: 0 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        height: 24px
        line-height: 24px
        font-size: 24px
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active,&.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
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
