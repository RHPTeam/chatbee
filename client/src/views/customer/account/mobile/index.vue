<template>
  <div class="popup--content position_fixed" :data-theme="currentTheme">
    <div class="popup position_relative">
      <!--Start: Popup Header-->
      <div class="popup--wrapper">
        <div
          class="popup--header d_flex justify_content_between align_items_center"
        >
          <div class="popup--header-back">
            <icon-base
              icon-name="icon-arrow"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-arrow-left />
            </icon-base>
          </div>
          <div class="popup--header-title">
            <span>Tài khoản</span>
          </div>
          <div class="popup--header-action" @click="updateUser">
            <span>Lưu</span>
          </div>
        </div>
        <!--Start: User Info Component-->
        <div v-if="user.imageAvatar">
          <div
            class="user--info d_flex flex_column justify_content_center align_items_center mt_3"
          >
            <div
              class="user--info-avatar"
              :style="{
                backgroundImage: 'url(' + user.imageAvatar + ')'
              }"
            ></div>
            <div class="user--info-title mt-2">{{ user.name }}</div>
            <div class="user--info-sub mb_3">{{ user.email }}</div>
          </div>
          <!--End: User Info Component-->
          <div
            class="popup--wrap-head position_absolute"
            :style="{
              backgroundImage: 'url(' + user.imageAvatar + ')'
            }"
          ></div>
        </div>
        <div v-else>
          <div
            class="user--info d_flex flex_column justify_content_center align_items_center mt_3"
          >
            <div
              class="user--info-avatar text_center d_flex align_items_center justify_content_center"
            >
              {{ user.name | getFirstLetter }}
            </div>
            <div class="user--info-title mt-2">{{ user.name }}</div>
            <div class="user--info-sub mb_3">{{ user.email }}</div>
          </div>
          <!--End: User Info Component-->
          <div class="popup--wrap-head position_absolute"></div>
        </div>
      </div>
      <!--Start: Popup Body-->
      <div class="popup--body">
        <!--Start: User Form Component-->
        <div class="user--form text_left mt_5">
          <h4 class="divide--title text_left">Thông tin chung</h4>
          <div class="form_group position_relative">
            <label>Tên</label>
            <input
              class="form_control"
              type="text"
              placeholder="Tên của bạn..."
              v-model="user.name"
            />
            <div class="icon position_absolute">
              <icon-base
                icon-name="icon-user"
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <icon-user />
              </icon-base>
            </div>
          </div>
          <div class="form_group position_relative">
            <label>Điện thoại</label>
            <input
              class="form_control"
              type="number"
              placeholder="098"
              v-model="user.phone"
            />
            <div class="icon position_absolute">
              <icon-base
                icon-name="icon-phone"
                width="20"
                height="20"
                viewBox="0 0 21 21"
              >
                <icon-phone />
              </icon-base>
            </div>
          </div>
          <div class="form_group position_relative">
            <label>Mật khẩu</label>
            <input
              class="form_control passwordField"
              type="password"
              value="0986167832"
              readonly
            />
            <div
              class="change--pass position_absolute"
              @click="isChangePassword = true"
            >
              Thay đổi
            </div>
          </div>
          <h4 class="divide--title text_left">Hệ thống</h4>
          <div class="form_group form_inline">
            <label>Hướng dẫn</label>
            <div class="group--radio ml_auto">
              <input
                id="checkboxTutorial"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              />
              <label for="checkboxTutorial"></label>
            </div>
          </div>
          <div class="form_group form_inline">
            <label>Gợi ý</label>
            <div class="group--radio ml_auto">
              <input
                id="checkboxSuggestion"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              />
              <label for="checkboxSuggestion"></label>
            </div>
          </div>
          <div class="d_flex align_items_center" @click="isChangeTheme = true">
            <div class="divide--theme">Chủ đề</div>
            <div class="theme--name ml_auto">
              Light
            </div>
          </div>
        </div>
        <!--End: User Form Component-->
      </div>
      <!--End: Popup Body-->
      <!--Popup Change Theme-->
      <transition name="changeTheme">
        <app-change-theme
          v-if="isChangeTheme == true"
          :data-theme="currentTheme"
          :popupTheme="isChangeTheme"
          @closeChangeTheme="isChangeTheme = $event"
        />
      </transition>
      <!--Popup change Password-->
      <transition name="changeTheme">
        <app-change-password
          v-if="isChangePassword == true"
          :data-theme="currentTheme"
          :popupPassword="isChangePassword"
          @closeChangePassword="isChangePassword = $event"
        />
      </transition>
      <!--Popup change Password-->
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconUser from "@/components/icons/IconUser";
import IconPhone from "@/components/icons/IconPhone";
import AppChangeTheme from "./cp-mobile/change_theme";
import AppChangePassword from "./cp-mobile/change_password";
export default {
  data() {
    return {
      radio: true,
      isChangeTheme: false,
      isChangePassword: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length === 0) return;
      return string.charAt(0).toUpperCase();
    },
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;
      return `${date}/${month}/${year}`;
    }
  },
  methods: {
    updateValue: function() {
      this.radio = !this.radio;
    },
    updateUser() {
      this.$store.dispatch("updateUser", this.$store.getters.userInfo);
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    IconUser,
    IconPhone,
    AppChangeTheme,
    AppChangePassword
  }
};
</script>

<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
