<template>
  <div class="top d_flex" :data-theme="currentTheme">
    <div class="top--left d_flex">
      <div class="segment--name mr_1">Đã tiếp cận</div>
      <div class="segment--total">
        <span class="font_weight_bold">2046 out of</span> 187 741 people
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
        >Sequence
          <icon-base
            class="ml_1"
            icon-name="icon-arrow-down"
            width="14"
            height="14"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down/>
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
  components: {
    IconBase,
    IconArrowDown
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
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
        color: #ffb94a;
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
      &:hover {
        background-color: #fff;
        border-color: #e4e4e4;
      }
    }
  }
  .top--right {
    .action {
      border-color: #e4e4e4;
    }
    .sequence--menu {
      .dropdown {
        background-color: #fff;
        color: #444;
        border-color: #e4e4e4;
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
      border-color: #ebebeb;
    }
    .sequence--menu {
      .dropdown {
        background-color: #2f3136;
        color: #f7f7f7;
        border-color: #ebebeb;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
