<template>
  <div
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu />
      </icon-base>
    </div>
    <div
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
      <ul
        class="profile--dropdown position_absolute"
        :class="{ show: showdropdown }"
      >
        <li @click="logOut">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconMenu from "@/components/icons/IconMenu";
import IconArrowDown from "@/components/icons/IconArrowDown";
export default {
  components: {
    IconBase,
    IconMenu,
    IconArrowDown
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      this.statusCollapse = this.$store.getters.collapseMenu;
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
      this.$store.dispatch("changeMenu", this.statusCollapse);
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  .header--profile,
  .header--icon {
    cursor: pointer;
  }
  .header--profile-name {
    font-size: 14px;
  }
  .profile--dropdown {
    right: 0;
    z-index: 10;
    top: calc(100% + 10px);
    min-width: 160px;
    width: auto;
    border: 2px solid #ddd;
    pointer-events: auto;
    transition: all 0.4s ease;
    transition-delay: 0.2s;
    text-align: left;
    visibility: hidden;
    opacity: 0;
    padding: 5px 15px 7.5px 15px;
    border-radius: 5px;
    list-style-type: none;
    margin-bottom: 0;
    background-color: #fff;
    &.show {
      visibility: visible;
      opacity: 1;
    }
    &:after {
      content: "";
      position: absolute;
      top: -13px;
      border: 6px solid transparent;
      height: 0;
      left: 106px;
      border-bottom-color: #ddd;
    }
    li {
      border-bottom: 1px solid #a8a8a8;
      padding: 7.5px 0;
      transition: all 0.4s ease;
      cursor: pointer;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
/* ChangeColor */
// Light
.header[data-theme="light"] {
  color: #666;
  .header--icon {
    &:hover {
      color: #000;
    }
  }
}

//Dark
.header[data-theme="dark"] {
  color: #ccc;
  .header--icon {
    &:hover {
      color: #f7f7f7;
    }
  }
}
</style>
