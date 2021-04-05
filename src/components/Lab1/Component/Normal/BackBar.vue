<template>
    <v-card tile flat class="d-flex flex-row align-center px-2" width="100%" height="60">
        <div @click="goBack" class="back-btn d-flex flex-row align-center">
            <v-icon>mdi-arrow-left</v-icon>

            <div class="subtitle-1 pl-3 pr-5">返回</div>
        </div>
        <v-divider vertical></v-divider>
        <div class="subtitle-1 px-3">{{ selected }}</div>
    </v-card>
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
