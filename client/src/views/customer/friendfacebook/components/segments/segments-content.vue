<template>
  <div class="segments--content mt_4">
    <segments-content-top 
      :groupSelected="groupSelected"
    ></segments-content-top>
    
    <segments-content-users-table
      :groupSelected="groupSelected"
    ></segments-content-users-table>
  </div>
</template>

<script>
import SegmentsContentTop from "./cp-segments-content/top/top";
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
