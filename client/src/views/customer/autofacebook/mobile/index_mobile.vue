<template>
  <div class="main--mobile-wrap p_3" :data-theme="currentTheme">
    <div class="main--content r no_g justify_content_between">
      <div
        class="main--content-item c_4 text_center"
        @click="showMainAutoReply = true"
      >
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item c_4 text_center">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item item--add c_4 text_center">
        <div class="auto--list-item auto--list-plus p_2">
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="16"
            height="16"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
    </div>
    <transition name="main--reply">
      <main-content
        v-if="showMainAutoReply == true"
        :mainReply="showMainAutoReply"
        @closeMainAutoReply="showMainAutoReply = $event"
      />
    </transition>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import MainContent from "./main_mobile";
export default {
  data() {
    return {
      showMainAutoReply: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconPlus,
    MainContent
  }
};
</script>
<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
