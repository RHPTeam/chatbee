<template>
  <div class="main p_3">
    <div class="null--container d_flex">
      <span class="null--image mr_3 mt_2">
        <img :src="nullImage" alt="Null Image" />
      </span>
      <div class="null--text">
        Tính năng chiến dịch cho phép bạn chủ động tiếp cận với khách hàng của
        mình. Lọc khách hàng của bạn dựa trên các thuộc tính của họ và gửi tin
        nhắn được cá nhân hóa. Bắt đầu bằng cách chọn loại chiến dịch bạn muốn
        gửi ở bên trái.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nullImage: require("@/assets/images/broadcast_null.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.null--container {
  width: 60%;
  border-radius: 7px;
  background-color: #27292c;
  padding: 32px;
  margin: 0 auto;
  position: relative;
  .null--image {
    img {
      height: 48px;
      width: 48px;
    }
  }
  .null--text {
    line-height: 2;
    text-align: left;
  }
}
</style>
