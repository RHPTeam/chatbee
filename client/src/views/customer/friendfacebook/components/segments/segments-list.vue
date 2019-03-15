<template>
  <!-- Segments List-->
  <div class="segments--list" :data-theme="currentTheme">
    <div class="btn--clear mr_3 mb_2">Xóa vùng chọn</div>

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
        <icon-plus /> </icon-base
      >Thêm phân khúc
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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
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
    border: 1px solid;
    border-radius: 10px;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      color: #fff !important;
      background-color: #ffb94a !important;
      border-color: #ffb94a !important;
    }
  }

  &-item {
    border: 1px solid;
    border-radius: 20px;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      border: 1px solid #ffb94a !important;
      color: #ffb94a;
    }
  }
}
/* ChangeColor */
// Light
.segments--list[data-theme="light"] {
  color: #444;
  .btn--clear {
    border-color: #e4e4e4;
    color: #999;
  }
  .segments--list-item {
    background-color: #ffffff;
    border-color: #e4e4e4;
  }
}

//Dark
.segments--list[data-theme="dark"] {
  color: #f7f7f7;
  .btn--clear {
    border-color: #ebebeb;
    color: #ccc;
  }
  .segments--list-item {
    background-color: #27292d;
    border-color: #ebebeb;
  }
}
</style>
