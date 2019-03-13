<template>
  <div class="popup--content position_fixed">
    <div class="popup">
      <div class="popup--header pl_3 pr_3">
        <div class="d_flex justify_content_between align_items_center">
          <div class="back">
            <icon-base
              class="icon--arrow-left"
              width="15"
              height="24"
              viewBox="0 0 22.65 20.07"
            >
              <icon-arrow-left />
            </icon-base>
          </div>
          <div class="search">
            <div class="search--wrap">
              <span v-text="'{{'"></span>
              <div
                class="search--value"
                contenteditable="true"
                data-placeholder="Nhập thẻ mới"
              ></div>
              <span v-text="'}}'"></span>
            </div>
          </div>
          <div class="action">
            <a href="javascript:void(0)">Tiếp</a>
          </div>
        </div>
      </div>
      <div class="popup--body">
        <div class="attr d_flex flex_row">
          <div class="attr--item">
            <div class="d_flex justify_content_between">
              <div class="attr--item-text">
                <span v-text="'{{'"></span>
                <span>Mua táo</span>
                <span v-text="'}}'"></span>
              </div>
              <div class="attr--item-detail">
                <span>20</span>
                <icon-base
                  class="icon--arrow-left"
                  width="15"
                  height="24"
                  viewBox="0 0 22.65 20.07"
                >
                  <icon-arrow-left />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconUser from "@/components/icons/IconUser";

export default {
  data() {
    return {};
  },
  components: {
    IconBase,
    IconArrowLeft
  }
};
</script>
<style lang="scss" scoped>
.popup--content {
  background-color: #000;
  height: 100vh;
  left: 0;
  min-height: 100%;
  top: 0;
  width: 100%;
  z-index: 100;
  .popup--header {
    height: 56px;
  }
}
</style>
