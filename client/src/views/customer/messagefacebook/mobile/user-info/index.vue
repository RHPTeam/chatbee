<template>
  <div class="main--wrap position_fixed">
    <div class="main position_relative">
      <!-- Menu come back chat -->
      <div class="user--info-top position_absolute">
        <div class="p_2" @click="closeInfo">back</div>
      </div>
      <!-- Infomation user -->
      <div class="user--info pt_5">
        <!-- Avatar and nam user -->
        <div class="user--info-avatar text_center">
          <img
            src="https://wikicachlam.com/wp-content/uploads/2018/05/tong-hop-nhung-hinh-anh-dep-nhat-cua-bo-cong-anh-30-1.jpeg"
            width="150px"
            height="150px"
            alt="avatar-user"
          />
          <h4 class="mt_2">Le Khang</h4>
          <p>Hoạt động 10 phút trước</p>
        </div>
        <!-- Name and number phone -->
        <div class="info--personal p_2">
          <div class="info info--newfeed mb_3">
            <div class="d_flex align_items_center">
              <div class="list--icon mr_2">
                <icon-base
                  icon-name="icon-user"
                  width="28"
                  height="23"
                  viewBox="0 0 18 18"
                >
                  <icon-user />
                </icon-base>
              </div>
              <div class="option--name text_left pb_2">Xem trang cá nhân</div>
            </div>
          </div>
          <div class="info info--newfeed mb_3">
            <div class="d_flex align_items_center">
              <div class="list--icon mr_2">
                <icon-base
                  icon-name="icon-sile"
                  width="28"
                  height="23"
                  viewBox="0 0 28 28"
                >
                  <icon-smile />
                </icon-base>
              </div>
              <div class="option--name text_left pb_2">
                Xoá cuộc trò chuyện
              </div>
            </div>
          </div>
        </div>
        <!--General photos-->
        <h3 class="photo--title text_left pl_2">Ảnh chung</h3>
        <div class="general--photos p_2">
          <div class="photo--item">
            <img
              src="http://images.ndh.vn/Images/Uploaded/Share/2018/08/06/bb8D2.PNG"
              alt=""
            />
          </div>
          <div class="photo--item">
            <img
              src="http://images.ndh.vn/Images/Uploaded/Share/2018/08/06/bb8D2.PNG"
              alt=""
            />
          </div>
          <div class="photo--item">
            <img
              src="http://images.ndh.vn/Images/Uploaded/Share/2018/08/06/bb8D2.PNG"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconUser from "@/components/icons/IconUser";
import IconSmile from "@/components/icons/IconSmile";
export default {
  props: ["isShowInfo"],
  methods: {
    closeInfo() {
      this.$emit("closeInfo", false);
    }
  },
  components: {
    IconBase,
    IconUser,
    IconSmile
  }
};
</script>
<style lang="scss" scoped>
@import "./info_mobile.style";
</style>
