<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalCount > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" v-bind:key="index">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="(food, index) in selectFoods" class="food" v-bind:key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @add="addFood"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="list-mask" @clilck="hideList" v-show="listShow"></div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    components: {cartcontrol},
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice:{
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [
          {
            price: 10,
            count: 1
          }
          ];
        }
      }
    },
    data() {
      return {
        balls: [
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      }
      ],
      dropList: [],
      fold: true,
      listShow: false
      }
    },
    watch: {
      totalCount: function () {
        if(this.totalCount === 0) {
          this.fold = true;
          this.listShow = false;
        }
      },
      fold: function () {
        if(this.totalCount) {
          this.listShow = !this.fold;
          if(this.listShow) {
            this.$nextTick(() => {
              if(!this.listScroll){
                this.listScroll = new BScroll(this.$refs.listContent, {
                  click: true
                });
              } else {
                this.listScroll.refresh();
              }
            })
          }
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        for(var item of this.selectFoods) {
          total += item.price * item.count;
        }
        return total;
      },
      totalCount() {
        let total = 0;
        this.selectFoods.forEach(food => {
          total += food.count;
        });
        return total;
      },
      payDesc() {
        if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          let price = this.minPrice - this.totalPrice;
          return `还差￥${price}起送`;
        } else if(this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice) {
          return 'notEnough';
        } else {
          return 'enough';
        }
      }
    },
    methods:{
      addFood(el) {
        console.log('enter addFood');
        this.drop(el);
      },
      drop(el) {
        for(let ball of this.balls) {
          if(!ball.show) {
            ball.el = el;
            ball.show = true;
            this.dropList.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        for(let ball of this.dropList) {
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';// 从display: none到显示
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;// 触发重绘html
        this.$nextTick(() => {
          el.style.transform = `translate3d(0, 0, 0)`;
          el.style.webkitTransform = `translate3d(0, 0, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = `translate3d(0, 0, 0)`;
          inner.style.webkitTransform = `translate3d(0, 0, 0)`;
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter(el) {
        // 移除数组第一个元素
        let ball = this.dropList.shift();
        if(ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0px 12px
          padding: 6px
          height: 56px
          width: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            height: 100%
            width: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: rgba(255,255,255,0.4)
              &.highlight
                color: #fff
          .num
            display: inline-block
            position: absolute
            top: 0
            right: 0
            height: 16px
            width: 24px
            border-radius: 16px
            line-height: 16px
            text-align: center
            background: rgb(240, 20, 20)
            color: #fff
            font-size: 10px
            font-weight: 700
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          padding-right: 12px
          margin: 12px 0px
          border-right: 1px solid rgba(255,255,255,0.1)
          vertical-align: top
          line-height: 24px
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          margin: 12px 0px 12px 12px
          vertical-align: top
          line-height: 24px
          font-size: 10px
          font-weight: 200
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105
        width: 105px
        .pay
          height: 48px
          padding: 12px 8px
          text-align: center
          line-height: 24px
          font-size: 12px
          font-weight: 700
          &.notEnough
            background: #2b333b
            color: rgba(255, 255, 255, 0.4)
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active,&.fold-leave-active
        transition: all 0.5s
      &.fold-enter,&.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        padding: 0 18px
        background: #f3f5f7
        height: 40px
        line-height: 40px
        font-size: 0px
        line-weight: 200
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          float:left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0px 18px
        background: #fff
        max-height: 217px
        overflow: hidden
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
    .list-mask
      position: fixed
      top: 0
      left: 0
</style>
