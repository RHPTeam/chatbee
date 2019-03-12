<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <!--List Type Script -->
  <div class="type-scripts--group p_3">
    <div
      v-for="(item_type_script, index) in list_type_script"
      :key="index"
      class="type-script--item"
      :class="{
        'type-script--close': list_type_script[index].list_script.length === 0,
        'type-group': list_type_script[index].type === 'group',
        'type-sequence': list_type_script[index].type === 'sequence'
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
            <icon-sort-down/>
          </icon-base>
        </div>

        <span contenteditable="true">
          {{ item_type_script.title }}
        </span>
      </div>
      <!--Group Name Scripts-->
      <div class="scripts--group r no_g justify_content_between">
        <div
          v-for="(item_script, index) in item_type_script.list_script"
          :key="index"
          class="script--item c_xl_4 c_lg_6 c_md_12 mb_3 text_center"
        >
          <span>{{ item_script.name }}</span>
        </div>
        <div
          class="script--item script--item-add c_xl_4 c_lg_6 c_md_12 mb_3 text-center"
        >
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </span>
        </div>
      </div>
    </div>
    <div
      v-for="(item_type_script_sequence, index) in list_type_script_sequence"
      :key="index"
      class="type-script--item"
      :class="{
        'type-script--group': list_type_script_sequence[index].type === 'group',
        'type-script--sequence':
          list_type_script_sequence[index].type === 'sequence'
      }"
    >
      <!--Item Type-->
      <div
        class="type-script--name d_flex align_items_center"
        @click="hideGroup(index)"
      >
        <div
          class="type-script--icon d_flex align_items_center"
        >
          <icon-base
            icon-name="icon-sort-down"
            class="icon-sort-down"
            width="9.431"
            height="5.506"
            viewBox="0 0 9.431 5.506"
          >
            <icon-sort-down/>
          </icon-base>
        </div>

        <span contenteditable="true">{{
          item_type_script_sequence.title
        }}</span>
      </div>
      <!--Group Name Scripts-->
      <div class="scripts--group r no_g justify_content_between">
        <div
          v-for="(item_script, index) in item_type_script_sequence.list_script"
          :key="index"
          class="script--item  c_12 d_flex align_items_center mb_3 text_center"
        >
          <div class="script--item-timer mr_3 position_relative ">
            <span @click="showDatePopup(index)">After 1 days</span>
            <div
              class="datetime-popup position_absolute p_2"
              :class="[index==currentIndex? 'active': '']"
            >
              <p class="text_left mb_2">Send in</p>
              <div class="d_flex align_items_center ">
                <span contenteditable="true"> 1 </span>
                <div class="position_relative">
                  <span class="type-datetime">Days</span>
                  <ul class="m_0 p_2 position_absolute ">
                    <li>Immediately</li>
                    <li>Seconds</li>
                    <li>Hours</li>
                    <li>Days</li>
                    <li>Off</li>
                  </ul>
                </div>

              </div>
              <p>after subscription to this sequence</p>
              <p>after previous block</p>
            </div>
          </div>
          <span>{{ item_script.name }}</span>
        </div>
        <div
          class="script--item script--item-add c_xl_4 c_lg_6 c_md_12 mb_3  text-center"
        >
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </span>
        </div>
      </div>
    </div>

    <!--Elm Create new Type -->
    <div class="type-script--add">
      <div class=" d_flex align_items_center" @click="iscollapsed ^= true">
        <icon-base
          class="icon--add"
          icon-name="plus"
          width="9"
          height="9"
          viewBox="0 0 60 60"
        >
          <icon-plus/>
        </icon-base>
        Thêm nhóm mới
      </div>
      <ul class="list_group" :class="{ active: iscollapsed }">
        <li class="p_2">Sequence</li>
        <li class="p_2">Group</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript" src="./left_sidebar.script.js"></script>

<style scoped lang="scss">
@import "./left_sidebar.style";
</style>
