<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--attribute">
      <div class="modal--content">
        <div
          class="modal--header d_flex align_items_center justify_content_between p_3"
        >
          <div class="modal--header-back" @click="closeModalValue">
            <icon-base
              icon-name="back"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-arrow-left />
            </icon-base>
          </div>

          <input type="text" placeholder="Nhập gía trị" class="form_control" />

          <div class="modal--header-action">
            OK
          </div>
        </div>
        <div class="modal--body">
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Đặt lại</div>
          </div>
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Nam</div>
          </div>
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Nữ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
export default {
  props: ["showModalValue"],
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeModalValue() {
      this.$emit("closeModalValue", false);
    }
  },
  components: {
    IconBase,
    IconArrowLeft
  }
};
</script>

<style lang="scss" scoped>
@import "./popup_mobile.style";
</style>
