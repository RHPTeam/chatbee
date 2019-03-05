<template>
  <div class="auto--main-content text_left">
    <div class="r mb_4">
      <div class="c_md_6 c_xl_6">
        <div class="divide--title mb_3">Từ khóa</div>
        <textarea class="form_control">Nhập từ khóa, nhấn "enter" để nhập thêm từ mới</textarea>
      </div>
      <div class="c_md_6 c_xl_6">
        <div class="auto--answer">
          <div class="divide--title mb_3">Trả lời</div>
          <div class="auto--answer-add">
            <div class="d_flex">
              <div class="auto--icon-add">
                <icon-base
                  class="icon--plus"
                  icon-name="plus"
                  width="18"
                  height="18"
                  viewBox="0 0 80 80"
                >
                  <icon-plus/>
                </icon-base>
              </div>
              <div class="auto--add-title ml_2">
                Thêm
                <a href="#">kịch bản</a> hoặc
                <a href="#">Văn bản</a> trả lời
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="form_group c_12">
        <label class="divide--title mb_3">Tài khoản</label>
        <input type="text" placeholder="Nhập tên tài khoản" class="form_control">
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
export default {
  components: {
    IconBase,
    IconPlus
  }
};
</script>
<style lang="scss" scoped>
.form_control {
  border: 8px solid #f7f7f7;
  border-radius: 10px;
  &:focus,
  &:active,
  &:visited,
  &:hover {
    outline: 0;
    box-shadow: none;
  }
}
textarea {
  height: 130px;
  min-height: 130px;
  min-width: 100%;
  max-width: 100%;
}
input {
  height: 46px;
}
.auto--answer-add {
  width: 100%;
  height: 130px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 16px 21px;
  .auto--icon-add {
    svg {
      margin-bottom: -5px;
    }
  }
}
</style>

