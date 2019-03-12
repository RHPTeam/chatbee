<template>
  <div class="wrapper">
    <div class="user text_center">
      <div class="text_right">
        <input type="checkbox" name value />
      </div>
      <div class="d_flex justify_content_center align_items_center">
        <div class="user--name">Pv Duc</div>
        <div class="user--status ml_2">
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
      <div class="user--mail mb_3">pvduc.dev@gmail.com</div>
      <div class="user--avatar mt_2 mb_2" @click="showInfo = true">
        <img
          src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
          width="120"
          alt="User Avatar"
        />
      </div>
      <div class="d_flex justify_content_between align_items_center">
        <div class="user--data">
          <div class="user--data-desc">Hoạt động</div>
          <div class="user--data-number">20/09/1996</div>
        </div>
        <div class="user--data">
          <div class="user--data-desc">Giới hạn</div>
          <div class="user--data-number">5 tài khoản</div>
        </div>
      </div>
      <div class="user--edit">
        <button @click="showEdit = true">Chỉnh sửa</button>
      </div>
    </div>
    <transition name="popup">
      <add-edit
        v-if="showEdit == true"
        :popupData="showEdit"
        @closeAddEdit="showEdit = $event"
      />
    </transition>
    <transition name="popup">
      <add-info
        v-if="showInfo == true"
        :popupData="showInfo"
        @closeAddInfo="showInfo = $event"
      />
    </transition>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import AddEdit from "./dialog-edit";
import AddInfo from "./dialog-info";
export default {
  components: {
    IconBase,
    IconCheckActive,
    AddEdit,
    AddInfo
  },
  data() {
    return {
      showEdit: "false",
      showInfo: "false"
    };
  }
};
</script>

<style scoped lang="scss"></style>
