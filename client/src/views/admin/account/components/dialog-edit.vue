<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content">
      <div class="modal--header p_3">Cấu hình tài khoản</div>
      <div class="modal--body p_3">
        <div class="user d_flex justify_content_start align_items_center mb_3">
          <div class="user--avatar mr_4">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="64"
              alt="User Avatar"
            />
          </div>
          <div class="user--info">
            <div class="user--info-name mb_2">Phan Đức</div>
            <div class="user--info-mail">pvduc196@gmail.com</div>
          </div>
        </div>
        <div class="edit">
          <div
            class="edit--status d_flex justify_content_between align_items_center"
          >
            <div class="edit--desc">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Kích hoạt:
            </div>
            <div class="status--radio">
              <input
                id="checkbox"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              />
              <label for="checkbox"></label>
            </div>
          </div>
          <div
            class="edit--account d_flex justify_content_between align_items_center"
          >
            <div class="edit--desc">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Số lượng tài khoản giới hạn:
            </div>
            <div class="account--input">
              <input type="number" />
            </div>
          </div>
          <div
            class="edit--type d_flex justify_content_between align_items_center"
          >
            <div class="edit--desc">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Loại tài khoản:
            </div>
            <div class="type--select">
              <div class="select--wrapper position_relative">
                <select>
                  <option>Trang thái</option>
                  <option>phút</option>
                  <option>giờ</option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="edit--time d_flex justify_content_between align_items_center"
          >
            <div class="edit--desc">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Thời gian hoạt động:
            </div>
            <div class="time--tick">
              <datepicker
                :readonly="true"
                format="YYYY-MM-DD"
                name="date-edit"
                v-model="date"
              ></datepicker>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal--footer d_flex justify_content_end align_items_center p_3"
      >
        <button class="btn-skip" @click="closeAddEdit">Hủy</button>
        <button class="btn-done ml_4">Xong</button>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import Datepicker from "@/components/shared/datepicker_library";
export default {
  props: ["showEdit"],
  components: {
    IconBase,
    IconCheckActive,
    Datepicker
  },
  methods: {
    closeAddEdit() {
      this.$emit("closeAddEdit", false);
    },
    updateValue: function() {
      this.radio = !this.radio;
    }
  },
  data() {
    return {
      radio: true
    };
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(153, 153, 153, 0.4);
  .modal--content {
    border-radius: 8px;
    background-color: #ffffff;
    width: 600px;
  }
  .modal--header {
    border-bottom: 1px solid #dcdcdc;
    font-size: 16px;
    font-weight: 600;
    color: #646464;
  }
}

.status--radio {
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
        border-color: #56e8bd !important;
        background-color: #56e8bd;
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
</style>
