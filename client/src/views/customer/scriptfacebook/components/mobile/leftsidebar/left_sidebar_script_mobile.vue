<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <!-------------List Type Script-------------->
  <div class="sidebar-scripts p_3">
    <!-----------Type Script Group------------->
    <div
      v-for="(group, index) in groupBlock"
      :key="index"
      class="type-script--item"
    >
      <!--------------Item Type----------------->
      <div class="type-script--name d_flex mb_2 align_items_center">
        <div class="type-script--icon d_flex align_items_center">
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
        <span>
          <span contenteditable="true" @click="ishowPopupMoveDelele = true">
            {{ group.name }}
          </span>
        </span>
        <!------------Icon Delele------------>
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

      <!------------Group Name Scripts---------->
      <div class="scripts--group  r no_g justify_content_between">
        <div
          v-for="(block, index) in group.blocks"
          :key="index"
          class="script--item c_4 mb_3 text_center"
          @click="ishowPopupMainScript = true"
        >
          <span @click="showBlock(block._id)">{{ block.name }}</span>
        </div>
        <div
          class="script--item script--item-add c_4 mb_3 text-center"
          @click="createBlock(group._id)"
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
    <!-----------Type Script Sequence---------->

    <!---------Popup Delete---------->
    <transition>
      <app-popup-delete
        name="popup-delete"
        v-if="ishowPopupDelele == true"
        :popupData="ishowPopupDelele"
        @closeAddPopup="ishowPopupDelele = $event"
      />
    </transition>
    <!--------Popup Move Delete-------->
    <transition>
      <app-popup-move-delete
        name="popup-move-delete"
        v-if="ishowPopupMoveDelele == true"
        :popupData="ishowPopupMoveDelele"
        @closeAddPopup="ishowPopupMoveDelele = $event"
      />
    </transition>
    <!------Popup Main Script Mobile------>
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
