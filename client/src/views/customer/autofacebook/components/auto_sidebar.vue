<template>
  <div class="auto--sidebar-wrap p_4">
    <auto-header/>
    <auto-search/>
    <div class="auto--list r d_flex align_items_center">
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div class="auto--list-item">Mặc định</div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div class="auto--list-item">Lời chào</div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div class="auto--list-item">Tư vấn sản phẩm</div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div class="auto--list-item auto--list-plus">
          <icon-base class="icon--add" icon-name="plus" width="16" height="16" viewBox="0 0 60 60">
            <icon-plus/>
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import AutoHeader from "./autosidebar/auto_sidebar_header";
import AutoSearch from "./autosidebar/auto_sidebar_search";
export default {
  components: {
    IconBase,
    IconPlus,
    AutoHeader,
    AutoSearch
  }
};
</script>
<style lang="scss" scoped>
 @import "../auto_facebook.style";
</style>


