<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" v-bind:key="index">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list" v-bind:key="index">
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
                  <span>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript6">
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
        }
      });
    },
    data() {
      return {
        goods:{}
      };
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
    bottom: 58px
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
            flex: 1
            margin-left: 10px
            font-size: 10px
            .name
              margin-top: 2px
              line-height: 14px
              font-size: 14px
              color:rgb(7,17,27)
            .desc,
            .extra
              margin-top: 8px
              line-height: 10px
              font-size: 10px
              color: rgb(147,153,159)
            .price
              display: inline-block
              margin-top: 8px
              font-size: 14px
              font-weight:700
              color: rgb(147,153,159)
              .oldPrice
                display: inline-block
                margin-left:8px
                font-size:10px
                color: rgb(147,153,159)
</style>
