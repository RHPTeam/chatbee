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
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--content avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{
                user.name | getFirstLetter
              }}</span>
            </div>
          </div>
          <div class="user--info">
            <div class="d_flex justify_content_start align_items_center mb_2">
              <div class="user--info-name">{{ user.name }}</div>
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
            <div class="user--info-time">
              Ngày hoạt động: {{ user.created_at | formatDate }}
            </div>
          </div>
        </div>
        <div class="d_flex justify_content_end align_items_center">
          <div class="icon--edit mr_4" @click="openAddEdit">
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
              {{ user.email }}
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
              {{ user.phone }}
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
              {{ user._role.level }}
            </div>
            <div class="info--history mt_4">
              Đã thêm {{ user._accountfb.length }}/{{ user.maxAccountFb }} tài
              khoản Facebook
            </div>
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
  props: ["user"],
  components: {
    IconBase,
    IconCheckActive,
    IconClose,
    IconEditInfo,
    IconMail,
    IconPhoneInfo,
    IconRole
  },
  filters: {
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      const minutes = newDate.getMinutes();
      return `${hour}:${minutes}, ${date}-${month}-${year}`;
    },
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  },
  methods: {
    closeAddInfo() {
      this.$emit("closeAddInfo", false);
    },
    openAddEdit() {
      this.closeAddInfo();
      this.$emit("openAddEdit", true);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.5);
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
  .avatar--content {
    cursor: pointer;
    overflow: hidden;
    width: 64px;
    border-radius: 50%;
    border: 1px solid #f7f7f7;

    &:before {
      display: block;
      padding-top: 100%;
      content: "";
    }
    &.avatar--img {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &.avatar--default {
      background-color: #f7f7f7;
      font-size: 32px;
      font-weight: 600;
      color: #ffb94a;
      span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
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
