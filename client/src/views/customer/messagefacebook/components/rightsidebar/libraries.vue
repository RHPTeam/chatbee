<template>
  <div class="libraries" :data-theme="currentTheme">
    <div class="libraries--desc">Thư viện</div>
    <div class="gallery">
      <div class="gallery--item"
          v-for="(item, index) in imageList"
          :key="index"
      >
        <img
          :src="item.valueContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    imageList() {
      if (this.curConversation === undefined 
          || this.curConversation.contents === undefined
          || this.curConversation.contents === null) return;
      else {
        return this.curConversation.contents.filter(item => {
          if (item === null || item.typeContent !== "photo") return;
          return true;
        });
      }
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
