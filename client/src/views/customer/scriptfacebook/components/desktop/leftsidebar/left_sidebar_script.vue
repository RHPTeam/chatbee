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
        <div
          :class="[index === currentIndexGroupItemButton ? 'active' : '']"
          class="action"
          @click="openActionItemDropdown(index)"
        >
          <div class="action--icon">
            <icon-base
              class="icon"
              icon-name="loading"
              width="28"
              height="28"
              viewBox="0 0 30 30"
            >
              <icon-loading />
            </icon-base>
          </div>
          <div
            class="dropdown--menu dropdown--menu-left flipInY animated action--item"
            :class="[index === currentIndexActionItemDropdown ? 'show' : '']"
          >
            <div class="dropdown--menu-content">
              <div class="dropdown--menu-item">
                <div>Sao chép</div>
                <div>
                  Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không
                  được sao chép sang các phiên bản được sao chép
                </div>
              </div>
              <div class="dropdown--menu-item" @click="deleteGroup(group._id)">
                Xóa
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--------------Group Name Scripts------------->
      <div class="scripts--group r no_g justify_content_between">
        <div
          class="script--item c_xl_4 c_lg_6 c_md_12 mb_3 text_center position_relative"
          v-for="(block, index) in group.blocks"
          :key="index"
        >
          <span class="script--item-name" @click="showBlock(block._id)">{{block.name}}</span>
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
    <!--------------Start: Sequence Name Scripts------------->
    <div
      class="type--script--item group--item group--sequence"
      v-for="(sequence, index) in getSequence"
      :key="index"
      @mouseover="showActionGroupItem(index)"
    >
      <!------------------Item Type---------------------->
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
          :value="sequence.name"
          @input="sequence.name = $event"
          placeholder="Nhập tên..."
        ></editable>
        <div
          :class="[index === currentIndexGroupItemButton ? 'active' : '']"
          class="action"
          @click="openActionItemDropdown(index)"
        >
          <div class="action--icon">
            <icon-base
              class="icon"
              icon-name="loading"
              width="28"
              height="28"
              viewBox="0 0 30 30"
            >
              <icon-loading />
            </icon-base>
          </div>
          <div
            class="dropdown--menu dropdown--menu-left flipInY animated action--item"
            :class="[index === currentIndexActionItemDropdown ? 'show' : '']"
          >
            <div class="dropdown--menu-content">
              <div class="dropdown--menu-item">
                <div>Sao chép</div>
                <div>
                  Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không
                  được sao chép sang các phiên bản được sao chép
                </div>
              </div>
              <div class="dropdown--menu-item">
                Xóa
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--------------Group Name Scripts--------------------->
      <div class="scripts--group r no_g justify_content_between">
        <div
          class="script--item d_flex align_items_center mb_3 text_center position_relative"
        >
          <div
            class="item mr_1"
            @click="showActionSequence = !showActionSequence"
          >
            After 1 day
          </div>
          <!--Popup choose option time-->
          <!--v-click-outside="closeActionSequence"-->
          <div
            class="popup--time border--popup position_absolute text_left p_2"
            v-if="showActionSequence == true"
          >
            <div class="header mb_1">send in</div>
            <!--time on popup-->
            <div class="body d_flex align_items_center text_center mb_1">
              <div class="number item item--popup mr_1">1</div>
              <div
                class="item item--popup d_flex align_items_center"
                v-click-outside="closeOptionSequence"
                @click="showOptionSequence = !showOptionSequence"
              >
                <div>Days</div>
                <div class="action ml_auto">
                  <icon-base
                    icon-name="dropdown"
                    width="18"
                    height="18"
                    viewBox="0 0 25 25"
                  >
                    <icon-drop-down />
                  </icon-base>
                </div>
              </div>
              <!--action when click days-->
              <div
                class="option--send border--popup text_left position_absolute"
                v-if="showOptionSequence == true"
              >
                <div class="option--time">Days</div>
                <div class="option--time">Everyday</div>
                <div class="option--time">Everyweek</div>
                <div class="option--time">Everymonth</div>
              </div>
            </div>
            <p class="m_0">Theo dõi chiến dịch</p>
            <p class="m_0">Theo dõi khác</p>
          </div>
          <div class="item item--info text_left">Welcome</div>
        </div>
        <!--Add item block sequences-->
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
              <icon-plus />
            </icon-base>
          </span>
        </div>
      </div>
    </div>
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
