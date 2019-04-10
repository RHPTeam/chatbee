<template>
  <div class="top d_flex" :data-theme="currentTheme">
    <!--Start: Top Left Component-->
    <div class="top--left d_flex">
      <div v-if="groupSelected" class="segment--name mr_1">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Nhập tên..."
          :contenteditable="true"
          v-model="groupInfo.name"
          @keyup="upTypingText('groupfriend', groupInfo)"
          @keydown="clear"
        />
      </div>
      <div class="segment--total">
        <span class="font_weight_bold">{{ selectedUIDs.length }} trong số</span>
        {{ users.length }} người
      </div>
      <div class="segment--search ml_3">
        <input
          type="text"
          placeholder="Tìm kiếm bạn bè..."
          v-model="search"
          @input="updateSearch"
        />
      </div>
    </div>
    <!--End: Top Left Component-->
    <!--Start: Top Right Component-->
    <div class="top--right d_flex">
      <!--Start: Add Member to Group Component-->
      <div
        class="action mr_2"
        v-if="selectedUIDs.length > 0"
        @click="showAddtoGrPopup"
      >
        Thêm vào nhóm
      </div>
      <!--End: Add Member to Group Component-->
      <!--Start: Delete Member in Group Component-->
      <div
        class="action mr_2"
        @click="showDeleteFrPopup"
        v-if="groupSelected && selectedUIDs.length > 0"
      >
        Xóa
      </div>
      <!--End: Delete Member in Group Component-->
      <!--Start: Export Data Component-->
      <div class="action export disabled position_relative mr_2">
        Xuất dữ liệu
        <div class="action--tooltip">
          <app-tooltip />
        </div>
      </div>
      <!--End: Export Data Component-->
      <!--Start: Filter Friend By Account Component-->
      <div class="action sequence--menu mr_2">
        <div
          class="btn--sequence"
          @click="showSequenceDropdown = !showSequenceDropdown"
          v-click-outside="closeSequenceDropdown"
        >
          {{ accountSelected.name }}
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
        <div class="dropdown text_left" v-show="showSequenceDropdown">
          <div class="dropdown--item px_3" @click="updateAccountSelected('all', 'Tất cả')">Tất cả</div>
          <div class="dropdown--item px_3" 
                v-for="(account, index) in listAccountFacebook" 
                :key="`a-${index}`"
                @click="updateAccountSelected(account._id, account.userInfo.name)"
          >{{ account.userInfo.name }}</div>
        </div>
      </div>
      <!--End: Filter Friend By Account Component-->
      <!--Start: Number Displayed of Member Component-->
<!--      <div class="action sequence&#45;&#45;menu">-->
<!--        <div class="btn&#45;&#45;sequence" @click="statusNumberDisplayedDropdown = !statusNumberDisplayedDropdown"-->
<!--             v-click-outside="closeNumberDisplayedDropdown">-->
<!--          5-->
<!--          <icon-base-->
<!--            class="ml_1"-->
<!--            icon-name="icon-arrow-down"-->
<!--            width="14"-->
<!--            height="14"-->
<!--            viewBox="0 0 160 160"-->
<!--          >-->
<!--            <icon-arrow-down />-->
<!--          </icon-base>-->
<!--        </div>-->
<!--        <div class="dropdown text_left" v-show="statusNumberDisplayedDropdown">-->
<!--          <div class="dropdown&#45;&#45;item px_3">Tất cả</div>-->
<!--          <div class="dropdown&#45;&#45;item px_3">05</div>-->
<!--          <div class="dropdown&#45;&#45;item px_3">15</div>-->
<!--        </div>-->
<!--      </div>-->
      <!--End: Number Displayed of Member Component-->
    </div>
    <!--End: Top Right Component-->

    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-friends-popup
        v-if="isShowDeleteFrPopup == true"
        :data-theme="currentTheme"
        title="Xoá bạn bè khỏi nhóm"
        :isShowDeletePopup="isShowDeleteFrPopup"
        @closeAddPopup="isShowDeleteFrPopup = $event"
        :groupTarget="groupInfo"
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

<script src="./top.script.js"></script>

<style lang="scss" scoped>
@import "./top.style";
</style>
