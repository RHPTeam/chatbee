<template>
  <div class="wrapper">
    <div class="grid">
      <div class="grid--header d_flex justify_content_between align_items_center mb_1">
        <div class="d_flex align_items_center">
          <input
            type="checkbox"
            class="grid--header-checkall checkbox"
            name
            value
            v-model="selectAll"
          >
          <div class="grid--header-remove ml_4">
            <icon-base icon-name="remove" width="15" height="15" viewBox="0 0 15 15">
              <icon-remove/>
            </icon-base>
          </div>
        </div>
        <div class="grid--header-select">Đã chọn {{selected.length}} tài khoản</div>
      </div>
      <div class="grid--content p_3">
        <div class="ct_f p_0">
          <div class="r">
            <div class="c_md_3 pl_3 pr_3" v-for="account in accounts" :key="account.id">
              <div class="user text_center p_3">
                <div class="text_right">
                  <input type="checkbox" class="checkbox" name v-model="selected" :value="accounts.id">
                </div>
                <div class="d_flex justify_content_center align_items_center">
                  <div class="user--name">{{ account.name }}</div>
                  <div class="user--status ml_2">
                    <icon-base icon-name="check-active" width="20" height="20" viewBox="0 0 20 20">
                      <icon-check-active/>
                    </icon-base>
                  </div>
                </div>
                <div class="user--mail mb_3">{{ account.email }}</div>
                <div class="user--avatar mt_2 mb_3" @click="showInfo = true">
                  <img :src="account.avatar" width="120" alt="User Avatar">
                </div>
                <div class="d_flex justify_content_between align_items_center data--wrap">
                  <div class="user--data">
                    <div class="user--data-desc">Hoạt động</div>
                    <div class="user--data-number mt_1 mb_1">{{ account.time }}</div>
                  </div>
                  <div class="user--data">
                    <div class="user--data-desc">Giới hạn</div>
                    <div class="user--data-number mt_1 mb_1">{{ account.account_limit }} tài khoản</div>
                  </div>
                </div>
                <div class="user--edit mt_3">
                  <button @click="showEdit = true">Chỉnh sửa</button>
                </div>
              </div>
              <transition name="popup">
                <add-edit v-if="showEdit == true" :account="account" :popupData="showEdit" @closeAddEdit="showEdit = $event"/>
              </transition>
              <transition name="popup">
                <add-info v-if="showInfo == true" :account="account" :popupData="showInfo" @closeAddInfo="showInfo = $event"/>
              </transition>
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
import IconRemove from "@/components/icons/IconRemove";

import AddEdit from "./dialog-edit";
import AddInfo from "./dialog-info";
export default {
  props: ["accounts"],
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
      selected: []
    };
  },
  computed: {
    selectAll: {
      get: function() {
        return this.accounts ? this.selected.length == this.accounts.length : false;
      },
      set: function(value) {
        var selected = [];

        if (value) {
          this.accounts.forEach(function(user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
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
  .user--avatar {
    cursor: pointer;
  }
  .user--name {
    color: #3d3d3d;
    font-size: 16px;
    font-weight: bold;
  }
  .user--status {
    color: #56e8bd;
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
</style>
