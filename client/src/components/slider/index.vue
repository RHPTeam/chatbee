<template>
  <div v-if="item.typeContent === 'time'" :data-theme="currentTheme">
    <div class="script--body-timer position_relative">
      <div class="timer--title mb_2 text_left">
        Show "typing…" for at least
      </div>
      <div class="time--adjust">
        <input
          type="range"
          :min="mintime"
          :max="maxtime"
          :value="time"
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
            v-if="time > mintime && time < maxtime"
          >
            {{ time }}s
          </div>
        </div>
      </div>
      <div
        class="script--body-delete mt_4"
        @click="deleteItemBlock(block, item._id)"
      >
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move mt_4">
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
  </div>
</template>
<script>
export default {
  props: ["item", "block"],
  data() {
    return {
      time: 5,
      maxtime: 20,
      mintime: 0,
      percentTime: 0
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    time() {
      this.percentTime =
        (parseInt(this.time) * 100) /
        (parseInt(this.maxtime) - parseInt(this.mintime));
    }
  },
  async created() {
    this.percentTime =
      (parseInt(this.time) * 100) /
      (parseInt(this.maxtime) - parseInt(this.mintime));
  },
  methods: {
    changeTime(e, id) {
      this.time = e.target.value;
      const objSender = {
        itemId: id,
        valueText: this.time,
        type: "time",
        block: this.$store.getters.block
      };
      this.$store.dispatch("updateItemBlock", objSender);
    },
    deleteItemBlock(block, id) {
      const dataSender = {
        blockId: block._id,
        itemId: id
      };
      this.$store.dispatch("deleteItemBlock", dataSender);
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
