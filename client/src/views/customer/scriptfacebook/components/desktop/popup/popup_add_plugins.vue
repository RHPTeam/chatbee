<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content position_relative p_4">
        <div
          class="modal--header d_flex align_items_center justify_content_between"
        >
          <div class="modal-header-title">BeeChat Plugins</div>
          <div class="plugins--close" @click="closePopupPlugin">
            <icon-base
              icon-name="close"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-close />
            </icon-base>
          </div>
        </div>
        <div class="modal--body">
          <!--Start: User used-->
          <div class="plugins--title text_left mt_4">Most used :</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listMostUsed"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div
                class="plugin--item-tooltip"
                v-if="plugin.isActive === false"
              >
                <app-tooltip />
              </div>
            </div>
          </div>
          <!--End: User used-->
          <!--Start: Plugins Sequences-->
          <div class="plugins--title text_left mt_4">Sequences</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <!--Start: Subcrible-->
            <div
              class="plugins--item d_flex align_items_center active m_2 position_relative"
              @click="openSubcriblePlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="srcSubcrible" alt class="position_absolute" />
                </div>
                Đăng ký trình tự
                <div
                  class="plugins--item-help position_absolute"
                  v-if="hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--End: Subcrible-->
            <!--Start: Unsubcrible-->
            <div
              class="plugins--item d_flex align_items_center active m_2 position_relative"
              @click="openUnSubcriblePlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="srcSubcrible" alt class="position_absolute" />
                </div>
                Hủy đăng ký trình tự
                <div
                  class="plugins--item-help position_absolute"
                  v-if="hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--End: Unsubcrible-->
          </div>
          <!--End: Plugins Sequences-->
          <!--Start: Plugins Subscriptions-->
          <div class="plugins--title text_left mt_4">
            Plugins with Subscriptions:
          </div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listSubscriptions"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div
                class="plugin--item-tooltip"
                v-if="plugin.isActive === false"
              >
                <app-tooltip />
              </div>
            </div>
          </div>
          <!--End: Plugins Subscriptions-->
        </div>
      </div>
      <div
        class="modal-overlay position_absolute"
        @click="closePopupPlugin"
      ></div>
    </div>
  </div>
</template>

<script>
import AppTooltip from "./tooltip_plugin";

export default {
  props: {
    showPopupPlugins: Boolean,
    showSubcrible: Boolean,
    showUnSubcrible: Boolean,
    content: String
  },
  data() {
    return {
      srcSubcrible: require("@/assets/images/plugins/subscribe.svg"),
      srcUnSubcrible: require("@/assets/images/plugins/unsubscribe.svg"),
      hasInfo: false,
      listMostUsed: [
        {
          name: "JSON API",
          src: require("@/assets/images/plugins/json.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Người dùng nhập",
          src: require("@/assets/images/plugins/user-input.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Gửi email",
          src: require("@/assets/images/plugins/send-mail.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Danh sách",
          src: require("@/assets/images/plugins/list.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Trò chuyện trực tuyến",
          src: require("@/assets/images/plugins/live-chat.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Cài đặt thuộc tính",
          src: require("@/assets/images/plugins/setup-attribute.svg"),
          hasInfo: false,
          isActive: true
        },
        {
          name: "gửi kịch bản",
          src: require("@/assets/images/plugins/go-block.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Gửi hình ảnh",
          src: require("@/assets/images/plugins/audio.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Gửi âm thanh",
          src: require("@/assets/images/plugins/video.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Chia sẻ vị trí",
          src: require("@/assets/images/plugins/location.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Bình luận",
          src: require("@/assets/images/plugins/comment.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Email người dùng",
          src: require("@/assets/images/plugins/user-email.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Số điện thoại người dùng",
          src: require("@/assets/images/plugins/user-phone.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Lưu bản tính trên Google",
          src: require("@/assets/images/plugins/google-sheet.svg"),
          hasInfo: false,
          isActive: false
        }
      ],
      listSubscriptions: [
        {
          name: "Tìm kiếm Google",
          src: require("@/assets/images/plugins/google.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Tìm kiếm Bing",
          src: require("@/assets/images/plugins/bing.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Tìm kiếm Swiftype",
          src: require("@/assets/images/plugins/swiftype.svg"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Nhập RSS",
          src: require("@/assets/images/plugins/rss.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Đăng ký",
          src: require("@/assets/images/plugins/subscriber.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Danh sách đăng ký",
          src: require("@/assets/images/plugins/subscriptions-list.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Phân loại",
          src: require("@/assets/images/plugins/digest.png"),
          hasInfo: false,
          isActive: false
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopupPlugin() {
      this.$emit("closePopupPlugin", false);
    },
    openModalPlugins() {
      this.$emit("showAddAttribute", true);
      this.$emit("closePopupPluginClick", false);
      const dataSender = {
        value: "",
        type: "tag",
        id: this.content
      };
      this.$store.dispatch("createItemBlock", dataSender);
    },
    openSubcriblePlugins() {
      this.$emit("showSubcrible", true);
      this.$emit("closePopupPluginClick", false);
    },
    openUnSubcriblePlugins() {
      this.$emit("showUnSubcrible", true);
      this.$emit("closePopupPluginClick", false);
    }
  },
  components: {
    AppTooltip
  }
};
</script>

<style lang="scss" scoped>
@import "popup_plugins.style";
</style>
