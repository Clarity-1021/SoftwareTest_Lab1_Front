<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div style="width: 100%" class="d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />

            <v-main style="" class="flex-fill">
<!--                {{ selected }}-->
<!--                {{ nagDrawer }}-->
            </v-main>
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
