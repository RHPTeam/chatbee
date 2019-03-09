<template>
  <!--Section option hours-->
  <div class="option--time p_3 d_flex align_items_center mt_4">
    <div
      class="option--time-days position_relative"
      @click="showOptionDays = !showOptionDays"
    >
      <input
        type="text"
        value="07 Thg03"
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
      <div class="option--choose-days position_absolute">
        <date-picker v-if="showOptionDays == true" />
      </div>
    </div>
    <div class="option--time-hours mr_4 ml_4">
      <input
        type="text"
        placeholder="12:00"
        class="form_control option--time-item text_center"
      />
    </div>
    <div
      class="option--time-repeat position_relative"
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
        <div class="option--repeat-item">Repeat: Everyday</div>
        <div class="option--repeat-item">Repeat: Everyday</div>
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
      showOptionDays: false
    };
  },
  components: {
    IconBase,
    IconDropDown,
    DatePicker
  }
};
</script>
<style lang="scss" scoped>
@import "./main_broadcast.style";
</style>
