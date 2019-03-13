<template>
  <div class="segments--attribute mt_3">
    <div class="segments--attribute-item">
      <div class="attribute--form mr_2">
        <select name="" class="form--custom" id="">
          <option value="">attribute</option>
          <option value="">segment</option>
          <option value="">sequence</option>
        </select>

        <input type="text" class="form--custom" placeholder="lead status" />

        <select name="" class="form--custom" id="">
          <option value="">is</option>
          <option value="">is not</option>
          <option value="">start with</option>
          <option value="">is not</option>
        </select>

        <input type="text" class="form--custom" placeholder="qualified" />
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

export default {
  components: {
    IconBase,
    IconPlus,
    IconRemove
  },

  data() {
    return {
      segmentsArr: [
        "Đã tiếp cận",
        "Đổi trả hàng",
        "Đã mua hàng",
        "Khách hàng hiện tại",
        "Khách hàng cao cấp"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.segments--attribute {
  width: 100%;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 0.5rem;

  &-item {
    display: flex;
    align-items: center;

    .attribute--action {
      background-color: #fff;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
      padding: 0.375rem 0.6rem;

      svg {
        color: #222;
        margin-right: 0 !important;
      }

      .btn--add-attribute {
        &:hover {
          cursor: pointer;
          svg {
            color: #ffb94a;
          }
        }
      }
    }

    .attribute--form {
      background-color: #fff;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
      padding: 0 0.75rem;
      width: 80%;

      .form--custom {
        border: 0;
        margin-right: 1rem;
        padding: 0.375rem 0.5rem;

        &::after {
          content: "";
          margin: auto 0;
          background-color: #e4e4e4;
          height: 100%;
          width: 1px;
          position: relative;
          top: -1px;
        }

        &:focus,
        &:active {
          border-radius: 0.5rem;
        }

        &::placeholder {
          color: #ccc;
        }
      }
    }

    .attribute--remove {
      opacity: 0;
      transform: scale(0.3);
      transition: transform 200ms cubic-bezier(0.2, 0.7, 0.5, 1) 0s,
        opacity 200ms cubic-bezier(0.2, 0.7, 0.5, 1) 0s;

      svg {
        color: #999;

        &:hover {
          color: #222;
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
</style>
