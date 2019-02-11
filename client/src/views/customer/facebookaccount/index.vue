<template>
  <div class="main">
    <h1>Facebook account manage</h1>
    <h3>Good more! If you use cookie</h3>
    <form class="cookie" @submit.prevent="addCookie">
      <label for="cookieField">Your account cookie:</label>
      <textarea
        id="cookieField"
        cols="30"
        rows="10"
        placeholder="Paste in here..."
        v-model="cookie"
      ></textarea>
      <button type="submit" class="btn btn_light">Add account</button>
    </form>
    <div class="account--facebook-list">
      <h3>List Of Facebook Account</h3>
      <ul class="list--ac">
        <li class="list--ac-item">Name Facebook From Cookie</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookie: ""
    };
  },
  methods: {
    addCookie() {
      // console.log(this.cookie);
    }
  }
};
</script>

<style></style>
