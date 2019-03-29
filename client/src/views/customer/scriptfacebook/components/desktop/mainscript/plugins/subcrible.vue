<template>
    <div class="subcrible card text_left mb_4 mt_4">
      <div class="card_body">
        <div class="d_flex align_items_center justify_content_between mb_3">
          <h3 class="title">Đăng ký trình tự</h3>
          <div class="ml_auto">
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quis
          tempore unde. Similique!
        </div>
        <div class="subcrible--filter mb_3">
          <div class="mb_3" v-if="showFilter === true">
            <filter-bee />
          </div>
          <button class="btn btn_outline_warning" @click="showFilter = !showFilter">Thêm bộ lọc</button>
        </div>
        <div class="subcrible--edit mb_3">
          <editable placeholder="Chọn kịch bản" />
        </div>
        <div class="subcrible--remote"></div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      showFilter: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./plugins.style";
</style>
