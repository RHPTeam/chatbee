<template>
  <div class="top d_flex justify_content_between align_items_center mb_4">
    <div class="top--search">
      <div class="input--wrap position_relative">
        <input type="text" placeholder="Tìm kiếm" v-model="search" />
        <div class="search--icon position_absolute">
          <icon-base
            icon-name="input-search"
            width="16.772"
            height="17.287"
            viewBox="0 0 16.772 17.287"
          >
            <icon-input-search />
          </icon-base>
        </div>
      </div>
    </div>
    <!-- <div class="d_none">{{ filteredSearch }}</div> -->
    <div class="d_flex justify_content_end align_items_center">
      <div class="top--filter">
        <div
          class="select--wrapper position_relative d_flex align_items_center"
          @click="showStatusFilter"
        >
          <div class="ic--filter mr_2">
            <icon-base
              icon-name="filter"
              width="16"
              height="16"
              viewBox="0 0 400 400"
            >
              <icon-filter />
            </icon-base>
          </div>
          <div class="selected">{{ statusFilter }}</div>
          <div
            class="options position_absolute m_0"
            v-if="isshowStatusFilter == true"
          >
            <div
              class="option"
              v-for="(item, index) in statusOptions"
              :key="index"
              @click="filterByStatus(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="top--layout">
        <div class="layout--list ml_3" @click="changeLayout">
          <div class="icon--grid" v-if="isGrid">
            <icon-base
              icon-name="grid"
              width="24"
              height="21"
              viewBox="0 0 24 21"
            >
              <icon-grid-layout />
            </icon-base>
          </div>
          <div class="icon--list" v-else>
            <icon-base
              icon-name="list"
              width="24"
              height="18.065"
              viewBox="0 0 24 18.065"
            >
              <icon-list />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import convertUnicode from "@/utils/string.util.js";
export default {
  props: ["isGrid"],
  data() {
    return {
      search: "",
      isshowStatusFilter: false,
      statusOptions: ["Tất cả", "Hoạt động", "Đã ngừng"],
      statusFilter: "Tất cả"
    };
  },
  watch: {
    search() {
      const data = this.usersFilter;
      if (this.search === "") {
        if (this.statusFilter === "Tất cả") {
          const data = this.users;
          this.$store.dispatch("getUsersFilter", data);
        } else if (this.statusFilter === "Hoạt động") {
          let newList = this.users.filter(user => {
            return user.status === true;
          });
          this.$store.dispatch("getUsersFilter", newList);
        } else if (this.statusFilter == "Đã ngừng") {
          let newList = this.users.filter(user => {
            return user.status === false;
          });
          this.$store.dispatch("getUsersFilter", newList);
        }
      } else {
        let newList = this.usersFilter.filter(user => {
          return this.searchStr(user.email, this.search);
        });
        this.$store.dispatch("getUsersFilter", newList);
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    usersFilter() {
      return this.$store.getters.usersFilter;
    },
    filteredSearch() {}
  },
  methods: {
    changeLayout() {
      this.$emit("changeLayout", !this.isGrid);
    },
    showStatusFilter() {
      this.isshowStatusFilter = !this.isshowStatusFilter;
    },
    filterByStatus(val) {
      this.statusFilter = val;
      if (this.search === "") {
        if (val === "Tất cả") {
          const data = this.users;
          this.$store.dispatch("getUsersFilter", data);
        } else if (val === "Hoạt động") {
          let newList = this.users.filter(user => {
            return user.status === true;
          });
          this.$store.dispatch("getUsersFilter", newList);
        } else if (val == "Đã ngừng") {
          let newList = this.users.filter(user => {
            return user.status === false;
          });
          this.$store.dispatch("getUsersFilter", newList);
        }
      } else {
        if (val === "Tất cả") {
          let data = this.users.filter(user => {
            return this.searchStr(user.email, this.search);
          });
          this.$store.dispatch("getUsersFilter", data);
        } else if (val === "Hoạt động") {
          let newList = this.users.filter(user => {
            return (
              user.status === true && this.searchStr(user.email, this.search)
            );
          });
          this.$store.dispatch("getUsersFilter", newList);
        } else if (val == "Đã ngừng") {
          let newList = this.users.filter(user => {
            return (
              user.status === false && this.searchStr(user.email, this.search)
            );
          });
          this.$store.dispatch("getUsersFilter", newList);
        }
      }
    },
    searchStr(s1, s2) {
      const s1Convert = convertUnicode.convertUnicode(s1).toLowerCase();
      const s2Convert = convertUnicode.convertUnicode(s2).toLowerCase();
      return s1Convert.includes(s2Convert);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.top {
  .top--search {
    input {
      border: solid 1px #e4e4e4;
      border-radius: 10px;
      font-size: 14px;
      outline: 0;
      padding: 0.5rem 0.1rem;
      padding-left: 2.5rem;
      transition: all 0.4s ease;
      width: 260px;

      &:focus {
        border-color: #ccc;
        ~ .search--icon {
          color: #ccc;
        }
      }
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ccc;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #ccc;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #ccc;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #ccc;
    }
    .search--icon {
      color: #999;
      left: 15px;
      transform: translateY(-50%);
      transition: all 0.4s ease;
      top: 50%;
    }
  }
  .select--wrapper {
    border: solid 1px #ffb94a;
    border-radius: 10px;
    color: #ffb94a;
    cursor: pointer;
    font-size: 14px;
    outline: none;
    padding: 0.375rem 0.75rem;
    width: 120px;
    .ic--filter {
      svg {
        stroke: #ffb94a;
        stroke-width: 12;
        margin-top: 3px;
      }
    }
    // &:after {
    //   border-left: 5px solid transparent;
    //   border-right: 5px solid transparent;
    //   border-top: 6px solid #fff;
    //   content: "";
    //   height: 0;
    //   pointer-events: none;
    //   position: absolute;
    //   right: 16px;
    //   transform: translateY(-50%);
    //   top: 50%;
    //   width: 0;
    // }
    .options {
      background-color: #ffffff;
      border: 1px solid #f2f2f2;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      left: 0;
      list-style-type: none;
      padding: 0;
      top: 36px;
      width: 100%;
      z-index: 10;
    }
    .option {
      padding: 0.25rem 0.75rem;
      &:first-child {
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        border-radius: 0 0 10px 10px;
      }
      &:hover {
        color: #fff;
        background-color: #ffb94a;
      }
    }
  }

  .top--layout {
    color: #aaa;
    height: 20px;
    svg {
      cursor: pointer;
      transition: all 0.4s ease;
      color: #ffb94a;
    }
  }
}
</style>
