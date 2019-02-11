<template>
  <div class="main">
    <h3>Sign In Form</h3>
    <form @submit.prevent="submit">
      <div class="form_group">
        <label for="nameField"
          >Name
          <span>*</span>
        </label>
        <input
          id="nameField"
          type="text"
          placeholder="Name..."
          v-model="user.name"
        />
        <span class="text--error"></span>
      </div>
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
      <div class="form_group">
        <label for="rePasswordField"
          >Confirm password
          <span>*</span>
        </label>
        <input
          id="rePasswordField"
          type="password"
          placeholder="Password..."
          v-model="confirmPassword"
        />
        <span class="text--error"></span>
      </div>
      <div class="form_group">
        <label for="phoneField"
          >Phone
          <span>*</span>
        </label>
        <input
          id="phoneField"
          type="text"
          placeholder="0987654321"
          v-model="user.phone"
        />
        <span class="text--error"></span>
      </div>
      <div class="form--action">
        <button type="submit" class="btn btn_block btn_success">
          Get Started
        </button>
      </div>
    </form>
    <div class="form--footer">
      <div class="form--footer-note">
        <span
          >Have your account? Sign In
          <router-link to="/signin">here</router-link>!</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmPassword: "",
      user: {
        name: "",
        email: "",
        password: "",
        phone: ""
      }
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("signUp", this.user);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
