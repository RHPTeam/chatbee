<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="login--logo">
            <icon-base
              icon-name="logo"
              width="185.7"
              height="94.115"
              viewBox="0 0 185.7 94.115"
            >
              <icon-logo/>
            </icon-base>
          </div>
        </div>
        <div class="modal--body">
          <!--<div class="modal&#45;&#45;title">Đăng nhập với cookie</div>-->
          <div class="modal--desc">
            Hành động này sẽ không thể hoàn tác.
            Bạn có chắc chắn muốn xóa không?
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-cancel" @click="closeAddPopup">Hủy</button>
          <button class="btn-delete">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconLogo from "@/components/icons/IconLogo";

export default {
  comments: {
    IconBase,
    IconLogo
  }
}
</script>

<style scoped>

</style>