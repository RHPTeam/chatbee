<template>
  <div class="zoom position_fixed" v-if="isZoom === true">
    <div
      class="wrap d_flex flex_column justify_content_between position_relative"
    >
      <div class="content">
        <div
          class="header d_flex align_items_center justify_content_between mb_3 mt_3"
        >
          <div class="action d_flex">
            <div class="action--item p_2 mr_2">
              <icon-base
                icon-name="image"
                width="23"
                height="23"
                viewBox="0 0 25 25"
              >
                <icon-image />
              </icon-base>
              Tải xuống
            </div>
            <div class="action--item p_2 mr_2">
              <icon-base
                icon-name="next"
                width="23"
                height="23"
                viewBox="0 0 25 25"
              >
                <icon-upload-image />
              </icon-base>
              Chuyển tiếp
            </div>
          </div>
          <div class="close" @click="close">
            <icon-base
              icon-name="close"
              width="23"
              height="23"
              viewBox="0 0 25 25"
            >
              <icon-close />
            </icon-base>
          </div>
        </div>
        <div class="body d_flex justify_content_between align_items_center">
          <!--icon back-->
          <div
            class="move"
            @click="prev"
            :style="{ backgroundImage: 'url(' + imageBack + ')' }"
          ></div>

          <!--Content -->
          <slides :item="message" :currentIndex="currentIndex" />
          <!--End: -->

          <!--Icon next-->
          <div
            class="move"
            @click="next"
            :style="{ backgroundImage: 'url(' + imageNext + ')' }"
          ></div>
        </div>
      </div>
      <div class="footer d_flex">
        <div class="d_flex align_items_center">
          <div
            v-for="(item, index) in imageList"
            :key="index"
            @click="goToSlide(index)"
          >
            <img class="item" :src="item.valueContent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Slides from "@/components/slides/slide_message";

export default {
  props: {
    message: Object,
    isZoom: Boolean
  },
  data() {
    return {
      currentIndex: 0,
      imageBack: require("@/assets/images/message/left-arrow.png"),
      imageNext: require("@/assets/images/message/right-arrow.png")
    };
  },
  computed: {
    numberImage() {
      let count = 0;
      this.message.contents.map(item => {
        if (item.typeContent !== "image") return;
        return count++;
      });
      return count;
    },
    imageList() {
      return this.message.contents.filter(item => {
        if (item.typeContent !== "image") return;
        return true;
      });
    }
  },
  methods: {
    close() {
      this.isZoom = false;
    },
    prev() {
      if (this.currentIndex === 0) return;
      this.currentIndex--;
    },
    next() {
      if (this.currentIndex === this.numberImage - 1) return;
      this.currentIndex++;
    },
    goToSlide(index) {
      this.currentIndex = index;
    }
  },
  components: {
    Slides
  }
};
</script>
<style lang="scss" scoped>
@import "zoom.style";
</style>
