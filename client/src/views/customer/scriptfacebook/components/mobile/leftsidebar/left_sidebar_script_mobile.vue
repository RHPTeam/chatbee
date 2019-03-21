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
    <!--<div-->
    <!--v-for="(item_type_script_sequence, index) in list_type_script_sequence"-->
    <!--:key="index"-->
    <!--class="type-script&#45;&#45;item"-->
    <!--:class="{-->
    <!--'type-script&#45;&#45;group': list_type_script_sequence[index].type === 'group',-->
    <!--'type-script&#45;&#45;sequence':-->
    <!--list_type_script_sequence[index].type === 'sequence'-->
    <!--}"-->
    <!--&gt;-->
    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;Item Type&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--<div-->
    <!--class="type-script&#45;&#45;name d_flex align_items_center"-->
    <!--@click="hideGroup(index)"-->
    <!--&gt;-->
    <!--<div class="type-script&#45;&#45;icon d_flex align_items_center">-->
    <!--<icon-base-->
    <!--icon-name="icon-sort-down"-->
    <!--class="icon-sort-down"-->
    <!--width="9.431"-->
    <!--height="5.506"-->
    <!--viewBox="0 0 9.431 5.506"-->
    <!--&gt;-->
    <!--<icon-sort-down />-->
    <!--</icon-base>-->
    <!--</div>-->
    <!--<span contenteditable="true">{{-->
    <!--item_type_script_sequence.title-->
    <!--}}</span>-->
    <!--</div>-->
    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;Group Name Scripts-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--<div class="scripts&#45;&#45;group r no_g justify_content_between">-->
    <!--<div-->
    <!--v-for="(item_script, index) in item_type_script_sequence.list_script"-->
    <!--:key="index"-->
    <!--class="script&#45;&#45;item  c_12 d_flex align_items_center mb_3 text_center"-->
    <!--&gt;-->
    <!--<div class="script&#45;&#45;item-time mr_3 position_relative ">-->
    <!--<span @click="showDatePopup(index)">After 1 days</span>-->
    <!--<div-->
    <!--class="time-popup position_absolute p_2"-->
    <!--:class="[index == currentIndex ? 'active' : '']"-->
    <!--&gt;-->
    <!--<p class="text_left mb_2">Send in</p>-->
    <!--<div class="gr-time d_flex align_items_center ">-->
    <!--<span contenteditable="true"> 1 </span>-->
    <!--<div class="type-time position_relative">-->
    <!--<span-->
    <!--class=" d_flex align_items_center"-->
    <!--@click="showSelectPopup(index)"-->
    <!--&gt;Days-->
    <!--<icon-base-->
    <!--icon-name="icon-sort-down"-->
    <!--class="icon-sort-down ml_2"-->
    <!--width="9.431"-->
    <!--height="5.506"-->
    <!--viewBox="0 0 9.431 5.506"-->
    <!--&gt;-->
    <!--<icon-sort-down />-->
    <!--</icon-base>-->
    <!--</span>-->
    <!--<ul-->
    <!--class="list-time text_left m_0 p_0 position_absolute "-->
    <!--:class="[index == currentSelectIndex ? 'active' : '']"-->
    <!--&gt;-->
    <!--<li>Immediately</li>-->
    <!--<li>Seconds</li>-->
    <!--<li>Hours</li>-->
    <!--<li>Days</li>-->
    <!--<li>Off</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--<p>after subscription to this sequence</p>-->
    <!--<p>after previous block</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<span>{{ item_script.name }}</span>-->
    <!--</div>-->
    <!--<div class="script&#45;&#45;item script&#45;&#45;item-add c_4 text-center">-->
    <!--<span>-->
    <!--<icon-base-->
    <!--class="icon&#45;&#45;add"-->
    <!--icon-name="plus"-->
    <!--width="16"-->
    <!--height="16"-->
    <!--viewBox="0 0 60 60"-->
    <!--&gt;-->
    <!--<icon-plus />-->
    <!--</icon-base>-->
    <!--</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!------------Elm add New Type------------->
    <!--<div class="type-script&#45;&#45;add">-->
    <!--<div class=" d_flex align_items_center" @click="isShowGroup ^= true">-->
    <!--<icon-base-->
    <!--class="icon&#45;&#45;add"-->
    <!--icon-name="plus"-->
    <!--width="9"-->
    <!--height="9"-->
    <!--viewBox="0 0 60 60"-->
    <!--&gt;-->
    <!--<icon-plus />-->
    <!--</icon-base>-->
    <!--Thêm nhóm mới-->
    <!--</div>-->
    <!--<ul class="list_group" :class="{ active: isShowGroup }">-->
    <!--<li class="p_2">Sequence</li>-->
    <!--<li class="p_2">Group</li>-->
    <!--</ul>-->
    <!--</div>-->

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
