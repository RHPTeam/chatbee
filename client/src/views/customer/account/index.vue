<template>
  <div class="main">
    <h1>Account here!</h1>
    <button class="btn btn_danger" @click="logOut">
      Logout Test Cookie Path
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    }
  }
};
</script>
