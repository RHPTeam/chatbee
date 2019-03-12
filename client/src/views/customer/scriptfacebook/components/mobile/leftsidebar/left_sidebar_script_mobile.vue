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
      <div class="type-script--name d_flex align_items_center">
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
        <span @click="hideGroup(index)">
          <span contenteditable="true" @click="ishowPopupMoveDelele = true">
            {{ item_type_script.title }}
          </span>
        </span>
        <!--Icon Delele-->
        <div
          class="type-script--delete ml_auto"
          @click="ishowPopupDelele = true"
        >
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>

      <!--Group Name Scripts-->
      <div class="scripts--group r">
        <div
          v-for="(item_script, index) in item_type_script.list_script"
          :key="index"
          class="script--item c_4 text_center"
          @click="ishowPopupMainScript = true"
        >
          <span>{{ item_script.name }}</span>
        </div>
        <div class="script--item script--item-add  c_4 text-center">
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

    <!--Popup Delete-->
    <transition>
      <app-popup-delete
        name="popup-delete"
        v-if="ishowPopupDelele == true"
        :popupData="ishowPopupDelele"
        @closeAddPopup="ishowPopupDelele = $event"
      />
    </transition>
    <!--Popup Move Delete-->
    <transition>
      <app-popup-move-delete
        name="popup-move-delete"
        v-if="ishowPopupMoveDelele == true"
        :popupData="ishowPopupMoveDelele"
        @closeAddPopup="ishowPopupMoveDelele = $event"
      />
    </transition>
    <!--Popup Main Script Mobile-->
    <transition name="popup">
      <app-popup-main-script
        v-if="ishowPopupMainScript == true"
        :data-theme="currentTheme"
        :popupData="ishowPopupMainScript"
        @close="ishowPopupMainScript = $event"
      />
    </transition>
  </div>
</template>

<script type="text/javascript" src="./left_sidebar_mobile.script.js"></script>

<style scoped lang="scss">
@import "./left_sidebar_mobile.style";
</style>
