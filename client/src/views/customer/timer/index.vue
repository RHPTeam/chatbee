<template>
  <div class="main" :data-theme="currentTheme">
    <!--Nội dung Desktop-->
    <div class="d_none d_md_block">
      <div class="main--header text_left d_flex justify_content_start align_items_end">
        <div class="main--header-title">Hẹn giờ gửi</div>
        <div class="main--header-desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr</div>
      </div>
      <div class="main--content">
        <div class="ct_f">
          <div class="r">
            <div class="c c_md_6">
              <app-receiver/>
              <app-message/>
            </div>
            <div class="c c_md_6">
              <app-setting/>
            </div>
          </div>
          <div class="r">
            <div class="c c_md_6">
              <app-group/>
            </div>
            <div class="c c_md_6 text_right">
              <button class="setting--submit">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Nội dung mobile-->
    <div class="d_block d_md_none"></div>
  </div>
</template>

<script>
import AppReceiver from "./components/receiver";
import AppMessage from "./components/message";
import AppGroup from "./components/save-group";
import AppSetting from "./components/setting";
export default {
  components: {
    AppReceiver,
    AppMessage,
    AppGroup,
    AppSetting
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  font-family: Segoe UI;
  .main--header {
    margin-bottom: 25px;
    margin-top: 52px;

    .main--header-title {
      font-size: 30px;
      font-weight: 600;
    }

    .main--header-desc {
      font-size: 14px;
      font-weight: normal;
      margin-left: 16px;
      margin-bottom: 5px;
    }
  }
  .main--content {
    .ct_f {
      padding: 0 3px;
      .c {
        padding: 0 12px;
      }
    }
    .setting--submit {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      padding: 11px 35px;
      border-radius: 10px;
      background-color: #ffb94a;
      border: 1px solid #ffb94a;
      transition: all 0.4s ease;
      &:hover {
        color: #ffb94a;
        background-color: transparent
      }
    }
  }
}

/* ChangeColor */
// Light
.main--content[data-theme="light"] {
  color: #666;

  //   .main--content {
  //     background-color: #fff;
  //   }
}

//Dark
.main--content[data-theme="dark"] {
  color: #ccc;

  //   .main--content {
  //     background-color: #2f3136;
  //   }
}
</style>
