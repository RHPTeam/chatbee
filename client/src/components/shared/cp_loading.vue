<template>
  <div class="">
    <img :src="imageLoading" alt="Loading data" />
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
<style scoped lang="scss">
img {
  width: 10%;
}
// Friends
.friend {
  img {
    width: 4%;
  }
  span {
    font-size: 14px;
  }
}
</style>
