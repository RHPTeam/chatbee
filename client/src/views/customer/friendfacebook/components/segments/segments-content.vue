<template>
  <div class="segments--content mt_4">
    <segments-content-top
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      @updateAccountSelected="accountSelected = $event"
      @updateSearch="keywordSearch = $event"
    ></segments-content-top>

    <segments-content-users-table
      :accountSelected="accountSelected"
      :groupSelected="groupSelected"
      :keywordSearch="keywordSearch"
    ></segments-content-users-table>
  </div>
</template>

<script>
import SegmentsContentTop from "./cp-segments-content/top/top";
import SegmentsContentUsersTable from "./cp-segments-content/users-table/users-table";

export default {
  props: ["groupSelected"],
  data() {
    return {
      keywordSearch: "",
      accountSelected: {
        id: "all",
        name: "Tất cả"
      }
    };
  },
  components: {
    SegmentsContentTop,
    SegmentsContentUsersTable
  }
};
</script>

<style lang="scss" scoped></style>
