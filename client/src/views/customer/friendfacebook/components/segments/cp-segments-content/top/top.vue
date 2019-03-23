<template>
  <div class="top d_flex" :data-theme="currentTheme">
    <div class="top--left d_flex">
      <div v-if="groupSelected" class="segment--name mr_1">
        <editable
          :value="groupInfo.name"
          @input="groupInfo.name = $event"
          placeholder="Nhập tên..."
          :target="groupInfo._id"
          type="groupFriend"
        ></editable>
      </div>
      <div class="segment--total">
        <span class="font_weight_bold">{{ selectedUIDs.length }} trong số</span>
        {{ users.length }} người
      </div>
    </div>
    <div class="top--right d_flex">
      <div class="action mr_2"
        v-if="selectedUIDs.length > 0"
        @click="showAddtoGrPopup"
      >Thêm vào nhóm</div>

      <div class="action mr_2" 
        @click="showDeleteFrPopup"
        v-if="groupSelected && selectedUIDs.length > 0"
      >Xóa</div>

      <div class="action mr_2">Xuất dữ liệu</div>

      <div class="action sequence--menu">
        <div
          class="btn--sequence"
          @click="showSequenceDropdown = !showSequenceDropdown"
          v-click-outside="closeSequenceDropdown"
        >
          Trình tự
          <icon-base
            class="ml_1"
            icon-name="icon-arrow-down"
            width="14"
            height="14"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="dropdown" v-show="showSequenceDropdown">
          <div class="dropdown--item">Subcribe to Sequence</div>
          <div class="dropdown--item">Unsubcribe from Sequence</div>
        </div>
      </div>
    </div>
    
    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-friends-popup
        v-if="isShowDeleteFrPopup == true"
        :data-theme="currentTheme"
        title="Xoá bạn bè khỏi nhóm"
        :isShowDeletePopup="isShowDeleteFrPopup"
        @closeAddPopup="isShowDeleteFrPopup = $event"
        type="friends"
      />
      <addto-group-popup
        v-if="isShowAddtoGrPopup == true"
        :data-theme="currentTheme"
        :isShowDeleteFrPopup="isShowAddtoGrPopup"
        @closeAddPopup="isShowAddtoGrPopup = $event"
      />
    </transition>
  </div>
</template>

<script src="./top.js"></script>

<style lang="scss" scoped>
@import "./top"
</style>
