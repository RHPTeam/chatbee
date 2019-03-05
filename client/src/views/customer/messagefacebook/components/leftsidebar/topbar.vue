<template>
  <div class="topbar d_flex justify_content_between align_items_center">
    <div class="change--account">
      <icon-base
        icon-name="change-account"
        width="26"
        height="26"
        viewBox="0 0 15.02 17.34"
      >
        <icon-change-account />
      </icon-base>
    </div>
    <div class="fb--account d_flex justify_content_start align_items_center">
      <div class="fb--account-avatar">
        <img
          src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
          width="40"
          alt="User Avatar"
        />
      </div>
      <span class="fb--account-name">Emily Rose</span>
    </div>
    <div class="new--message">
      <icon-base
        icon-name="new-message"
        width="26"
        height="26"
        viewBox="0 0 20.6 20.2"
      >
        <icon-new-message />
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import IconNewMessage from "@/components/icons/IconNewMessage";
export default {
  components: {
    IconBase,
    IconChangeAccount,
    IconNewMessage
  }
};
</script>

<style scoped lang="scss">
.topbar {
  height: 57.5px;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding: 2.5px 20px 15px 20px;
  margin-top: 12.5px;
  margin-right: -1px;
  .fb--account-name {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: #666666;
  }
  .change--account,
  .new--message {
    color: #ffb94a;
    cursor: pointer;
  }
}
@media (max-width: 1025px) {
  .topbar {
    .change--account {
      display: none;
    }
    .fb--account {
      .fb--account-name {
        display: none;
      }
      img {
        width: 50px;
      }
    }
    .new--message {
      display: none;
    }
  }
}
</style>
