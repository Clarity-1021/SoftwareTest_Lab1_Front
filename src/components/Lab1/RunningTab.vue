<template>
    <div class="d-flex flex-column" style="height: 100%">

        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div class="d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />
            <div style="flex: 1">
                <BackBar :selected="selected" />
                <PublicTradeWater />
            </div>
        </div>

    </div>

</template>

<script>
    import PublicTradeWater from "./Component/Business/Public/PublicTradeWater";
    export default {
        name: "RunningTab",
        components: {PublicTradeWater},
        data: () => ({
            nagDrawer: true,
            selected: '交易流水查询',
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
