<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Thêm vào nhóm</div>
        </div>
        <div class="modal--body mt_3">
          <VuePerfectScrollbar class="scroll" id="groupListScroll">
            <div class="group--list px_2">
              <div
                class="group--list-item d_flex align_items_center"
                v-for="(item, index) in groupFriend"
                :key="index"
              >
                <div class="checkbox mr_3">
                  <span class="checkbox--control">
                    <input
                      type="checkbox"
                      class="checkbox--control-input"
                      v-model="selectedGroups"
                      :value="item._id"
                    />
                    <span class="checkbox--control-checkmark"></span>
                  </span>
                </div>
                <div class="text">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </VuePerfectScrollbar>
          <div class="group--create mt_2">
            <div class="btn--create py_2" 
                @click="showCreateGroup"
                v-if="isShowBtnCreate">
              <icon-base
                class="icon--add mr_2"
                icon-name="plus"
                width="14"
                height="14"
                viewBox="0 0 60 60"
              >
                <icon-plus /> </icon-base
              >Tạo nhóm mới
            </div>
            <div class="group--create-input d_flex align_items_center" 
                  v-if="isShowCreateGroup">
              <input 
                type="text" 
                placeholder="Nhập tên nhóm và ấn enter"
                v-model="newGroup"
                ref="newGroup"
                @keyup.enter="createGroup">
              <div class="btn--cancel" @click="cancelCreateGroup">
                <icon-base
                  class="icon--cancel"
                  icon-name="plus"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                >
                  <icon-cancel /> </icon-base
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit" @click="addFriendsToGroup">
            LƯU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./addto-group-popup.script"></script>

<style lang="scss" scoped>
@import "../popup";
@import "./addto-group-popup.style"
</style>
