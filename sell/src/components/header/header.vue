<template>
  <div class = "header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class = "brand"></span>
          <span>{{seller.name}}</span>
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

</style>
