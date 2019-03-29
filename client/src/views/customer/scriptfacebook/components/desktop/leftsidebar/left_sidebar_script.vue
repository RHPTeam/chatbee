<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <div class="sidebar-scripts group py_3">
    <!-- Start: Group Component -->
    <loading-component v-if="this.$store.getters.statusBlocks === 'loading'"/>
    <div
      v-else
      v-for="(group, index) in groupBlock"
      :key="index"
      class="type-script--item group--item"
      @mouseover="showActionGroupItem(index)"
    >
      <!-- Item Type -->
      <div class="type-script--name d_flex mb_2 align_items_center">
        <div class="type-script--icon d_flex align_items_center">
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
        <editable
          class="script--edit-name"
          :value="group.name"
          @input="group.name = $event"
          :target="group._id"
          type="namegroupblock"
          placeholder="Nhập tên..."
        ></editable>
        <d-group-script :group="group" type="groupblock" />
      </div>
      <!-- Group Name Scripts -->
      <div class="scripts--group r no_g align_items_center">
        <div
          class="script--item c_xl_4 c_lg_6 c_md_12 mb_3 text_center position_relative"
          v-for="(block, index) in group.blocks"
          :key="`b-${index}`"
        >
          <span
            class="script--item-name d_flex flex_row align_items_center position_relative"
            @click="showBlock(block._id)"
          >
            <span>{{ block.name }}</span>
          </span>
          <d-script class="action--block position_absolute" :block="block"/>
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
              <icon-plus/>
            </icon-base>
          </span>
        </div>
      </div>
    </div>
    <!-- End: Group Component -->
    <!--Start: Sequence Name Scripts -->

    <loading-component v-if="this.$store.getters.statusItemSqc === 'loading'"/>
    <div
      v-else
      class="type--script--item group--item group--sequence"
      v-for="(sequence, index) in groupSequence"
      :key="`s-${index}`"
    >
      <!--Item Type-->
      <div class="type-script--name d_flex mb_2 align_items_center">
        <div class="type-script--icon d_flex align_items_center">
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
        <editable
          class="script--edit-name"
          :value="sequence.name"
          @input="sequence.name = $event"
          :target="sequence._id"
          type="namesequence"
          placeholder="Nhập tên..."
        ></editable>
        <d-group-script :group="sequence" type="sequence" />
      </div>
      <!--Group Name Scripts-->

      <div class="scripts--group r no_g justify_content_between">
        <div
          v-for="(item, index) in sequence.sequences"
          :key="index"
          class="script--item d_flex align_items_center c_xl_12 c_lg_12 c_md_12 mb_3 text_center position_relative"
        >
          <p-time class="item item--left" :id="sequence._id" :item="item" :data-theme="currentTheme"/>
          <div
            class="item item--info text_left ml_3"
            @click="showItemSqc(item._block._id)"
          >{{ item._block.name }}</div>
        </div>
        <!--Add item block sequences-->
        <div
          class="script--item script--item-add c_xl_12 c_lg_12 c_md_12 mb_3 text-center"
          @click="createItemSqc(sequence._id)"
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
    <!--End: Sequence Name Scripts-->

    <!-- Start: Create Sequence or Group -->
    <div
      class="group--item add"
      @click="isAddTypeDropdown = !isAddTypeDropdown"
      v-click-outside="closeAddTypeDropdown"
    >
      <div class="group--item-name d_flex align_items_center">
        <icon-base class="icon--add" icon-name="plus" width="9" height="9" viewBox="0 0 60 60">
          <icon-plus/>
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
          <div class="dropdown--menu-item" @click="createSequence">Trình tự</div>
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
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
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
  margin-top: 2rem;
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
