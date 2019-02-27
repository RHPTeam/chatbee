<template>
  <div class="group-type-script" :data-theme="currentTheme">
    <div v-for="item_type_script in list_type_script" :key="item_type_script.id" class="item-type-script ">
      <div class="type-script-name d_flex align_items_center">
        <icon-base
          icon-name="icon-sort-down"
        class="icon-sort-down" width="9.431" height="5.506" viewBox="0 0 9.431 5.506"
        >
        <icon-sort-down/>
        </icon-base>

        {{item_type_script.title}}
      </div>
      <div class="group-scripts r">
        <div v-for="(item_script ,index)  in item_type_script.list_script" :key="index"
             class="item-script c_4 text_center ">
        <span>
        {{item_script.name}}
        </span>
        </div>
      </div>
    </div>
    <div class="add-type-script d_flex align_items_center">
      <icon-base
        class="icon--add"
        icon-name="plus"
        width="9"
        height="9"
        viewBox="0 0 60 60"
      >
        <icon-plus/>
      </icon-base>
      Thêm nhóm mới
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconSortDown from '@/components/icons/IconSortDown';
import IconPlus from "@/components/icons/IconPlus";

export default {
  components: {IconBase, IconSortDown, IconPlus},
  data() {
    return {
      list_type_script: [
        {
          id: 1,
          title: 'Nhóm kịch bản 1',
          list_script: [
            {name: 'Mua táo'},
            {name: 'Mua cam'},
            {name: 'Mua lê'},
            {name: 'Mua dưa'},
            {name: 'Mua nho'},
            {name: 'Mua quýt'}
          ],
        },
        {
          id: 2,
          title: 'Nhóm kịch bản 2',
          list_script: [
            {name: 'Mua táo'},
            {name: 'Mua cam'},
            {name: 'Mua nho'},
            {name: 'Mua quýt'}
          ],
        },
        {
          id: 3,
          title: 'Nhóm kịch bản 3',
          list_script: [
            {name: 'Mua táo'},
            {name: 'Mua cam'},
            {name: 'Mua lê'},
            {name: 'Mua dưa'},
            {name: 'Mua quýt'}
          ],
        },
        {
          id: 4,
          title: 'Nhóm kịch bản 4',
          list_script: [
            {name: 'Mua táo'},
            {name: 'Mua cam'},
            {name: 'Mua lê'},
            {name: 'Mua dưa'},
            {name: 'Mua nho'},
            {name: 'Mua quýt'}
          ],
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
}
</script>

<style lang="scss" scoped>
.group-type-script {
  background-color: #fff;
  height: 100%;
  padding: 20px 32px;

  .item-type-script + .item-type-script .type-script-name {
    margin-top: 12px;
  }

  .add-type-script {
    margin-top: 12px;

    svg {
      margin-bottom: 4px;
    }
  }

  .type-script-name, .add-type-script {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: uppercase;
    text-align: left;

    svg {
      margin-right: 5px
    }
  }
}

.item-script {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  padding: 0;

  span {
    border-radius: 10px;
    display: block;
    font-size: 14px;
    margin: 5px;
    padding: 10px;
    -webkit-transition: background-color 0.5s;
    -moz-transition: background-color 0.5s;
    -ms-transition: background-color 0.5s;
    -o-transition: background-color 0.5s;
    transition: background-color 0.5s;
  }
}

/*Color, Background*/
div[data-theme="light"] {
  .item-type-script {
    .type-script-name, .add-type-script {
      color: #666666;
    }
  }

  .item-script {
    &:hover, &:active, &.active {
      span {
        background-color: #FFB94A;
        color: #fff;
      }
    }

    span {
      background: #F7F7F7;
    }
  }
}
</style>
