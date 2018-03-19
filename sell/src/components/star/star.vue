<template>
  <div class="star" :class="starType">
    haha
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" v-bind:key="index"></span>
  </div>
</template>

<script type="text/ecmascript6">
  const LEN = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';

  export default {
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
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let decimal = score - Math.floor(this.score * 2) / 2;

        for(let i = 0; i < score; i++){
          result.push(CLS_ON);
        }
        if(decimal > 0){
          result.push(CLS_OFF);
        }
        while(result.length < LEN){
          result.push(CLS_HALF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        height: 20px
        width: 20px
        background-size: 20px 20px
        margin-right: 22px
        &:last-child
          margin-right: 0
      .on
        bg-image('star48_on');
      .off
        bg-image('star48_off');
      .half
        bg-image('star48_half');
    &.star-36
      .star-item
        height: 15px
        width: 15px
        background-size: 15px 15px
        margin-right: 6px
        &:last-child
          margin-right: 0
      .on
        bg-image('star36_on');
      .off
        bg-image('star36_off');
      .half
        bg-image('star36_half');
    &.star-24
      .star-item
        height: 10px
        width: 10px
        background-size: 10px 10px
        margin-right: 3px
        &:last-child
          margin-right: 0
      .on
        bg-image('star24_on');
      .off
        bg-image('star24_off');
      .half
        bg-image('star24_half');
</style>
