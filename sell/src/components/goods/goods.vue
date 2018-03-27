<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" v-bind:key="index" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook" v-bind:key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" class="food-item border-1px" v-bind:key="index">
                <div class="icon">
                  <img height="57" width="57" :src="food.icon">
                </div>
                <div class="content">
                  <div class="name">{{food.name}}</div>
                  <div class="desc">{{food.description}}</div>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
  </div>
</template>

<script type="text/ecmascript6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  const ERR_OK = 0;
  export default{
    props: {
      seller:{
        type: Object
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    data() {
      return {
        goods:{},
        scrollY: 0,
        listHeight: []
      };
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list');
        let el = foodsList[index];
        this.foodsScroll.scrollToElement(el, 300);
        console.log(this.currentIndex);
      }
    },
    computed: {
      currentIndex() {
        let listHeight = this.listHeight;
        for(let i = 0; i < this.listHeight.length; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if(height2 && this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      font-size: 0
      .menu-item
        display: table
        padding: 0 12px
        height: 54px
        width: 56px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width:56px
          vertical-align: middle
          font-size: 12px
          font-weight: 200
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            height: 12px
            width: 12px
            margin-right:2px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
            &.guarantee
              bg-image('guarantee_3')

    .foods-wrapper
      flex: 1
      .food-list
        .title
          padding-left: 14px
          border-left: 2px solid #d9dde1
          height: 26px
          line-height: 26px
          color: rgb(147,153,159)
          font-size: 12px
          background: #f3f5f7
        .food-item
          display: flex
          margin:18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
          .content
            position: relative
            flex: 1
            margin-left: 10px
            font-size: 10px
            .name
              margin: 2px 0px 8px 0px
              line-height: 14px
              font-size: 14px
              color:rgb(7,17,27)
            .desc,.extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              margin-bottom: 8px
              line-height: 12px
            .extra
              .count
                margin-right: 12px
            .price
              margin-top: 8px
              line-height: 24px
              font-weight:700
              .new
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size:10px
                color: rgb(147,153,159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 0px
</style>
