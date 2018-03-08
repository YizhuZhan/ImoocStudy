<template>
  <div class = "header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class=""></div>
      <div class="title"></div>
    </div>
    <div class="bulletin-wrapper"></div>
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
