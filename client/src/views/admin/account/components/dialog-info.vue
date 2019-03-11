<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content">
      <div
        class="modal--header p_3 d_flex justify_content_between align_items_center"
      >
        <div class="user d_flex justify_content_start align_items_center">
          <div class="user--avatar mr_4">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="64"
              alt="User Avatar"
            />
          </div>
          <div class="user--info">
            <div class="user--info-name mb_1">
              Phan Đức
              <span class="ml_2">
                <icon-base
                  icon-name="check-active"
                  class="mr_2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <icon-check-active />
                </icon-base>
              </span>
            </div>
            <div class="user--info-time">Ngày hoạt động: 20/09/2018</div>
          </div>
        </div>
        <div class="d_flex justify_content_end align_items_center">
          <div class="icon--edit mr_3">
            <icon-base
              icon-name="edit-info"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-edit-info />
            </icon-base>
          </div>
          <div class="icon--close" @click="closeAddInfo">
            <icon-base
              icon-name="close"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <icon-close />
            </icon-base>
          </div>
        </div>
      </div>
      <div class="modal--body p_3">
        <div class="info--detail">
          <div class="info--desc">Chi tiết</div>
          <div class="info--mail mt_3">
            <span class="mr_4">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active />
              </icon-base>
            </span>
            pvduc196@gmail.com
          </div>
          <div class="info--phone mt_3">
            <span class="mr_4">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active />
              </icon-base>
            </span>
            0967680336
          </div>
          <div class="info--rule mt_3">
            <span class="mr_4">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active />
              </icon-base>
            </span>
            Quản trị viên
          </div>
          <div class="info--history mt_3">Đã thêm 3/5 tài khoản Facebook</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import IconClose from "@/components/icons/IconClose";
import IconEditInfo from "@/components/icons/IconEditInfo";

export default {
  props: ["showInfo"],
  components: {
    IconBase,
    IconCheckActive,
    IconClose,
    IconEditInfo
  },
  methods: {
    closeAddInfo() {
      this.$emit("closeAddInfo", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(153, 153, 153, 0.4);
  .modal--content {
    border-radius: 8px;
    background-color: #ffffff;
    width: 600px;
  }
  .modal--header {
    border-bottom: 1px solid #dcdcdc;
    font-size: 16px;
    font-weight: 600;
    color: #646464;
  }
}

/*Transition popup*/
.popup-enter {
  transform: translateY(-100%);
}
.popup-enter-to {
  transition: transform 0.75s;
  transform: translateY(0);
}
.popup-leave-to {
  transition: transform 0.75s;
  transform: translateY(-100%);
}
</style>
