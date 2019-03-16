<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <div class="sidebar-scripts group py_3">
    <!-- Start: Group Component -->
    <div
      v-for="(group, index) in groupBlock"
      :key="index"
      class="type-script--item group--item"
      @mouseover="showActionGroupItem(index)"
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
        <editable
          class="script--edit-name"
          :value="group.name"
          @input="group.name = $event"
          placeholder="Nhập tên..."
        ></editable>
        <dropdown-script />
      </div>
      <!--------------Group Name Scripts------------->
      <div class="scripts--group r no_g justify_content_between">
        <div
          class="script--item c_xl_4 c_lg_6 c_md_12 mb_3 text_center position_relative"
          v-for="(block, index) in group.blocks"
          :key="index"
        >
          <span class="script--item-name" @click="showBlock(block._id)">{{
            block.name
          }}</span>
          <!--Start: Icon action-->
          <div
            class="script--icon position_absolute"
            @click.prevent="showItemAction = !showItemAction"
          >
            <icon-base
              class="icon"
              icon-name="more"
              width="20"
              height="20"
              viewBox="0 0 780 780"
            >
              <icon-more />
            </icon-base>
          </div>
          <!--End: Icon action-->
          <!--Start: Action item-->
          <div
            class="option position_absolute text_left"
            v-if="showItemAction == true"
          >
            <div class="option--item">Copy ...</div>
            <div class="option--item">Move ...</div>
            <div class="option--item action--danger">Delete ...</div>
          </div>
          <!--Start: Action item-->
        </div>
        <div
          class="script--item script--item-add c_xl_4 c_lg_6 c_md_12 mb_3 text-center"
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
    <!-- End: Group Component -->

    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;Start: Sequence Name Scripts-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--<div-->
    <!--class="type&#45;&#45;script&#45;&#45;item group&#45;&#45;item group&#45;&#45;sequence"-->
    <!--v-for="(sequence, index) in groupSequence"-->
    <!--:key="index"-->
    <!--@mouseover="showActionGroupItem(index)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;Item Type&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--<div class="type-script&#45;&#45;name d_flex mb_2 align_items_center">-->
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
    <!--<editable-->
    <!--class="script&#45;&#45;edit-name"-->
    <!--:value="sequence.name"-->
    <!--@input="sequence.name = $event"-->
    <!--placeholder="Nhập tên..."-->
    <!--&gt;</editable>-->
    <!--<div-->
    <!--:class="[index === currentIndexGroupItemButton ? 'active' : '']"-->
    <!--class="action"-->
    <!--@click="openActionItemDropdown(index)"-->
    <!--&gt;-->
    <!--<div class="action&#45;&#45;icon">-->
    <!--<icon-base-->
    <!--class="icon"-->
    <!--icon-name="loading"-->
    <!--width="28"-->
    <!--height="28"-->
    <!--viewBox="0 0 30 30"-->
    <!--&gt;-->
    <!--<icon-loading />-->
    <!--</icon-base>-->
    <!--</div>-->
    <!--<div-->
    <!--class="dropdown&#45;&#45;menu dropdown&#45;&#45;menu-left flipInY animated action&#45;&#45;item"-->
    <!--:class="[index === currentIndexActionItemDropdown ? 'show' : '']"-->
    <!--&gt;-->
    <!--<div class="dropdown&#45;&#45;menu-content">-->
    <!--<div class="dropdown&#45;&#45;menu-item">-->
    <!--<div>Sao chép</div>-->
    <!--<div>-->
    <!--Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không-->
    <!--được sao chép sang các phiên bản được sao chép-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="dropdown&#45;&#45;menu-item">-->
    <!--Xóa-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;Group Name Scripts-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
    <!--<div class="scripts&#45;&#45;group r no_g justify_content_between">-->
    <!--<div-->
    <!--v-for="(item, key) in sequence.sequences"-->
    <!--:key="key"-->
    <!--class="script&#45;&#45;item d_flex align_items_center mb_3 text_center position_relative"-->
    <!--&gt;-->
    <!--<div-->
    <!--class="item mr_1"-->
    <!--@click="showActionSequence = !showActionSequence"-->
    <!--&gt;-->
    <!--After 1 day-->
    <!--</div>-->
    <!--&lt;!&ndash;v-click-outside="closeActionSequence"&ndash;&gt;-->
    <!--&lt;!&ndash;Start: Popup choose option time&ndash;&gt;-->
    <!--<div-->
    <!--class="popup&#45;&#45;time border&#45;&#45;popup position_absolute text_left p_2"-->
    <!--v-if="showActionSequence == true"-->
    <!--&gt;-->
    <!--<div class="header mb_1">send in</div>-->
    <!--&lt;!&ndash;time on popup&ndash;&gt;-->
    <!--<div class="body d_flex align_items_center text_center mb_1">-->
    <!--<div class="number item item&#45;&#45;popup mr_1">1</div>-->
    <!--<div-->
    <!--class="item item&#45;&#45;popup d_flex align_items_center"-->
    <!--v-click-outside="closeOptionSequence"-->
    <!--@click="showOptionSequence = !showOptionSequence"-->
    <!--&gt;-->
    <!--<div>Days</div>-->
    <!--<div class="action ml_auto">-->
    <!--<icon-base-->
    <!--icon-name="dropdown"-->
    <!--width="18"-->
    <!--height="18"-->
    <!--viewBox="0 0 25 25"-->
    <!--&gt;-->
    <!--<icon-drop-down />-->
    <!--</icon-base>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;action when click days&ndash;&gt;-->
    <!--<div-->
    <!--class="option&#45;&#45;send border&#45;&#45;popup text_left position_absolute"-->
    <!--v-if="showOptionSequence == true"-->
    <!--&gt;-->
    <!--<div class="option&#45;&#45;time">Days</div>-->
    <!--<div class="option&#45;&#45;time">Everyday</div>-->
    <!--<div class="option&#45;&#45;time">Everyweek</div>-->
    <!--<div class="option&#45;&#45;time">Everymonth</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<p class="m_0">Theo dõi chiến dịch</p>-->
    <!--<p class="m_0">Theo dõi khác</p>-->
    <!--</div>-->
    <!--&lt;!&ndash;End: Popup choose option time&ndash;&gt;-->
    <!--<div-->
    <!--class="item item&#45;&#45;info text_left"-->
    <!--@click="showBlock(item._block._id)"-->
    <!--&gt;-->
    <!--{{ item._block.name }}-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; Delete sequence &ndash;&gt;-->
    <!--<div>-->
    <!--<button class="btn btn_danger" @click="deleteSequence(sequence._id)">Delete</button>-->
    <!--</div>-->
    <!--&lt;!&ndash; End delete sequence &ndash;&gt;-->
    <!--&lt;!&ndash;Add item block sequences&ndash;&gt;-->
    <!--<div-->
    <!--class="script&#45;&#45;item script&#45;&#45;item-add c_xl_4 c_lg_6 c_md_12 mb_3 text-center"-->
    <!--@click="createItemSequence(sequence._id)"-->
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
    <!--------------End: Sequence Name Scripts------------->
    <!-- Start: Create Sequence or Group -->
    <div
      class="group--item add"
      @click="isAddTypeDropdown = !isAddTypeDropdown"
      v-click-outside="closeAddTypeDropdown"
    >
      <div class="group--item-name d_flex align_items_center">
        <icon-base
          class="icon--add"
          icon-name="plus"
          width="9"
          height="9"
          viewBox="0 0 60 60"
        >
          <icon-plus />
        </icon-base>
        <span class="ml_3">Thêm trình tự hoặc nhóm</span>
      </div>
      <div
        class="dropdown--menu dropdown--menu-left flipInY animated type"
        :class="{ show: isAddTypeDropdown }"
      >
        <span class="with--arrow">
          <span class="bg_light"></span>
        </span>
        <div class="dropdown--menu-content">
          <div class="dropdown--menu-item" @click="createSequence">
            Trình tự
          </div>
          <div class="dropdown--menu-item" @click="createGroup">Nhóm</div>
        </div>
      </div>
    </div>
    <!--End: Create Sequence or Group-->
  </div>
