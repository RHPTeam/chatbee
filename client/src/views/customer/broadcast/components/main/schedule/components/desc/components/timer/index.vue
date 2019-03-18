<template>
  <!--Section option hours-->
  <div class="timer">
    <div class="option--time py_3 d_flex align_items_center mt_4">
      <date-picker class="option--time-days position_relative" />
      <div class="option--time-hours mr_4 ml_4">
        <input
          type="text"
          placeholder="12:00"
          class="form_control option--time-item text_center"
        />
      </div>
      <div
        class="option--time-repeat position_relative"
        v-click-outside="closeOptionRepeat"
        @click="showOptionRepeat = !showOptionRepeat"
      >
        <input
          type="text"
          value="Repeat: none"
          readonly
          class="form_control option--time-item"
        />
        <div class="icon position_absolute">
          <icon-base
            icon-name="dropdown"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-drop-down />
          </icon-base>
        </div>
        <div
          class="option--repeat position_absolute text_left"
          v-if="showOptionRepeat == true"
        >
          <div class="option--repeat-item">Lặp lại: Không</div>
          <div class="option--repeat-item">Lặp lại: Hằng ngày</div>
          <div class="option--repeat-item">Lặp lại: Cuối tuần</div>
          <div class="option--repeat-item">Lặp lại: Hằng tháng</div>
          <div class="option--repeat-item">Lặp lại: Làm việc</div>
          <div class="option--repeat-item" @click="showCustom = !showCustom">
            Lặp lại: Tùy chỉnh
          </div>
        </div>
      </div>
    </div>
    <div class="option--custom" v-if="showCustom == true">
      <div class="option--custom-wrap d_flex mb_3">
        <div class="option--custom-item">CN</div>
        <div class="option--custom-item">T2</div>
        <div class="option--custom-item">T3</div>
        <div class="option--custom-item">T4</div>
        <div class="option--custom-item">T5</div>
        <div class="option--custom-item">T6</div>
        <div class="option--custom-item">T7</div>
      </div>
    </div>
  </div>
  <!--End Section option hours-->
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconDropDown from "@/components/icons/IconDropDown";
import DatePicker from "@/components/shared/datepicker_library/index";
export default {
  data() {
    return {
      showOptionRepeat: false,
      showOptionDays: false,
      showCustom: false
    };
  },
  methods: {
    closeOptionRepeat() {
      this.showOptionRepeat = false;
    },
    closeOptionDays() {
      this.showOptionDays = false;
    }
  },
  components: {
    IconBase,
    IconDropDown,
    DatePicker
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
