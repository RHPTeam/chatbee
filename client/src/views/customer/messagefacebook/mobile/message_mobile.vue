<template>
  <div class="list--message position_absolute">
    <div class="main--wrap position_relative">
      <div
        class="list--message-top d_flex position_fixed align_items_center p_2"
      >
        <div class="back--list" @click="closeMessage">
          <div class="number text_center ml_3">9</div>
        </div>
        <div class="user--info d_flex align_items_center ml_4">
          <div class="user--avatar">
            <img
              src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg"
              width="50"
              height="50"
              alt=""
            />
          </div>
          <div class="user--profile text_left ml_2">
            <h4 class="m_0">Lê Khang</h4>
            <p class="m_0">Không có gì ngoài đẹp trai ...!!!</p>
          </div>
        </div>
      </div>
      <div class="list--message-main p_2">
        <div class="show--message d_flex flex_column">
          <div class="message--user-1 text_left d_flex align_items_end">
            <div class="avatar-chat mr_2">
              <img
                src="https://nation.com.pk/print_images/medium/2014-12-26/most-beautiful-girl-ignorant-of-fame-1419540355-9809.jpg"
                width="32"
                height="32"
                alt=""
              />
            </div>
            <div class="user--message d_flex flex_column">
              <div class="item user--message-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
                sit.
              </div>
              <div class="item user--message-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
                sit.
              </div>
            </div>
          </div>
          <div
            class="message--user-2 text_right d_flex flex_row_reverse align_items_end"
          >
            <div class="avatar-chat ml_2">
              <img
                src="https://nation.com.pk/print_images/medium/2014-12-26/most-beautiful-girl-ignorant-of-fame-1419540355-9809.jpg"
                width="14"
                height="14"
                alt=""
              />
            </div>
            <div class="user--message d_flex flex_column">
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                atque corporis distinctio explicabo fuga neque nulla officiis
                optio praesentium vitae.
              </div>
              <!--Message Images-->
              <one-images />
              <two-images />
              <three-images />
              <!--End Message Images-->
              <div class="item user--message-2 text_left ml_auto">
                Lorem ipsum dolor. Fuga, sit.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer--message d_flex align_items_center position_fixed">
        <!--Icons options-->
        <div class="footer--icons">
          <div class="icons">
            <div class="d_none">
              <div class="icon icon-change-account">
                <icon-base
                  icon-name="icon-change-account"
                  width="28"
                  height="23"
                  viewBox="0 0 18 18"
                >
                  <icon-change-account />
                </icon-base>
              </div>
            </div>
            <div class="d_flex">
              <div class="icon icon-change-account">
                <icon-base
                  icon-name="icon-change-account"
                  width="28"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <icon-change-account />
                </icon-base>
              </div>
              <div class="icon icon-image">
                <icon-base
                  icon-name="icon-image"
                  width="28"
                  height="23"
                  viewBox="0 0 28 28"
                >
                  <icon-image />
                </icon-base>
              </div>
              <div class="icon icon-camera">
                <icon-base
                  icon-name="icon-camera"
                  width="28"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <icon-camera />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
        <!--Input create message-->
        <div class="footer--user-focus">
          <div class="form_group m_0">
            <input
              type="text"
              placeholder="Create message"
              class="form_control"
            />
          </div>
        </div>
        <!--Icon smile and send when focus-->
        <div class="icon--fixed ml_auto">
          <div class="icon--smile ml_2">
            <div class="icons">
              <icon-base
                icon-name="icon-smile"
                width="35"
                height="35"
                viewBox="0 0 26 26"
              >
                <icon-smile />
              </icon-base>
            </div>
          </div>
          <div class="icon--send ml_2 d_none">
            <div class="icons">
              <icon-base
                icon-name="icon-send"
                width="35"
                height="35"
                viewBox="0 0 540 540"
              >
                <icon-send />
              </icon-base>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconSend from "@/components/icons/IconSend";
import IconSmile from "@/components/icons/IconSmile";
import IconImage from "@/components/icons/IconImage";
import IconCamera from "@/components/icons/IconCamera";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import OneImages from "./cp-message/cp_images_1";
import TwoImages from "./cp-message/cp_images_2";
import ThreeImages from "./cp-message/cp_images_3";
export default {
  props: ["ishowMessage"],
  methods: {
    closeMessage() {
      this.$emit("closeMessage", false);
    }
  },
  components: {
    IconBase,
    IconSend,
    IconCamera,
    IconImage,
    IconSmile,
    IconChangeAccount,
    OneImages,
    TwoImages,
    ThreeImages
  }
};
</script>
<style lang="scss" scoped>
@import "./message_mobile.style";
</style>
