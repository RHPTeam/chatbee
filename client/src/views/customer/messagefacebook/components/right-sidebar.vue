<template>
  <div class="right--sidebar">
    <app-info />
    <app-option />
    <app-library />
  </div>
</template>

<script>
import AppInfo from "./rightsidebar/info-top";
import AppOption from "./rightsidebar/options";
import AppLibrary from "./rightsidebar/libraries";
export default {
  components: {
    AppInfo,
    AppOption,
    AppLibrary
  }
};
</script>

<style scoped lang="scss"></style>
