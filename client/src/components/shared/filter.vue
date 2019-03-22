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
            @click="getAttribute = item.value"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <!--End: option attribue-->
      <!--Start: create attribue-->
      <div
        class="filter--body-created filter--item"
        contenteditable="true"
        data-placeholder="lead status"
      ></div>
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
      <div
        class="filter--body-created last--item filter--item"
        contenteditable="true"
        data-placeholder="lead status"
      ></div>
      <!--End: create option-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false,
      listAttr: [
        { key: 1, value: "attribute" },
        { key: 1, value: "segment" },
        { key: 1, value: "sequence" }
      ],
      listCondition: [
        { key: 1, value: "is" },
        { key: 1, value: "is not" },
        { key: 1, value: "start with" },
        { key: 1, value: "less than" },
        { key: 1, value: "best" }
      ],
      getAttribute: "attribute",
      getCondition: "is"
    };
  },
  methods: {
    closeFilterAttribute() {
      this.showFilterAttribute = false;
    },
    closeFilterOption() {
      this.showFilterOption = false;
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
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
  .filter--body-created {
    width: calc((100% - 240px) / 2);
    &:focus {
      width: 200px;
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
    padding: 6px 16px;
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
    padding: 3px 0;
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

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .filter {
  .filter--item {
    border-right: 1px solid #e4e4e4 !important;
  }
  .last--item.filter--item {
    border-right: 0 !important;
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
