<template>
  <div class="main--desc">
    <div class="desc my_3">
      Sử dụng thẻ thuộc tính khác nhau để gửi tin nhắn đến cho khách hàng mục tiêu mà bạn muốn.
    </div>
    <!--Start: Component filter-->
    <app-filter />
    <!--End: Component filter-->
  </div>
</template>

<script>
import AppFilter from "./components/filter";
export default {
  components: {
    AppFilter
  }
};
</script>

<style scoped lang="scss">
/************* CUSTOM CSS COMPONENT ****************/
/**
    * NOTE: U have to code scss with 3 level which mean is 3 indent
     */

.main--desc {
  .desc {
    text-align: left;
  }
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .main--desc {
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .main--desc {
}
</style>
