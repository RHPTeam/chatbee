<template>
  <div class="main" :data-theme="currentTheme">
    <div
      class="main--header text_left d_flex justify_content_start align_items_end"
    >
      <div class="main--header-title">Tài khoản Facebook</div>
      <div class="main--header-desc">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr
      </div>
    </div>
    <div class="main--contentItem">
        <app-list-account/>
    </div>
   
  </div>
</template>

<script>

import AppListAccount from "./components/list_account";
export default {
  components:{
    AppListAccount
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
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
    background-color:#2F3136;
  }
}
</style>
