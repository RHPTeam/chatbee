<template>
  <div class="popup--wrap">
    <div class="popup--header text_center position_relative p_3">
      <div class="mt_4 mb_3">
        <div
          v-if="user.imageAvatar"
          class="avatar avatar--img"
          :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
        ></div>
        <div
          v-else
          class="avatar avatar--default d_flex align_items_center justify_content_center"
        >
          <span>{{ user.name | getFirstLetter }}</span>
        </div>
      </div>
      <h3>{{ user.name }}</h3>
      <div class="popup--close position_absolute" @click="closePopup">
        Xong
      </div>
    </div>
    <div class="popup--main text_left mt_4">
      <h4>Chức năng</h4>
      <ul class="p_0 m_0">
        <router-link
          class="mb_2"
          tag="li"
          active-class="active"
          @click="redirectScript"
        >
          <a>
            <icon-base
              icon-name="script"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-script />
            </icon-base>
            <span class="ml_2">Kịch bản</span>
          </a>
        </router-link>

        <!-- Chatting -->
        <router-link
          class="mb_2"
          tag="li"
          :to="{ name: 'f_message' }"
          active-class="active"
          exact
        >
          <a>
            <icon-base
              icon-name="chat"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-chat />
            </icon-base>
            <span class="ml_2">Trò chuyện</span>
          </a>
        </router-link>

        <!-- Auto Reply -->
        <router-link
          class="mb_2"
          tag="li"
          :to="{ name: 'f_auto' }"
          active-class="active"
        >
          <a>
            <icon-base
              icon-name="auto-answer"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-auto-answer />
            </icon-base>
            <span class="ml_2">Trả lời tự động</span>
          </a>
        </router-link>

        <!-- Friends -->
        <router-link
          class="mb_2"
          tag="li"
          :to="{ name: 'f_friends' }"
          active-class="active"
        >
          <a class="friend">
            <icon-base
              icon-name="friend"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <icon-friend />
            </icon-base>
            <span class="ml_2">Bạn bè</span>
          </a>
        </router-link>

        <!-- Broadcast -->
        <router-link
          class="mb_2"
          tag="li"
          :to="{ name: 'f_broadcast' }"
          active-class="active"
        >
          <a>
            <icon-base
              icon-name="broadcast"
              width="21"
              height="21"
              viewBox="0 0 24 24"
            >
              <icon-broadcast />
            </icon-base>
            <span class="ml_2">Chiến dịch</span>
          </a>
        </router-link>

        <!-- FB Account -->
        <router-link
          class="mb_2"
          tag="li"
          :to="{ name: 'f_account' }"
          active-class="active"
        >
          <a>
            <icon-base
              icon-name="account"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <icon-account />
            </icon-base>
            <span class="ml_2">Tài khoản Facebook</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script src="./menu_popup.script.js"></script>
<style lang="scss" scoped>
@import "./menu_popup.style";
</style>
