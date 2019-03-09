<template>
  <div class="popup--move-delete">
    <div class="popup--bg">
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
            <icon-cancel/>
          </icon-base>
        </div>
      </div>
      <div class="popup--header d_flex align_items_center">
        <div class="">
          <div class="popup--desc">
            Văn bản
          </div>
          <div class="popup--title">
            Lorem ipsum dolor sit amet, conse adipiscing elit, se ...
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
            <icon-cancel/>
          </icon-base>
        </div>
      </div>
      <div class="popup--header popup--image d_flex align_items_center">
        <div class="">
          <img class="float_left mr_2 "
               src="http://pipsum.com/40x40.jpg"
               alt="demo scripts facebook"
          />
          <div class="float_left">
            <div class="popup--desc">
              Hình ảnh
            </div>
            <div class="popup--title">
              img.png
            </div>
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
            <icon-cancel/>
          </icon-base>
        </div>
      </div>
      <div class="popup--body d_flex justify_content_center">
        <div class="popup--move-up">
          <span>
            <icon-base
              icon-name="move-up"
              width="20"
              height="20"
              viewBox="0 0 12.1 20.1"
            >
              <icon-move-up/>
            </icon-base>
          </span>
          <span class="text">Chuyển lên</span>
        </div>
        <div class="popup--move-down">
          <span>
            <icon-base
              icon-name="move-down"
              width="20"
              height="20"
              viewBox="0 0 12.1 20.1"
            >
              <icon-move-down/>
            </icon-base>
          </span>
          <span class="text">Chuyển xuống</span>
        </div>
        <div class="popup--icon-delete">
          <span>
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove/>
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
.popup {
  &--move-delete {
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.4);
    bottom: 0;
    display: flex;
    left: 0;
    top: 0;
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 999;
  }

  &--bg {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: #2f3136;
    width: 100%;
  }

  &--header {
    border-bottom: 1px solid #444;
    font-size: 14px;
    text-align: left;
    padding: 10px 16px;

    > div:first-child {
      flex: 0 0 calc(100% - 40px);
      width: calc(100% - 40px);
    }

    &--desc {
      color: #f7f7f7;
    }

    &--title {
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &--body {
    padding: 20px 0;

    > div {
      padding: 0 10px;
    }

    span {
      color: #fff;
      display: block;
      font-size: 13px;
    }

    .popup--icon-delete {
      svg {
        color: #f96666;
      }
    }
  }
}
</style>
