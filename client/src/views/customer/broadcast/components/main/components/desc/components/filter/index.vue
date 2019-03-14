<template>
  <div class="filter p_3 mb_3">
    <div class="filter--action d_flex align_items_center justify_content_between">
      <!--Start: component filter-->
      <div class="left">
        <app-filter/>
      </div>
      <!--End: component filter-->
      <!--Start: Filter icon-->
      <div class="filter--icon d_flex ml_auto">
        <div class="filter--icon-plus text_center">
          <icon-base
            class="icon-plus"
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 63 63"
          >
            <icon-plus />
          </icon-base>
        </div>
        <div class="filter--icon-remove">
          <icon-base
            class="icon-remove"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <!--End: Filter icon-->
    </div>
    <!--Start: Result filter-->
    <div class="filter--result text_left mt_4">
      <div>Tìm thấy 50 người khả dụng</div>
      <div class="option--user-list d_flex align_items_center mt_3">
        <div class="option--user-item item mr_2">
          <!--use backgroung images-->
        </div>
        <div class="option--user-more item text_center ml_auto">
          +110
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppFilter from "@/components/shared/filter";
export default {
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false
    };
  },
  methods: {
    closeFilterAttribute(){
      this.showFilterAttribute =false;
    },
    closeFilterOption(){
      this.showFilterOption =false;
    }
  },
  components: {
    AppFilter
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
