<template>
  <div class="popup--delete">
    <div class="popup-bg">
      <div class="popup--header d_flex align_items_center">
        <div class="">
          <div class="popup--desc">
            Kịch bản
          </div>
          <div class="popup--title">
            Mua cam
          </div>
        </div>
        <div class="popup--close ml_auto" @click="closeAddPopup">
          <icon-base
            class="icon--cancel"
            icon-name="cancel"
            width="16"
            height="16"
            viewBox="0 0 15.642 15.642"
          >
            <icon-cancel />
          </icon-base>
        </div>
      </div>
      <div class="popup--body">
        <div class="popup-delete">
          <span>
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </span>
          <span class="text">Xóa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCancel from "@/components/icons/IconCancel";
import IconRemove from "@/components/icons/IconRemove";

export default {
  name: "popup_delete",
  components: {
    IconBase,
    IconCancel,
    IconRemove
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style scoped lang="scss">
.popup--delete {
  position: fixed;
  display: flex;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  align-items: flex-end;

  .popup-bg {
    background: #2f3136;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .popup--header {
    padding: 10px 16px;
    border-bottom: 1px solid #444;
    font-size: 14px;

    .popup--desc {
      color: #f7f7f7;
    }

    .popup-title {
      color: #999999;
    }
  }

  .popup--body {
    padding: 20px 0;

    span {
      display: block;
      color: #fff;
      font-size: 13px;
    }

    svg {
      color: #f96666;
    }
  }
}
</style>
