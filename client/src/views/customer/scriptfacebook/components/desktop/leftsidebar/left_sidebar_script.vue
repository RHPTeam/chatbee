<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <!--List Type Script -->
  <div class="type-scripts--group">
    <div
      v-for="(item_type_script, index) in list_type_script"
      :key="index"
      class="type-script--item"
      :class="{
        'type-script--close': list_type_script[index].list_script.length === 0
      }"
    >
      <!--Item Type-->
      <div
        class="type-script--name d_flex align_items_center"
        @click="hideGroup(index)"
      >
        <div
          class="type-script--icon d_flex align_items_center"
          :class="{ hidden: list_type_script[index].list_script.length === 0 }"
        >
          <icon-base
            icon-name="icon-sort-down"
            class="icon-sort-down"
            width="9.431"
            height="5.506"
            viewBox="0 0 9.431 5.506"
          >
            <icon-sort-down />
          </icon-base>
        </div>

        <span contenteditable="true">
          {{ item_type_script.title }}
        </span>
      </div>
      <!--Group Name Scripts-->
      <div class="scripts--group r">
        <div
          v-for="(item_script, index) in item_type_script.list_script"
          :key="index"
          class="script--item c_xl_4 c_lg_6 c_md_12 text_center "
        >
          <span>{{ item_script.name }}</span>
        </div>
        <div
          class="script--item script--item-add  c_xl_4 c_lg_6 c_md_12 text-center"
        >
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus />
            </icon-base>
          </span>
        </div>
      </div>
    </div>
    <!--Elm Create new Type -->
    <div class="type-script--add d_flex align_items_center">
      <icon-base
        class="icon--add"
        icon-name="plus"
        width="9"
        height="9"
        viewBox="0 0 60 60"
      >
        <icon-plus />
      </icon-base>
      Thêm nhóm mới
    </div>
  </div>
</template>

<script type="text/javascript" src="./left_sidebar.script.js"></script>

<style scoped lang="scss">
@import "./left_sidebar.style";
</style>
