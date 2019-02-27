<template>
  <div class="main">
    <div class="main--wrap">
      <div class="d_block d_md_none">
        <app-mobile />
      </div>
      <div class="d_none d_md_block">
        <h1>Cập nhật thông tin tài khoản</h1>
        <div>
          Tài khoản của bạn hết hạn vào <b style="color: red;">11/11/11</b>
        </div>
        <form @submit.prevent="updateUser">
          <div class="form-group form_inline">
            <label> Tên người dùng :</label>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên của bạn"
              v-model="user.name"
            />
          </div>
          <div class="form-group form_inline">
            <label> Số điện thoại :</label>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập số điện thoại của bạn"
              v-model="user.phone"
            />
          </div>
          <div class="form-group form_inline">
            <label> Mật khẩu hiện tại :</label>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập mật khẩu hiện tại của bạn"
              v-model="oldPassword"
            />
          </div>
          <div class="form-group form_inline">
            <label> Mật khẩu mới :</label>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập mật khẩu của bạn"
              v-model="newPassword"
            />
          </div>
          <div class="form-group form_inline">
            <label> Nhập lại mật khẩu mới :</label>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập lại mật khẩu của bạn"
              v-model="reNewPassword"
            />
          </div>
          <button type="submit" class="btn btn_primary">
            Cập nhật tài khoản
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AppMobile from "./mobile";
export default {
  data() {
    return {
      newPassword: "",
      reNewPassword: "",
      oldPassword: "",
      isCompare: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    async updateUser() {
      this.isComparePassword();
      if (this.isCompare) {
        const passwordSender = {
          password: this.oldPassword,
          newPassword: this.newPassword
        };
        this.$store.dispatch("changePassword", passwordSender);
      }
      this.$store.dispatch("updateUser", this.user);
    },
    isComparePassword() {
      if (this.newPassword == "" || this.reNewPassword == "")
        return (this.isCompare = false);
      if (this.newPassword !== this.reNewPassword)
        return (this.isCompare = false);
      return (this.isCompare = true);
    }
  },
  components: {
    AppMobile
  }
};
</script>
