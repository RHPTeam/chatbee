<template>
  <div class="paginate d_flex justify_content_between align_items_center mt_2">
    <div class="paginate--info">Hiển thị 25 trong số 100</div>
    <div
      class="paginate--content d_flex justify_content_end align_items_center"
    >
      <a class="paginate--button text_center previous ml_2 mr_2">&#60;</a>
      <span class="paginate--list d_flex align_items_center">
        <a class="paginate--page text_center current">1</a>
        <a class="paginate--page text_center">2</a>
        <span class="paginate--dot">...</span>
        <a class="paginate--page text_center">8</a>
        <a class="paginate--page text_center">9</a>
      </span>
      <a class="paginate--button text_center previous disabled ml_2 mr_2"
        >&#62;</a
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.paginate {
  color: #999999;
  font-size: 12px;
  .paginate--content {
    a {
      border-radius: 14px;
      cursor: pointer;
      display: block;
      height: 30px;
      line-height: 30px;
      transition: all 0.4s ease;
      width: 30px;
    }
  }
  .paginate--button {
    border: 1px solid transparent;
    &:hover {
      border-color: #56e8bd;
      color: #56e8bd;
    }
    &.disabled {
      pointer-events: none;
    }
  }
  .paginate--page {
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    color: #666666;
    margin: 0 2px;
    &.current,
    &:hover {
      background-color: #56e8bd;
      border-color: #56e8bd;
      color: #fff;
    }
  }
  .paginate--dot {
    margin: 0 15px;
  }
}
</style>
