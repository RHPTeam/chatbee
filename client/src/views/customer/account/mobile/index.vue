<template>
  <div class="popup--content position_fixed">
    <div class="popup">
      <!--Start: Popup Header-->
      <div
        class="popup--header d_flex justify_content_between align_items_center"
      >
        <div class="popup--header-back">
          <button>
            <icon-base
              icon-name="logo-short"
              width="31.706"
              height="31.659"
              viewBox="0 0 31.706 31.659"
            >
              <icon-arrow-left />
            </icon-base>
          </button>
        </div>
        <div class="popup--header-title">
          <span>Thiết lập tài khoản</span>
        </div>
        <div class="popup--header-action">
          <a href="#">Xong</a>
        </div>
      </div>
      <!--End: Popup Header-->

      <!--Start: Popup Body-->
      <div class="popup--body">
        <!--Start: User Info Component-->
        <div class="user--info flex_column justify_content_center">
          <div class="user--info-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Bierstadt%2C_Albert_-_Sea_and_Sky.jpg"
              alt="User Image Avatar"
            />
            <div class="image--upload">
              <input type="file" />
            </div>
          </div>
          <div class="user--info-title">Sky Albert</div>
          <div class="user--info-sub">trantoan.fox.97@gmail.com</div>
        </div>
        <!--End: User Info Component-->

        <!--Start: User Form Component-->
        <div class="user--form">
          <div class="divide--title">Thông tin chung</div>
          <div class="form_group">
            <label for="nameField">Tên</label>
            <input
              class="form_control"
              id="nameField"
              type="text"
              placeholder="Tên của bạn..."
            />
          </div>
          <div class="form_group">
            <label for="phoneField">Điện thoại</label>
            <input
              class="form_control"
              id="phoneField"
              type="number"
              placeholder="098"
            />
          </div>
          <div class="divide--title">Hệ thống</div>
          <div class="form_group">
            <label>Hướng dẫn</label>
            <div class="group--radio">
              <input
                id="checkboxTutorial"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              />
              <label for="checkboxTutorial"></label>
            </div>
          </div>
        </div>
        <!--End: User Form Component-->
      </div>
      <!--End: Popup Body-->
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
export default {
  data() {
    return {
      radio: true
    };
  },
  methods: {
    updateValue: function() {
      console.log(this.radio);
      this.radio = !this.radio;
    }
  },
  components: {
    IconBase,
    IconArrowLeft
  }
};
</script>

<style lang="scss" scoped>
.popup--content {
  background-color: #000;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1100;
  .popup--header {
    height: 60px;
    padding: 0 16px;
  }
  .user--info-image {
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .user--form {
    .group--radio {
      $transition-duration: 0.4s;
      position: relative;
      .radio {
        position: absolute;
        opacity: 0;
        z-index: 0;
        + label {
          position: relative;
          display: inline-flex;
          width: 40px;
          height: 20px;
          border-radius: 20px;
          border: solid 1px;
          cursor: pointer;
          transition: all $transition-duration;
          &::after {
            font-weight: 400;
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            border: solid 1px;
            border-radius: 50%;
            position: absolute;
            left: 6px;
            top: 4px;
            transition: all $transition-duration;
          }
        }
        &:checked {
          + label {
            border-color: #ffb94a !important;
            background-color: #ffb94a;
            &::after {
              content: "";
              border-color: #fff !important;
              left: calc(100% - 16px);
              background-color: #ffffff;
              transform: rotate(360deg);
            }
          }
        }
      }
    }
  }
}
</style>
