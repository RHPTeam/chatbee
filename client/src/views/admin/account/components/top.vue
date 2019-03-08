<template>
  <div class="top d_flex justify_content_between align_items_center">
    <div class="top--search">
      <div class="input--wrap position_relative">
        <div class="search--icon position_absolute">
          <icon-base
            icon-name="input-search"
            width="16.772"
            height="17.287"
            viewBox="0 0 16.772 17.287"
          >
            <icon-input-search/>
          </icon-base>
        </div>
        <input type="text" placeholder="Tìm kiếm">
      </div>
    </div>
    <div class="d_flex justify_content_end align_items_center">
      <div class="top--filter">
        <div class="select--wrapper position_relative">
          <select>
            <option>Trang thái</option>
            <option>phút</option>
            <option>giờ</option>
          </select>
        </div>
      </div>
      <div class="top--layout">
        <div class="layout--list ml_3">
          <icon-base
            icon-name="list"
            width="24" height="18.065" viewBox="0 0 24 18.065"
          >
            <icon-list/>
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
import IconList from "@/components/icons/IconList";
export default {
  components: {
    IconBase,
    IconInputSearch,
    IconList
  }
};
</script>

<style scoped lang="scss">
.top {
  .top--search {
    padding: 18px 20px;
    input {
      width: 260px;
      padding: 7px 16px;
      border-radius: 10px;
      padding-left: 48px;
      border: solid 1px #aaaaaa;
      font-size: 14px;
      outline: 0;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ccc;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #ccc;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #ccc;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #ccc;
    }
    .search--icon {
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      color: #999;
    }
  }
}
</style>