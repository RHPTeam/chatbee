<template>
  <div class="">
    <img :src="imageLoading" alt="" />
    <span class="mt_2 d_block">Đang tải dữ liệu</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageLoading: require("@/assets/images/loading.gif")
    };
  }
};
</script>
<style scoped>
img {
  width: 10%;
}
</style>
