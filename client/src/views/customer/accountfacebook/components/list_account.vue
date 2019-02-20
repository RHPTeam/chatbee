<template>
  <div class="list r">
    <div class="addItem c_md_2">
      <div class="card">
        <div class="card_body">
          <div class="item--content">
            <app-icon-plus class="icon" />
            <p>
              Thêm một cookie
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-for="item in arrStt" :key="item.id" class="item c_md_2">
      <div class="card">
        <div class="card_body">
          <div class="card--header">
            <app-icon-remove />
          </div>
          <div class="card--content">
            <div class="avatar">
              <img
                class="picture"
                src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              />
              <span class="status">
                <app-icon-disative v-if="item.stt == true" />
                <app-icon-active v-else />
              </span>
            </div>
            <h3 class="name">Thanh Lam</h3>
            <button
              @click="item.stt = !item.stt"
              class="btn btn--connect"
              v-if="item.stt == true"
            >
              Kết nối
            </button>
            <button
              @click="item.stt = !item.stt"
              class="btn btn--disconnect"
              v-else
            >
              Ngắt kết nối
            </button>
          </div>
          <div class="card--footer">
            <div class="left">
              <p>12</p>
              <p>Kết nối</p>
            </div>
            <div class="right">
              <p>1</p>
              <p>Hoạt động</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIconPlus from "@/components/icons/IconPlus";
import AppIconRemove from "@/components/icons/IconRemove";
import AppIconDisative from "@/components/icons/IconDisative";
import AppIconActive from "@/components/icons/IconActive";
export default {
  components: {
    AppIconPlus,
    AppIconRemove,
    AppIconDisative,
    AppIconActive
  },
  data() {
    return {
      arrStt: [
        { id: 1, stt: true },
        { id: 2, stt: true },
        { id: 3, stt: false },
        { id: 4, stt: false }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "./list_account.scss";
</style>
