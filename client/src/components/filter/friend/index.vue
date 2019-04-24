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
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "./index.style";
</style>
