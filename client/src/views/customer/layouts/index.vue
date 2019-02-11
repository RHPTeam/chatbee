<template>
  <div class="wrapper">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/m-account">Manage FB account</router-link>|
      <router-link to="/signin">Sign In</router-link>|
      <router-link to="/signup">Sign Up</router-link>|
      <router-link to="/account">Account</router-link>
    </div>
    <router-view />
  </div>
</template>
