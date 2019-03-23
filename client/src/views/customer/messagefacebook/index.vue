<template>
  <div class="main" :data-theme="currentTheme">
    <!--Nội dung Desktop-->
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Nhắn tin"
        subBread="Trang giúp bạn nhắn tin nhanh với khách hàng"
      />
      <div
        class="content d_flex justify_content_start align_items_start text_left"
      >
        <!--Start: No Account Facebook -->
        <div v-if="this.$store.getters.accountsFB.length === 0" class="null--container d_flex">
          <div class="null--text">
            Tính năng chiến dịch cho phép bạn chủ động tiếp cận với khách hàng
            của mình. Lọc khách hàng của bạn dựa trên các thuộc tính của họ và
            gửi tin nhắn được cá nhân hóa. Bắt đầu bằng cách chọn loại chiến
            dịch bạn muốn gửi ở bên trái.
          </div>
        </div>
        <!--End: No Account Facebook -->

        <!--Start: Main Message-->
        <div v-if="this.$store.getters.accountsFB.length !== 0" class="content--left">
          <app-left-sidebar />
        </div>
        <div v-if="this.$store.getters.accountsFB.length !== 0" class="content--main">
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
        <!--End: Main Message-->
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
import AppBreadCrumb from "@/components/breadcrumb";
export default {
  components: {
    VuePerfectScrollbar,
    AppChatArea,
    AppLeftSidebar,
    AppMainTopbar,
    AppRightSidebar,
    AppInput,
    AppMobile,
    AppBreadCrumb
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
    }
  },
  async created() {
    await this.$store.dispatch("getAllFriends");
  }
};
</script>

<style scoped lang="scss">
.main {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
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
  border-radius: 10px;
  height: calc(100vh - 252px);
  overflow-y: hidden;
  min-height: 400px;
  .content--left {
    // width: 400px;
  }
  .content--main {
    // width: calc(100% - 400px);
    overflow: hidden;
    .content--chat {
      width: 68%;
      padding: 5px 0;
      max-width: calc(100% - 230px);
      border-left: 1px solid;
      border-right: 1px solid;
      &.width--full {
        width: 100%;
        max-width: 100%;
        border-right: 0;
      }
      .scroll--chat {
        height: calc(100vh - 400px);
      }
    }
    .content--profile {
      width: 32%;
      min-width: 230px;
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

  .content {
    background-color: #fff;
    .content--chat {
      border-color: #e4e4e4;
    }
  }
}

//Dark
.main[data-theme="dark"] {
  color: #ccc;

  .content {
    background-color: #27292d;
    .content--chat {
      border-color: #444;
    }
  }
}

/*RESPONSIVE*/

// Medium devices (tablets, 768px and up)
@media (width: 768px) {
}

// máy tính bảng, hiển thị chiều ngang
@media (max-width: 800px) {
}

// máy tính bảng loại to, hiển thị chiều ngang
@media (max-width: 1024px) {
  // .content {
  //   .content--left {
  //     width: 260px;
  //   }
  //   .content--main {
  //     width: calc(100% - 260px);
  //     .content--chat {
  //       width: 68%;
  //     }
  //     .content--profile {
  //       width: 32%;
  //     }
  //   }
  // }
}
// size này trở lên là danh cho desktop thông thường
@media (min-width: 1025px) {
  .content {
    .content--left {
      width: 260px;
    }
    .content--main {
      width: calc(100% - 260px);
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  // Màn hình này nên thu gọn sidebar => messenger ko có css cho màn hình này
}

@media (min-width: 1366px) {
  .content {
    .content--left {
      width: 320px;
    }
    .content--main {
      width: calc(100% - 320px);
    }
  }
}
</style>
