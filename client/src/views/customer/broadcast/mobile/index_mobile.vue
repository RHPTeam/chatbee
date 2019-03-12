<template>
  <div class="main--mobile" :data-theme="currentTheme">
    <div class="mobile--wrap p_3">
      <!--Deliver message-->
      <div class="mobile--wrap-deliver">
        <div class="mobile--wrap-title text_left d_flex align_items_center">
          <div class="mobile--wrap-icon">
            <icon-base
              icon-name="icon-sort-down"
              class="icon-sort-down"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <icon-sort-down />
            </icon-base>
          </div>
          <span class="ml_2">Gửi tin nhắn ngay</span>
        </div>
        <div class="mobile--wrap-item r no_g justify_content_between pt_3 pb_3">
          <div class="c_6 text_center">
            <div class="broadcasts--item auto--list-plus p_2">
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
      </div>
      <!--End deliver message-->
      <!--Schedule message-->
      <div class="mobile--wrap-schedule">
        <div class="mobile--wrap-title text_left">
          <icon-base
            icon-name="icon-sort-down"
            class="icon-sort-down"
            width="10"
            height="10"
            viewBox="0 0 10 10"
          >
            <icon-sort-down />
          </icon-base>
          <span class="ml_2">Tùy chọn gửi tin</span>
        </div>
        <div class="mobile--wrap-item r no_g justify_content_between pt_3 pb_3">
          <div class="c_6" @click="showBroadMobile = !showBroadMobile">
            <div class="broadcasts--item schedule--item p_2">
              07 Thg03 13:00
            </div>
          </div>
          <div class="c_6">
            <div class="broadcasts--item schedule--item p_2">
              07 Thg03 13:00
            </div>
          </div>
          <div class="c_6">
            <div class="broadcasts--item schedule--item p_2">
              07 Thg03 13:00
            </div>
          </div>
          <div class="c_6">
            <div class="broadcasts--item schedule--item p_2">
              07 Thg03 13:00
            </div>
          </div>
          <div class="broadcasts--item item--add c_6 text_center">
            <div class="broadcasts--item auto--list-plus p_2">
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
      </div>
      <!--End schedule message-->
    </div>
    <transition name="broad">
      <main-broad-mobile
        v-if="showBroadMobile == true"
        :mainBroad="showBroadMobile"
        @closeMainBroad="showBroadMobile = $event"
      />
    </transition>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconSortDown from "@/components/icons/IconSortDown";
import MainBroadMobile from "./main_mobile";
export default {
  data() {
    return {
      showBroadMobile: false
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
    IconSortDown,
    MainBroadMobile
  }
};
</script>
<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
