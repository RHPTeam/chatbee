<template>
  <div class="segments--attribute mt_3" :data-theme="currentTheme">
    <div class="segments--attribute-item">
      <div class="attribute--form mr_2 pl_3">
        <app-filter />
      </div>

      <div class="attribute--action mr_3">
        <div class="btn--add-attribute">
          <icon-base
            class="icon--add mr_1"
            icon-name="plus"
            width="14"
            height="14"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>

      <div class="attribute--remove">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import AppFilter from "@/components/shared/filter";

export default {
  components: {
    IconBase,
    IconPlus,
    IconRemove,
    AppFilter
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./segments-attribute"
</style>
