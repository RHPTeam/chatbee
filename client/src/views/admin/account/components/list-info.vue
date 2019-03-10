<template>
  <div class="wrapper">
    <div class="list">
      <div class="list--content pb_2">
        <div class="d_flex justify_content_start align_items_center list--title pb_2 mb_2">
          <div class="list--item item--checkbox">
            <input type="checkbox" class="checkbox" v-model="selectAll">
          </div>
          <div class="list--item item--name">Tên</div>
          <div class="list--item item--mail">Email</div>
          <div class="list--item item--time text_center">Thời gian hoạt động</div>
          <div class="list--item item--account text_center">Giới hạn tài khoản</div>
          <div class="list--item item--status text_center">Status</div>
          <div class="list--item item--action text_right"></div>
        </div>
        <div
          class="d_flex justify_content_start align_items_center pt_1 pb_1 mt_1"
          v-for="account in accounts"
          :key="account.id"
        >
          <div class="list--item item--checkbox">
            <input type="checkbox" class="checkbox" v-model="selected" :value="account.id">
          </div>
          <div class="list--item item--name" @click="showInfo = true">{{ account.name }}</div>
          <div class="list--item item--mail">{{ account.email }}</div>
          <div class="list--item item--time text_center">{{ account.time }}</div>
          <div class="list--item item--account text_center">{{ account.account_limit }}</div>
          <div class="list--item item--status text_center">
            <div
              class="item--status-tag"
              :class="{ enable: account.enable }"
              @click="account.enable = !account.enable"
            >
              <span v-if="account.enable">Enable</span>
              <span v-else>Disable</span>
            </div>
          </div>
          <div class="list--item item--action text_right pr_2">
            <div class="icon--edit" v-if="account.enable" @click="showEdit = true">
              <icon-base icon-name="edit-info" width="16" height="16" viewBox="0 0 24 24">
                <icon-edit-info/>
              </icon-base>
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
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconEditInfo from "@/components/icons/IconEditInfo";
import AddEdit from "./dialog-edit";
import AddInfo from "./dialog-info";
export default {
  props: ["accounts"],
  data() {
    return {
      showEdit: false,
      showInfo: false,
      selected: []
    };
  },
  components: {
    IconBase,
    IconEditInfo,
    AddEdit,
    AddInfo
  },
  computed: {
    selectAll: {
      get: function() {
        return this.accounts
          ? this.selected.length == this.accounts.length
          : false;
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
.list {
  border-bottom: 1px solid #dcdcdc;

  .checkbox {
    border: solid 1px #707070;
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

  .list--content {
    color: #aaaaaa;
    font-size: 14px;
    .list--title {
      border-bottom: 1px solid #dcdcdc;
      color: #3d3d3d;
      font-size: 16px;
      font-weight: bold;
    }

    .item--checkbox {
      height: 16px;
      width: 40px;
    }

    .item--name,
    .item--mail {
      max-width: calc(50% - 240px);
      min-width: calc(50% - 340px);
      width: calc(25% - 60px);
    }
    .item--account,
    .item--time {
      max-width: 260px;
      min-width: 160px;
      width: calc(25% - 60px);
    }
    .item--status,
    .item--action {
      width: 100px;
    }
  }
  .item--status {
    .item--status-tag {
      border: solid 1px #f37978;
      border-radius: 11px;
      color: #f37978;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      height: 22px;
      line-height: 22px;
      width: 84px;

      &.enable {
        border-color: #56e8bd;
        color: #56e8bd;
      }
    }
  }
  .icon--edit {
    color: #56e8bd;
    cursor: pointer;
  }
}
</style>
