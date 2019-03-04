<template>
  <div class="popup--content position_fixed">
    <div class="popup p_3">
      <!--Start: Popup Header-->
      <div
        class="popup--header d_flex justify_content_between align_items_center"
      >
        <div class="popup--header-back">
          <icon-base
            icon-name="logo-short"
            width="31.706"
            height="31.659"
            viewBox="0 0 31.706 31.659"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <div class="popup--header-title">
          <span>Tài khoản</span>
        </div>
        <div class="popup--header-action">
          <a href="#">Xong</a>
        </div>
      </div>
      <!--End: Popup Header-->

      <!--Start: Popup Body-->
      <div class="popup--body">
        <!--Start: User Info Component-->
        <div
          class="user--info d_flex flex_column justify_content_center align_items_center"
        >
          <div class="user--info-image">
            <div class="position_relative">
              <img
                src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
                width="160"
                height="160"
                alt=""
              />
              <div class="image--upload position_absolute">
                <!--<input type="file" />-->
                Thay ảnh
              </div>
            </div>
          </div>
          <div class="user--info-title">Sky Albert</div>
          <div class="user--info-sub">trantoan.fox.97@gmail.com</div>
        </div>
        <!--End: User Info Component-->

        <!--Start: User Form Component-->
        <div class="user--form text_left mt_5">
          <h4 class="divide--title text_left">Thông tin chung</h4>
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
          <div class="form_group position_relative">
            <label for="passwordField">Mật khẩu</label>
            <input
              class="form_control"
              id="passwordField"
              type="password"
              value="0986167832"
            />
            <div class="change--pass position_absolute">Thay đổi</div>
          </div>
          <h4 class="divide--title text_left">Hệ thống</h4>
          <div class="form_group form_inline">
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
          <div class="form_group form_inline">
            <label>Gợi ý</label>
            <div class="group--radio">
              <input
                id="checkboxSuggestion"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              />
              <label for="checkboxSuggestion"></label>
            </div>
          </div>
          <div class="d_flex align_items_center">
            <div class="divide--theme">Chủ đề</div>
            <div class="theme--name ml_auto">Light</div>
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
      // console.log(this.radio);
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
@import "./index_mobile.style";
</style>
