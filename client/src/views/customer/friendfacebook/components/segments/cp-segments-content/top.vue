<template>
  <div class="top d_flex" :data-theme="currentTheme">
    <div>{{ selectedUIDs }}</div>
    <div class="top--left d_flex">
      <div v-if="groupSelected" class="segment--name mr_1">
        <editable
          class=""
          :value="groupInfo.name"
          @input="groupInfo.name = $event"
          placeholder="Nhập tên..."
        ></editable>
      </div>
      <div class="segment--total">
        <span class="font_weight_bold">0 trong số</span>
        {{ users.length }} người
      </div>
    </div>
    <div class="top--right d_flex">
      <div class="action mr_2">Save to Segment</div>
      <div class="action mr_2">Delete</div>
      <div class="action mr_2">Export</div>
      <div class="action sequence--menu">
        <div
          class="btn--sequence"
          @click="showSequenceDropdown = !showSequenceDropdown"
          v-click-outside="closeSequenceDropdown"
        >
          Sequence
          <icon-base
            class="ml_1"
            icon-name="icon-arrow-down"
            width="14"
            height="14"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="dropdown" v-show="showSequenceDropdown">
          <div class="dropdown--item">Subcribe to Sequence</div>
          <div class="dropdown--item">Unsubcribe from Sequence</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";
export default {
  props: ["groupSelected"],
  components: {
    IconBase,
    IconArrowDown
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
    users() {
      return this.$store.getters.allFriends;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    }
  },
  data() {
    return {
      showSequenceDropdown: false
    };
  },
  methods: {
    closeSequenceDropdown() {
      this.showSequenceDropdown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  justify-content: space-between;
  .top--left {
    align-items: center;
    .segment--name {
      cursor: pointer;
      padding: 0.375rem 0.75rem;
      border: 1px solid transparent;
      border-radius: 10px;
      transition: all 0.4s ease;
      .editable {
        overflow: inherit;
      }
    }
  }

  .top--right {
    .action {
      border: 1px solid;
      border-radius: 10px;
      cursor: pointer;
      padding: 0.375rem 0.75rem;
      &:hover {
        border: 1px solid #ffb94a !important;
        color: #ffb94a !important;
      }
    }
    .sequence--menu {
      position: relative;
      svg {
        stroke-width: 5;
        vertical-align: middle;
      }
      .dropdown {
        border: 1px solid;
        border-radius: 10px;
        padding: 0.375rem 0;
        position: absolute;
        top: calc(100% + 3px);
        right: 0;
        min-width: 13rem;
        width: auto;
        z-index: 999;
        &--item {
          padding: 0.375rem 0.75rem;

          &:hover {
            background-color: #ffb94a;
            color: #fff;
          }
        }
      }
    }
  }
}

/* ChangeColor */
// Light
.top[data-theme="light"] {
  color: #444;
  .top--left {
    .segment--name {
      &:focus,
      &:hover,
      &:active,
      &:visited {
        background-color: #fff;
        border-color: #e4e4e4;
      }
    }
  }
  .top--right {
    .action {
      color: #444;
      border-color: #e4e4e4;
    }
    .sequence--menu {
      .dropdown {
        background-color: #fff;
        color: #444;
        border: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

//Dark
.top[data-theme="dark"] {
  color: #f7f7f7;
  .top--left {
    .segment--name {
      &:hover {
        background-color: #27292d;
        border-color: #ebebeb;
      }
    }
  }

  .top--right {
    .action {
      color: #f7f7f7;
      border-color: #666;
    }
    .sequence--menu {
      .dropdown {
        background-color: #27292d;
        color: #f7f7f7;
        border: 0;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