</template>
<script src="./left_sidebar.script.js"></script>
<style scoped lang="scss">
@import "./left_sidebar.style";
.group--item {
  cursor: pointer;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
  .dropdown--menu {
    background-clip: padding-box;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    color: #3e5569;
    display: none;
    font-size: 0.875rem;
    margin: 0.125rem 0 0;
    position: absolute;
    text-align: left;
    top: 100%;
    z-index: 99;
    &.type {
      text-align: center;
      width: 150px;
    }
    &.show {
      display: block;
    }
    &.dropdown--menu-left {
      left: 20px;
      right: auto;
      top: 25px;
      .with--arrow {
        left: 0;
        > span {
          left: 20px;
          right: 0;
        }
      }
    }
    .with--arrow {
      height: 10px;
      position: absolute;
      top: -10px;
      width: 40px;
      > span {
        border-radius: 6px 0 0;
        content: "";
        height: 15px;
        position: absolute;
        transform: rotate(45deg);
        top: 3px;
        width: 15px;
      }
    }
    &-item {
      font-weight: 700;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f2f1f1;
    }
    &-item:last-child {
      border-bottom: 0;
    }
    &-item:hover,
    &-item:focus,
    &-item:active {
      background-color: #f9f8f8;
    }
    &.animated {
      animation-duration: 1s;
      animation-fill-mode: both;
    }
    &.flipInY {
      backface-visibility: visible !important;
      animation-name: flipInY;
    }
    @keyframes flipInY {
      from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
      }
      40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
      }
      60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
      }
      80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      }
      to {
        transform: perspective(400px);
      }
    }
  }
  .action {
    display: none;
    position: relative;
    transition: 0.5s ease-in;
    &.active {
      display: block;
    }
    .action--item {
      left: 0;
      width: 250px;
      .dropdown--menu-item {
        padding: 0.75rem 1.25rem;
        text-transform: capitalize;
        &:first-child div:nth-child(2) {
          font-weight: 500;
          margin-top: 0.25rem;
          font-size: 0.75rem;
        }
        &:last-child {
          color: #f43c3c;
        }
      }
    }
  }
}
.group--item.add {
  position: relative;
  .group--item-name {
    > span {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
</style>
