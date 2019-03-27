<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">Xóa các tài khoản đã chọn</div>
          <div class="desc mt_3">Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeDialog">HỦY</button>
          <button class="btn-submit" @click="deleteSelected">
            XÓA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: [
    "selectedUIDs",
  ],

  data() {
    return {
    };
  },

  computed: {
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    deleteSelected() {
      console.log(this.selectedUIDs);
    }
  },

  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
    .modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  font-family: "Open Sans", sans-serif;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .modal--dialog {
    width: 100%;
    height: 100%;

    .modal--content {
      width: 440px;
      border-radius: 10px;
      padding: 1.25rem;

      .modal--header {
        .title {
          font-size: 20px;
          font-weight: 600;
          text-align: center;
        }
        .title--small {
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
        }
        .desc {
          color: #999999;
        }
      }

      .modal--body {
        margin-top: 0.5rem;
        &-input {
          width: 100%;
          padding: .5rem .75rem;
          border-radius: 10px;
          &:active,
          &:focus {
            border-color: #ff9e4a;
            border-radius: 10px;
            outline: 0 !important;
          }
          &::placeholder {
            text-transform: none;
            color: #cccccc;
          }
        }
      }

      .modal--footer {
        margin-top: 1.5rem;
        font-size: 14px;

        .btn-submit {
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

/*Transition popup*/
.popup-enter {
  transform: translateY(-100%);
}
.popup-enter-to {
  transition: transform 0.75s;
  transform: translateY(0);
}
.popup-leave-to {
  transition: transform 0.75s;
  transform: translateY(-100%);
}
  
/* Color */
.modal--wrapper{
  color: #444444;
  .modal--content {
    background-color: #fff;
    .modal--body {
      &-input {
        color: #444;
        border: 1px solid #e4e4e4;
        &::placeholder {
          color: #cccccc;
        }
      }
    }
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

</style>
