<template>
  <div class="segments--content mt_4">
    <segments-content-top :groupSelected="groupSelected"/>
    <segments-content-users-table :groupSelected="groupSelected"/>
  </div>
</template>

<script>
import SegmentsContentTop from "./cp-segments-content/top";
import SegmentsContentUsersTable from "./cp-segments-content/users-table/users-table";

export default {
  props: ["groupSelected"],
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
