<template>
  <div class="filter p_3 mb_3">
    <div class="filter--action">
      Filter action
    </div>
    <div class="filter--result">
      Tìm thấy 50 người khả dụng
    </div>
  </div>
</template>

<style lang="scss" scoped>
/************* CUSTOM CSS COMPONENT ****************/
/**
* NOTE: U have to code scss with 3 level which mean is 3 indent
*/

.filter {
  background-color: #fff;
  border: 1px solid #ebebeb;
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .filter {
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .filter {
}
</style>
