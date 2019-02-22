<template>
  <div class="popup--wrap">
    <!--<div class="popup&#45;&#45;header text_center position_relative p_3">-->
    <!--<img-->
    <!--class="mt_4 mb_3"-->
    <!--src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg"-->
    <!--alt="avatar"-->
    <!--/>-->
    <!--<h3>Lê Khang</h3>-->
    <!--<div class="popup&#45;&#45;close position_absolute" @click="closePopup">-->
    <!--Xong-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="popup&#45;&#45;main text_left mt_4">-->
    <!--<h4>Chức năng</h4>-->
    <!--<ul class="p_0 m_0">-->
    <!--<router-link-->
    <!--tag="li"-->
    <!--class="mb_2"-->
    <!--v-for="(menu, index) in menus"-->
    <!--:key="index"-->
    <!--:to="{ name: menu.to }"-->
    <!--&gt;-->
    <!--<a href="#">-->
    <!--<icon-base-->
    <!--:icon-name="menu.icon.name"-->
    <!--:width="menu.icon.width"-->
    <!--:height="menu.icon.height"-->
    <!--:viewBox="menu.icon.viewBox"-->
    <!--&gt;-->
    <!--<icon-chat />-->
    <!--</icon-base>-->
    <!--<span class="ml_2">{{ menu.text }}</span>-->
    <!--</a>-->
    <!--</router-link>-->
    <!--</ul>-->
    <!--<h4 class="mt_3">Cá nhân</h4>-->
    <!--<ul class="p_0 m_0">-->
    <!--<router-link-->
    <!--tag="li"-->
    <!--class="mb_2"-->
    <!--v-for="(item, index) in privateData"-->
    <!--:key="index"-->
    <!--:to="{ name: item.to }"-->
    <!--&gt;-->
    <!--<a href="#">-->
    <!--<icon-base-->
    <!--:icon-name="item.icon.name"-->
    <!--:width="item.icon.width"-->
    <!--:height="item.icon.height"-->
    <!--:viewBox="item.icon.viewBox"-->
    <!--&gt;-->
    <!--<icon-chat />-->
    <!--</icon-base>-->
    <!--<span class="ml_2">{{ item.text }}</span>-->
    <!--</a>-->
    <!--</router-link>-->
    <!--</ul>-->
    <!--</div>-->
  </div>
</template>
<script src="./sidebar.js"></script>
<style lang="scss" scoped>
@import "./sidebar";
</style>
