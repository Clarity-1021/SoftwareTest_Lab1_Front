<template>
    <div style="height: 60px;  border-bottom: solid 1px #cccccc" class="d-flex flex-row align-center px-2">
<!--    <v-card tile flat style="border: solid" class="d-flex flex-row align-center px-2" height="60">-->
<!--        <div @click="goBack" class="back-btn d-flex flex-row align-center">-->
<!--            <v-icon>mdi-arrow-left</v-icon>-->

<!--            <div class="subtitle-1 pl-3 pr-5">返回</div>-->
            <el-page-header style="color: #2E7D32" class="pl-3" @back="goBack" :content="selected"></el-page-header>
<!--        </div>-->
<!--        <el-divider vertical></el-divider>-->
<!--        <div class="subtitle-1 px-3">{{ selected }}</div>-->
    </div>
</template>

<script>
    export default {
        name: "BackBar",
        props: {
            selected: {
                type: String,
                default: 'nmd'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
.back-btn {
    cursor: pointer;
    font-size: small;
}
.back-btn:hover {
    color: #2E7D32;
}
</style>
