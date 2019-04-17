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
          exact
          v-for="(menu, index) in menus"
          :key="index"
          :to="{ name: menu.to }"
        >
          <a href="#">
            <icon-base
              :icon-name="menu.icon.iconName"
              :width="menu.icon.width"
              :height="menu.icon.height"
              :viewBox="menu.icon.viewBox"
            >
              <component :is="menu.icon.tagName" />
            </icon-base>
            <span class="ml_2">{{ menu.text }}</span>
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
