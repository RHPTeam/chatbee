<template>
  <div class="filter" :data-theme="currentTheme">
    <div class="filter--body-option d_flex">
      <!--Start: option attribue-->
      <div class="filter--attribute position_relative">
        <div
          class="filter--attribute-name filter--item"
          v-click-outside="closeFilterAttribute"
          @click="showFilterAttribute = !showFilterAttribute"
        >attribute</div>
        <div class="filter--attribute-option position_absolute" v-if="showFilterAttribute == true">
          <div class="filter--attribute-item filter--item p_2">attribute</div>
          <div class="filter--attribute-item filter--item p_2">segment</div>
          <div class="filter--attribute-item filter--item p_2">sequence</div>
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
        >is</div>
        <div class="filter--attribute-option position_absolute" v-if="showFilterOption == true">
          <div class="filter--attribute-item filter--item p_2">is</div>
          <div class="filter--attribute-item filter--item p_2">is not</div>
          <div class="filter--attribute-item filter--item p_2">start with</div>
          <div class="filter--attribute-item filter--item p_2">less than</div>
          <div class="filter--attribute-item filter--item p_2">less than</div>
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
      showFilterOption: false
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
    border-right: 1px solid #e4e4e4 !important;
    padding: 6px 16px;
    cursor: pointer;
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
    .filter--item {
      border-right: none !important;
    }
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
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .filter {
  background: #2f3136;
  border-color: #2f3136;
  .filter--body-option {
    background: #27292d;
    border-color: #27292d;
  }
  .filter--attribute-option {
    background: #27292d;
  }
}
</style>
