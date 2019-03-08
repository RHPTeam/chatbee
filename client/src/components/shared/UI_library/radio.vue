<template>
  <div class="custom--input position_relative">
    <input type="radio" id="checkRadio" checked />
    <label for="checkRadio">{{statusCheckRadio}}</label>
  </div>
</template>
<script>
export default {
  props: ["statusCheckRadio"]
};
</script>
<style lang="scss" scoped>
.custom--input {
  cursor: pointer;
  display: block;
  position: relative;
  input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    z-index: 1;
    &:checked {
      + label {
        color: #444444;
        &::before {
          border-color: #ffb94a;
        }
        &::after {
          content: "";
          display: inline-block;
          position: absolute;
          width: 10px;
          height: 10px;
          left: 5px;
          top: 7px;
          border: 1px solid #ffb94a;
          border-radius: 50%;
          background-color: #ffb94a;
        }
      }
    }
  }
  label {
    display: inline-block;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 20px;
      height: 20px;
      left: 0;
      top: 2px;
      border: 1px solid #ffb94a;
      border-radius: 50%;
      background-color: #fff;
    }
  }
}
</style>
