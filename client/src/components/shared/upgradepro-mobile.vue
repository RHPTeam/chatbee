<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          BẠN ĐÃ ĐẠT MỐC GIỚI HẠN TÀI KHOẢN
        </div>
        <div class="modal--body">
          Số lượng tài khoản hiện tại của bạn đã vượt mức tối đa 2 tài khoản.
          Liên hệ với bộ phận CSKH để nâng cấp tài khoản của mình.
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-contact">
            LIÊN HỆ NGAY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showUpgradePro"],

  data() {
    return {
      cookie: ""
    };
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  },

  components: {}
};
</script>

<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  font-family: "Open Sans", sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .modal--dialog {
    width: 100%;
    height: 100%;

    .modal--content {
      width: 90%;
      border-radius: 10px;
      padding: 1.25rem;

      .modal--header {
        padding: 1rem 0;
      }

      .modal--body {
        margin-top: 0.5rem;
      }

      .modal--footer {
        margin-top: 1.5rem;
        font-size: 14px;

        .btn-contact {
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          background-color: #ffb94a;
          border: 1px solid #ffb94a;
          font-weight: 600;
          color: #fff;
          transition: all 0.4s ease;
          cursor: pointer;
          outline: none;

          &:hover {
            background-color: #ff9e4a;
          }
        }

        .btn-skip {
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          background-color: transparent;
          border: 0;
          color: #999;
          font-weight: 600;
          cursor: pointer;
          outline: none;

          &:hover {
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
}

/* ChangeColor */

// Light
.modal--wrapper[data-theme="light"] {
  color: #444444;
  .modal--content {
    background-color: #fff;
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

//Dark
.modal--wrapper[data-theme="dark"] {
  color: #f7f7f7;

  .modal--content {
    background-color: #27292d;
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #2f3136;
        }
      }
    }
  }
}
</style>
