<template>
  <div class="wrapper--none">
    <div class="wrapper" :data-theme="currentTheme">
      <!-- Loading -->
      <loading v-if="status == 'loading'" />
      <!-- <mobile-loading v-if="status == 'loading'"/> -->

      <!-- Desktop -->
      <div v-else class="d_none d_md_block">
        <!-- Noification -->
        <app-notification
          v-for="(item, index) in infoAccount"
          :key="index"
          :item="item"
          :data-theme="currentTheme"
        ></app-notification>
        <div class="wrap--content d_md_flex">
          <div class="wrap--content-sidebar">
            <app-sidebar />
          </div>
          <div class="wrap--content-main">
            <app-header />
            <router-view />
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="wrap--content-mobile d_block d_md_none position_relative">
        <header-mobile />
        <VuePerfectScrollbar class="mobile-scroll">
          <search-mobile />
          <!-- Noification -->
          <m-notification
            v-for="(item, index) in infoAccount"
            :key="index"
            :item="item"
            :data-theme="currentTheme"
          ></m-notification>
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
