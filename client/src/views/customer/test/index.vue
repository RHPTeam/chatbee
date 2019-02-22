<template>
  <div>
    <app-test
      :data="data"
      :currentSort.sync="currentSort"
      :currentSortDir.sync="currentSortDir"
    />
  </div>
</template>

<script>
export default {
  components: {
    AppTest
  },
  data() {
    return {
      data: [
        { age: 2, breed: "Calico", gender: "male" },
        { age: 1, breed: "Siamese", gender: "female" },
        { age: 6, breed: "Calico", gender: "female" },
        { age: 5, breed: "Bengal", gender: "male" },
        { age: 2, breed: "Calico", gender: "female" },
        { age: 10, breed: "Bengal", gender: "male" },
        { age: 4, breed: "Calico", gender: "female" },
        { age: 6, breed: "Siamese", gender: "male" },
        { age: 1, breed: "Siamese", gender: "female" },
        { age: 7, breed: "Calico", gender: "female" }
      ],
      currentSort: "age",
      currentSortDir: "asc"
    };
  }
};
</script>

<style scoped></style>
