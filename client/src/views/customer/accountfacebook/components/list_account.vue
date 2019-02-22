<template>
  <div class="wrapper">
    <div class="list r">
      <div class="addItem c_md_3 c_lg_3 c_xl_3 ">
        <div class="card">
          <div class="card_body">
            <div class="item--content" @click="showModal=true">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="60"
                height="60"
                viewBox="0 0 60 60"
              >
                <icon-plus/>
              </icon-base>

              <p>Thêm một cookie</p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="item in arrStt" :key="item.id" class="item c_md_3 c_lg_3 c_xl_3 ">
        <div class="card">
          <div class="card_body">
            <div class="card--header">
              <icon-base icon-name="remove" width="15" height="15" viewBox="0 0 15 15">
                <icon-remove/>
              </icon-base>
            </div>
            <div class="card--content">
              <div class="avatar">
                <img
                  class="picture"
                  src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
                >
                <span class="status" :class="{active : !item.stt}">
                  <icon-base icon-name="status" width="20" height="20" viewBox="0 0 20 20">
                    <icon-status/>
                  </icon-base>
                </span>
              </div>
              <h3 class="name">Thanh Lam</h3>
              <button
                @click="item.stt=!item.stt"
                class="btn btn--connect"
                v-if="item.stt==true"
              >Kết nối</button>
              <button @click="item.stt=!item.stt" class="btn btn--disconnect" v-else>Ngắt kết nối</button>
            </div>
            <div class="card--footer">
              <div class="left">
                <p>12</p>
                <p>Kết nối</p>
              </div>
              <div class="right">
                <p>1</p>
                <p>Hoạt động</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="modal--wrapper" v-if="showModal == true" :data-theme="currentTheme">
        <div class="modal--dialog d_flex justify_content_center align_items_center">
          <div class="modal--content">
            <div class="modal--header">
              <icon-base
                icon-name="modal-cookie"
                width="440.4"
                height="156.808"
                viewBox="0 0 440.4 156.808"
              >
                <icon-modal-cookie/>
              </icon-base>
            </div>
            <div class="modal--body">
              <div class="modal--title">Đăng nhập với cookie</div>
              <div
                class="modal--desc"
              >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.</div>
              <textarea placeholder="Nhập cookie tại đây ..."></textarea>
            </div>
            <div class="modal--footer d_flex justify_content_between align_items_center">
              <button class="btn-add">THÊM COOKIE</button>
              <button class="btn-skip" @click="showModal=false">SKIP</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import IconStatus from "@/components/icons/IconStatus";
import IconModalCookie from "@/components/icons/IconModalCookie";
export default {
  components: {
    IconBase,
    IconPlus,
    IconRemove,
    IconStatus,
    IconModalCookie
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      showModal: "false",
      arrStt: [
        { id: 1, stt: true },
        { id: 2, stt: true },
        { id: 3, stt: false },
        { id: 4, stt: false }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "./list_account.scss";
</style>
