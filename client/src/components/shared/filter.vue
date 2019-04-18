<template>
  <div class="filter" :data-theme="currentTheme">
    <div class="filter--body-option d_flex">
      <!--Start: option attribue-->
      <div
        class="filter--attribute position_relative"
        :class="control === false ? 'w_40' : ''"
      >
        <div
          class="filter--attribute-name filter--border filter--item"
          v-click-outside="closeFilterAttribute"
          @click="showOptionFilterAttr"
        >
          <input type="text" v-model="getAttribute" />
        </div>
        <div
          class="filter--attribute-option position_absolute"
          v-if="showFilterAttribute === true"
        >
          <div
            class="filter--attribute-item filter--item p_2"
            v-for="(item, index) in listAttr"
            :key="index"
            @click="showListAttribute(item.value)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <!--End: option attribue-->
      <!--Start: create attribue-->
      <div
        class="list--filter position_relative"
        :class="control === false ? 'w_60' : ''"
      >
        <input
          type="text"
          v-model="resultFilter"
          class="filter--item filter--body-created"
          @click="showResultFilterDefault"
          placeholder="Tên thuộc tính"
          v-click-outside="closeResultListFilter"
        />
        <div
          class="list text_left position_absolute"
          v-if="showResultListFilter === true"
        >
          <div
            class="item"
            v-for="(item, index) in listFilter"
            :key="index"
            @click="showInfoGroupFriend(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!--End: create attribue-->
      <!--Start: option other-->
      <div class="filter--attribute position_relative" v-if="control === true">
        <div
          class="filter--attribute-name filter--item"
          v-click-outside="closeFilterOption"
          @click="showFilterOption = true"
        >
          <input type="text" v-model="getCondition" />
        </div>
        <div
          class="filter--attribute-option position_absolute"
          v-if="showFilterOption === true"
        >
          <div
            class="filter--attribute-item filter--item p_2"
            v-for="(item, index) in listCondition"
            :key="index"
            @click="getCondition = item.value"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <!--End: option other-->
      <!--Start: create attribue-->
      <div class="list--filter position_relative" v-if="control === true">
        <input
          type="text"
          v-model="valueFilter"
          class="filter--item filter--body-created"
          @click="showValueListFilter = true"
          placeholder="Giá trị thuộc tính"
          v-click-outside="closeValueListFilter"
        />
        <div
          class="list text_left position_absolute"
          v-if="showValueListFilter === true"
        >
          <div
            class="item"
            v-for="(list, index) in listFilter"
            :key="index"
            @click="showInfoFriendAttribute(list)"
          >
            {{ list.value }}
          </div>
        </div>
      </div>
      <!--End: create attribue-->
    </div>
  </div>
</template>
<script>
import ConvertUnicode from "@/utils/string.util";
export default {
  props: {
    bcId: String,
    blockId: String
  },
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false,
      listAttr: [{ key: 1, value: "Thuộc tính" }, { key: 1, value: "Nhóm" }],
      listCondition: [
        { key: 1, value: "là" },
        { key: 1, value: "không phải là" }
      ],
      getAttribute: "Thuộc tính",
      getCondition: "là",
      control: true,
      showResultListFilter: false,
      showValueListFilter: false,
      resultFilter: "",
      valueFilter: ""
    };
  },
  async created() {
    await this.$store.dispatch("listFilterAttribute");
    // this.$emit("openDone", true);
  },
  methods: {
    closeFilterAttribute() {
      this.showFilterAttribute = false;
    },
    closeFilterOption() {
      this.showFilterOption = false;
    },
    closeResultListFilter() {
      this.showResultListFilter = false;
    },
    closeValueListFilter() {
      this.showValueListFilter = false;
    },
    showResultFilterDefault(){
      this.showResultListFilter = true;
    },
    showListAttribute(value) {
      this.getAttribute = value;
      if (
        ConvertUnicode.convertUnicode(value.toString().toLowerCase()) === "nhom"
      ) {
        this.$store.dispatch("listFilterGroup");
        this.control = false;
        this.valueFilter = "";
        this.resultFilter = "";
        this.$emit("showSegment", true);
      } else {
        this.$store.dispatch("listFilterAttribute");
        this.control = true;
        this.valueFilter = "";
        this.resultFilter = "";
        this.$emit("showAttribute", true);
      }
    },
    showInfoGroupFriend(item) {
      this.resultFilter = item.name;
      if (item.value === undefined) {
        // dispatch show group friend when choose option segments
        const dataSender = {
          itemId: item._id,
          bcId: this.bcId,
          blockId: this.blockId
        };
        this.$store.dispatch("getInfoGroupFriend", dataSender);
      } else {
        // dispatch show friend when choose option attribute
        const dataSender = {
          item: item,
          bcId: this.bcId,
          blockId: this.blockId
        }
        this.$store.dispatch("getInfoFriendWithNameAttribute", dataSender);
        this.$emit("default", true)
      }
    },
    showInfoFriendAttribute(list) {
      this.valueFilter = list.value;
      if (this.resultFilter !== list.name) {
        // check attribute name, if different use condition is not.
        const dataSender = {
          name: this.resultFilter,
          item: list,
          bcId: this.bcId,
          blockId: this.blockId
        }
        this.$store.dispatch("getInfoFriendWithConditionIsNot", dataSender);
        this.$emit("conditionIsNot", true);
      } else {
        // check attribute name, if the same use condition is.
        const dataSender = {
          name: this.resultFilter,
          item: list,
          bcId: this.bcId,
          blockId: this.blockId
        }
        this.$store.dispatch("getInfoFriendWithConditionIs", dataSender);
        this.$emit("conditionIs", true);
      }
    },
    showOptionFilterAttr() {
      this.showFilterAttribute = true;
      this.$emit("openDone", true);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    listFilter() {
      return this.$store.getters.listFilter;
    }
  }
};
</script>
<style lang="scss" scoped>
/************* CUSTOM CSS COMPONENT ****************/
/**
    * NOTE: U have to code scss with 3 level which mean is 3 indent
    */

