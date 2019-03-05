<template>
  <div class="auto--search mb_4">
    <div class="input--wrap position_relative">
      <div class="search--icon position_absolute">
        <icon-base
          icon-name="input-search"
          width="16.772"
          height="17.287"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
      <input type="text" placeholder="Nhập tên nhóm, từ khóa, hoặc tên kịch bản" />
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
export default {
  components: {
    IconBase,
    IconInputSearch
  }
};
</script>

<style scoped lang="scss">
.auto--search {
  input {
    border-radius: 10px;
    background-color: #f7f7f7;
    padding: 8px 15px;
    padding-left: 50px;
    width: 100%;
    border: 0;
    outline: 0;
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #999;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #999;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: #999;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #999;
  }
  .search--icon {
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    color: #999;
  }
}
@media (max-width: 1025px) {
  .auto--search {
    padding-top: 33px;
    padding-bottom: 33px;
    input {
      display:none;
    }
  }
}
</style>
