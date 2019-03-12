<template>
  <div class="account text_left pt_4 pb_4 pl_5 pr_5">
    <div class="account--title mb_4">Quản lý tài khoản</div>
    <div class="account--content card card_body p_4">
      <app-top :isGrid="isGrid" @changeLayout="isGrid = $event" :users="users"/>
      <div v-if="isGrid" class="account--grid">
        <app-grid-info :users="users"/>
      </div>
      <div v-else class="list--content">
        <app-list-info :users="users"/>
      </div>
      <app-paginate/>
    </div>
  </div>
</template>
<script>
import AppTop from "./components/top";
import AppGridInfo from "./components/grid-info";
import AppListInfo from "./components/list-info";
import AppPaginate from "./components/paginate";

export default {
  components: {
    AppTop,
    AppGridInfo,
    AppListInfo,
    AppPaginate
  },
  computed: {
    users() {
      return this.$store.getters.usersFilter;
    }
  },
  async created() {
    await this.$store.dispatch("getUsers");
  },
  data() {
    return {
      isGrid: true
    };
  }
};
</script>

<style scoped lang="scss">
.account {
  .account--title {
    color: #56e8bd;
    font-size: 18px;
    font-weight: bold;
  }
  .account--content {
    border: 0;
    border-radius: 8px;
  }
}
</style>
