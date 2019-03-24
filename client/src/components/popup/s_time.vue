<template>
  <!--Start: Popup choose option time-->
  <div
    class="popup position_relative"
    v-click-outside="close"
    :data-theme="currentTheme"
  >
    <div class="input" @click.prevent="isStartPopup = !isStartPopup">
      <span
        ><span v-if="isOff === false">Sau {{ item.time.numberTime }}</span>
        {{ item.time.descTime }}</span
      >
    </div>
    <div
      class="target p_2 position_absolute border--popup"
      v-if="isStartPopup === true"
    >
      <div class="header text_left mb_1">Gửi sau :</div>
      <!--time on popup-->
      <div
        class="body d_flex align_items_center justify_content_between text_center mb_1"
      >
        <div class="number item item--popup mr_2" v-if="isOff === false">
          <editable-time
            class="input text_center"
            :valueNumber="item.time.numberTime"
            @input="item.time.numberTime = $event"
            :target="item._id"
            :sequenceId="id"
            type="timesequence"
            placeholder="Nhập"
          ></editable-time>
        </div>
        <div
          class="item item--popup d_flex align_items_center position_relative"
          @click="isOptionPopup = !isOptionPopup"
        >
          <editable-desc-time
            class="input"
            :value="item.time.descTime"
            @input="item.time.descTime = $event"
            :target="item._id"
            :sequenceId="id"
            type="desctime"
          ></editable-desc-time>
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
            v-for="(option, index) in dataOption"
            :key="index"
            @click="closeOption(option.value)"
          >
            {{ option.value }}
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
import ConvertUnicode from "@/utils/string.util";
export default {
  props: {
    item: Object,
    id: String
  },
  data() {
    return {
      isStartPopup: false,
      isOptionPopup: false,
      isOff: false,
      dataOption: [
        { key: 0, value: "Gửi ngay" },
        { key: 1, value: "Giây" },
        { key: 2, value: "Phút" },
        { key: 3, value: "Giờ" },
        { key: 4, value: "Ngày" },
        { key: 5, value: "Tắt" }
      ]
    };
  },
  methods: {
    close() {
      this.isStartPopup = false;
    },
    closeOption(value) {
      this.item.time.descTime = value;
      this.isOptionPopup = true;
      this.isOptionPopup = false;
      ConvertUnicode.convertUnicode(value.toString().toLowerCase()) === "tat" ||
      ConvertUnicode.convertUnicode(value.toString().toLowerCase()) ===
        "gui ngay"
        ? (this.isOff = true)
        : (this.isOff = false);
    }
  },
  computed: {
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
  width: 200px;
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
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      .input {
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
      right: 5px;
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
        input {
          background: transparent;
        }
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
        input {
          background: transparent;
        }
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
