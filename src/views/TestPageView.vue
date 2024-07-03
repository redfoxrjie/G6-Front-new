<template>
    <h2>hi</h2>
    <!-- <p v-for="(d in phpdata)">{{ d }}</p> -->
     {{phpdata}}
</template>
<style scoped>
body h2 {
    margin-top: 200px;
}
</style>
<script>

export default {
    data() {
        return{
            phpdata:[],

        }
    },
    ref(){
        // phpdata:;
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            fetch('http://localhost/g6-back/tester.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data.blogs);
                    this.phpdata=data.blogs;
                }).catch(error => console.error('Error fetching data:', error));

        }
    }
}

</script>
