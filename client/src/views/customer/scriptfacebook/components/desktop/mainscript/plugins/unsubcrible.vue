<template>
  <div class="subcrible card text_left">
    <div class="card_body">
      <div class="header d_flex align_items_center justify_content_between mb_3">
        <h3 class="title">Hủy đăng ký trình tự</h3>
        <div class="icon--remove ml_auto">
          <icon-base
            icon-name="remove"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="desc mb_3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quis tempore
        unde. Similique!
      </div>
      <div class="subcrible--filter mb_3">
        <div class="body mb_3" v-if="showFilter === true">
          <filter-bee />
          <div class="result d_flex align_items_center mb_3 mt_3">
            <div class="item text_center">K</div>
            <div class="item text_center">K</div>
            <div class="desc ml_2">Xem những người phù hợp với bộ lọc</div>
          </div>
        </div>
        <button
          class="btn btn_warning btn--add"
          @click="showFilter = !showFilter"
        >
          Thêm bộ lọc
        </button>
      </div>
      <div class="subcrible--edit mb_3">
        <div class="mb_2">Hủy đăng ký từ</div>
          <list />
      </div>
    </div>
  </div>
</template>
<script>
  import List from "./list_sequence";
export default {
  data() {
    return {
      showFilter: false
    };
  },
  components: {
    List
  }
};
</script>
<style lang="scss" scoped>
@import "./plugins.style";
</style>
