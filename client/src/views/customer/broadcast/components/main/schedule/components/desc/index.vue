<template>
  <div class="main--desc">
    <div class="desc my_3">
      Chiến dịch theo bộ hẹn giúp bạn rút ngắn thời gian tạo chiến dịch quảng
      cáo cho thương hiệu, sản phảm. Bạn chỉ cần thiết lập nội dung chiến dịch
      mà bạn muốn thực hiện, sau đó thiết lập thời gian, việc còn lại là thư
      giãn...
    </div>
    <!--Start: Component filter-->
    <app-filter />
    <!--End: Component filter-->

    <!--Start: Component Timer-->
    <app-timer />
    <!--End: Component Timer-->
  </div>
</template>

<script>
import AppFilter from "./components/filter";
import AppTimer from "./components/timer";
export default {
  components: {
    AppFilter,
    AppTimer
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
