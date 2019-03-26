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
    <div class="d_none">{{ filteredSearch }}</div>
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
          <div class="options position_absolute m_0" 
                v-if="isshowStatusFilter">
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
          <div class="icon--list" v-if="isGrid">
            <icon-base
              icon-name="list"
              width="24"
              height="18.065"
              viewBox="0 0 24 18.065"
            >
              <icon-list />
            </icon-base>
          </div>
          <div class="icon--grid" v-else>
            <icon-base
              icon-name="grid"
              width="24"
              height="21"
              viewBox="0 0 24 21"
            >
              <icon-grid-layout />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
import IconList from "@/components/icons/IconList";
import IconGridLayout from "@/components/icons/IconGridLayout";
export default {
  props: ["isGrid"],
  data() {
    return {
      search: "",
      isshowStatusFilter: false,
      statusOptions: ['Hoạt động', 'Ngừng hoạt động'],
      statusFilter: 'Trạng thái'
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    filteredSearch() {
      if (typeof this.users == "undefined") return;
      if (this.users.length == 0) return;
      let newList = this.users.filter(user => {
        return user.name.toLowerCase().includes(this.search.toLowerCase());
      });
      this.$store.dispatch("getUsersFilter", newList);
      return newList;
    }
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
      this.isshowStatusFilter = false;
      console.log(this.isshowStatusFilter);
    }
  },
  components: {
    IconBase,
    IconInputSearch,
    IconList,
    IconGridLayout
  },
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
      padding: .5rem .1rem;
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
    padding: .375rem .75rem;
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
      background-color: #ffb94a;
      left: 8px;
      list-style-type: none;
      padding: 5px 10px;
      top: 30px;
      width: calc(100% - 16px);
      z-index: 10;
    }
    .option {
      margin: 5px;
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
