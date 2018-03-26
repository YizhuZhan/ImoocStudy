<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price"></div>
          <div class="desc"></div>
        </div>
        <div class="content-right"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.styl";
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    background: #000
    .content
      display: flex
      .content-left
        flex: 1
      .content-right
        flex: 0 0 105
        width: 105px
</style>
