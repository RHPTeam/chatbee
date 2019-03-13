<template>
  <div class="wrapper">
    <div class="grid">
      <div
        class="grid--header d_flex justify_content_between align_items_center mb_1"
      >
        <div class="d_flex align_items_center">
          <input
            type="checkbox"
            class="grid--header-checkall checkbox"
            name
            value
            v-model="selectAll"
          />
          <div class="grid--header-remove ml_4">
            <icon-base
              icon-name="remove"
              width="15"
              height="15"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
        <div class="grid--header-select">
          Đã chọn {{ selected.length }} tài khoản
        </div>
      </div>
      <div class="grid--content p_3">
        <div class="ct_f p_0">
          <div class="r">
            <div class="c_md_3 pl_3 pr_3" v-for="user in users" :key="user._id">
              <div class="user text_center p_3">
                <div class="text_right">
                  <input
                    type="checkbox"
                    class="checkbox"
                    name
                    v-model="selected"
                    :value="user._id"
                  />
                </div>
                <div class="d_flex justify_content_center align_items_center">
                  <div class="user--name">{{ user.name }}</div>
                  <div
                    class="user--status ml_2"
                    :class="{
                      'user--active': userStatus(
                        user.created_at,
                        user.expireDate
                      )
                    }"
                  >
                    <icon-base
                      icon-name="check-active"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <icon-check-active />
                    </icon-base>
                  </div>
                </div>
                <div class="user--mail mb_3">{{ user.email }}</div>
                <div
                  class="user--avatar mt_2 mb_3 d_flex justify_content_center"
                >
                  <div
                    v-if="user.imageAvatar"
                    class="avatar--content avatar--img position_relative d_block"
                    :style="{
                      backgroundImage: 'url(' + user.imageAvatar + ')'
                    }"
                    @click="openPopupInfo(user)"
                  ></div>
                  <div
                    v-else
                    class="avatar--content avatar--default position_relative d_block"
                    @click="openPopupInfo(user)"
                  >
                    <span class="position_absolute">{{
                      user.name | getFirstLetter
                    }}</span>
                  </div>
                </div>
                <div
                  class="d_flex justify_content_between align_items_center data--wrap"
                >
                  <div class="user--data">
                    <div class="user--data-desc">Hoạt động</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.created_at | formatDate }}
                    </div>
                  </div>
                  <div class="user--data">
                    <div class="user--data-desc">Giới hạn</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.maxAccountFb }} tài khoản
                    </div>
                  </div>
                </div>
                <div class="user--edit mt_3">
                  <button @click="openPopupEdit(user)">Chỉnh sửa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="popup">
      <add-edit
        v-if="showEdit == true"
        :user="userSelectEdit"
        @closeAddEdit="showEdit = $event"
      />
    </transition>
    <transition name="popup">
      <add-info
        v-if="showInfo == true"
        :user="userSelectInfo"
        @closeAddInfo="showInfo = $event"
        @openAddEdit="showEdit = $event"
      />
    </transition>
    <transition name="fade">
      <div v-if="showInfo == true || showEdit == true" class="backdrop position_fixed"></div>
    </transition>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import IconRemove from "@/components/icons/IconRemove";

import AddEdit from "./dialog-edit";
import AddInfo from "./dialog-info";
export default {
  props: ["users"],
  components: {
    IconBase,
    IconCheckActive,
    IconRemove,
    AddEdit,
    AddInfo
  },
  data() {
    return {
      showEdit: false,
      showInfo: false,
      userSelectInfo: null,
      userSelectEdit: null,
      selected: []
    };
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
  computed: {
    selectAll: {
      get: function() {
        return this.users ? this.selected.length == this.users.length : false;
      },
      set: function(value) {
        var selected = [];

        if (value) {
          this.users.forEach(function(user) {
            selected.push(user._id);
          });
        }
        this.selected = selected;
      }
    }
  },
  methods: {
    openPopupInfo(user) {
      this.showInfo = true;
      this.userSelectInfo = user;
    },
    openPopupEdit(user) {
      this.showEdit = true;
      this.userSelectEdit = user;
    },
    userStatus(startDate, endDate) {
      const Date_start = new Date(startDate);
      const Date_end = new Date(endDate);
      const time = Date_end.getTime() - Date_start.getTime();
      if (time > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.account--grid {
  .checkbox {
    border: solid 1px #aaa;
    border-radius: 2px;
    cursor: pointer;
    height: 16px;
    outline: none;
    transition: all 0.4s ease;
    width: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:hover {
      border: solid 1px #56e8bd;
    }
    &:checked {
      border: solid 1px #56e8bd;

      &:before {
        bottom: 5px;
        border-bottom: 2px solid #56e8bd;
        border-right: 2px solid #56e8bd;
        content: "";
        display: block;
        height: 16px;
        left: 5px;
        position: relative;
        transform: rotate(35deg);
        width: 8px;
      }
    }
  }
  .grid--header-remove {
    color: #56e8bd;
  }
  .grid--header-select {
    color: #78c0ff;
    font-size: 14px;
    font-weight: 600;
  }
}

.grid--content {
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
}
.user {
  .checkbox {
    border: solid 1px #aaa;
    border-radius: 2px;
    cursor: pointer;
    height: 16px;
    outline: none;
    transition: all 0.4s ease;
    width: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover {
      border: solid 1px #56e8bd;
    }
    &:checked {
      border: solid 1px #56e8bd;

      &:before {
        border-bottom: 2px solid #56e8bd;
        border-right: 2px solid #56e8bd;
        bottom: 5px;
        content: "";
        display: block;
        height: 16px;
        left: 5px;
        position: relative;
        transform: rotate(35deg);
        width: 8px;
      }
    }
  }
  .data--wrap {
    padding-left: 40px;
    padding-right: 40px;
  }

  .avatar--content {
    border: 1px solid #f7f7f7;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    width: 120px;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &.avatar--img {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &.avatar--default {
      background-color: #f7f7f7;
      color: #ffb94a;
      font-size: 32px;
      font-weight: 600;
      span {
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
      }
    }
  }
  .user--name {
    color: #3d3d3d;
    font-size: 16px;
    font-weight: bold;
  }
  .user--status {
    color: #aaaaaa;
    &.user--active {
      color: #56e8bd;
    }
  }
  .user--mail {
    color: #7e7e7e;
    font-size: 14px;
  }
  .user--data {
    .user--data-desc {
      color: #56e8bd;
      font-size: 14px;
      font-weight: 600;
    }
    .user--data-number {
      color: #aaaaaa;
      font-size: 13px;
    }
  }
  .user--edit {
    button {
      background-color: transparent;
      border: solid 1px #56e8bd;
      border-radius: 15px;
      color: #56e8bd;
      cursor: pointer;
      font-size: 13px;
      height: 30px;
      outline: none;
      transition: all 0.4s ease;
      width: 124px;
      &:hover {
        background-color: #56e8bd;
        color: #fff;
      }
    }
  }
}
.backdrop {
  background-color: rgba(153, 153, 153, 0.5);
  height: 100vh;
  left: 0;
  max-height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1040;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
