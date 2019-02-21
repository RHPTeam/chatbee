<template>
  <div class="popup--wrap position_absolute">
    <div class="popup--header text_center position_relative p_3">
      <img
        class="mt_4 mb_3"
        src="http://source.unsplash.com/random/75x75"
        alt="avatar"
      />
      <h3>Lê Khang</h3>
      <div class="popup--close position_absolute">Xong</div>
    </div>
    <div class="popup--main text_left mt_4">
      <h4>Chức năng</h4>
      <ul class="p_0 m_0">
        <router-link
          tag="li"
          v-for="(menu, index) in menus"
          :key="index"
          :to="{ name: menu.to }"
        >
          <a href="#">
            <icon-base
              :icon-name="menu.icon.name"
              :width="menu.icon.width"
              :height="menu.icon.height"
              :viewBox="menu.icon.viewBox"
            >
              <icon-chat />
            </icon-base>
            <span class="ml_2">{{ menu.text }}</span>
          </a>
        </router-link>
      </ul>
      <h4 class="mt_3">Cá nhân</h4>
      <ul class="p_0 m_0">
        <router-link
          tag="li"
          v-for="(item, index) in privateData"
          :key="index"
          :to="{ name: item.to }"
        >
          <a href="#">
            <icon-base
              :icon-name="item.icon.name"
              :width="item.icon.width"
              :height="item.icon.height"
              :viewBox="item.icon.viewBox"
            >
              <icon-chat />
            </icon-base>
            <span class="ml_2">{{ item.text }}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script src="./sidebar_popup_mobile.js"></script>
<style lang="scss" scoped>
.popup--wrap {
  top: 0;
  left: 0;
  z-index: +100;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  /*display: none;*/
  .popup--header {
    img {
      border-radius: 50%;
    }
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
    .popup--close {
      top: 1rem;
      right: 1rem;
      color: #4a83bc;
      font-size: 14px;
    }
  }
  .popup--main {
    padding: 0 24px;
    h4 {
      font-size: 12px;
      color: #999999;
      text-transform: uppercase;
    }
    ul {
      list-style: none;
      li {
        padding: 8px 0;
        a {
          color: #999999;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
