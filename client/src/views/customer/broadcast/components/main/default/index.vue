<template>
  <div class="main p_3" :data-theme="themeName">
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
  computed: {
    themeName() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      nullImage: require("@/assets/images/broadcast_null.png")
    };
  }
};
</script>

<style lang="scss" scoped>
/************* CUSTOM CSS COMPONENT ****************/
/**
  * NOTE: U have to code scss with 3 level which mean is 3 indent
   */

.null--container {
  width: 60%;
  border-radius: 7px;
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

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/
div[data-theme="light"] {
  .null--container {
    background-color: rgba(225, 225, 225, 0.3);
  }
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] {
  .null--container {
    background-color: #27292c;
  }
}
</style>
