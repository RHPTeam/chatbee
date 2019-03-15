<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <div class="group py_3">
    <!--Start: Component Deliver your message now-->
    <div class="group--item now">
      <div class="group--item-header mb_2 text_left">
        <div class="title">
          <span>Tin nhắn gửi ngay</span>
        </div>
        <div class="action"></div>
      </div>
      <div class="group--item-body">
        <div
          class="box add"
          @click.prevent="$router.push({ name: 'f_broadcast_now' })"
        >
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
    </div>
    <!--End: Component Deliver your message now-->

    <!--Start: Component Trigger-->
    <!--End: Component Trigger-->

    <!--Start: Component Schedule later-->
    <div class="group--item schedule">
      <div class="group--item-header text_left">
        <div class="title mb_2">
          <span>Thiết lập bộ hẹn</span>
        </div>
        <div class="action"></div>
      </div>
      <div class="group--item-body d_flex flex_wrap justify_content_between">
        <div class="box"><span>14/03 12:00</span></div>
        <div class="box"><span>Hằng ngày 12:00</span></div>
        <div class="box add">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
    </div>
    <!--End: Component Schedule later-->
  </div>
</template>

<script type="text/javascript" src="./sidebar.script.js"></script>

<style scoped lang="scss">
@import "./sidebar.style";
</style>
