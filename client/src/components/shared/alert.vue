/* CONFIG ALERT FILE VUE */
<template>
  <div class="alert d_block text_left mt_3" :class="type" v-if="message != ''">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: ["message", "type"]
};
</script>
