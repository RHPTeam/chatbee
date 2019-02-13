<template>
  <div class="main">
    <h1>Cập nhật thông tin tài khoản</h1>
    <div>Tài khoản của bạn hết hạn vào <b style="color: red;">11/11/11</b></div>
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
        />
      </div>
      <div class="form-group form_inline">
        <label> Mật khẩu mới :</label>
        <input
          type="password"
          class="form_control"
          placeholder="Nhập mật khẩu của bạn"
        />
      </div>
      <div class="form-group form_inline">
        <label> Nhập lại mật khẩu mới :</label>
        <input
          type="password"
          class="form_control"
          placeholder="Nhập lại mật khẩu của bạn"
        />
      </div>
      <button type="submit" class="btn btn_primary">Cập nhật tài khoản</button>
    </form>
    <button class="btn btn_danger" @click="logOut">
      Logout Test Cookie Path
    </button>
  </div>
</template>

<script>
import Loading from "@/components/shared/loading";
export default {
  components: {
    Loading
  },
  data() {
    return {
      data: ""
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
    async updateUser () {
      this.$store.dispatch("updateUser",this.user)
    }
  }
};
</script>