.filter {
  background-color: #fff;
  border: 1px solid #ebebeb;
  .filter--attribute {
    width: 120px;
  }
  .w_40 {
    width: 40% !important;
  }
  .w_60 {
    border-bottom-right-radius: 10px !important;
    border-top-right-radius: 10px !important;
    width: 60% !important;
  }
  .list--filter {
    width: calc((100% - 240px) / 2);
    .list {
      top: 101%;
      left: 0;
      width: 100%;
      z-index: 99;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: 0.25rem;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
      max-height: 150px;
      overflow-x: hidden;
      overflow-y: auto;
      .item {
        cursor: pointer;
        font-size: 14px;
        padding: 0.25rem 0.5rem;
        &:hover {
          background-color: #ff9e4a;
          color: #ffffff;
        }
      }
    }
  }
  .filter--body-created {
    border: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    &:focus {
      /*width: calc(100% - 300px);*/
      /*width: calc(((100% - 240px) / 2) + 50px);*/
      /*min-width: 200px;*/
    }
  }
  .filter--body-created[data-placeholder]:not(:focus):not([data-div-placeholder-content]):before {
    content: attr(data-placeholder);
    float: left;
    margin-left: 2px;
    color: #b3b3b3;
  }
  .filter--body-created:focus {
    outline: 0;
    box-shadow: none;
  }
  .filter--border {
    border-left: 0 !important;
  }
  .filter--item {
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    input {
      width: 100%;
      border: none;
      background: transparent;
      color: #444444;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: none;
        border-color: transparent;
        outline: 0;
      }
    }
  }
  .filter--body-option {
    background: #ffffff;
    border: 1px solid #e4e4e4;
    /*border-radius: 10px;*/
    font-size: 15px;
  }
  .filter--attribute-option {
    background: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
    border: solid 1px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    cursor: pointer;
    min-width: 123px;
    left: -3px;
    padding: 3px 0;
    transition: max-height 150ms cubic-bezier(0.22, 0.61, 0.36, 1),
      opacity 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
    transform: translateY(-50%);
    top: 50%;
    z-index: 99;
    .filter--attribute-item {
      padding: 8px 16px;
      &:hover {
        background: #ffb94a;
        color: #ffffff;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1023.9px) {
  .filter {
    .filter--body-option {
      display: flex !important;
      flex-direction: column !important;
      .filter--attribute {
        width: 100%;
      }
      .filter--body-created {
        width: 100%;
      }
    }
  }
}
/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .filter {
  .filter--attribute-name {
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
  }
  .last--item.filter--item {
    border-right: 0 !important;
  }
  @media screen and (min-width: 768px) and (max-width: 1023.9px) {
    .filter--item {
      border-right: 0 !important;
    }
  }
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .filter {
  background: #2f3136;
  border-color: #2f3136;
  .filter--item {
    background-color: #27292d;
    color: #cccccc;
  }
  .filter--attribute-name {
    border-left: 1px solid #707070;
    border-right: 1px solid #707070;
  }
  .last--item.filter--item {
    border-right: 0 !important;
  }
  .filter--body-option {
    background: #27292d;
    border-color: #27292d;
  }
  .filter--attribute-option {
    background: #27292d;
    border: 0;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
  .list {
    background-color: #27292d;
    border-color: #27292d;
  }
}
</style>
