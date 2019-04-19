<template>
  <div
    class="notification d_flex align_items_center popup-enter"
    v-if="item.status == false"
  >
    <div class="notification--text w_75">
      Bạn đã đăng xuất tài khoản facebook <span>{{ item.userInfo.name }}</span
      >. Hãy đăng nhập lại và cập nhật lại cookie!.
    </div>
    <div class="right w_25">
      <button class="btn--update" @click="showModal = true">
        Cập nhật
      </button>
    </div>
    <transition name="popup">
      <update-cookie-mobile
        v-if="showModal == true"
        :item="item"
        @closeAddPopup="showModal = $event"
        :nameBread="nameBread"
        :subBread="subBread"
      />
    </transition>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      showModal: false,
      nameBread: "Cập nhật tài khoản Facebook",
      subBread:
        "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản."
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.w_75 {
  width: 75% !important;
}
.w_25 {
  width: 25% !important;
}
.notification {
  width: 100%;
  padding: 0.25rem;
  font-size: 12px;
  justify-content: space-between;
  transition: all 0.4s ease;
  border-bottom: 1px dotted #ffffff;
  background-color: #ff0000;
  &:last-child {
    border-bottom: 0;
  }
  &--text {
    width: 95%;
    text-align: center;
    color: #ffffff;
    span {
      color: #ffab0d;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .right {
    button {
      background-color: transparent;
      box-shadow: none;
      border: 1px solid #ffffff;
      border-radius: 0.25rem;
      color: #ffffff;
      height: 24px;
      font-size: 13px;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        background-color: #ffffff;
        color: #ff0000;
        transition: all 0.5s ease;
      }
    }
  }
  &--close {
    cursor: pointer;
  }
}
</style>
