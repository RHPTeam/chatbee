<template>
  <div class="account position_fixed" :data-theme="currentTheme">
    <div class="account--header d_flex align_items_center justify_content_start">
      <div class="back--list" @click="closeModal">
        <icon-base icon-name="icon-arrow-left" width="24" height="24" viewBox="0 0 24 24">
          <icon-arrow-left/>
        </icon-base>
      </div>
      <div class="account--header-title">Chuyển tài khoản Facebook</div>
    </div>
    <VuePerfectScrollbar class="account--content text_left">
      <div class="account--user user--current d_flex justify_content_start align_items_center">
        <div class="user--img">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="50"
            alt="User Avatar"
          >
        </div>
        <div class="user--info">
          <div class="user--info-name">Nguyễn Huyền</div>
          <div class="user--info-status">Đang hoạt động</div>
        </div>
      </div>
      <div class="account--user d_flex justify_content_start align_items_center">
        <div class="user--img">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="50"
            alt="User Avatar"
          >
        </div>
        <div class="user--info">
          <div class="user--info-name">Văn Nam</div>
          <div class="user--info-status">Hoạt động lần cuối từ 2 giờ trước</div>
        </div>
      </div>
      <div class="account--user d_flex justify_content_start align_items_center">
        <div class="user--img">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="50"
            alt="User Avatar"
          >
        </div>
        <div class="user--info">
          <div class="user--info-name">Văn Giang</div>
          <div class="user--info-status">Hoạt động lần cuối từ 2 giờ trước</div>
        </div>
      </div>
    </VuePerfectScrollbar>
    <footer-mobile/>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import FooterMobile from "@/components/layouts/mobile/footer";
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
export default {
  props: ["showChangeAccount"],
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
    IconBase,
    IconArrowLeft
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
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
