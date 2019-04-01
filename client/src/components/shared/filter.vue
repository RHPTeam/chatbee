<template>
  <div class="filter" :data-theme="currentTheme">
    <div class="filter--body-option d_flex">
      <!--Start: option attribue-->
      <div class="filter--attribute position_relative">
        <div
          class="filter--attribute-name filter--item"
          v-click-outside="closeFilterAttribute"
          @click="showFilterAttribute = !showFilterAttribute"
        >
          <input type="text" v-model="getAttribute" />
        </div>
        <div
          class="filter--attribute-option position_absolute"
          v-if="showFilterAttribute == true"
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
      <div class="list--filter position_relative">
        <div
          class="filter--body-created filter--item"
          contenteditable="true"
          data-placeholder="Giá trị thuộc tính"
        ></div>
        <div class="list text_left position_absolute">
          <div class="item" v-for="(item, index) in groupFriend" :key="index">
            {{ item.name }}
          </div>
        </div>
      </div>
      <!--End: create attribue-->
      <!--Start: option other-->
      <div class="filter--attribute position_relative">
        <div
          class="filter--attribute-name filter--item"
          v-click-outside="closeFilterOption"
          @click="showFilterOption = !showFilterOption"
        >
          <input type="text" v-model="getCondition" />
        </div>
        <div
          class="filter--attribute-option position_absolute"
          v-if="showFilterOption == true"
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
      <!--Start: create option-->
      <div>
        <div
          class="filter--body-created last--item filter--item"
          contenteditable="true"
          data-placeholder="Giá trị thuộc tính"
        ></div>
      </div>
      <!--End: create option-->
    </div>
  </div>
</template>
<script>
import ConvertUnicode from "@/utils/string.util";
export default {
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
      getCondition: "là"
    };
  },
  async created() {
    // await this.$store.dispatch("listFilterGroup");
  },
  methods: {
    closeFilterAttribute() {
      this.showFilterAttribute = false;
    },
    closeFilterOption() {
      this.showFilterOption = false;
    },
    showListAttribute(value) {
      this.getAttribute = value;
      ConvertUnicode.convertUnicode(value.toString().toLowerCase() === 'nhom')
        ? this.$store.dispatch("listFilterGroup")
        : console.log("attribute")
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupFriend() {
      return this.$store.getters.listFilterGroup;
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
  .list--filter {
    width: calc((100% - 240px) / 2);
    .list {
      top: 100%;
      left: 0;
      width: 101%;
      z-index: 99;
      background-color: #ffffff;
      border-radius: 0.25rem;
      max-height: 150px;
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
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:focus {
      width: calc(100% - 300px);
      min-width: 200px;
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
  .filter--item {
    border-right: 1px !important;
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    input {
      width: 100%;
      border: none;
      background: transparent;
      color: #cccccc;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: none;
        border-color: transparent;
      }
    }
  }
  .last--item.filter--item {
    border-right: 0 !important;
  }
  .filter--body-option {
    background: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
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
  .filter--item {
    border-right: 1px solid #e4e4e4 !important;
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
    border-right: 1px solid #444 !important;
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
}
</style>
