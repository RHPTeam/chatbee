<template>
  <!--Start: Popup choose option time-->
  <div class="popup" v-click-outside="close">
    <div class="input" @click.prevent="isStartPopup = !isStartPopup">
      <span>Sau 1 ngày</span>
    </div>
    <div class="target p_2" v-if="isStartPopup === true">
      <div class="header mb_1">send in</div>
      <!--time on popup-->
      <div class="body d_flex align_items_center text_center mb_1">
        <div class="number item item--popup mr_1">1</div>
        <div
          class="item item--popup d_flex align_items_center"
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
          <div class="option--time">Days</div>
          <div class="option--time">Everyday</div>
          <div class="option--time">Everyweek</div>
          <div class="option--time">Everymonth</div>
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
      isOptionPopup: false
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
.popup {
  position: relative;
}
.target {
  border-radius: 10px;
  opacity: 0;
  min-width: 160px;
  position: absolute;
  top: 50%;
  transform: scale(0) translateY(-50%);
  transition: all 500ms ease 0s;
  z-index: 99;

  &.active {
    opacity: 1;
    top: 50%;
    transform: scale(1) translateY(-50%);
    z-index: 1;
  }

  p {
    font-size: 12px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
  }

  .gr-time {
    > span {
      margin-right: 10px;
    }
  }

  .type-time {
    width: 100%;
  }

  ul.list-time {
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
  }
}
</style>
