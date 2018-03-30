<template>
  <div>
    <div class="shopcart">
      <div class="content">
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
    </div>
  </div>
</template>

<script type="text/ecmascript6">
  export default {
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
      dropList: []
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
      drop(el) {
        for(let ball of this.balls) {
          if(!ball.show) {
            ball.el = el;
            ball.show = true;
            this.dropList.push(ball);
            return;
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
