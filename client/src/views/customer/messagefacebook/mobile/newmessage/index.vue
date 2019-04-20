<template>
  <div class="account position_fixed" :data-theme="currentTheme">
    <div
      class="account--header d_flex align_items_center justify_content_between"
    >
      <div class="back--list" @click="closeAddNewMessage">
        Hủy
      </div>
      <div class="account--header-title">Chọn người gửi tin nhắn</div>
      <div class="account--header-done">Xong</div>
    </div>
    <VuePerfectScrollbar class="account--content text_left">
      <search />
    </VuePerfectScrollbar>
    <footer-mobile />
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import FooterMobile from "@/components/layouts/mobile/footer";
import Search from "../search/add_message";
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    VuePerfectScrollbar,
    FooterMobile,
    Search
  },
  methods: {
    closeAddNewMessage() {
      this.$emit("closeAddNewMessage", false);
    }
  }
};
</script>

<style scoped lang="scss">
.account {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  .account--header {
    height: 56px;
    padding: 0 16px;
    .back--list,
    .account--header-done {
      font-size: 14px;
      cursor: pointer;
    }
    .account--header-title {
      font-size: 16px;
      font-weight: 600;
      margin-left: 16px;
    }
  }
  .account--content {
    height: calc(100vh - 110px);
    padding: 4px 0;
  }
  .account--user {
    padding: 13px 16px;
    .user--info {
      margin-left: 16px;
    }
    .user--info-name {
      font-size: 14px;
    }
    .user--info-status {
      font-size: 12px;
    }
  }
}

/*Transition popup*/

.popup-enter {
  transform: translateX(100%);
}

.popup-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

/*Transition popup*/
/*Transition popup*/

.info-enter {
  transform: translateX(100%);
}

.info-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.info-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

/* ChangeColor */
// Light
.account[data-theme="light"] {
  color: #444444;
  background-color: #fff;
  .account--header-title {
    color: #666;
  }
  .account--user {
    &.user--current {
      background-color: #f7f7f7;
    }
    .user--info-status {
      color: #999;
    }
  }
}

//Dark
.account[data-theme="dark"] {
  background-color: #2f3136;
  color: #f7f7f7;
  .account--header-title {
    color: #ccc;
  }
  .account--user {
    &.user--current {
      background-color: #27292d;
    }
    .user--info-status {
      color: #ccc;
    }
  }
}
</style>
