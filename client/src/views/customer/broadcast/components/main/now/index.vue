<template>
  <div class="main p_3">
    <!--Start: Main Header-->
    <app-header />
    <!--End: Main Header-->

    <!--Start: Main Desc-->
    <app-desc />
    <!--End: Main Desc-->

    <!--Start: Main Body-->
    <app-body :openAdd="addText" />
    <!--End: Main Body-->

    <!--Start: Main Footer-->
    <app-footer @addText="addText = $event" />
    <!--End: Main Footer-->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
