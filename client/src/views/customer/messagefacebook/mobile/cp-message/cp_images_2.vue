<template>
  <div class="item item--images text_left ml_auto p_0">
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
  </div>
</template>
<style lang="scss" scoped>
.item--images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  img {
    width: 100%;
    max-width: 100%;
    border-radius: 3px;
  }
}
</style>
