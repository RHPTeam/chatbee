<template>
  <div class="main">
    <!--Layout Desktop-->
    <div class="main--wrap d_none d_md_block">
      <!--main top-->
      <div class="main--top d_flex align_items_center p_4">
        <div class="exp--account">
          Tài khoản của bạn hết hạn vào ngày: 11/11/11
        </div>
        <div class="renewed--account ml_auto">Gia hạn</div>
      </div>
      <!--main contetn-->
      <div class="main--content">
        <div class="r">
          <div class="c_8">
            <div>Thông tin cá nhân</div>
            <form>
              <div class="user--email">example@gmail.com</div>
              <div class="r">
                <div class="c_6 form_group">
                  <label>Tên</label>
                  <input
                    type="text"
                    value="Nguyễn Văn A"
                    class="form_control"
                  />
                </div>
                <div class="c_6 form_group">
                  <label>Số điện thoại</label>
                  <input type="text" value="0986167832" class="form_control" />
                </div>
              </div>
              <div class="r">
                <div class="c_6 form_group">
                  <label>Mật khẩu</label>
                  <input
                    type="text"
                    placeholder="Nhập mật khẩu mới"
                    class="form_control"
                  />
                </div>
                <div class="c_6 form_group">
                  <label>Xác nhận mật khẩu</label>
                  <input
                    type="text"
                    placeholder="Xác nhận mật khẩu mới"
                    class="form_control"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="c_4">
            <div class="d_flex">
              <div>Ảnh đại diện</div>
              <div>icon</div>
            </div>
            <div class="position_relative">
              <div class="main--av position_absolute"></div>
              <div class="main--av-img position_absolute">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main--option">
        <div class="r">
          <div class="option--theme c_6">
            <h4>Chủ đề</h4>
            <div class="auto--change r">
              <div class="c_5">Tự động điều chỉnh</div>
              <div class="c_7">nút điều chỉnh</div>
            </div>
            <div class="theme--title">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Expedita, voluptas?
            </div>
            <div class="r">
              <div class="c_6">theme light</div>
              <div class="c_6">theme dark</div>
            </div>
            <div class="r">
              <div class="c_6">options</div>
              <div class="c_6">options dark</div>
            </div>
          </div>
          <div class="option--sytem c_6">
            <h4>Thiết lập hệ thống</h4>
            <div class="r">
              <div class="c_5">Gợi ý mẹo hay</div>
              <div class="c_7">on off</div>
            </div>
            <div class="r">
              <div class="c_5">Hướng dẫn</div>
              <div class="c_7">on off</div>
            </div>
          </div>
        </div>
      </div>
      <!--<form @submit.prevent="updateUser">-->
      <!--<div class="form-group form_inline">-->
      <!--<label> Tên người dùng :</label>-->
      <!--<input-->
      <!--type="text"-->
      <!--class="form_control"-->
      <!--placeholder="Nhập tên của bạn"-->
      <!--v-model="user.name"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-group form_inline">-->
      <!--<label> Số điện thoại :</label>-->
      <!--<input-->
      <!--type="text"-->
      <!--class="form_control"-->
      <!--placeholder="Nhập số điện thoại của bạn"-->
      <!--v-model="user.phone"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-group form_inline">-->
      <!--<label> Mật khẩu hiện tại :</label>-->
      <!--<input-->
      <!--type="password"-->
      <!--class="form_control"-->
      <!--placeholder="Nhập mật khẩu hiện tại của bạn"-->
      <!--v-model="oldPassword"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-group form_inline">-->
      <!--<label> Mật khẩu mới :</label>-->
      <!--<input-->
      <!--type="password"-->
      <!--class="form_control"-->
      <!--placeholder="Nhập mật khẩu của bạn"-->
      <!--v-model="newPassword"-->
      <!--/>-->
      <!--</div>-->
      <!--<div class="form-group form_inline">-->
      <!--<label> Nhập lại mật khẩu mới :</label>-->
      <!--<input-->
      <!--type="password"-->
      <!--class="form_control"-->
      <!--placeholder="Nhập lại mật khẩu của bạn"-->
      <!--v-model="reNewPassword"-->
      <!--/>-->
      <!--</div>-->
      <!--<button type="submit" class="btn btn_primary">-->
      <!--Cập nhật tài khoản-->
      <!--</button>-->
      <!--</form>-->
      <!--<button class="btn btn_danger" @click="logOut">-->
      <!--Logout Test Cookie Path-->
      <!--</button>-->
    </div>
    <!--Layouts Mobile-->
    <div class="main--wrap-mobile d_block d_md_none">
      Nội dung layouts mobile
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--data() {-->
<!--return {-->
<!--newPassword: "",-->
<!--reNewPassword: "",-->
<!--oldPassword: "",-->
<!--isCompare: false-->
<!--};-->
<!--},-->
<!--computed: {-->
<!--user() {-->
<!--return this.$store.getters.userInfo;-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--async logOut() {-->
<!--await this.$store.dispatch("logOut");-->
<!--this.$router.push("/signin");-->
<!--},-->
<!--async updateUser() {-->
<!--this.isComparePassword();-->
<!--if (this.isCompare) {-->
<!--const passwordSender = {-->
<!--password: this.oldPassword,-->
<!--newPassword: this.newPassword-->
<!--};-->
<!--this.$store.dispatch("changePassword", passwordSender);-->
<!--}-->
<!--this.$store.dispatch("updateUser", this.user);-->
<!--},-->
<!--isComparePassword() {-->
<!--if (this.newPassword == "" || this.reNewPassword == "")-->
<!--return (this.isCompare = false);-->
<!--if (this.newPassword !== this.reNewPassword)-->
<!--return (this.isCompare = false);-->
<!--return (this.isCompare = true);-->
<!--}-->
<!--}-->
<!--};-->
<!--</script>-->
