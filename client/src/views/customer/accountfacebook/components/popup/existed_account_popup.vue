<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div
        class="modal--content position_relative"
        v-click-outside="closeAddPopup"
      >
        <div class="modal--body mt_4">
          <div class="error--title">Tài khoản Facebook đã tồn tại</div>
          <div class="error--desc mt_2 mb_4">
            Chúng tôi nhận thấy tài khoản Facebook của bạn đã được thêm vào hệ
            thống. Hãy chắc chắn rằng bạn đã thêm đúng tài khoản của mình và
            chưa sử dụng nó trong bất kì tài khoản Zinbee nào.
          </div>
        </div>
        <div class="btn--close position_absolute" @click="closeAddPopup">
          <icon-base
            class="icon--close mr_1"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-close />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeAddPopup() {
      this.$store.dispatch("setAddAccountErrorEmpty");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../list_account.scss";

.modal--wrapper {
  .btn--close {
    cursor: pointer;
    right: 5px;
    top: 15px;
  }
}

.modal--wrapper[data-theme="light"] {
  .btn--close {
    svg {
      color: #ccc;
    }
  }
}

.modal--wrapper[data-theme="dark"] {
  .btn--close {
    svg {
      color: #666;
    }
  }
}
</style>
