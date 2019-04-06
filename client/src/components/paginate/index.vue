<template>
  <div class="d_flex align_items_center justify_content_between">
    <div></div>
    <ul class="pagination d_flex align_items_center p_0 mt_3">
      <li class="pagination--item">
        <button @click="onClickFirstPage" :disabled="isInFirstPage">
          Đầu tiên
        </button>
      </li>
      <li class="pagination--item">
        <button @click="onClickPreviousPage" :disabled="isInFirstPage">
          Trước
        </button>
      </li>
      <li class="pagination--item" v-for="(page, index) in pages" :key="index">
        <button
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
      <li class="pagination--item">
        <button @click="onClickNextPage" :disabled="isInLastPage">Sau</button>
      </li>
      <li class="pagination--item">
        <button @click="onClickLastPage" :disabled="isInLastPage">Cuối</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // currentPage: 1,
    };
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  list-style: none;
  .pagination--item {
    border: 1px solid #e4e4e4;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-right: 0.25rem;
    padding: 0.25rem 0.5rem;
    button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: none;
        outline: 0;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
