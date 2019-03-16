<template>
  <div class="main--header d_flex align_items_center">
    <h1 class="title">Chiến dịch theo bộ hẹn</h1>
    <div class="action--l d_flex align_items_center">
      <div class="action--item copy">
        <icon-base
          class="icon"
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
    <div class="action--r ml_auto" @click="showModal = true">
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
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
/************* CUSTOM CSS COMPONENT ****************/
/**
  * NOTE: U have to code scss with 3 level which mean is 3 indent
   */

.main--header {
  background: 0;
  .title {
    font-size: 24px;
    font-weight: 600;
  }
  .action {
    &--item {
      margin-left: 1rem;
    }
    &--item.live {
      background-color: #ffb94a;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-weight: 600;
      padding: 0.5rem 1rem;
      &:hover,
      &:active,
      &:focus {
        background-color: #eaa63a;
      }
    }
  }
  .icon {
    cursor: pointer;
  }
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .main--header {
  .icon {
    &:hover,
    &:focus,
    &:active {
      color: #000;
    }
  }
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .main--header {
}
</style>
