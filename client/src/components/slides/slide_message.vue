<template>
  <div class="slides">
    <div
      class="slide--inner"
      :style="{
        width: innerWidth + 'px',
        marginLeft: '-' + slideInnerMarginLeft + 'px'
      }"
    >
      <div
        class="slide"
        v-for="(item, index) in imageList"
        :key="index"
        :style="{ width: singleWidth + 'px ' }"
      >
        <img :src="item.valueContent" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    itemsPerSlide: {
      type: null,
      default: 1
    },
    currentIndex: {
      type: null,
      default: 0
    }
  },
  data() {
    return {
      singleWidth: 0,
      innerWidth: 0
    };
  },
  computed: {
    numberImage() {
      let count = 0;
      this.item.contents.map(item => {
        if (item.typeContent !== "photo") return;
        return count++;
      });
      return count;
    },
    slideInnerMarginLeft() {
      return this.currentIndex * this.singleWidth;
    },
    imageList() {
      return this.item.contents.filter(item => {
        if (item.typeContent !== "photo") return;
        return true;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let singleWidth = this.$el.clientWidth / this.itemsPerSlide;
      this.$set(this.$data, "singleWidth", singleWidth);
      this.$set(this.$data, "innerWidth", singleWidth * this.numberImage);
    });
  }
};
</script>
<style lang="scss" scoped>
.slides {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  .slide--inner {
    transition: margin 0.6s ease-out;
    .slide {
      display: inline-block;
      img {
        height: calc((100vh - 88px) / 10 * 9.6);
      }
    }
  }
}
</style>
