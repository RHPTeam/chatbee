<template>
  <div class="main">
    <!-- Nội dung Welcome desktop -->
    <div class="main--wrap d_none d_md_block">
      Nội dung Welcome desktop
    </div>
    <!-- Nội dung Welcome Mobile -->
    <div class="main--wrap-mobile d_block d_md_none">
      <welcome-mobile/>
    </div>
  </div>
</template>
<script>
    import WelcomeMobile from "./mobile/index";
    export default {
        components: {
            WelcomeMobile,
        }
    };
</script>
