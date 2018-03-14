<template>
  <div class = "header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class = "brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if = "seller.supports" class = "support">
          <span class = "icon"></span>
          <span class = "text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div></div>
    </div>
  </div>
</template>

<script type="text/ecmascript6">
  export default {
    props: {
      'seller':{
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .header
    color: #fff
    background: #000
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0px 8px 0px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
                margin-left: 6px
                font-size: 16px
                font-weight: bold
                line-height: 18px
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .support
          .icon
            height: 12px
            weight: 12px

</style>
