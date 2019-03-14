<!--Template Main Scripts Desktop-->
<template>
  <div class="main p_3">
    <!--Start: Main Header-->
    <app-header />
    <!--End: Main Header-->

    <!--Start: Main Desc-->
    <app-desc />
    <!--End: Main Desc-->

    <!--Start: Main Body-->
    <app-body
        :openAdd="addText"
    />
    <!--End: Main Body-->

    <!--Start: Main Footer-->
    <app-footer
      @addText="addText = $event"
    />
    <!--End: Main Footer-->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";

/************* CUSTOM CSS COMPONENT ****************/
/**
* NOTE: U have to code scss with 3 level which mean is 3 indent
 */

.main {
  background: 0;
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .main {
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .main {
}
</style>
