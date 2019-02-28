<template>
  <div class="setting text_left" :data-theme="currentTheme">
    <div class="setting--desc">Cài đặt thời gian</div>
    <div class="setting--label">Thời gian gửi</div>
    <div class="ct_f">
      <div class="r">
        <div class="c c_md_6">
          <div class="hour--display d_flex justify_content_between align_items_center m_auto">
            <input type="number" class="hour--display-block text_center" value="18">
            <div class="hour--display-center d_flex justify_content_center align_items_center">:</div>
            <input type="number" class="hour--display-block text_center" value="20">
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
  input[type="number"] {
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
  .hour--display {
    font-size: 35px;
    font-weight: 600;
    max-width: 230px;
    .hour--display-block {
      border-radius: 10px;
      width: 80px;
      height: 78px;
      border: 0;
      outline: none;
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
      color: #444;
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
      border-color: #e4e4e4;
      color: #000;
    }
    .select--wrapper {
      &:after {
        border-top-color: #ccc;
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
      color: #f7f7f7;
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
        border-top-color: #f7f7f7;
      }
    }
  }
}
</style>

<style lang="scss">
/* Custom calendar */
.setting {
  .picker-wrap {
    box-shadow: none !important;
    width: 283px !important;
    height: auto !important;
    border-radius: 10px;
  }
  .date-head {
    position: relative;
    height: 40px;
    background-color: #ffb94a !important;
    .btn-prev-year,
    .btn-next-year {
      display: none;
      pointer-events: none;
    }
    .btn-next-date,
    .btn-prev-date {
      width: 20px;
      height: 20px;
      background-color: #fff !important;
      padding: 0;
      color: #ffb94a;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      top: 8px;
      &:hover {
        background-color: #fff !important;
      }
    }
    .btn-prev-date {
      position: absolute;
      left: 10px;
    }
    .btn-next-date {
      position: absolute;
      right: 10px;
    }
    .show-year {
      margin-right: 55px;
      position: relative;
      // &:before {
      //   position: absolute;
      //   content: "-";
      //   left: -7px;
      // }
    }
    .show-month {
      margin-left: 70px;
      margin-right: -10px;
    }
    th:first-child {
      border-top-left-radius: 10px;
    }
    th:nth-child(2) {
      border-top-right-radius: 10px;
    }
  }
  .date-days {
    font-size: 12px !important;
    height: 40px;
    th {
      border: solid 1px rgba(0, 0, 0, 0.05) !important;
      font-weight: normal !important;
    }
  }
  td {
    height: 36px !important;
    border: solid 1px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.5s ease;
    &:hover {
      color: #ffb94a !important;
    }
  }

  .date-active {
    background-color: #ffb94a !important;
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
}
/* ChangeColor */
// Light
.setting[data-theme="light"] {
  .picker-wrap {
    color: #000 !important;
    background-color: #f2f2f2 !important;
    .date-days {
      color: #000 !important;
      background-color: #ebebeb !important;
    }
  }
  .date-days {
    th {
      border: solid 1px rgba(255,255,255, 0.3) !important;
    }
  }
  td {
    border: solid 1px rgba(255,255,255, 0.3) !important;
  }
}

//Dark
.setting[data-theme="dark"] {
  .picker-wrap {
    color: #f7f7f7 !important;
    background-color: #2f3136 !important;
    .date-days {
      color: #f7f7f7 !important;
      background-color: #414348 !important;
    }
  }
  .date-days {
    th {
      border: solid 1px rgba(0, 0, 0, 0.05) !important;
    }
  }
  td {
    border: solid 1px rgba(0, 0, 0, 0.05) !important;
  }
}
</style>