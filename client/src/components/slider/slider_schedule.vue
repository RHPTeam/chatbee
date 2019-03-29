<template>
  <div v-if="item.typeContent === 'time'" :data-theme="currentTheme">
    <div class="script--body-timer position_relative mb_4">
      <div class="timer--title mb_2 text_left">
        Khoảng thời gian giữa các lần gửi tin nhắn
      </div>
      <div class="time--adjust">
        <input
          type="range"
          :min="mintime"
          :max="maxtime"
          :value="item.valueText"
          :style="{ 'background-size': percentTime + '% 100%' }"
          @input="changeTime($event, item._id)"
        />
        <div class="time--value position_relative pt_1">
          <div
            class="time--value-limit d_flex justify_content_between align_items_end"
          >
            <span>{{ mintime }}s</span>
            <span>{{ maxtime }}s</span>
          </div>
          <div
            class="time--value-current position_absolute"
            :style="{ left: percentTime + '%' }"
            v-if="item.valueText > mintime && item.valueText < maxtime"
          >
            {{ item.valueText }}s
          </div>
        </div>
      </div>
      <div class="script--body-delete mt_4" @click="isDeleteItemBlock = true">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move d_none mt_4">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 64 64"
        >
          <icon-move />
        </icon-base>
      </div>
    </div>
    <!--Delete Item Popup-->
    <delete-item
      v-if="isDeleteItemBlock === true"
      desc="Bạn có thực sự muốn xóa nội dung kịch bản này không?"
      :content="item._id"
      :block="schedule._id"
      target="slideritem"
      @close="isDeleteItemBlock = $event"
    />
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
export default {
  props: ["item", "schedule"],
  data() {
    return {
      maxtime: 20,
      mintime: 0,
      percentTime: 0,
      isDeleteItemBlock: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    "item.valueText"() {
      this.percentTime =
        (parseInt(this.item.valueText) * 100) /
        (parseInt(this.maxtime) - parseInt(this.mintime));
    }
  },
  async created() {
    this.percentTime =
      (parseInt(this.item.valueText) * 100) /
      (parseInt(this.maxtime) - parseInt(this.mintime));
  },
  methods: {
    async changeTime(e, id) {
      this.item.valueText = e.target.value;
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      const objSender = {
        bcId: result[0]._id,
        blockId: this.$store.getters.schedule._id,
        contentId: id,
        value: e.target.value
      };
      this.$store.dispatch("updateItemSchedule", objSender);
    }
  }
};
</script>
<style lang="scss" scoped>
/**    Script Body Timer      **/
.script--body-timer {
  max-width: 350px;
  .timer--title {
    font-weight: 600;
    font-size: 18px;
  }
  .time--adjust {
    max-width: 320px;
  }
  input[type="range"] {
    background-image: linear-gradient(#ffb94a, #ffb94a);
    background-repeat: no-repeat;
    // background-size: 0% 100%;
    border-radius: 10px;
    cursor: pointer;
    height: 7.5px;
    outline: none;
    padding: 0;
    width: 100%;
    -webkit-appearance: none;
    &::-webkit-slider-runnable-track {
      box-shadow: none;
      border: none;
      background: transparent;
      -webkit-appearance: none;
    }
    &::-moz-range-track {
      box-shadow: none;
      border: none;
      background: transparent;
    }
    &::-moz-focus-outer {
      border: 0;
    }
    &::-webkit-slider-thumb {
      width: 15px;
      height: 15px;
      border: 0;
      background: #ffb94a;
      border-radius: 100%;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
      border: 0;
      background: #ffb94a;
      border-radius: 100%;
    }
  }
  .time--value {
    font-weight: 600;
  }
  .time--value-current {
    bottom: 0;
    color: #ffb94a;
    transform: translateX(-50%);
  }
  /*    Icon Delete   */
  .script--body-delete {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 0;
  }
  /*    Icon Move   */
  .script--body-move {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 30px;
  }
}
div[data-theme="light"] {
  /*****Script Body Timer*****/
  .script--body-timer {
    color: #ccc;
    input[type="range"] {
      background-color: #e4e4e4;
    }
    .timer--title {
      color: #999;
    }
  }
}
div[data-theme="dark"] {
  /*****Script Body Timer*****/
  .script--body-timer {
    color: #ccc;
    input[type="range"] {
      background-color: #2f3136;
    }
    .timer--title {
      color: #ccc;
    }
  }
}
</style>
