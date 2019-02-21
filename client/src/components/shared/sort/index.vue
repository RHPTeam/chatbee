<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, index) in Object.keys(data[0])"
            :key="index"
            @click="sort('' + field + '')"
          >
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, index) in sortedData" :key="index">
          <td v-for="item in cat" :key="item">{{ item }}</td>
        </tr>
      </tbody>
    </table>
    <p>
      Sort
      <button @click="setSort">{{ enableSort == true ? "On" : "Off" }}</button>
    </p>
    <p>
      Show all
      <button @click="setPagination">
        {{ enablePagination == true ? "On" : "Off" }}
      </button>
    </p>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>

    Show: sort={{ currentSort }}, dir={{ currentSortDir }}, page={{
      currentPage
    }}
  </div>
</template>

<script>
export default {
  props: [
    "data",
    "currentSort",
    "currentSortDir",
    "p_currentPage",
    "p_pageSize",
    "p_enablePagination",
    "p_enableSort"
  ],
  data() {
    return {
      c_pageSize: 5,
      currentPage: 1,
      c_enablePagination: false,
      c_enableSort: true
    };
  },
  methods: {
    setPagination: function() {
      var s = this.c_enablePagination;
      this.c_enablePagination = !s;
    },
    setSort: function() {
      var s = this.enableSort;
      this.c_enableSort = !s;
    },
    sort: function(s) {
      //if s == current sort, reverse
      if (this.enableSort == true) {
        if (s === this.currentSort) {
          this.$emit(
            "update:currentSortDir",
            this.currentSortDir === "asc" ? "desc" : "asc"
          );
        }
        // this.currentSort = s;
        this.$emit("update:currentSort", s);
      }
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.data.length) {
        this.currentPage++;
      }
    },
    prevPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
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
  created() {
    if (typeof this.p_enableSort !== "undefined") {
      this.c_enableSort = this.p_enableSort;
    }
    if (typeof this.p_enablePagination !== "undefined") {
      this.c_enablePagination = this.p_enablePagination;
    }
    if (typeof this.p_currentPage !== "undefined") {
      this.currentPage = this.p_currentPage;
    }
  },
  computed: {
    enableSort() {
      return this.c_enableSort;
    },
    enablePagination() {
      return this.c_enablePagination;
    },

    pageSize() {
      if (typeof this.p_pageSize !== "undefined") {
        return this.p_pageSize;
      } else {
        return this.c_pageSize;
      }
    },

    sortedData: function() {
      if (this.enablePagination == true) {
        return this.sortMethod();
      } else {
        return this.sortFilterMethod();
      }
    }
  }
};
</script>

<style scoped>
td,
th {
  padding: 5px;
}

th {
  cursor: pointer;
}
</style>
