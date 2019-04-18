<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_end">
      <div class="modal--content text_center mb_2">
        <div class="modal--body mb_1">
          <div class="modal--desc p_2">
            Toàn bộ nội dung cuộc trò chuyện này sẽ bị xóa và không thể hoàn
            tác. Bạn có chắc chắn muốn xóa không?
          </div>
          <div class="btn--delete p_2" @click.prevent="deleteItem">
            Xóa
          </div>
        </div>
        <div class="modal--footer btn--skip p_2" @click="closeDeleteItemPopup">
          Hủy
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    }
  },
  methods: {
    async closeDeleteItemPopup() {
      this.$emit("close", false);
    },
    async deleteItem() {
      const conveID = this.curConversation._id;
      this.$store.dispatch("deleteConversation", conveID);
      this.$router.go("/f_message");
    }
  }
};
</script>
<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  .modal--dialog {
    width: 100%;
    height: 100%;
  }
  .modal--content {
    border-radius: 10px;
    width: 90%;
    .modal--body {
      border-radius: 10px;
    }
    .modal--desc {
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      font-weight: 500;
    }
    .btn {
      color: #ffffff;
      &:focus,
      &:hover,
      &:active,
      &:visited {
        border: 0;
        box-shadow: none;
        outline: 0;
      }
    }
    .btn--delete {
      font-weight: 600;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
  }
}
.modal--wrapper[data-theme="light"] {
  .modal--content {
    .modal--body {
      background-color: #ffffff;
    }
    .modal--footer {
      background-color: #ffffff;
      border-radius: 10px;
    }
    .modal--desc {
      color: #444444;
    }
    .btn--delete {
      color: #ff0000;
    }
    .btn--skip {
      border-radius: 10px;
      color: #ffb94a;
      font-weight: 600;
    }
  }
}
.modal--wrapper[data-theme="dark"] {
  .modal--content {
    .modal--body {
      background-color: #2f3136;
      color: #ffffff;
    }
    .modal--footer {
      background-color: #2f3136;
      border-radius: 10px;
      color: #ffffff;
    }
    .modal--desc {
      color: #ffffff;
    }
    .btn--skip {
      background-color: #2f3136;
      color: #ffb94a;
    }
    .btn--delete {
      background-color: #2f3136;
      color: #ff0000;
    }
  }
}
</style>
