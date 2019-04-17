<template>
  <div
    class="notification d_flex align_items_center popup-enter"
    v-if="item.status == false"
  >
    <div class="notification--text">
      Bạn đã đăng xuất tài khoản facebook <span>{{ item.userInfo.name }}</span
      >. Hãy đăng nhập lại và cập nhật lại cookie!.
      <button class="btn--update ml_4" @click="showModal = true">
        Cập nhật ngay
      </button>
    </div>
    <update-cookie
      v-if="showModal == true"
      :item="item._id"
      :popupData="showModal"
      @closeAddPopup="showModal = $event"
      :nameBread="nameBread"
      :subBread="subBread"
    />
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
.notification {
  width: 100%;
  padding: 0.25rem 2.5rem;
  font-size: 13px;
  justify-content: space-between;
  transition: all 0.4s ease;
  border-bottom: 1px dotted #ffffff;
  background-color: #ff0000;
  &:last-child {
    border-bottom: 0;
  }
  &--text {
    width: 95%;
    margin-right: 1rem;
    text-align: center;
    color: #ffffff;
    span {
      color: #ffab0d;
      font-size: 14px;
      font-weight: 500;
    }
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
