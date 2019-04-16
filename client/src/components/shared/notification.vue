<template>
  <div
    class="notification d_flex popup-enter bg_danger"
    v-if="item.status == false"
  >
    <div class="notification--text">
      Bạn đã đăng xuất tài khoản facebook <span>{{ item.userInfo.name }}</span
      >. Hãy đăng nhập lại và cập nhật lại cookie!.
      <button class="btn btn--update ml_4" @click="showModal = true">
        Cập nhật ngay
      </button>
    </div>
    <update-cookie
      v-if="showModal == true"
      :popupData="showModal"
      :item="item._id"
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
      subBread: "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật tài khoản."
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  height: 100%;
  padding: 0.75rem 2.5rem;
  font-size: 14px;
  justify-content: space-between;
  transition: all 0.4s ease;
  border-bottom: 1px solid #ffffff;
  &--text {
    width: 95%;
    margin-right: 1rem;
    text-align: center;
    color: #ffffff;
    span {
      color: #ffab0d;
      font-size: 18px;
      font-weight: 500;
    }
    button {
      /*background-color: #ffffff;*/
      border-color: #ffffff;
      color: #ffffff;
    }
  }

  &--close {
    cursor: pointer;
  }
}

/* ChangeColor */

// Light
.notification[data-theme="light"] {
  background-color: #fff;
  &--close {
    svg {
      color: #ccc;
    }
  }
}

//Dark
.notification[data-theme="dark"] {
  background-color: #27292d;
  &--close {
    svg {
      color: #999;
    }
  }
}
</style>
