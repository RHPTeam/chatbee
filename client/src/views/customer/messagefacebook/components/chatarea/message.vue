<template>
  <div class="message--item" :data-theme="currentTheme">Lorem ipsum dolor sit amet</div>
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

<style lang="scss" scoped>
@import "./style";
</style>
