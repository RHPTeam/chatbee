<template>
  <div class="main--header d_flex align_items_center">
    <h1 class="title">Tin nhắn gửi ngay</h1>
    <div class="action--l">
      <div class="action--item copy">
        <icon-base
          class="icon--base"
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
          class="icon--base"
          icon-name="icon-copy"
          width="14"
          height="16"
          viewBox="0 0 13.955 16"
        >
          <icon-play-button />
        </icon-base>
        <span class="ml_2">Gửi ngay</span>
      </div>
    </div>
    <div class="action--r ml_auto" @click="showModal = true">
      <icon-base
        icon-name="remove"
        width="26"
        height="26"
        viewBox="0 0 15 15"
      >
        <icon-remove />
      </icon-base>
    </div>
  </div>
</template>