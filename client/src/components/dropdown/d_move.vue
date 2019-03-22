<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content p_4">
        <div class="modal--header d_flex align_items_center justify_content_between">
          <div class="modal-header-title">Move Untitled Block 5 block</div>
          <div class="modal--close" @click="closePopup">
            <icon-base icon-name="close" width="24" height="24" viewBox="0 0 25 25">
              <icon-close/>
            </icon-base>
          </div>
        </div>
        <div class="modal--body pt_2">
          <div class="modal--move text_left p_3">
            <div class="modal--move-label text_left pb_2 mb_2">To ...</div>
            <input type="text" class="modal--move-input p_2">
          </div>
        </div>
        <div class="modal--footer text_right p_3">
          <button class="btn--action pb_2 pt_2 pl_4 pr_4">Move Block</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showPopupMove"],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(153, 153, 153, 0.4);

  .modal--dialog {
    height: 100%;
    width: 100%;
  }

  .modal--content {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    color: #000000;
    width: 700px;
  }

  .modal-header-title {
    font-size: 24px;
    font-weight: 500;
  }

  .modal--close {
    color: #999;
    cursor: pointer;
  }

  .modal--move {
    &-label {
      font-size: 18px;
    }

    input {
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1rem;
      height: 40px;
      line-height: 34px;
      opacity: 0.5;
      padding: 0px 42px;
      transition: all .5s ease;
      width: 100%;
    }
  }

  button.btn--action {
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
}

.modal--wrapper[data-theme="dark"] {
  .modal--content {
    background: #2f3136;
    box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  .modal--move {
    input {
      background: #2f3136;
      border: 1px solid #ccc;
      -webkit-box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.1);
      box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }

  button.btn--action {
    background-color: #27292c;
    color: #666666;
    border: 1px solid #999;
  }
}
</style>