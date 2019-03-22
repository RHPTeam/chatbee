<template>
  <div class="main--mobile" :data-theme="currentTheme">
    <div class="friend--list">
      <div class="friend--list-title p_3 text_left">Danh sách bạn bè ({{users.length}})</div>
      <div class="friend--item pt_2 pb_2 pl_3 pr_3 mb_1 d_flex justify_content_start align_items_center text_left position_relative" v-for="user in users" :key="user.id" @click="openPopupInfo(user)">
        <div class="user--img">
          <img
            :src="user.profilePicture"
            width="40"
            alt="User Avatar"
          >
        </div>
        <div class="user--info">
          <div class="user--info-name">{{ user.fullName }}</div>
          <div class="user--info-lastseen">{{user.updated_at | covertDateUpdatedAt}}</div>
        </div>        
      </div>
    </div>
    <transition name="popup">
      <user-info
        v-if="showInfo == true"
        :user="userSelectInfo"
        @closeAddInfo="showInfo = $event"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="showInfo == true"
        class="backdrop position_fixed"
      ></div>
    </transition>
  </div>
</template>
<script>
import UserInfo from "./cp_mobile/dialog-info";
export default {
  data() {
    return {
      showInfo: false,
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
     users() {
      return this.$store.getters.allFriends;
    },
  },
  filters: {
    covertDateUpdatedAt(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = minutes + "0";
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  },
  components: {
    UserInfo
  },
  methods: {
     openPopupInfo(user) {
      this.showInfo = true;
      this.userSelectInfo = user;
      console.log(user)
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
