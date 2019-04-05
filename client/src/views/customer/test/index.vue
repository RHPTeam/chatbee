<template>
<div>
  <contenteditable tag="div" :contenteditable="isEditable" v-model="hehe" />
  <span>{{ hehe }}</span>
</div>
</template>

<script>
import Contenteditable from "../../../components/contenteditable/index";
export default {
  data () {
    return {
      hehe: "cak"
    }
  },
  components: { Contenteditable }
};
</script>
