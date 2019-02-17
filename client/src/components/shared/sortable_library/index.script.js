export default {
  props: [
    "data",
    "currentSort",
    "currentSortDir",
    "pageSize",
    "currentPage",
    "enablePagination",
    "enableSort"
  ],

  methods: {
    setPagination: function() {
      this.enablePagination = !this.enablePagination;

      this.$emit("enablePagination", this.enablePagination);
    },
    setSort: function() {
      this.enableSort = !this.enableSort;
      this.$emit("enableSort", this.enableSort);
    },
    sort: function(s) {
      //if s == current sort, reverse
      if (this.enableSort == true) {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
          this.$emit("currentSortDir", this.currentSortDir);
        }
        this.currentSort = s;
        this.$emit("currentSort", this.currentSort);
      }
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.data.length)
        this.currentPage++;
      this.$emit("currentPage", this.currentPage);
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
      this.$emit("currentPage", this.currentPage);
    },
    sortMethod() {
      return this.data.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    sortFilterMethod() {
      return this.data
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    }
  },
  computed: {
    sortedData() {
      if (this.enablePagination == true) {
        return this.sortMethod();
      } else {
        return this.sortFilterMethod();
      }
    }
  }
};
