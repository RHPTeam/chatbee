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
          <div class="grid--header-remove ml_3" 
                @click="openDeleteDialog"
                v-if="selected.length > 0"
          >
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
        <div class="grid--header-select">
          Đã chọn <span class="font_weight_bold">{{ selected.length }}</span> tài khoản
        </div>
      </div>
      <div class="grid--content">
        <div class="ct_f p_0">
          <div class="r" v-if="users.length > 0">
            <div class="c_md_3 mt_4" v-for="user in users" :key="user._id">
              <div class="user">
                <div class="user--action d_flex">
                  <input
                    type="checkbox"
                    class="checkbox"
                    name
                    v-model="selected"
                    :value="user._id"
                  />
                </div>
                <div class="d_flex justify_content_center align_items_center text_center">
                  <div class="user--name">{{ user.name }}</div>
                  <div
                    class="user--status ml_2"
                    :class="[user.status === true ? 'user--active' : '']"
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
                <div class="user--mail mb_3 text_center">{{ user.email }}</div>
                <div class="user--avatar mt_2 mb_3 d_flex justify_content_center">
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
                <div class="d_flex justify_content_between align_items_center data--wrap">
                  <div class="user--data">
                    <div class="user--data-desc">Hoạt động</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.expireDate | formatDate }}
                    </div>
                  </div>
                  <div class="user--data">
                    <div class="user--data-desc">Giới hạn</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.maxAccountFb }} tài khoản
                    </div>
                  </div>
                </div>
                <div class="user--edit text_center">
                  <div class="btn--edit" @click="openPopupEdit(user)">
                    <span class="mr_2">Chỉnh sửa</span>
                    <icon-base
                      icon-name="edit"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                    >
                      <icon-edit />
                    </icon-base>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="data--empty text_center pt_4" v-else>
            Không có dữ liệu.
          </div>
        </div>
      </div>
    </div>

    <!-- ************** POPUP ************** -->
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
    <transition name="popup">
      <delete-dialog
        v-if="showDeleteDialog === true && selected.length > 0"
        :selectedUIDs="selected"
        @closeDialog="showDeleteDialog = $event"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="showInfo == true || showEdit == true"
        class="backdrop position_fixed"
      ></div>
    </transition>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import IconRemove from "@/components/icons/IconRemove";

import AddEdit from "./dialog-edit";
import AddInfo from "./dialog-info";
import DeleteDialog from "./dialog-delete";
export default {
  components: {
    IconBase,
    IconCheckActive,
    IconRemove,
    AddEdit,
    AddInfo,
    DeleteDialog
  },
  data() {
    return {
      showEdit: false,
      showInfo: false,
      showDeleteDialog: false,
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
    users() {
      return this.$store.getters.usersFilter;
    },
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
    openDeleteDialog() {
      console.log('Hú');
      this.showDeleteDialog = true;
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
    border: solid 1px #e4e4e4;
    border-radius: .3rem;
    cursor: pointer;
    height: 20px;
    outline: none;
    transition: all 0.4s ease;
    width: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover {
      border: 0;
      background-color: #ffb94a
    }
    &:checked {
      border: 0;
      border-right: solid 1px #ffb94a;
      border-bottom: solid 1px #ffb94a;
      background-color: #ffb94a;
      &:before {
        border-right: solid 2px #fff;
        border-bottom: solid 2px #fff;
        bottom: 0;
        content: "";
        display: block;
        height: 14px;
        left: 6px;
        position: relative;
        transform: rotate(35deg);
        width: 8px;
      }
    }
  }
  .grid--header-remove {
    color: #ef5350;
    cursor: pointer;
    svg {
      stroke: #ef5350;
      stroke-width: .25;
      vertical-align: text-top;
    }
  }
  .grid--header-select {
    color: #444444;
    font-size: 14px;
  }
}

.grid--content {
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 1.5rem;
  .data--empty {
    font-size: 14px;
    color: #666;
  }
  .c_md_3 {
    padding: 0 .75rem;
  }
}
.user {
  border: 1px solid #f2f2f2;
  height: 100%;
  border-radius: .5rem;
  padding-bottom: 1rem;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  }
  &--action {
    justify-content: right;
  }
  .checkbox {
    border: 0;
    border-right: solid 1px #e4e4e4;
    border-bottom: solid 1px #e4e4e4;
    border-radius: .5rem 0 .3rem 0;
    cursor: pointer;
    height: 20px;
    outline: none;
    transition: all 0.4s ease;
    width: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover {
      border: 0;
      border-right: solid 1px #e4e4e4;
      border-bottom: solid 1px #e4e4e4;
      background-color: #e4e4e4
    }
    &:checked {
      border: 0;
      border-right: solid 1px #ffb94a;
      border-bottom: solid 1px #ffb94a;
      background-color: #ffb94a;
      &:before {
        border-right: solid 2px #fff;
        border-bottom: solid 2px #fff;
        bottom: 0;
        content: "";
        display: block;
        height: 14px;
        left: 6px;
        position: relative;
        transform: rotate(35deg);
        width: 8px;
      }
    }
  }
  .user--edit {
    margin-top: .75rem;
    padding: 0 3.5rem;
    .btn--edit {
      font-size: 14px;
      padding: .5rem .75rem;
      border-radius: 10px;
      font-weight: 600;
      color: #ffb94a;
      border: solid 1px #ffb94a;
      cursor: pointer;
      &:hover {
        background-color: #ffb94a;
        color: #fff;
        svg {
          stroke: #fff;
          stroke-width: .75;
        }
      }
      svg {
        stroke: #ffb94a;
        stroke-width: .75;
      }
    }
  }
  .data--wrap {
    text-align: center;
    padding: 0 1rem;
  }

  .avatar--content {
    border: 1px solid #f7f7f7;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    width: 100px;
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
      font-weight: 700;
      span {
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
      }
    }
  }
  .user--name {
    color: #444444;
    font-size: 16px;
    font-weight: bold;
  }
  .user--status {
    color: #aaaaaa;
    &.user--active {
      color: #00c853;
    }
  }
  .user--mail {
    color: #444444;
    font-size: 14px;
  }
  .user--data {
    .user--data-desc {
      color: #999;
      font-size: 14px;
      font-weight: 600;
    }
    .user--data-number {
      color: #444;
      font-size: 13px;
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
