<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div class="main-container-background d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />
<!--            <div style="background-image: url('../../assets/images/吃薯片.jpg'); width: 100%">kk</div>-->
<!--            <v-main class="flex-fill main-container-background">-->
<!--                {{ selected }}-->
<!--                {{ nagDrawer }}-->
<!--            </v-main>-->
        </div>

    </div>

</template>

<script>
    export default {
        name: "Home",

        data: () => ({
            nagDrawer: true,
            selected: 'nmd',
        }),
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                if (this.$route.params.nagDrawer !== '') {
                    this.nagDrawer = this.$route.params.nagDrawer;
                }
            },
            getNagDrawer(message) {
                this.nagDrawer = message;
            },
        }
    }
</script>

<style scoped>

</style>
