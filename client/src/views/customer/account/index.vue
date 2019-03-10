<template>
  <div class="main" :data-theme="currentTheme">
    <!--Layout Desktop-->
    <div class="main--wrap d_none d_md_block">
      <app-bread-crumb
        nameBread="Thiết lập tài khoản"
        subBread="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita, voluptas?"
      />
      <!--main top-->
      <div class="main--top d_flex align_items_center p_4">
        <div class="exp--account">Tài khoản hết hạn: 11/11/1111</div>
        <div class="renewed--account text_center ml_auto" @click="showPopupChangeInfo = !showPopupChangeInfo">
          <button>Gia hạn</button>
        </div>
      </div>
      <!--main content-->
      <div class="main--content mt_4 mb_4">
        <div class="r">
          <div class="c_sm_12 c_md_12 c_lg_8 or_2">
            <div class="left--content p_3">
              <p class="divide--title text_left">Thông tin cá nhân</p>
              <form>
                <div class="user--email d_flex position_relative mb_2">
                  <div class="icon--envelope position_absolute mt_1">
                    <icon-base icon-name viewBox="0 0 20 20">
                      <icon-envelop />
                    </icon-base>
                  </div>
                  <p class="ml_4">example@gmail.com</p>
                </div>
                <div class="r">
                  <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                    <div class="form_group position_relative">
                      <div class="icon position_absolute p_2">
                        <icon-base icon-name viewBox="0 0 20 20">
                          <icon-user />
                        </icon-base>
                      </div>
                      <input
                        type="text"
                        class="form_control"
                        placeholder="Nhập tên của bạn"
                        v-model="user.name"
                      />
                    </div>
                  </div>
                  <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                    <div class="form_group position_relative">
                      <div class="icon position_absolute p_2">
                        <icon-base icon-name viewBox="0 0 20 20">
                          <icon-phone />
                        </icon-base>
                      </div>
                      <input
                        type="text"
                        class="form_control"
                        placeholder="Nhập số điện thoại của bạn"
                        v-model="user.phone"
                      />
                    </div>
                  </div>
                </div>
                <p class="d_flex">Mật khẩu</p>
                <div class="r">
                  <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                    <div class="form_group position_relative">
                      <div class="icon position_absolute p_2">
                        <icon-base icon-name viewBox="0 0 20 20">
                          <icon-padlock />
                        </icon-base>
                      </div>
                      <input
                        type="password"
                        class="form_control"
                        placeholder="Nhập mật khẩu của bạn"
                        v-model="newPassword"
                      />
                    </div>
                  </div>
                  <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                    <div class="form_group position_relative input--reNewPass">
                      <div class="icon position_absolute p_2">
                        <icon-base icon-name viewBox="0 0 20 20">
                          <icon-check-padlock />
                        </icon-base>
                      </div>
                      <input
                        type="password"
                        class="form_control"
                        placeholder="Nhập lại mật khẩu của bạn"
                        v-model="reNewPassword"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="c_sm_12 c_md_12 c_lg_4 or_1">
            <div class="right--content p_3">
              <div
                class="avatar--wrapper position_relative d_flex align_content_center"
              >
                <p>Ảnh đại diện</p>
                <div class="change--icon ml_auto">
                  <div class="icon" @click="isChangeImage = !isChangeImage">
                    <icon-base icon-name viewBox="0 0 20 20">
                      <icon-edit />
                    </icon-base>
                  </div>
                </div>
                <div
                  class="change--avatar position_absolute text_left p_2"
                  v-if="isChangeImage == true"
                >
                  <div
                    class="change--avatar-item p_1"
                    @click="showModal = !showModal"
                  >
                    Xoá ảnh
                  </div>
                  <div class="change--avatar-item p_1" @click="showModalChangePassword = !showModalChangePassword">Thay ảnh đại diện</div>
                </div>
              </div>
              <div class="main--av-wrap">
                <div class="main--av-content position_relative">
                  <div
                    class="main--av d_flex justify_content_center align_items_center"
                  ></div>
                  <div class="main--av-img position_absolute"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main--option">
        <div class="r">
          <div class="option--theme c_sm_12 c_md_12 c_lg_6">
            <!--<div class="c_md_6">-->
            <p class="divide--title padding--option d_flex ml_0">Chủ đề</p>
            <div class="d_flex auto--change padding--option">
              <p>Tự động điều chỉnh</p>
              <div class="ml_auto">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <!--</div>-->
            <div class="theme--title text_left d_flex ml_3">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita, voluptas?
              </span>
            </div>
            <div class="option--theme-img r">
              <div class="choose--theme c_sm_12 c_md_12 c_lg_12 c_xl_6">
                <div class="choose--theme-item d_flex flex_column mb_3">
                  <div class="theme--setting theme--light-img mb_2">
                    <img :src="imageLight" alt />
                  </div>
                  <div class="d_flex flex_column text_left">
                    <check-radio statusCheckRadio="Luôn luôn" />
                    <div class="check--radio-about d_flex align_items_center">
                      <check-radio />
                      <div class="check--option-hours ml_3 pt_2">
                        <span>Từ</span>
                        <input type="text" value="4:00" />
                        <span>đến</span>
                        <input type="text" value="17:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="choose--theme c_sm_12 c_md_12 c_lg_12 c_xl_6">
                <div class="choose--theme-item d_flex flex_column">
                  <div class="theme--setting theme--dark-img mb_2">
                    <img :src="imageDark" alt />
                  </div>
                  <div class="d_flex flex_column text_left">
                    <check-radio statusCheckRadio="Luôn luôn" />
                    <div class="check--radio-about d_flex align_items_center">
                      <check-radio />
                      <div class="check--option-hours ml_3 pt_2">
                        <span>Từ</span>
                        <input type="text" value="4:00" />
                        <span>đến</span>
                        <input type="text" value="17:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="option--sytem c_sm_12 c_md_12 c_lg_6 mt_4">
            <p class="divide--title text_left padding--option mb_3">
              Thiết lập hệ thống
            </p>
            <div class="r">
              <div class="option--sytem-item c_sm_12 c_md_12 c_lg_12 c_xl_6">
                <div class="d_flex auto--change padding--option">
                  <p class="text_left">Gợi ý mẹo hay</p>
                  <div class="ml_auto">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="option--sytem-item c_sm_12 c_md_12 c_lg_12 c_xl_6">
                <div class="d_flex auto--change padding--option">
                  <p class="text_left">Hướng dẫn</p>
                  <div class="ml_auto">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- popup follow change varriable when user created -->
      <transition name="change--info">
        <modal-change-info
          v-if="showPopupChangeInfo == true"
          :popupData="showPopupChangeInfo"
          @closePopupChangeInfo="showPopupChangeInfo = $event"
        />
      </transition>
      <!-- pop up delete images -->
      <transition name="popup">
        <modal-delete
          v-if="showModal == true"
          :data-theme="currentTheme"
          :popupData="showModal"
          @closeDeletePopup="showModal = $event"
          :descModal="'Vừa có sự thay đổi, bạn có muốn lưu lại không?'"
        />
      </transition>
      <!-- pop up delete images -->
      <transition name="popup">
        <modal-change-password
          v-if="showModalChangePassword == true"
          :data-theme="currentTheme"
          :popupData="showModalChangePassword"
          @closeModalChangePassword="showModalChangePassword = $event"
        />
      </transition>
    </div>
    <!--Layouts Mobile-->
    <div class="main--wrap-mobile d_block d_md_none">
      <account-mobile />
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import IconBase from "@/components/icons/IconBase";
import IconUser from "@/components/icons/IconUser";
import IconEnvelop from "@/components/icons/IconEnvelop";
import IconPhone from "@/components/icons/IconPhone";
import IconPadlock from "@/components/icons/IconPadlock";
import IconCheckPadlock from "@/components/icons/IconCheckPadlock";
import IconEdit from "@/components/icons/IconEdit";
import AccountMobile from "./mobile/index";
import CheckRadio from "@/components/shared/UI_library/radio";
import ModalDelete from "@/components/popupDelete/popup_delete";
import ModalChangePassword from "./components/popup_change_password";
import ModalChangeInfo from "./components/popup_change_info";
export default {
  data() {
    return {
      newPassword: "",
      reNewPassword: "",
      oldPassword: "",
      isCompare: false,
      imageLight: require("@/assets/images/theme-light-setting.png"),
      imageDark: require("@/assets/images/theme-dark-setting.png"),
      isChangeImage: false,
      showModal: false,
      showPopupChangeInfo: false,
      showModalChangePassword: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    async updateUser() {
      this.isComparePassword();
      if (this.isCompare) {
        const passwordSender = {
          password: this.oldPassword,
          newPassword: this.newPassword
        };
        this.$store.dispatch("changePassword", passwordSender);
      }
      this.$store.dispatch("updateUser", this.user);
    },
    isComparePassword() {
      if (this.newPassword == "" || this.reNewPassword == "")
        return (this.isCompare = false);
      if (this.newPassword !== this.reNewPassword)
        return (this.isCompare = false);
      return (this.isCompare = true);
    }
  },
  components: {
    AppBreadCrumb,
    IconBase,
    IconCheckPadlock,
    IconEnvelop,
    IconEdit,
    IconPadlock,
    IconPhone,
    IconUser,
    AccountMobile,
    CheckRadio,
    ModalDelete,
    ModalChangePassword,
    ModalChangeInfo
  }
};
</script>

<style scoped lang="scss">
@import "./account.scss";
</style>
