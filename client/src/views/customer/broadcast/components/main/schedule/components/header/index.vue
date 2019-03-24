<template>
  <div class="main--header d_flex align_items_center">
    <h1 class="title">Chiến dịch theo bộ hẹn</h1>
    <div class="action--l d_flex align_items_center">
      <div class="action--item copy">
        <icon-base
          class="icon disable"
          icon-name="icon-copy"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-copy />
        </icon-base>
      </div>
      <div class="action--item live">
        <icon-base
          icon-name="icon-copy"
          width="14"
          height="16"
          viewBox="0 0 13.955 16"
        >
          <icon-play-button />
        </icon-base>
        <span class="ml_2">Thiết lập</span>
      </div>
    </div>
    <div class="action--r ml_auto" @click="isDeletePopup = !isDeletePopup">
      <icon-base
        class="icon"
        icon-name="remove"
        width="26"
        height="26"
        viewBox="0 0 15 15"
      >
        <icon-remove />
      </icon-base>
    </div>
    <delete-popup
      v-if="isDeletePopup === true"
      @close="isDeletePopup = $event"
      desc="Bạn có thực sự muốn xóa chiến dịch này không?"
      :content="this.$route.params.scheduleId"
      target="schedule"
    />
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
