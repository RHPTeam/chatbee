<template>
  <div class="main">
    <form @submit.prevent="sendMessage">
      <label for="contentMessageField">Nội dung:</label>
      <textarea id="contentMessageField" cols="30" rows="10"></textarea>
      <button>Send</button>
    </form>
  </div>
</template>
