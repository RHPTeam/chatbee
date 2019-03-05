<template>
  <div class="auto--content-header d_flex align_items_center mb_3">
    <h4>Mặc định</h4>
    <div class="icon--drop ml_auto">
      <icon-base class="icon--remove" icon-name="plus" width="26" height="26" viewBox="0 0 20 20">
        <icon-remove/>
      </icon-base>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
export default {
  components: {
    IconBase,
    IconRemove
  }
};
</script>
<style lang="scss" scoped>
.auto--content-header {
  h4 {
    font-size: 30px;
    font-weight: 600;
    color: #444444;
  }
}
</style>

