<template>
  <div class="segments--attribute mt_3" :data-theme="currentTheme">
    <div class="segments--attribute-item">
      <div class="attribute--form mr_2 pl_3">
        <app-filter />
        <!-- <select name class="form--custom" id>
          <option value>attribute</option>
          <option value>segment</option>
          <option value>sequence</option>
        </select>
        
        <input type="text" class="form--custom" placeholder="lead status">
        
        <select name class="form--custom" id>
          <option value>is</option>
          <option value>is not</option>
          <option value>start with</option>
          <option value>is not</option>
        </select>
        
        <input type="text" class="form--custom" placeholder="qualified"> -->
      </div>

      <div class="attribute--action mr_2">
        <div class="btn--add-attribute">
          <icon-base
            class="icon--add mr_1"
            icon-name="plus"
            width="14"
            height="14"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>

      <div class="attribute--remove">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import AppFilter from "@/components/shared/filter";

export default {
  components: {
    IconBase,
    IconPlus,
    IconRemove,
    AppFilter
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.segments--attribute {
  width: 100%;
  padding: 1rem 0;
  border-radius: 0.5rem;

  &-item {
    display: flex;
    align-items: center;

    .attribute--action {
      border: 1px solid;
      border-radius: 20px;
      padding: 0.375rem 0.6rem;
      transition: all 0.5s ease;
      svg {
        margin-right: 0 !important;
      }
      &:hover {
        border-color: #ffb94a !important;
        cursor: pointer;
        svg {
          color: #ffb94a;
        }
      }
    }

    .attribute--form {
      border-radius: 10px;
      width: 80%;

      .filter {
        background-color: none;
        border: 0;
        border-radius: 10px;
      }

      .form--custom {
        border: 0;
        margin-right: 1rem;
        padding: 10px;
        outline: none;
        &::after {
          content: "";
          margin: auto 0;
          height: 100%;
          width: 1px;
          position: relative;
          top: -1px;
        }

        &:focus,
        &:active {
          border-radius: 0.5rem;
        }
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
    }

    .attribute--remove {
      opacity: 0;
      transform: scale(0.3);
      transition: transform 200ms cubic-bezier(0.2, 0.7, 0.5, 1) 0s,
        opacity 200ms cubic-bezier(0.2, 0.7, 0.5, 1) 0s;

      svg {
        transition: all 0.5s ease;
        &:hover {
          cursor: pointer;
          color: #ffb94a;
        }
      }
    }

    &:hover {
      .attribute--remove {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}

/* ChangeColor */
// Light
.segments--attribute[data-theme="light"] {
  background-color: #fafafa;
  color: #444;
  svg {
    color: #999;
  }
  .attribute--action {
    background-color: #fff;
    border-color: #e4e4e4;
  }

  .attribute--form {
    
    .form--custom {
      &::after {
        background-color: #e4e4e4;
      }
    }
    select,
    input {
      color: #444;
      background-color: #fff;
    }
  }
}

//Dark
.segments--attribute[data-theme="dark"] {
  background-color: rgba(39, 41, 45, .4);
  color: #f7f7f7;
  svg {
    color: #ccc;
  }
  .attribute--action {
    border-color: #666;
  }
  .attribute--form {
    .form--custom {
      &::after {
        background-color: #444;
      }
    }
    select,
    input {
      color: #f7f7f7;
      background-color: #27292d;
    }
  }
}
    
</style>
