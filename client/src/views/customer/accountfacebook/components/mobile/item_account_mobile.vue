<template>
  <div class="card">
    <div class="card_body">
      <div class="card--content">
        <div class="avatar" @click="isModalDeleteAccount = true">
          <img class="picture" :src="item.userInfo.thumbSrc" />
          <span
            class="status"
            :class="item.status === true ? 'active' : ''"
          ></span>
        </div>
        <h3 class="name">{{ item.userInfo.name }}</h3>
        <button class="btn btn--connect" v-if="item.status == true">
          Đang hoạt động
        </button>
        <!-- if cookie dont use show button-->
        <button
          v-else
          class="btn btn--update"
          @click="isModalUpdateCookie = true"
        >
          Cập nhật
        </button>
      </div>

      <div class="card--footer">
        <div class="left d_none">
          <p>Kết nối lần cuối</p>
          <p>{{ item.updated_at | covertDateUpdatedAt }}</p>
        </div>
      </div>
    </div>
    <!--    Start: Update cookie item account-->
    <transition name="popup">
      <update-cookie-mobile
        :item="item._id"
        v-if="isModalUpdateCookie === true"
        :popupData="isModalUpdateCookie"
        @closeAddPopup="isModalUpdateCookie = $event"
        :nameBread="nameUpdatePopup"
        :subBread="descUpdatePopup"
      />
    </transition>
    <!--    End: update cookie item account-->
    <!--    Start: delete item account-->
    <transition name="popup">
      <m-del-item
        v-if="isModalDeleteAccount === true"
        :item="item"
        desc="Bạn có chắc chắn muốn xóa tài khoản này không?"
        @close="isModalDeleteAccount = $event"
      />
    </transition>
    <!--    End: delete item account-->
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      isModalUpdateCookie: false,
      isModalDeleteAccount: false,
      nameUpdatePopup: "Cập nhật mã kích hoạt",
      descUpdatePopup:
        "Dán mã kích hoạt Facebook vào ô bên dưới để cập nhật lại mã kích hoạt tài khoản."
    };
  },
  methods: {
    deleteAccountFB() {
      console.log("hello");
    }
  },
  filters: {
    covertDateUpdatedAt(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = minutes + "0";
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "list_account_mobile";
</style>
