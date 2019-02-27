<template>
  <div class="main">
    <!--Layout Desktop-->
    <div class="main--wrap d_none d_md_block">
      <!--main top-->
      <div class="main--top d_flex align_items_center p_4">
        <div class="exp--account">
          Tài khoản hết hạn: 11/11/1111
        </div>
        <div class="renewed--account ml_auto">
          <button>Gia hạn</button>
        </div>
      </div>
      <!--main contetn-->
      <div class="main--content">
        <div class="r">
          <div class="c_8">
            <p>Thông tin cá nhân</p>
            <form>
              <div class="user--email">
                <div class="icon position_absolute">
                  <icon-base icon-name="" viewBox="0 0 20 20"
                  ><icon-user
                  /></icon-base>
                </div>
                <p>example@gmail.com</p>
              </div>
              <div class="r">
                <div class="c_6 form_group">
                  <div class="form_group position_relative">
                    <div class="icon position_absolute">
                      <icon-base icon-name="" viewBox="0 0 20 20"
                      ><icon-user
                      /></icon-base>
                    </div>
                    <input
                            type="text"
                            class="form_control"
                            placeholder="Nhập tên của bạn"
                            v-model="user.name"
                    />
                  </div>
                </div>
                <div class="c_6 form_group">
                  <div class="form_group position_relative">
                    <div class="icon position_absolute">
                      <icon-base icon-name="" viewBox="0 0 20 20"
                      ><icon-user
                      /></icon-base>
                    </div>
                    <input
                            type="text"
                            class="form_control"
                            placeholder="Nhập số điện thoại của bạn"
                            v-model="user.phone"
                    />
                  </div>
                </div>
              </div>
              <p> Mật khẩu</p>
              <div class="r">
                <div class="c_6 form_group">
                  <div class="form_group position_relative">
                    <div class="icon position_absolute">
                      <icon-base icon-name="" viewBox="0 0 20 20"
                      ><icon-user
                      /></icon-base>
                    </div>
                    <div class="icon position_absolute">
                      <icon-base icon-name="" viewBox="0 0 20 20"
                      ><icon-user
                      /></icon-base>
                    </div>
                    <input
                            type="password"
                            class="form_control"
                            placeholder="Nhập mật khẩu của bạn"
                            v-model="newPassword"
                    />
                  </div>
                </div>
                <div class="c_6 form_group">
                  <div class="form_group position_relative input--reNewPass">
                    <div class="icon position_absolute">
                      <icon-base icon-name="" viewBox="0 0 20 20"
                      ><icon-user
                      /></icon-base>
                    </div>
                    <input
                            type="password"
                            class="form_control"
                            placeholder="Nhập lại mật khẩu của bạn"
                            v-model="reNewPassword"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="c_4">
            <div class="d_flex align_content_center">
              <p>Ảnh đại diện</p>
              <div class="ml_auto">
                <div class="position_relative">
                  <div class="icon position_absolute">
                    <icon-base icon-name="" viewBox="0 0 20 20"
                    ><icon-user
                    /></icon-base>
                  </div>
                </div>
              </div>
            </div>
              <div>
                <div class="main--av">
                </div>
                <div class="main--av-img">
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="main--option">
        <div class="r">
          <div class="option--theme c_6">
            <div class="c_6">
              <p>Chủ đề</p>
              <div class="d_flex auto--change">
                <p>Tự động điều chỉnh</p>
                <div class="ml_auto">
                  <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="theme--title">
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita, voluptas?</span>
            </div>
            <div class="option--theme-img r">
              <div class="c_6">
                <div class="d_flex">
                  <div class="theme--light-img"></div>
                </div>
              </div>
              <div class="c_6">
                <div class="d_flex">
                  <div class="theme--dark-img"></div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="c_6">
                <input type="radio" id="one" value="One" v-model="picked">
                <label for="one">One</label>
                <br>
                <input type="radio" id="two" value="Two" v-model="picked">
                <label for="two">Two</label>
                <br>
                <span>Picked: {{ picked }}</span>
              </div>
              <div class="c_6">
                <label class="container">One
                  <input type="radio" checked="checked" name="radio">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="option--sytem c_6">
            <p>Thiết lập hệ thống</p>
            <div class="r">
              <div class="c_6">
                <div class="d_flex auto--change">
                  <p>Gợi ý mẹo hay</p>
                  <div class="ml_auto">
                    <label class="switch">
                      <input type="checkbox">
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="c_6">
                <div class="d_flex auto--change">
                  <p>Hướng dẫn</p>
                  <div class="ml_auto">
                    <label class="switch">
                      <input type="checkbox">
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
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



<script>
    import IconBase from "@/components/icons/IconBase";
    import IconUser from "@/components/icons/IconUser";
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
            IconBase,
            IconUser,

        }
    };
</script>

<style scoped lang="scss">
  @import "./account.scss";
</style>
