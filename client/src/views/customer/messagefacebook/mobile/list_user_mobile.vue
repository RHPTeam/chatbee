<template>
  <div class="list--user-mobile">
    <user-item :list.sync="list" :index="item" v-for="item in list" :key="item.id" :isNewMessage="item.isNewMessage" />
  </div>
</template>
<script>
import UserItem from "./chat/user_item";
export default {
  data(){
    return {
    list:[{
      id:1,
      isNewMessage:true
    },
    {
      id:2,
      isNewMessage:true
    },
    {
      id:3,
      isNewMessage:true
    },
    {
      id:4,
      isNewMessage:true
    },
    {
      id:5,
      isNewMessage:true
    },
    ]
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    UserItem
  },
};
</script>
<style lang="scss" scoped>
.list--user-mobile {
  overflow-x: hidden;
}
</style>
