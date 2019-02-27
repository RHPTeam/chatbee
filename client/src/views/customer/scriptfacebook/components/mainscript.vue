<template>
  <div :data-theme="currentTheme">
    <div class="script-title">
      <h1>Mua cam</h1>
      <div class="group-copy-link">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 26 26">
          <defs>
            <clipPath id="clip-path">
              <rect id="Rectangle_1561" data-name="Rectangle 1561" width="26" height="26" transform="translate(1093 266)" fill="#fff" stroke="#707070" stroke-width="1"/>
            </clipPath>
          </defs>
          <g id="ic--copy" transform="translate(-1093 -266)" clip-path="url(#clip-path)">
            <g id="copy" transform="translate(1093 266)">
              <g id="Group_209" data-name="Group 209">
                <path id="Path_428" data-name="Path 428" d="M16.733,4.547H4.646A2.057,2.057,0,0,0,2.59,6.6V23.945A2.057,2.057,0,0,0,4.646,26H16.733a2.057,2.057,0,0,0,2.055-2.055V6.6A2.063,2.063,0,0,0,16.733,4.547Zm.612,19.392a.618.618,0,0,1-.618.618H4.64a.618.618,0,0,1-.618-.618V6.6a.618.618,0,0,1,.618-.618H16.727a.618.618,0,0,1,.618.618Z" fill="#999"/>
                <path id="Path_429" data-name="Path 429" d="M21.354,0H9.267A2.057,2.057,0,0,0,7.212,2.055a.719.719,0,1,0,1.438,0,.618.618,0,0,1,.618-.618H21.354a.618.618,0,0,1,.618.618V19.4a.618.618,0,0,1-.618.618.719.719,0,0,0,0,1.438A2.057,2.057,0,0,0,23.41,19.4V2.055A2.057,2.057,0,0,0,21.354,0Z" fill="#999"/>
              </g>
            </g>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 26 26">
          <defs>
            <clipPath id="clip-path">
              <rect id="Rectangle_1560" data-name="Rectangle 1560" width="26" height="26" transform="translate(1135 266)" fill="#fff" stroke="#707070" stroke-width="1"/>
            </clipPath>
          </defs>
          <g id="ic--link" transform="translate(-1135 -266)" clip-path="url(#clip-path)">
            <g id="link" transform="translate(1135.041 266.895)">
              <path id="Path_426" data-name="Path 426" d="M13.722,10.346a.724.724,0,0,0,0,1.022,3.039,3.039,0,0,1,0,4.281L7.54,21.844a3.026,3.026,0,0,1-4.268,0l-.931-.931a3.026,3.026,0,0,1,0-4.268l6.182-6.182A.737.737,0,0,0,7.488,9.428L1.293,15.61a4.475,4.475,0,0,0,0,6.376l.931.931a4.475,4.475,0,0,0,6.324,0l6.195-6.234a4.475,4.475,0,0,0,0-6.337A.724.724,0,0,0,13.722,10.346Z" fill="#999"/>
              <path id="Path_427" data-name="Path 427" d="M24.65,2.237l-.931-.944a4.475,4.475,0,0,0-6.324,0L11.213,7.488a4.475,4.475,0,0,0,0,6.324.737.737,0,0,0,1.035,0,.724.724,0,0,0,0-1.022,3.039,3.039,0,0,1,0-4.281l6.182-6.182a3.026,3.026,0,0,1,4.268,0l.931.931a3.026,3.026,0,0,1,0,4.268l-6.182,6.182a.711.711,0,0,0,0,1.035.685.685,0,0,0,.5.207.737.737,0,0,0,.517-.207L24.65,8.562a4.475,4.475,0,0,0,0-6.324Z" fill="#999"/>
            </g>
          </g>
        </svg>
        <!--<icon-base class="icon&#45;&#45;base" width="26" height="26" viewBox="0 0 26 26">-->
          <!--<icon-link/>-->
        <!--</icon-base>-->
      </div>
      <div class="delete">
        <icon-base
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
import IconRemove from "@/components/icons/IconRemove";
import IconBase from '@/components/icons/IconBase';
import IconCopy from '@/components/icons/IconCopy';
import IconLink from '@/components/icons/IconLink';

export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconCopy,
    IconLink,
    IconRemove
  }
};
</script>

<style lang="scss" scoped>
.main-scripts > div {
  background: #fff;
  width: 100%;
}
</style>
