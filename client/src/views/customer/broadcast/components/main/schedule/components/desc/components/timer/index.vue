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
          v-model="repeatContent"
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
          <div
            class="option--repeat-item"
            v-for="item in repeats"
            @click.prevent="repeatContent = item.value"
          >
            {{ item.value }}
          </div>
          <div class="option--repeat-item" @click="openCustom">
            Lặp lại: Tùy chỉnh
          </div>
        </div>
      </div>
    </div>
    <div class="option--custom" v-if="showCustom == true">
      <div class="option--custom-wrap d_flex mb_3">
        <div
          class="option--custom-item"
          v-for="(item, index) in options"
          :key="index"
        >
          {{ item.value }}
        </div>
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
      showCustom: false,
      repeatContent: "",
      repeats: [
        { key: 0, value: "Lặp Lại: none" },
        { key: 1, value: "Lặp lại: Hằng ngày" },
        { key: 2, value: "Lặp lại: Cuối tuần" },
        { key: 3, value: "Lặp lại: Hàng tháng" },
        { key: 4, value: "Lặp lại: Làm việc" }
      ],
      options: [
        { key: 0, value: "CN" },
        { key: 1, value: "T2" },
        { key: 2, value: "T3" },
        { key: 3, value: "T4" },
        { key: 4, value: "T5" },
        { key: 5, value: "T6" },
        { key: 6, value: "T7" }
      ]
    };
  },
  methods: {
    closeOptionRepeat() {
      this.showOptionRepeat = false;
    },
    closeOptionDays() {
      this.showOptionDays = false;
    },
    openCustom() {
      this.showCustom = !this.showCustom;
      this.repeatContent = "Lặp lại: Tùy chỉnh";
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
