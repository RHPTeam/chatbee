<template>
  <div class="account position_fixed" :data-theme="currentTheme">
    <div
      class="account--header d_flex align_items_center justify_content_start"
    >
      <div class="back--list" @click="closeModal">
        <icon-base
          icon-name="icon-arrow-left"
          width="24"
          height="24"
          viewBox="0 0 240 240"
        >
          <icon-back />
        </icon-base>
      </div>
      <div class="account--header-title">Chuyển tài khoản Facebook</div>
    </div>
    <VuePerfectScrollbar class="account--content text_left">
      <div
        class="account--user user--current d_flex justify_content_start align_items_center"
        v-for="account in listAccountFacebook"
        :key="account._id"
        @click="getConversationByAccount(account._id)"
      >
        <div class="user--img">
          <img
            :src="account.userInfo.thumbSrc"
            class="brd"
            width="50"
            alt="User Avatar"
          />
        </div>
        <div class="user--info">
          <div class="user--info-name">{{ account.userInfo.name }}</div>
          <div v-if="account.status === true" class="user--info-status connect">
            Đang hoạt động
          </div>
          <div v-else class="user--info-status disconnect">Chờ kết nối</div>
        </div>
      </div>
      <div
        class="account--user user--current d_flex flex_column align_items_center justify_content_between mt_2"
        @click="redirectAddAccount"
      >
        <icon-base
          icon-name="icon-arrow-left"
          width="30"
          height="30"
          viewBox="0 0 68 68"
        >
          <icon-plus />
        </icon-base>
        <div class="user--info-name mt_1">Thêm tài khoản</div>
      </div>
    </VuePerfectScrollbar>
    <footer-mobile />
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import FooterMobile from "@/components/layouts/mobile/footer";
export default {
  data() {
    return {};
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    listAccountFacebook() {
      return this.$store.getters.accountsFB;
    }
  },
  components: {
    VuePerfectScrollbar,
    FooterMobile
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    getConversationByAccount(fb_id){
      console.log("show info account");
      window.localStorage.setItem("rid", fb_id);
      this.$store.dispatch("removePreviewConversation");
      this.$store.dispatch("getAllConversationsByAcc", fb_id);
      this.closeModal();
    },
    redirectAddAccount(){
      this.$router.go("/f_account");
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
  .brd {
    border-radius: 50%;
  }
  .account--header {
    height: 56px;
    padding: 0 16px;
    .back--list {
      height: 24px;
      cursor: pointer;
    }
    .account--header-title {
      font-size: 18px;
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
    svg {
      color: #ffb94a;
    }
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
      /*color: #999;*/
    }
    .connect {
      color: #00c853;
    }
    .disconnect {
      color: #ffb94a;
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
      /*color: #ccc;*/
    }
    .connect {
      color: #00c853;
    }
    .disconnect {
      color: #ffb94a;
    }
  }
}
</style>
