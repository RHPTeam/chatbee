<template>
  <div class="segments">
    <segments-list @groupSelected="groupSelected = $event"/>
    <segments-attribute />
    <segments-content :groupSelected="groupSelected"/>
  </div>
</template>

<script>
import SegmentsList from "./segments/segments-list";
import SegmentsAttribute from "./segments/segments-attribute";
import SegmentsContent from "./segments/segments-content";

export default {
  components: {
    SegmentsList,
    SegmentsAttribute,
    SegmentsContent
  },
  data() {
    return {
      groupSelected: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.segments {
  font-size: 14px;
  text-align: left;
}
</style>
