<template>
  <div class="main p_3" :class="Date.parse(compareTimeSetting) < Date.now() ? 'disable' : ''">
    <!--Start: Main Header-->
    <app-header />
    <!--End: Main Header-->
    <div>
      <!--Start: Main Desc-->
      <app-desc />
      <!--End: Main Desc-->

      <!--Start: Main Body-->
      <app-body />
      <!--End: Main Body-->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>


