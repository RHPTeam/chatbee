<template>
  <div class="auto--main-content text_left">
    <div class="r mb_4">
      <div class="c_md_6 c_xl_6">
        <div class="divide--title mb_3">Từ khóa</div>
        <div class="auto--add-key form_control mr_2" contenteditable="true">
          Nhập từ khóa, nhấn "enter" để nhập thêm từ mới
        </div>
      </div>
      <div class="c_md_6 c_xl_6">
        <div class="auto--answer">
          <div class="divide--title mb_3">Trả lời</div>
          <div class="auto--answer-add">
            <!--Nhập văn bản trả lời-->
            <div v-if="isOpenDocument == true" class="auto--add-created">
              <div class="auto--add-document d_flex align_items_center mb_2">
                <div
                  class="auto--add-choose form_control mr_2"
                  contenteditable="true"
                >
                  Nhập văn bản
                </div>
                <div
                  @click="isOpenDocument = false"
                  class="close---add ml_auto"
                >
                  <icon-base
                    class="icon--cancel"
                    icon-name="cancel"
                    width="10"
                    height="10"
                    viewBox="0 0 15.642 15.642"
                  >
                    <icon-cancel />
                  </icon-base>
                </div>
              </div>
            </div>

            <!--Chọn kịch bản-->
            <div v-if="isOpenScript == true" class="auto--add-created">
              <div
                class="auto--add-script d_flex align_items_center position_relative mb_2"
              >
                <div
                  class="auto--add-choose form_control mr_2"
                  contenteditable="true"
                >
                  Chọn một kịch bản
                </div>
                <div @click="isOpenScript = false" class="close---add ml_auto">
                  <icon-base
                    class="icon--cancel"
                    icon-name="cancel"
                    width="10"
                    height="10"
                    viewBox="0 0 15.642 15.642"
                  >
                    <icon-cancel />
                  </icon-base>
                </div>
                <!--Danh sách kịch bản khi người dùng nhập chữ-->
                <ul class="list--script position_absolute">
                  <li>Mua Cam</li>
                  <li>Mua Cam</li>
                </ul>
                <!--Kết thúc danh sách kịch bản khi người dùng nhập chữ-->
              </div>
            </div>
            <!--Tiêu đề hiển thị chọn văn bản hoặc kịch bản-->
            <div class="d_flex">
              <div class="auto--icon-add">
                <icon-base
                  class="icon--plus"
                  icon-name="plus"
                  width="18"
                  height="18"
                  viewBox="0 0 80 80"
                >
                  <icon-plus />
                </icon-base>
              </div>
              <div class="auto--add-title ml_2">
                Thêm
                <a
                  href="javascript:void(0);"
                  @click="isOpenDocument = !isOpenDocument"
                  >kịch bản</a
                >
                hoặc
                <a
                  href="javascript:void(0);"
                  @click="isOpenScript = !isOpenScript"
                  >Văn bản</a
                >
                trả lời
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="form_group c_12">
        <div class="divide--title mb_3">Tài khoản áp dụng</div>
          <ul class="list--user">
            <li class="list--user-item selected">
              <div class="d_flex">
                <div class="images--avatar mr_2">
                  <img
                    src="http://thuthuat123.com/uploads/2018/01/27/Avatar-dep-nhat-75_112148.jpg"
                    alt=""
                  />
                </div>
                <div>Yen Ngao</div>
              </div>
            </li>
            <li class="list--user-item">
              <div class="d_flex">
                <div class="images--avatar mr_2">
                  <img
                    src="http://thuthuat123.com/uploads/2018/01/27/Avatar-dep-nhat-75_112148.jpg"
                    alt=""
                  />
                </div>
                <div>Yen Ngao</div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpenDocument: false,
      isOpenScript: false
    };
  },
  computed: {
    syntax() {
      return this.$store.getters.syntax;
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../../auto_facebook.style";
</style>
