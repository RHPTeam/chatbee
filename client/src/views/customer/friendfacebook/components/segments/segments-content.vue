<template>
  <div class="segments--content mt_4">
    <segments-content-top />
    <segments-content-users-table />
  </div>
</template>

<script>
import SegmentsContentTop from "./cp-segments-content/top";
import SegmentsContentUsersTable from "./cp-segments-content/users-table/users-table";

export default {
  components: {
    SegmentsContentTop,
    SegmentsContentUsersTable
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
