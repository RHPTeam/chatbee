<template>
  <div class="users--table mt_3" :data-theme="currentTheme">
    <!-- User Table Header -->
    <div class="user--table-item header">
      <div class="checkbox">
        <span class="checkbox--control">
          <input
            type="checkbox"
            class="checkbox--control-input"
            v-model="selectAll"
          />
          <span class="checkbox--control-checkmark"></span>
        </span>
      </div>
      <div class="name">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[0], 0)"
          :class="[
            isSort[0].asc === true || isSort[0].desc === true ? 'active' : ''
          ]"
          >Tên
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc == false && isSort[0].desc == false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[0].desc"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="gender">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
          >Giới tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc == false && isSort[1].desc == false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[1].desc"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="pronoun">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[2], 2)"
          :class="[
            isSort[2].asc === true || isSort[2].desc === true ? 'active' : ''
          ]"
          >Danh xưng
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc == false && isSort[2].desc == false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[2].desc"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="updated-date">
        <span
          class="sort"
          @click="sortUsersByProperty(isSort[3], 3)"
          :class="[
            isSort[3].asc === true || isSort[3].desc === true ? 'active' : ''
          ]"
          >Xem lần cuối
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc == false && isSort[3].desc == false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
            v-if="isSort[3].desc"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="attributes">
        <span class="sort"
          >Thuộc tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
      <div class="status">
        <span class="sort"
          >Trạng thái
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
    </div>
    <!-- End User Table Header -->

    <!--Start: Loading Component-->
    <loading-component
      class="friend text_center pt_3"
      v-if="this.$store.getters.friendsStatus === 'loading'"
    />
    <!--End: Loading Component-->

    <div v-else>
      <!-- User Table Items Of Group -->
      <loading-component
        v-if="this.$store.getters.friendsStatus === 'loading'"
      />
      <div v-else>
        <div v-if="groupSelected === true">
          <div
            class="user--table-item record"
            v-for="user in filteredUsersOfGroup"
            :key="user.id"
          >
            <div class="checkbox">
              <span class="checkbox--control">
                <input
                  type="checkbox"
                  class="checkbox--control-input"
                  v-model="selectedUIDs"
                  :value="user._id"
                />
                <span class="checkbox--control-checkmark"></span>
              </span>
            </div>
            <div class="name">
              <div class="name--avatar mr_2">
                <img
                  :src="user.profilePicture"
                  alt="ảnh đại diện"
                  width="32px"
                  height="32px"
                />
              </div>
              <div class="name--text">
                <span class="btn--action">{{ user.fullName }}</span>
              </div>
            </div>
            <div class="gender">
              <span class="btn--action">{{ showGender(user.gender) }}</span>
            </div>
            <div class="pronoun">
              <span class="btn--action" @click="showPronounPopup(user._id)">
                <!-- {{ user.vocate | upperCaseFirstLetter }} -->
                Chưa thiết lập
              </span>
            </div>
            <div class="updated-date">
              <span class="btn--action">{{
                user.updated_at | covertDateUpdatedAt
              }}</span>
            </div>
            <div class="attributes">
              <span class="btn--action">None</span>
            </div>
            <div class="status">
              <span class="btn--action">None</span>
            </div>
          </div>
        </div>
      </div>
      <!-- User Table Items of All -->
      <div v-if="groupSelected == false">
        <div
          class="user--table-item record"
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <div class="checkbox">
            <span class="checkbox--control">
              <input
                type="checkbox"
                class="checkbox--control-input"
                v-model="selectedUIDs"
                :value="user._id"
              />
              <span class="checkbox--control-checkmark"></span>
            </span>
          </div>
          <div class="name">
            <div class="name--avatar mr_2">
              <img
                :src="user.profilePicture"
                alt="ảnh đại diện"
                width="32px"
                height="32px"
              />
            </div>
            <div class="name--text">
              <span class="btn--action">{{ user.fullName }}</span>
            </div>
          </div>
          <div class="gender">
            <span class="btn--action">{{ showGender(user.gender) }}</span>
          </div>
          <div class="pronoun">
            <span class="btn--action" @click="showPronounPopup(user._id)">
              {{ user.vocate | upperCaseFirstLetter }}
            </span>
          </div>
          <div class="updated-date">
            <span class="btn--action">{{
              user.updated_at | covertDateUpdatedAt
            }}</span>
          </div>
          <div class="attributes">
            <span class="btn--action">None</span>
          </div>
          <div class="status">
            <span class="btn--action">None</span>
          </div>
        </div>
      </div>
    </div>
    <!--Start: Pagination-->
    <pagination
      :total-pages="totalPage"
      :total="users.length"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
    <!--End: Pagination-->
    <!--*********** POPUP *************-->
    <transition name="popup">
      <pronoun-popup
        v-if="isShowPronounPopup == true"
        :data-theme="currentTheme"
        :isShowPronounPopup="isShowPronounPopup"
        :userID="userID"
        @closeAddPopup="isShowPronounPopup = $event"
      />
    </transition>
  </div>
  <!--  -->
</template>

<script src="./users-table.script.js"></script>

<style lang="scss" scoped>
@import "./users-table.style";
</style>
