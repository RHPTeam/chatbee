<template>
    <div>
        <app-test :data="data"  :currentSort="currentSort" :currentSortDir="currentSortDir" 
        :pageSize="pageSize" :currentPage="currentPage" :enablePagination="enablePagination"
        :enableSort="enableSort"
            @currentSort="currentSort=$event" 
            @currentSortDir="currentSortDir=$event"
            @currentPage="currentPage=$event"
            @enablePagination="enablePagination=$event"
            @enableSort="enableSort=$event"
        />
    </div>
</template>

<script>
    import AppTest from "@/components/shared/sort";
    export default {
        components:{
            AppTest
        },
        data(){
            return {
                data: [{"name":"Alpha","age":2,"breed":"Calico","gender":"male"},{"name":"Beta","age":1,"breed":"Siamese","gender":"female"},{"name":"Gamma","age":6,"breed":"Calico","gender":"female"},{"name":"Delta","age":5,"breed":"Bengal","gender":"male"},{"name":"Epsilon","age":2,"breed":"Calico","gender":"female"},{"name":"Fenris","age":10,"breed":"Bengal","gender":"male"},{"name":"Gorf","age":4,"breed":"Calico","gender":"female"},{"name":"Hary","age":6,"breed":"Siamese","gender":"male"},{"name":"Irdis","age":1,"breed":"Siamese","gender":"female"},{"name":"Joker","age":7,"breed":"Calico","gender":"female"}],
                currentSort: 'age',
                currentSortDir: 'asc',
                pageSize: 5,
                currentPage: 1,
                enablePagination:true,
                enableSort:true
            }
        }
    }
</script>

<style scoped>

</style>