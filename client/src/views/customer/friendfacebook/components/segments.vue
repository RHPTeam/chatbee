<template>
  <div class="segments">
    <segments-list
      @groupSelected="groupSelected = $event"
      :groupSelected="groupSelected"
    ></segments-list>
    <segments-attribute
      :selectFilter="selectFilter"
      @openResultsFilter="selectFilter = $event"
      @hiddenDefault="resultsDefault = $event"
    ></segments-attribute>
    <segments-content
      :groupSelected="groupSelected"
      :selectFilter="selectFilter"
      :resultsDefault="resultsDefault"
    ></segments-content>
  </div>
</template>

<script>
import SegmentsList from "./segments/segments-list/segments-list";
import SegmentsAttribute from "./segments/segments-attribute/segments-attribute";
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
      selectFilter: false,
      resultsDefault: true
    };
  }
};
</script>

<style lang="scss" scoped>
.segments {
  font-size: 14px;
  text-align: left;
}
</style>
