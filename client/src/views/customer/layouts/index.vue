<template>
  <div class="wrapper--none">
    <!-- Noification -->
    <transition name="popup">
      <app-notification
        :data-theme="currentTheme"
        @closeNotification="showNotification = $event"
      />
    </transition>
    <div class="wrapper" :data-theme="currentTheme">
      <!-- Loading -->
      <loading v-if="status == 'loading'" />
      <!-- <mobile-loading v-if="status == 'loading'"/> -->

      <!-- Desktop -->
      <div v-else class="wrap--content d_none d_md_flex">
        <div class="wrap--content-sidebar">
          <app-sidebar />
        </div>
        <div class="wrap--content-main">
          <app-header />
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>

      <!-- Mobile -->
      <div class="wrap--content-mobile d_block d_md_none position_relative">
        <header-mobile />
        <VuePerfectScrollbar class="mobile-scroll">
          <search-mobile />
          <router-view />
        </VuePerfectScrollbar>
        <footer-mobile />
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
