<template>
  <div class="wrapper">
    <Loading v-if="status == 'loading'"/>
    <div v-else class="wrap--content">
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/m-account">Manage FB account</router-link>|
        <router-link to="/f-message">Chat FB</router-link>|
        <router-link to="/signin">Sign In</router-link>|
        <router-link to="/signup">Sign Up</router-link>|
        <router-link to="/account">Account</router-link>
      </div>
      <router-view />
    </div>
    <draggable/>
  </div>
</template>
<script>
  import Loading from "@/components/shared/loading";
  import Draggable from "@/components/shared/draggable-library/Draggable";
export default {
  async created() {
    await this.$store.dispatch("getUserInfo");
  },
  computed: {
    status() {
      return this.$store.getters.authStatus;
    }
  },
  components: {
    Loading,
    Draggable
  }
};
</script>
