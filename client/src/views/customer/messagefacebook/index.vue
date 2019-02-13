<template>
  <div class="main">
    <app-box />
    <app-list />
  </div>
</template>

<script>
import AppList from "./components/list";
import AppBox from "./components/box";
export default {
  components: {
    AppBox,
    AppList
  }
};
</script>
