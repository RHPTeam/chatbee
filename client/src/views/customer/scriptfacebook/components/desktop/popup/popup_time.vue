<template>
  <!--Start: Popup choose option time-->
  <div class="popup position_relative">
    <div class="input" @click.prevent="isStartPopup = !isStartPopup">
      <span>Sau 1 ngày</span>
    </div>
    <div class="target p_2 position_absolute" v-if="isStartPopup === true">
      <div class="header mb_1">send in</div>
      <!--time on popup-->
      <div class="body d_flex align_items_center text_center mb_1">
        <div class="number item item--popup mr_1">1</div>
        <div
          class="item item--popup d_flex align_items_center position_relative"
          @click="isOptionPopup = !isOptionPopup"
        >
          <div>Days</div>
          <div class="action ml_auto">
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
          <div class="option--time" v-for="item in dataOption" :key="item">
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
  data() {
    return {
      isStartPopup: false,
      isOptionPopup: false,
      dataOption: [
        { key: 1, value: "Days" },
        { key: 1, value: "Everyday" },
        { key: 1, value: "Everyweek" },
        { key: 1, value: "Everymonth" }
      ]
    };
  },
  methods: {
    close() {
      this.isStartPopup = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.target {
  background: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  width: 160px;
  height: auto;
  top: 50%;
  left: 0;
  transform: scale(0) translateY(-50%);
  transition: all 500ms ease 0s;
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
    }

    .option--send {
      background: #ffffff;
      border-radius: 6px;
      cursor: pointer;
      width: 100px;
      top: 25%;
      right: 0;
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
    }
  }

  /*ul.list-time {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
          border: solid 1px rgba(0, 0, 0, 0.12);
          border-radius: 10px;
          list-style-type: none;
          left: 0;
          min-width: 100%;
          max-height: 40px;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          top: -3px;
          transition: max-height 150ms cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
          z-index: -1;

          &.active {
            max-height: 300px;
            opacity: 1;
            pointer-events: auto;
            z-index: 1;
          }

          li {
            cursor: pointer;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            padding: 0 20px 0 15px;
            text-transform: capitalize;

            &:hover {
              background-color: #f1f2f2 !important;
            }
          }
        }*/
}
</style>
