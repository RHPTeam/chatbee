<template>
  <div class="libraries" :data-theme="currentTheme">
    <div class="libraries--desc">Thư viện</div>
    <div class="gallery">
      <div class="gallery--item">
        <img src="http://cssslider.com/sliders/demo-22/data1/images/poppy571634_1280.jpg">
      </div>
      <div class="gallery--item">
        <img
          src="https://thietkewebhv.com/wp-content/uploads/2017/01/us-placeholder-portrait-1-600x600.jpg"
        >
      </div>
      <div class="gallery--item">
        <img
          src="https://ae01.alicdn.com/kf/HTB1ACsSIFXXXXXvXVXXq6xXFXXXQ/Flores-artificiales-rosas-rojas-5-piezas-de-aspecto-Real-de-toque-de-terciopelo-falso-Rosa-W.jpg"
        >
      </div>
      <div class="gallery--item">
        <img src="http://cssslider.com/sliders/demo-22/data1/images/rose574023_1280.jpg">
      </div>
      <div class="gallery--item">
        <img src="http://www.baiviet.net/Files/234629/61928org_58077.jpg">
      </div>
      <div class="gallery--item">
        <img
          src="http://pluspng.com/img-png/purple-and-pink-flowers-png-purple-roses-watercolor-green-leaves-yellow-flowers-png-image-and-clipart-600.jpg"
        >
      </div>

      <div class="gallery--item">
        <img
          src="https://ae01.alicdn.com/kf/HTB1ACsSIFXXXXXvXVXXq6xXFXXXQ/Flores-artificiales-rosas-rojas-5-piezas-de-aspecto-Real-de-toque-de-terciopelo-falso-Rosa-W.jpg"
        >
      </div>
      <div class="gallery--item">
        <img
          src="https://thietkewebhv.com/wp-content/uploads/2017/01/us-placeholder-portrait-1-600x600.jpg"
        >
      </div>
      <div class="gallery--item">
        <img src="http://cssslider.com/sliders/demo-22/data1/images/poppy571634_1280.jpg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.libraries {
  padding: 20px;
  .libraries--desc {
    font-size: 12px;
    margin-top: -5px;
    margin-bottom: 20px;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    img {
      width: 100%;
      max-width: 100%;
      border-radius: 3px;
    }
  }
}
/* ChangeColor */
// Light
.libraries[data-theme="light"] {
  .libraries--desc {
    color: #999;
  }
}

//Dark
.libraries[data-theme="dark"] {
  .libraries--desc {
    color: #ccc;
  }
}
</style>
