<template>
  <div class="main">
    <h1>Dashboard here!</h1>
    <h3>Welcome, {{ user.name }}</h3>
    <button @click="logOut">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    }
  }
};
</script>

<style></style>
