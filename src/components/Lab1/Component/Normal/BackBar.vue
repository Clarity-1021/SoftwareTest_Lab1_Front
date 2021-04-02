<template>
    <v-card tile flat class="d-flex flex-row align-center px-2" width="100%" height="60">
        <div @click="goBack" style="cursor: pointer" class="d-flex flex-row align-center">
            <v-icon>mdi-arrow-left</v-icon>

            <v-card-title>返回</v-card-title>
        </div>
        <v-divider vertical></v-divider>

        <v-card-title>{{ selected }}</v-card-title>
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

</style>
