<template>
  <div class="setting text_left" :data-theme="currentTheme">
    <div class="setting--desc">Cài đặt thời gian</div>
    <div class="setting--label">Thời gian gửi</div>
    <div class="ct_f">
      <div class="r">
        <div class="c c_md_6">
          <div class="hour--display d_flex justify_content_between align_items_center m_auto">
            <div class="hour--display-block d_flex justify_content_center align_items_center">18</div>
            <div class="hour--display-center d_flex justify_content_center align_items_center">:</div>
            <div class="hour--display-block d_flex justify_content_center align_items_center">20</div>
          </div>
          <div class="hour--adjust">
            <div class="hour--adjust-name">Giờ</div>
            <input type="range" min="0" max="12" value="6">
            <div class="hour--adjust-name">Phút</div>
            <input type="range" min="0" max="60" value="30">
          </div>
        </div>
        <div class="c c_md_6">
          <datepicker
            :readonly="true"
            format="YYYY-MM-DD"
            name="date-setting"
            v-model="date"
            autofocus
          ></datepicker>
        </div>
        <div class="r">
          <div class="c">
            <div class="waiting--time d_flex justify_content_start align_items_center">
              <div class="waiting--time-desc">Thời gian chờ giữa các lần gửi</div>
              <div class="waiting--setup d_flex justify_content_start align_items_center">
                <input type="number" value="00">
                <div class="select--wrapper position_relative">
                  <select>
                    <option>giây</option>
                    <option>phút</option>
                    <option>giờ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "@/components/shared/datepicker_library";
export default {
  components: {
    Datepicker
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      date: ""
    };
  }
};
</script>

<style scoped lang="scss">
.setting {
  border-radius: 10px;
  border: 0;
  padding: 24px;
  .setting--desc {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .setting--label {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .hour--display {
    font-size: 35px;
    font-weight: 600;
    max-width: 230px;
    .hour--display-block {
      border-radius: 10px;
      width: 80px;
      height: 78px;
    }
  }
  .hour--adjust {
    margin-top: 35px;
    .hour--adjust-name {
      font-size: 12px;
      margin-bottom: -5px;
      margin-top: 20px;
    }
    input[type="range"] {
      margin: auto;
      outline: none;
      padding: 0;
      width: 50%;
      height: 5px;
      width: 100%;
      background-image: linear-gradient(#ffb94a, #ffb94a);
      background-size: 50% 100%;
      background-repeat: no-repeat;
      border-radius: 10px;
      cursor: pointer;
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
        width: 12px;
        height: 12px;
        border: 0;
        background: #ffb94a;
        border-radius: 100%;
        -webkit-appearance: none;
      }
      &::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border: 0;
        background: #ffb94a;
        border-radius: 100%;
      }
    }
  }
  .waiting--time {
    margin-top: 10px;
    .waiting--time-desc {
      font-size: 12px;
      margin-right: 45px;
    }
    input[type="number"],
    select {
      border-radius: 10px;
      background-color: #2f3136;
      margin-left: 10px;
      width: auto;
      border: 0;
      outline: none;
      border: solid 1px transparent;
      text-align: center;
    }
    input[type="number"] {
      width: 50px;
      padding: 10px;
      /* Firefox */
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0;
        /* <-- Apparently some margin are still there even though it's hidden */
      }
    }
    select {
      padding: 10px 32px 10px 15px;
      cursor: pointer;
      /* for Firefox */
      -moz-appearance: none;
      /* for Chrome */
      -webkit-appearance: none;
      /* For IE10 */
      &::-ms-expand {
        display: none;
      }
    }
    .select--wrapper {
      &:after {
        position: absolute;
        content: "";
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5.4px solid transparent;
        pointer-events: none;
        right: 7.5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

/* ChangeColor */
// Light
.setting[data-theme="light"] {
  color: #444;
  background-color: #ffffff;
  .hour--display {
    .hour--display-block {
      background-color: #f7f7f7;
    }
  }
  .hour--adjust {
    input[type="range"] {
      background-color: #f7f7f7;
    }
  }
  .waiting--time {
    input[type="number"],
    select {
      background-color: transparent;
      color: #f7f7f7;
      border-color: #e4e4e4;
      color: #000;
    }
    .select--wrapper {
      &:after {       
        border-top-color:#ccc;
      }
    }
  }
}

//Dark
.setting[data-theme="dark"] {
  color: #f7f7f7;
  background-color: #27292d;
  .hour--display {
    .hour--display-block {
      background-color: #2f3136;
    }
  }
  .hour--adjust {
    input[type="range"] {
      background-color: #2f3136;
    }
  }
  .waiting--time {
    input[type="number"],
    select {
      background-color: #2f3136;
      color: #f7f7f7;
    }
    .select--wrapper {
      &:after {       
        border-top-color:#f7f7f7;
      }
    }
  }
}
</style>