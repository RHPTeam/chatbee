<template>
  <div class="popup--move-delete">
    <div class="popup-bg">
      <div class="popup--header d_flex align_items_center">
        <div class="">
          <div class="popup--desc">
            Nhóm kịch bản
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
      <div class="popup--body d_flex justify_content_center">
        <div class="popup--action popup--move-up">
          <span>
            <icon-base
              icon-name="move-up"
              width="20"
              height="20"
              viewBox="0 0 12.1 20.1"
            >
              <icon-move-up />
            </icon-base>
          </span>
          <span class="text">Chuyển lên</span>
        </div>
        <div class="popup--action popup--move-down">
          <span>
            <icon-base
              icon-name="move-down"
              width="20"
              height="20"
              viewBox="0 0 12.1 20.1"
            >
              <icon-move-down />
            </icon-base>
          </span>
          <span class="text">Chuyển xuống</span>
        </div>
        <div class="popup--action popup--icon-delete">
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
import IconMoveDown from "@/components/icons/IconMoveDown";
import IconMoveUp from "@/components/icons/IconMoveUp";

export default {
  components: {
    IconBase,
    IconCancel,
    IconRemove,
    IconMoveDown,
    IconMoveUp
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style scoped lang="scss">
.popup--move-delete {
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

    .popup--title {
      color: #999999;
      text-align: left;
    }
  }

  .popup--body {
    padding: 20px 0;

    > div {
      padding: 0;
    }

    .text {
      display: block;
      color: #f7f7f7;
      margin-top: .25rem;
      font-size: 12px;
    }

    .popup--action {
      width: 100px;
    }

    .popup--icon-delete {
      svg {
        color: #f96666;
      }
    }

    .popup--move-down {
      svg {
        color: #FFB94A;
      }
    }

    .popup--move-up {
      svg {
        color: #FFB94A;
      }
    }


  }
}
</style>
