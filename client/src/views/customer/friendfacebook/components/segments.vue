<template>
  <div class="segments">
    <segments-list />
    <segments-attribute />
    <segments-content />
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
  }
};
</script>

<style lang="scss" scoped>
.segments {
  font-size: 14px;
  text-align: left;
}
</style>
