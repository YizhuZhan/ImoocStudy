<template>
  <div class="star">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript6">
  exports default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-'+this.size;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .star
    font-size: 0
    .star-item
      display:inline-block
      background-repeat: no-repeat
    &.star-48

    &.star-36
    &.star-24

</style>
