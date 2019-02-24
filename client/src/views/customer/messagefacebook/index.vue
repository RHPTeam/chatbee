<template>
  <div class="main">
    <!--Nội dung desktop-tablet-->
    <div class="d_none d_md_block">
      <app-box />
      <app-list />
    </div>
    <!--Nội dung mobile-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
  </div>
</template>

<script>
import AppList from "./components/list";
import AppBox from "./components/box";
import AppMobile from "./mobile/list_user_mobile";
export default {
  components: {
    AppBox,
    AppList,
    AppMobile
  }
};
</script>
