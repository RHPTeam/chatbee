<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content">
      <div
        class="modal--header pl_4 pr_4 pt_3 pb_3 d_flex justify_content_between align_items_center"
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
            <div class="d_flex justify_content_start align_items_center mb_2">
              <div class="user--info-name">{{account.name}}</div>
              <div class="user--info-status ml_2">
                <icon-base
                  icon-name="check-active"
                  class="mr_2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <icon-check-active />
                </icon-base>
              </div>
            </div>
            <div class="user--info-time">Ngày hoạt động: {{account.time}}</div>
          </div>
        </div>
        <div class="d_flex justify_content_end align_items_center">
          <div class="icon--edit mr_4">
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
      <div class="modal--body pt_3 pb_5 pl_4 pr_4">
        <div class="info--detail">
          <div class="info--desc">Chi tiết</div>
          <div class="ml_3">
            <div class="info--mail mt_4">
              <span class="mr_4">
                <icon-base
                  icon-name="mail"
                  class="mr_2"
                  width="20"
                  height="14.286"
                  viewBox="0 0 20 14.286"
                >
                  <icon-mail />
                </icon-base>
              </span>
              {{account.email}}
            </div>
            <div class="info--phone mt_4">
              <span class="mr_4">
                <icon-base
                  icon-name="phone-info"
                  class="mr_2"
                  width="20"
                  height="19.987"
                  viewBox="0 0 20 19.987"
                >
                  <icon-phone-info />
                </icon-base>
              </span>
              {{account.phone}}
            </div>
            <div class="info--rule mt_4">
              <span class="mr_4">
                <icon-base
                  icon-name="role"
                  class="mr_2"
                  width="16.667"
                  height="20"
                  viewBox="0 0 16.667 20"
                >
                  <icon-role />
                </icon-base>
              </span>
              Quản trị viên
            </div>
            <div class="info--history mt_4">Đã thêm {{account.account}}/{{account.account_limit}} tài khoản Facebook</div>
          </div>
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
import IconMail from "@/components/icons/IconMail";
import IconPhoneInfo from "@/components/icons/IconPhoneInfo";
import IconRole from "@/components/icons/IconRole";

export default {
  props: ["showInfo", "account"],
  components: {
    IconBase,
    IconCheckActive,
    IconClose,
    IconEditInfo,
    IconMail,
    IconPhoneInfo,
    IconRole
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
  background-color: rgba(153, 153, 153, 0.2);
  height: 100vh;
  left: 0;
  max-height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1000;
  .modal--content {
    background-color: #ffffff;
    border-radius: 8px;
    width: 600px;
  }
  .modal--header {
    border-bottom: 1px solid #dcdcdc;
    color: #646464;
    font-size: 16px;
    font-weight: 600;
  }
  .user--info {
    .user--info-name {
      color: #7e7e7e;
      font-size: 16px;
      font-weight: bold;
    }
    .user--info-status {
      color: #56e8bd;
    }
    .user--info-time {
      color: #585757;
      font-size: 14px;
    }
  }
  .icon--edit {
    color: #56e8bd;
    cursor: pointer;
  }
  .icon--close {
    color: #aaa;
    cursor: pointer;
  }
  .info--detail {
    color: #7e7e7e;
    font-size: 16px;
    .info--desc {
      font-weight: 600;
    }
    .info--history {
      color: #aaaaaa;
      font-size: 14px;
    }
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
