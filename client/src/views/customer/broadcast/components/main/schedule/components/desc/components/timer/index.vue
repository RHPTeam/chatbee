<template>
  <!--Section option hours-->
  <div class="timer" :data-theme="currentTheme">
    {{ schedule.timeSetting }}
    <div
      class="option--time-repeat position_relative"
      v-if="!schedule.timeSetting"
    ></div>
    <div class="option--time py_3 d_flex align_items_center mt_4" v-else>
      <datepicker
        class="option--time-days position_relative"
        placeholder="Chọn ngày"
        :readonly="true"
        format="YYYY-MM-DD"
        name="date-setting"
      ></datepicker>
      <div class="option--time-hours mr_4 ml_4">
        <input
          type="text"
          placeholder="12:00"
          class="form_control option--time-item text_center"
          v-model="schedule.timeSetting.hour"
          v-debounce.500="updateTimeSchedule"
        />
      </div>
      <div
        class="option--time-repeat position_relative"
        v-click-outside="closeOptionRepeat"
        @click="showOptionRepeat = !showOptionRepeat"
      >
        <input
          type="text"
          readonly
          class="form_control option--time-item"
          :value="'Lặp lại: ' + schedule.timeSetting.repeat.typeRepeat"
        />
        <div class="icon position_absolute">
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div
          class="option--repeat position_absolute text_left"
          v-if="showOptionRepeat === true"
        >
          <div
            class="option--repeat-item"
            v-for="(item, index) in repeats"
            :key="index"
            @click.prevent="chooseOption(item)"
          >
            {{ "Lặp lại: " + item.value }}
          </div>
          <div class="option--repeat-item" @click="openCustom">
            Lặp lại: Tùy chỉnh
          </div>
        </div>
      </div>
    </div>
    <div class="option--custom" v-if="showCustom === true">
      <div class="option--custom-wrap d_flex mb_3">
        <div
          class="option--custom-item"
          @click.prevent="chooseDaysRepeat(item.key)"
          :class="[selectedOption.includes(item.key) ? 'active' : '']"
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
import Datepicker from "@/components/shared/datepicker_library/index";

import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  data() {
    return {
      showOptionRepeat: false,
      showOptionDays: false,
      showCustom: false,
      repeatContent: "Lặp Lại: Không",
      repeats: [
        { key: 0, value: "Không" },
        { key: 1, value: "Hằng ngày" },
        { key: 2, value: "Cuối tuần" },
        { key: 3, value: "Hàng tháng" },
        { key: 4, value: "Làm việc" }
      ],
      options: [
        { key: 0, value: "CN" },
        { key: 1, value: "T2" },
        { key: 2, value: "T3" },
        { key: 3, value: "T4" },
        { key: 4, value: "T5" },
        { key: 5, value: "T6" },
        { key: 6, value: "T7" }
      ],
      setupHours: "",
      selectedOption: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedule() {
      if (this.$store.getters.schedule === undefined) return;
      return this.$store.getters.schedule;
    }
  },
  methods: {
    chooseDaysRepeat(id) {
      if (this.selectedOption.includes(id)) {
        // remove item out ot array
        this.selectedOption = this.selectedOption.filter(item => item !== id);
      } else {
        // add item in array
        this.selectedOption.push(id);
      }
      this.schedule.timeSetting.repeat.valueRepeat = this.selectedOption.toString();
    },
    async chooseOption(item) {
      let type;
      this.schedule.timeSetting.repeat.typeRepeat = item.value;
      if (item.key === 0) {
        this.schedule.timeSetting.repeat.valueRepeat = "";
        type = 0;
      } else if (item.key === 1) {
        this.schedule.timeSetting.repeat.valueRepeat = "0,1,2,3,4,5,6";
        type = 1;
      } else if (item.key === 2) {
        this.schedule.timeSetting.repeat.valueRepeat = "0,6";
        type = 2;
      } else if (item.key === 3) {
        this.schedule.timeSetting.repeat.valueRepeat = "";
        type = 3;
      } else if (item.key === 4) {
        this.schedule.timeSetting.repeat.valueRepeat = "1,2,3,4,5";
        type = 4;
      }
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      const objSender = {
        bc_id: result[0]._id,
        b_id: this.$route.params.scheduleId,
        type: type
      };
      this.$store.dispatch("updateSchedule", objSender);
      this.$router.push({
        name: "f_broadcast_schedule",
        params: { scheduleId: this.$route.params.scheduleId }
      });
    },
    closeOptionRepeat() {
      this.showOptionRepeat = false;
    },
    async getSchedules() {
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      return result[0];
    },
    openCustom() {
      this.showCustom = !this.showCustom;
      this.schedule.timeSetting.repeat.typeRepeat = "Tùy chỉnh";
    },
    async updateTimeSchedule() {
      const schedules = await this.getSchedules();
      const objSender = {
        bcId: schedules._id,
        blockId: this.schedule._id,
        value: this.schedule.timeSetting.hour
      };
      this.$store.dispatch("updateTimeSchedule", objSender);
    }
  },
  components: {
    Datepicker
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>

<style lang="scss">
div[data-theme="dark"] .timer {
  .option--time-days {
    input {
      background: #27292d;
      border-color: #27292d;
      color: #ccc;
      font-size: 1rem;
    }
  }
}
</style>
