<template>
  <div class="sender gallery" v-if="item.typeContent === 'image'">
    <div class="gallery--item">
      <img :src="item.valueContent" @click="isZoom = !isZoom" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
