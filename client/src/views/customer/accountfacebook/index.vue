<template>
  <div class="main" :data-theme="currentTheme">
    <!--Nội dung Desktop-->
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Tài khoản facebook"
        subBread="Trang giúp bạn thiết lập các tài khoản facebook"
      />
      <div class="main--contentItem">
        <app-list-account :accountsFB = "getAccountsFB"/>
      </div>
    </div>
    <!--Nội dung Mobile-->
    <div class="d_block d_md_none">
      <div class="main--contentItem">
        <app-list-account-mobile />
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppListAccount from "./components/list_account";
import AppListAccountMobile from "./components/list_account_mobile";

export default {

  async created () {
    await this.$store.dispatch('getAccountsFB');
  },

  data() {
    return {
    }
  },

  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    getAccountsFB() {
      return this.$store.getters.accountsFB;
    },
  },

  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    }
  },
  components: {
    AppListAccount,
    AppListAccountMobile,
    AppBreadCrumb
  }
};
</script>

<style scoped lang="scss">
.main {
  font-family: "Open Sans", sans-serif;

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

  .main--contentItem {
    min-height: calc(100vh - 260px);
    border-radius: 10px;
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
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .main--header {
    display: flex;
    flex-direction: column !important;
    .main--header-title {
      width: 100%;
      margin-bottom: 16px;
    }
    .main--header-desc {
      width: 100%;
    }
  }
}
</style>
