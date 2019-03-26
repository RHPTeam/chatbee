<template>
  <div class="tooltip--plugin position_absolute pt_1 pb_1 pl_2 pr_2">
    Tính năng này sẽ được cập nhập trong phiên bản sắp tới!
  </div>
</template>

<style scoped lang="scss">
.tooltip--plugin {
  border-radius: 7px;
  background-color: #ffb94a;
  border: solid 1px rgba(0, 0, 0, 0.05);
  color: #fff;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  transition: all 0.5s ease;
  white-space: nowrap;
  &:after {
    border: 7.5px solid transparent;
    border-top-color: #ffb94a;
    bottom: -15px;
    content: "";
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
}
</style>
