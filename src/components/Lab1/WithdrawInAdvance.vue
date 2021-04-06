<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div class="d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />
            <div style="flex: 1">
                <BackBar :selected="selected" />
                <DepositAccount />
            </div>
        </div>

    </div>

</template>

<script>
    import DepositAccount from "./Component/Business/Deposit/DepositAccount";
    export default {
        name: "WithdrawInAdvance",
        components: {DepositAccount},
        data: () => ({
            nagDrawer: true,
            selected: '产品支取',
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
