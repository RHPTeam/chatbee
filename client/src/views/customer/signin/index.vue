<template>
  <div class="main">
    <h3>Sign In Form</h3>
    <form @submit.prevent="signIn">
      <div class="form_group">
        <label for="emailField"
          >Email
          <span>*</span>
        </label>
        <input
          id="emailField"
          type="email"
          placeholder="Email..."
          v-model="user.email"
        />
        <span class="text--error"></span>
      </div>
      <div class="form_group">
        <label for="passwordField"
          >Password
          <span>*</span>
        </label>
        <input
          id="passwordField"
          type="password"
          placeholder="Password..."
          v-model="user.password"
        />
        <span class="text--error"></span>
      </div>
      <div class="form--action">
        <button type="submit" class="btn btn_block btn_success">
          Sign In
        </button>
      </div>
    </form>
    <div class="form--footer">
      <div class="divide">or</div>
      <div class="form--footer-social">
        <button class="btn btn_block btn_danger">Sign In with Google</button>
      </div>
      <div class="form--footer-note">
        <span
          >Don't have your account? Sign Up Free
          <router-link to="/signup">here</router-link>!</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signIn() {
      await this.$store.dispatch("signIn", this.user);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
