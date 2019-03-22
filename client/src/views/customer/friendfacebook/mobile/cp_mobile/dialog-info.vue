<template>
  <div class="modal--wrapper position_fixed d_flex justify_content_center align_items_center p_4">
    <div class="modal--content">
      <div class="modal--header p_3 d_flex justify_content_between align_items_start">
        <div class="user d_flex justify_content_start align_items_center">
          <div class="user--img mr_3">
            <img :src="user.profilePicture" width="60" alt="User Avatar">
          </div>
          <div class="text_left">
            <div class="user--name mb_1">{{ user.fullName }}</div>
            <div
              class="user--status d_flex justify_content_start align_items_center flex_wrap m_n1"
            >
              <div class="user--status-item position_relative m_1">status 1</div>
              <div class="user--status-item position_relative m_1">status 1</div>
              <div class="user--status-item position_relative m_1">status 1</div>
              <div class="user--status-item position_relative m_1">status 1</div>
            </div>
          </div>
        </div>
        <div class="d_flex justify_content_end align_items_center">
          <div class="icon--close" @click="closeAddInfo">
            <icon-base icon-name="close" width="15" height="15" viewBox="0 0 18 18">
              <icon-close/>
            </icon-base>
          </div>
        </div>
      </div>
      <div class="modal--body pt_1 pb_3 pl_4 pr_4 text_left">
        <div class="user--info d_flex justify_content_between align_items_center pt_2 pb_2">
          <div class="user--info-label">Giới tính</div>
          <div class="user--info-detail">{{user.gender | showGender}}</div>
        </div>
        <div class="user--info d_flex justify_content_between align_items_center pt_2 pb_2">
          <div class="user--info-label">Danh xưng</div>
          <div class="user--info-detail">Anh</div>
        </div>
        <div class="user--info d_flex justify_content_between align_items_center pt_2 pb_2">
          <div class="user--info-label">Xem lần cuối</div>
          <div class="user--info-detail">{{user.updated_at | formatDate}}</div>
        </div>
        <div class="user--info pt_2 pb_2">
          <div class="user--info-label">Thuộc tính</div>
          <div
            class="user--info-attributes d_flex justify_content_start align_items_center flex_wrap m_n1 pt_2"
          >
            <div class="attributes--item m_1">attributes 1</div>
            <div class="attributes--item m_1">attributes 1</div>
            <div class="attributes--item m_1">attributes 1</div>
            <div class="attributes--item m_1">attributes 1</div>
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

export default {
  props: ["user"],
  components: {
    IconBase,
    IconCheckActive,
    IconClose
  },
  filters: {
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      const minutes = newDate.getMinutes();
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    },
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    },
    showGender(gender) {
      if (gender == "male_singular") {
        return "Nam";
      } else {
        if (gender == "female_singular") {
          return "Nữ";
        } else {
          return "Chưa xác định";
        }
      }
    }
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
  // background-color: rgba(153, 153, 153, 0.5);
  height: 100vh;
  left: 0;
  max-height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1050;
  .modal--content {
    background-color: #ffffff;
    border-radius: 8px;
    width: 100%;
    color: #444;
  }
  .modal--header {
    border-bottom: 1px solid #dcdcdc;
    color: #444;
    font-size: 16px;
    font-weight: 600;
    .icon--close {
      color: #aaa;
      cursor: pointer;
    }
  }
  .user--img {
    img {
      border-radius: 50%;
    }
  }
  .user--name {
    color: #444;
    font-size: 16px;
    font-weight: bold;
  }
  .user--status-item {
    font-size: 12px;
    border: 1px solid #ffb94a;
    padding: 1px 8px 1px 20px;
    border-radius: 10px;
    color: #444;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translateY(-50%);
      background-color: #ffb94a;
      border-radius: 50%;
      height: 8px;
      width: 8px;
    }
  }

  .user--info {
    font-size: 14px;
    .user--info-label {
    }
    .user--info-detail {
    }
  }
  .attributes--item {
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #ffb94a;
    background-color: #ffb94a;
    padding: 1px 8px;
    border-radius: 10px;
    color: #fff;
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
