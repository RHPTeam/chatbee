<template>
  <div class="item item--images text_left ml_auto p_0">
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <img src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg" alt="" />
    <div class="images--more d_flex align_items_center">
      <div class="icon--more text_center m_auto">
        <icon-base
          icon-name="icon-more"
          width="23"
          height="23"
          viewBox="0 0 58 58"
        >
          <icon-plus />
        </icon-base>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
export default {
  components: {
    IconBase,
    IconPlus
  }
};
</script>
<style lang="scss" scoped>
.item--images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3px;
  /*max-width: 65%;*/
  img {
    width: 100%;
    max-width: 100%;
    border-radius: 5px;
  }
  .images--more {
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    .icon--more {
      svg {
        color: #999999;
        margin: auto;
      }
    }
  }
}
</style>
