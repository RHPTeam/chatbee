<template>
  <div class="group text_left" :data-theme="currentTheme">
    <div class="d_flex justify_content_between align_items_center">
      <div class="group--desc">Lưu những người dùng đã chọn thành nhóm mới</div>
      <div class="group--radio">
        <input
          id="checkbox"
          class="radio"
          type="checkbox"
          :checked="radio"
          @change="updateValue"
        />
        <label for="checkbox"></label>
      </div>
    </div>
    <div class="group--name" v-if="radio == true">
      <input type="text" placeholder="Nhập tên nhóm" />
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconAddUser from "@/components/icons/IconAddUser";
export default {
  components: {
    IconBase,
    IconAddUser
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      radio: true
    };
  },
  methods: {
    updateValue: function() {
      this.radio = !this.radio;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./save-group";
</style>
