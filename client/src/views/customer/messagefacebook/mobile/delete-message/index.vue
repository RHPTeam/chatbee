<template>
  <div
    class="modal--delete position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="delete--content">
      <h6 class="delete--title">Xóa toàn bộ cuộc trò chuyện?</h6>
      <div class="delete--detail">
        Thao tác này sẽ xóa toàn bộ nội dung cuộc trò chuyện của bạn và không
        thể hoàn tác.
      </div>
      <div class="button--group d_flex justify_content_end align_items_center">
        <button @click="closeModal">Hủy</button>
        <button>Xóa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ishowModalDelete"],
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--delete {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba($color: #000, $alpha: 0.4);
  .delete--content {
    margin: 16px;
    border-radius: 10px;
    padding: 24px;
    text-align: left;
    .delete--title {
      font-size: 16px;
    }
    .delete--detail {
      font-size: 14px;
      margin: 16px 0;
    }
  }
  .button--group {
    button {
      border: 1px solid transparent;
      background-color: transparent;
      outline: none;
      transition: all 0.4s ease;
      text-transform: uppercase;
      color: #ffb94a;
      font-size: 14px;
      font-weight: 600;
      border-radius: 5px;
      margin-left: 40px;
      padding: 2.5px 5px;
      cursor: pointer;
      &:hover {
        border-color: #ffb94a;
      }
    }
  }
}

/*Transition popup*/

.popup-enter {
  transform: translateX(100%);
}

.popup-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

/*Transition popup*/
/*Transition popup*/

.info-enter {
  transform: translateX(100%);
}

.info-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.info-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

/* ChangeColor */
// Light
.modal--delete[data-theme="light"] {
  .delete--content {
    background-color: #ffffff;
    color: #444444;
  }
}

//Dark
.modal--delete[data-theme="dark"] {
  .delete--content {
    background-color: #27292d;
    color: #f7f7f7;
  }
}
</style>
