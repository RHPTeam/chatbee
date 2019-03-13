<template>
  <!-- Segments List-->
  <div class="segments--list">
    <div class="btn--clear mr_3 mb_2">
      Xóa vùng chọn
    </div>

    <div
      class="segments--list-item mr_2 mb_2"
      v-for="segment in segmentsArr"
      :key="segment"
    >
      {{ segment }}
    </div>

    <div class="segments--list-item btn--add-segment mb_2">
      <icon-base
        class="icon--add mr_1"
        icon-name="plus"
        width="14"
        height="14"
        viewBox="0 0 60 60"
      >
        <icon-plus />
      </icon-base>
      Thêm phân khúc
    </div>
  </div>
  <!-- End Segments List -->
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
export default {
  components: {
    IconBase,
    IconPlus
  },

  data() {
    return {
      segmentsArr: [
        "Đã tiếp cận",
        "Đổi trả hàng",
        "Đã mua hàng",
        "Khách hàng hiện tại",
        "Khách hàng cao cấp",
        "Đang có nhu cầu"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.segments--list {
  display: inline-block;

  .btn--clear {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    display: inline-block;
    color: #999;
    padding: 0.375rem 0.75rem;
  }

  &-item {
    background-color: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: 20px;
    color: #444;
    display: inline-block;
    padding: 0.375rem 0.75rem;

    &:hover {
      border: 1px solid #666;
      cursor: pointer;
    }
  }

  .btn--add-segment {
    svg {
      color: #222;
    }
  }
}
</style>
