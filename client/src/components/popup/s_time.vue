<template>
  <!--Start: Popup choose option time-->
  <div
    class="popup position_relative"
    v-click-outside="close"
    :data-theme="currentTheme"
  >
    <div class="input" @click.prevent="isStartPopup = !isStartPopup">
      <span>Sau {{timer.numberTime}} {{timer.descTime}}</span>
    </div>
    <div
      class="target p_2 position_absolute border--popup"
      v-if="isStartPopup === true"
    >
      <div class="header text_left mb_1">Gửi sau :</div>
      <!--time on popup-->
      <div class="body d_flex align_items_center text_center mb_1">
        <div class="number item item--popup mr_1">
          <input
            type="text"
            value="1"
            class="text_center"
            v-model="timer.numberTime"
          />
        </div>
        <div
          class="item item--popup d_flex align_items_center position_relative"
          @click="isOptionPopup = !isOptionPopup"
        >
          <input type="text" value="Ngày" readonly v-model="timer.descTime" />
          <!--Icon dropdown-->
          <div class="action ml_auto position_absolute">
            <icon-base
              icon-name="dropdown"
              width="18"
              height="18"
              viewBox="0 0 25 25"
            >
              <icon-drop-down />
            </icon-base>
          </div>
        </div>

        <!--action when click days-->
        <div
          class="option--send border--popup text_left position_absolute"
          v-if="isOptionPopup === true"
        >
          <div
            class="option--time"
            v-for="(item, index) in dataOption"
            :key="index"
            @click="timer.descTime = item.value"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <p class="m_0">Theo dõi chiến dịch</p>
      <p class="m_0">Theo dõi khác</p>
    </div>
  </div>
  <!--End: Popup choose option time-->
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      isStartPopup: false,
      isOptionPopup: false,
      dataOption: [
        { key: 1, value: "Gửi ngay" },
        { key: 1, value: "Giây" },
        { key: 1, value: "Phút" },
        { key: 1, value: "Giờ" },
        { key: 1, value: "Ngày" },
        { key: 1, value: "Tắt" }
      ],
      timer : {
        numberTime: "",
        descTime: ""
      }
    };
  },
  methods: {
    close() {
      this.isStartPopup = false;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.border--popup {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px rgba(0, 0, 0, 0.12);
  transition: max-height 150ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.target {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 160px;
  height: auto;
  top: 105%;
  left: 0;
  transition: all 1s ease;
  z-index: 999;

  p {
    font-size: 12px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
  }
  .body {
    .item {
      padding: 10px;
      background: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
      cursor: pointer;
      width: 50%;
      text-overflow: ellipsis;
      white-space: nowrap;
      input {
        width: 100%;
        height: 100%;
        border: none;
        &:hover,
        &:active,
        &:focus,
        &:visited {
          box-shadow: none;
          outline: 0;
        }
      }
    }

    .option--send {
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
      width: 100px;
      top: 25%;
      left: 95%;
      z-index: 1000;
      .option--time {
        padding: 6px 0 6px 6px;
        &:hover,
        &:focus,
        &:active,
        &:visited {
          background: #f7f7f7;
          transition: all 0.5s ease;
        }
      }
    }
    .action {
      margin-bottom: -3px;
      right: 1px;
      top: 13px;
    }
  }
}
/*Change theme*/
/*Light*/
.popup[data-theme="light"] {
  background: #ffffff;
  .target {
    background: #ffffff;
    .body {
      .item {
        background: #ffffff;
        border-color: #e4e4e4;
      }
      .option--send {
        background: #ffffff;
        .option--time {
          background: #ffffff;
          color: #444444;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            background: #ffb94a;
            color: #ffffff;
            transition: all 0.5s ease;
          }
        }
      }
    }
  }
}
/*Dark*/
.popup[data-theme="dark"] {
  background: #27292d;
  .target {
    background: #27292d;
    .body {
      .item {
        background: #2f3136;
        border-color: #2f3136;
      }
      .option--send {
        background: #27292d;
        .option--time {
          background: #27292d;
          color: #ffffff;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            background: #2f3136;
            color: #ffffff;
            transition: all 0.5s ease;
          }
        }
      }
    }
  }
}
</style>
