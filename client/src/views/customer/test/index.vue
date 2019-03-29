<template>
  <div id="app">
    <app-dragg :works="data" />
    <zoom/>
  </div>
</template>
<script>
import AppDragg from "@/components/shared/draggable_library";
export default {
  components: {
    AppDragg
  },
  data() {
    return {
      data: [
        {
          id: 1,
          title: "ABC",
          done: true
        }
      ]
    };
  }
};
</script>
