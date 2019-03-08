<template>
  <div class="main--mobile-wrap">
    <div class="main--content d_flex justify_content_between p_3">
      <div class="main--content-item m_1">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item m_1">
        <div class="auto--list-item p_2">Mặc định</div>
      </div>
      <div class="main--content-item m_1">
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
    <main-content />
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import MainContent from "./main_mobile";
export default {
  data() {
    return {};
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
