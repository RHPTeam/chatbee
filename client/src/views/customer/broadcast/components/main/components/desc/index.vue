<template>
  <div class="main--desc">
    <div class="desc my_3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi eius
      ex officia voluptas. A, corporis delectus dolorum, enim exercitationem
      explicabo modi numquam obcaecati perferendis quas quibusdam quod sint,
      soluta!
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
