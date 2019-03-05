<template>
  <div class="wrapper">
    <div class="receiver text_left mb_3" :data-theme="currentTheme">
      <div class="receiver--desc">Người nhận</div>
      <div class="d_flex justify_content_between align_items_center">
        <div class="receiver--content">
          <!-- <span v-if="listUsersShow.length == 0" class="receiver--content-null">Không có người nhận nào</span> -->
          <div
            class="receiver--list d_flex justify_content_start align_items_center"
          >
            <div class="list--item" v-for="user in users" :key="user._id">
              <img :src="user.avatar" width="36" alt="User Image" />
            </div>
            <div
              class="last--item d_flex justify_content_center align_items_center"
            >
              +110
            </div>
          </div>
        </div>
        <div class="receiver--add" @click="showModal = true">
          <icon-base
            icon-name="add-user"
            width="26"
            height="26"
            viewBox="0 0 26 26"
          >
            <icon-add-user />
          </icon-base>
        </div>
      </div>
    </div>
    <transition name="popup">
      <add-receiver
        v-if="showModal == true"
        :data-theme="currentTheme"
        :popupData="showModal"
        @closeAddPopup="showModal = $event"
      />
    </transition>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconAddUser from "@/components/icons/IconAddUser";
import AddReceiver from "./modal/add-receiver";
export default {
  components: {
    IconBase,
    IconAddUser,
    AddReceiver
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    users() {
      return this.$store.getters.usersSelect;
      // if(this.users.length <= 10) {
      //   this.listUsersShow = this.users;
      // }
      // else {
      //   this.listUsersShow = this.users.slice(0, 10);
      //   this.numberUsersHide = this.users.length - this.listUsersShow.length
      // }
    }
  },

  data() {
    return {
      showModal: false,
      listUsersShow: [],
      numberUsersHide: 0
    };
  }
};
</script>

<style scoped lang="scss">
@import "./receiver";
</style>
