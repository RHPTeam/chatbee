<template>
  <div class="account text_left px_4 py_4">
    <div class="account--title mb_4">Quản lý tài khoản</div>
    <div class="account--content card card_body p_4">
      <app-top
        :isGrid="isGrid"
        @changeLayout="isGrid = $event"
      />
      <div v-if="isGrid" class="account--grid">
        <app-grid-info />
      </div>
      <div v-else class="list--content">
        <app-list-info />
      </div>
      <app-paginate />
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
  },
  async created() {
    await this.$store.dispatch("getUsers");
    const data = this.$store.getters.users;
    await this.$store.dispatch("getUsersFilter", data);
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
    color: #666;
    font-size: 18px;
    font-weight: bold;
  }
  .account--content {
    border: 0;
    border-radius: 8px;
  }
}
</style>
