<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--attribute">
      <div class="modal--content">
        <div
          class="modal--header d_flex align_items_center justify_content_between p_3"
        >
          <div class="modal--header-back" @click="closeModalAttribute">
            <icon-base
              icon-name="back"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-arrow-left />
            </icon-base>
          </div>

            <input
              type="text"
              placeholder="Nhập tên thẻ"
              class="form_control"
            />

          <div class="modal--header-action">
            OK
          </div>
        </div>
        <div class="modal--body">
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Mua cam</div>
            <div class="body--item-people ml_auto">
              <span class="mr_1">20</span>
              <icon-base
                icon-name="user"
                width="16"
                height="16"
                viewBox="0 0 20 20"
              >
                <icon-user />
              </icon-base>
            </div>
          </div>
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Mua cam</div>
            <div class="body--item-people ml_auto">
              <span class="mr_1">20</span>
              <icon-base
                      icon-name="user"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
              >
                <icon-user />
              </icon-base>
            </div>
          </div>
          <div class="body--item d_flex align_items_center">
            <div class="body--item-name">Mua cam</div>
            <div class="body--item-people ml_auto">
              <span class="mr_1">20</span>
              <icon-base
                      icon-name="user"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
              >
                <icon-user />
              </icon-base>
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
  props: ["showModalAttribute"],
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeModalAttribute() {
      this.$emit("closeModalAttribute", false);
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    IconUser
  }
};
</script>

<style lang="scss" scoped>
@import "./popup_mobile.style";
</style>
