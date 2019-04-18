<template>
  <div class="mobile">
    <search />
    <list-message />
  </div>
</template>
<script>
import Search from "./list_message/search";
import ListMessage from "./list_message/user_item";
export default {
  components: {
    Search,
    ListMessage
  }
};
</script>
<style lang="scss" scoped></style>
