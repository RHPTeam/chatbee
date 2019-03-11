<template>
  <div class="header d_flex justify_content_end align_items_center">
    <!-- <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu/>
      </icon-base>
    </div>-->
    <div v-if="!user"></div>
    <div
      v-else
      class="header--profile position_relative d_flex justify_content_end align_items_center"
      @click="showDropdown"
    >
      <div class="header--profile-img">
        <img
          src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
          width="40"
          alt="User Image"
        />
      </div>
      <div class="header--profile-name ml_2 mr_2">{{ user.name }}</div>
      <icon-base
        icon-name="arrow-down"
        width="10"
        height="10"
        viewBox="0 0 130 130"
      >
        <icon-arrow-down />
      </icon-base>
      <div
        class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
        :class="{ show: showdropdown }"
      >
        <span class="with--arrow">
          <span class="bg--maincolor"></span>
        </span>
        <div
          class="d_flex align_items_center p_3 bg--maincolor text_white mb_2"
        >
          <div class>
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              alt="user"
              class="img_circle"
              width="60"
            />
          </div>
          <div class="ml_2">
            <h4 class="mb_0">{{ user.name }}</h4>
            <p class="mb_0">{{ user.email }}</p>
          </div>
        </div>
        <a class="dropdown--item" href="javascript:void(0)" @click="logOut">
          <icon-base
            icon-name="logout"
            width="18"
            height="18"
            viewBox="0 0 20 20"
          >
            <icon-logout /> </icon-base
          >Đăng xuất
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconMenu from "@/components/icons/IconMenu";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconLogout from "@/components/icons/IconLogout";
export default {
  components: {
    IconBase,
    IconMenu,
    IconArrowDown,
    IconLogout
  },
  computed: {
    collapseSidebar() {
      this.statusCollapse = this.$store.getters.collapseSidebar;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  data() {
    return {
      statusCollapse: false,
      showdropdown: false
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch("changeSidebar", this.statusCollapse);
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  height: 120px;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 0 62px;
  color: #666;
  .header--profile,
  .header--icon {
    cursor: pointer;
  }
  .header--profile-name {
    font-size: 15px;
  }
  .bg--maincolor {
    background-color: #56e8bd !important;
  }
}
.dropdown--menu {
  background-clip: padding-box;
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  color: #3e5569;
  display: none;
  font-size: 0.875rem;
  margin: 0.125rem 0 0;
  position: absolute;
  text-align: left;
  top: 100%;
  z-index: 99;

  &.user--dd {
    min-width: 280px;
  }

  &.show {
    display: block;
  }

  &.dropdown--menu-right {
    right: 0;
    left: auto;

    .with--arrow {
      right: 0;

      > span {
        left: 0;
        right: 20px;
      }
    }
  }

  .with--arrow {
    height: 10px;
    position: absolute;
    top: -10px;
    width: 40px;

    > span {
      border-radius: 6px 0 0;
      content: "";
      height: 15px;
      position: absolute;
      transform: rotate(45deg);
      top: 3px;
      width: 15px;
    }
  }

  .dropdown--item {
    background-color: transparent;
    border: 0;
    color: #212529;
    display: block;
    padding: 0.65rem 1rem;
    text-align: inherit;
    text-decoration: none;
    width: 100%;
    white-space: nowrap;

    &:hover {
      background-color: #f8f9fa;
      color: #16181b;
      text-decoration: none;
    }

    > svg {
      margin: 0 5px;
      vertical-align: top;
    }
  }

  .dropdown--divider {
    border-top: 1px solid #f8f9fa;
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
  }

  &.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  &.flipInY {
    backface-visibility: visible !important;
    animation-name: flipInY;
  }

  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      animation-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }
    to {
      transform: perspective(400px);
    }
  }
}
</style>
