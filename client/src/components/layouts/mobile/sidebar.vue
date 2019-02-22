<template>
  <transition name="fade">
    <div class="popup--wrap">
      <div class="popup--header text_center position_relative p_3">
        <img
          class="mt_4 mb_3"
          src="http://source.unsplash.com/random/75x75"
          alt="avatar"
        />
        <h3>Lê Khang</h3>
        <div
          class="popup--close position_absolute"
          @click="closePopup"
        >
          Xong
        </div>
      </div>
      <div class="popup--main text_left mt_4">
        <h4>Chức năng</h4>
        <ul class="p_0 m_0">
          <router-link
            tag="li"
            class="mb_2"
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
            class="mb_2"
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
  </transition>
</template>
<script src="./sidebar.js"></script>
<style lang="scss" scoped>
.popup--wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: +999;
  width: 100%;
  min-height: 100vh;
  font-size: 16px;
  background: #000000;
  /*display: none;*/
  .popup--header {
    img {
      border-radius: 50%;
      cursor: pointer;
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
      cursor: pointer;
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
          font-size: 16px;
        }
        &:first-child {
          margin-top: 8px;
        }
      }
    }
  }
}
// Light
.popup--wrap[data-theme="light"] {
  background: #ffffff;
  color: #666666;
  h3,
  h4 {
    color: #444444;
  }
  ul {
    li {
      a {
        color: #666666;
      }
    }
  }
}

//Dark
.popup--wrap[data-theme="dark"] {
  color: #999999;
  h3,
  h4 {
    color: #999999;
  }
  ul {
    li {
      a {
        color: #999999;
      }
    }
  }
}
</style>
