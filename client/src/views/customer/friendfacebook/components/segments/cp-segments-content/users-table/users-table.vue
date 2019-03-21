<template>
  <div class="users--table mt_3" :data-theme="currentTheme">
    <div>{{ selectedUIDs }}</div>
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
        <span class="sort"
          >Name
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
      <div class="updated-date">
        <span class="sort active"
          >Last seen
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
      <div class="created-date">
        <span class="sort"
          >Sign up
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
      <div class="source">
        <span class="sort"
          >Source
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
      <div class="attributes">
        <span class="sort"
          >Attributes
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
          >Status
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
    <div v-if="groupSelected == true">
      <div class="user--table-item record" v-for="user in usersOfGroup" :key="user.id">
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
        <div class="updated-date">
          <span class="btn--action">{{ user.updated_at | covertDateUpdatedAt }}</span>
        </div>
        <div class="created-date">
          <span class="btn--action">{{ user.created_at | covertDateUpdatedAt }}</span>
        </div>
        <div class="source">
          <span class="btn--action">Beechat</span>
        </div>
        <div class="attributes">
          <span class="btn--action">None</span>
        </div>
        <div class="status">
          <span class="btn--action">None</span>
        </div>
      </div>
    </div>
    <div v-if="groupSelected == false">
      <div class="user--table-item record" v-for="user in users" :key="user.id">
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
        <div class="updated-date">
          <span class="btn--action">{{ user.updated_at | covertDateUpdatedAt }}</span>
        </div>
        <div class="created-date">
          <span class="btn--action">{{ user.created_at | covertDateUpdatedAt }}</span>
        </div>
        <div class="source">
          <span class="btn--action">Beechat</span>
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
</template>

<script src="./users-table.script.js"></script>

<style lang="scss" scoped>
@import "./users-table.style";
</style>
