<template>
  <div class="main" :data-theme="currentTheme">
    <!--Nội dung Desktop-->
    <div class="d_none d_md_block">
      <div
        class="main--header text_left d_flex justify_content_start align_items_end"
      >
        <div class="main--header-title">Trò chuyện</div>
        <div class="main--header-desc">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </div>
      </div>
      <div
        class="content d_flex justify_content_start align_items_start text_left"
      >
        <div class="content--left">
          <app-left-sidebar />
        </div>
        <div class="content--main">
          <app-main-topbar />
          <div class="d_flex justify_content_start align_items_start">
            <div
              class="content--chat"
              :class="{ 'width--full': hideChatSidebar }"
            >
              <VuePerfectScrollbar class="scroll--chat">
                <app-chat-area />
              </VuePerfectScrollbar>
              <app-input />
            </div>
            <div class="content--profile" v-if="hideChatSidebar != true">
              <VuePerfectScrollbar class="scroll--profile">
                <app-right-sidebar />
              </VuePerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Nội dung mobile-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppMobile from "./mobile/list_user_mobile";
import AppLeftSidebar from "./components/left-sidebar";
import AppRightSidebar from "./components/right-sidebar";
import AppMainTopbar from "./components/main-topbar";
import AppChatArea from "./components/chatarea";
import AppInput from "./components/input-message";
export default {
  components: {
    VuePerfectScrollbar,
    AppChatArea,
    AppLeftSidebar,
    AppMainTopbar,
    AppRightSidebar,
    AppInput,
    AppMobile
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
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
}

.content {
  background-color: #fff;
  border-radius: 10px;
  height: calc(100vh - 252px);
  overflow-y: hidden;
  min-height: 400px;
  .content--left {
    width: 400px;
  }
  .content--main {
    width: calc(100% - 400px);
    overflow: hidden;
    .content--chat {
      width: 68%;
      border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      &.width--full {
        width: 100%;
        border-left: 0;
      }
      .scroll--chat {
        height: calc(100vh - 420px);
      }
    }
    .content--profile {
      width: 32%;
      .scroll--profile {
        height: calc(100vh - 322px);
      }
    }
  }
}

/* ChangeColor */
// Light
.main[data-theme="light"] {
  color: #666;

  .main--content {
    background-color: #fff;
  }
}

//Dark
.main[data-theme="dark"] {
  color: #ccc;

  .main--content {
    background-color: #2f3136;
  }
}
</style>
