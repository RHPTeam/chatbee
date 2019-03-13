<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <!-----------List Type Script--------------->
  <div class="sidebar-scripts p_3 ">
    <!---------- Type Script Group------------>
    <div
      v-for="(group, index) in groupBlock"
      :key="index"
      class="type-script--item"
    >
      <!------------Item Type-------------->
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

        <span contenteditable="true">
          {{ group.name }}
        </span>
      </div>
      <!--------------Group Name Scripts------------->
      <div class="scripts--group r no_g justify_content_between">
        <div
          class="script--item c_xl_4 c_lg_6 c_md_12 mb_3 text_center"
          v-for="(block, index) in group.blocks"
          :key="index"
        >
          <span class="script--item-name" @click="showBlock(block._id)">{{ block.name }}</span>
        </div>
        <div
          class="script--item script--item-add c_xl_4 c_lg_6 c_md_12 mb_3 text-center" @click="createBlock(group._id)"
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
    <!----------Type Script Sequence---------->
    <!--<div-->
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
    <!--<span class="script&#45;&#45;item-name">{{ item_script.name }}</span>-->
    <!--</div>-->
    <!--<div-->
    <!--class="script&#45;&#45;item script&#45;&#45;item-add c_xl_4 c_lg_6 c_md_12 mb_3  text-center"-->
    <!--&gt;-->
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
    <!----------Elm Create new Type----------->
    <!--<div class="type-script&#45;&#45;add">-->
    <!--<div class=" d_flex align_items_center" @click="isShowGroup = true">-->
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
  </div>
</template>

<script type="text/javascript" src="./left_sidebar.script.js"></script>

<style scoped lang="scss">
@import "./left_sidebar.style";
</style>
