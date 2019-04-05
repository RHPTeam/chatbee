<template>
  <div class="rhp">
    <span @click.prevent="isShow = true">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
        <icon-remove />
      </icon-base>
    </span>

    <div
      v-if="isShow === true"
      class="modal--wrapper"
      :data-theme="currentTheme"
    >
      <div
        class="modal--dialog d_flex justify_content_center align_items_center"
      >
        <div class="modal--content text_center">
          <div class="modal--header">
            <img :src="imageLogo" width="136" height="70" alt="" />
          </div>
          <div class="modal--body">
            <div class="modal--desc">
              CẢNH BÁO: Bạn có thực sự muốn xóa tài khoản
              <span style="color: red">{{ content.userInfo.name }}</span> không?
              Tất cả thiết lập thuộc tài khoản này sẽ bị dừng hoặc xóa!
            </div>
          </div>
          <div
            class="modal--footer d_flex justify_content_between align_items_center"
          >
            <button
              type="button"
              class="btn--modal btn-skip"
              @click.prevent="closePopup"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn--modal btn-add"
              @click.prevent="deleteItem"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: Object
  },
  data() {
    return {
      isShow: false,
      imageLogo: require("@/assets/images/register--logo.png")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.isShow = false;
    },
    async deleteItem() {
      await this.closePopup();
      // remove localStorage
      localStorage.removeItem("rid");
      this.$store.dispatch("deleteAccountFacebook", this.content._id);
    }
  }
};
</script>
<style lang="scss" scoped>
.rhp > span:first-child {
  cursor: pointer;
}

//Modal Delete
.modal--wrapper {
  background-color: rgba(37, 47, 51, 0.8);
  font-family: "Open Sans", sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  transition: 1s ease-in-out;
  .modal--dialog {
    width: 100%;
    height: 100%;
  }
  .modal--content {
    background: #ffffff;
    border-radius: 7px;
    box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.12);
    padding: 41px 86px;
    width: 500px;
    transition: 1s ease-in-out;
  }
  .modal--body {
    padding: 0 30px;
    .modal--title {
      font-size: 26px;
      font-weight: 600;
      margin-top: 10px;
    }
    .modal--desc {
      font-size: 14px;
      font-weight: 700;
      margin: 15px 0 27px 0;
    }
  }
  .modal--footer {
    padding: 0 30px;
    font-size: 14px;
    .btn--modal {
      border-radius: 10px;
      border: 1px solid #ffb94a;
      cursor: pointer;
      font-weight: 700;
      height: 40px;
      text-transform: uppercase;
      transition: all 0.4s ease;
      outline: none;
      width: 120px;
    }
    .btn-add {
      border: 0;
      background-color: #ffb94a;
      color: #ffffff;
      &:hover,
      &:focus,
      &:active {
        background-color: #f2ad3f;
      }
    }
    .btn-skip {
      background-color: transparent;
      color: #ffb94a;
    }
  }
}
//Change theme
//Light
.modal--wrapper[data-theme="light"] {
  .modal--content {
    background: #ffffff;
    .modal--desc {
      color: #3f3f3f;
    }
  }
}
//Dark
.modal--wrapper[data-theme="dark"] {
  .modal--content {
    background: #27292d;
    .modal--desc {
      color: #ffffff;
    }
  }
}
</style>
