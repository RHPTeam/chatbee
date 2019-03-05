<template>
  <div class="list--user-mobile">
    <user-item isNewMessage=true />
    <user-item isNewMessage=true />
    <user-item isNewMessage=true />
    <user-item isNewMessage=true />
    <user-item isNewMessage=true />
    <user-item isNewMessage=true />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
  </div>
</template>
<script>
import UserItem from "./chat/user_item";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    UserItem
  }
};
</script>
<style lang="scss" scoped>
.list--user-mobile {
  overflow-x: hidden;
}
</style>
