<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div style="width: 100%" class="d-flex flex-row flex-fill">

            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />

            <div class="flex-fill">
                <BackBar :selected="selected" />
                <DepositBuyProduct />
            </div>

        </div>
    </div>
</template>

<script>
    import DepositBuyProduct from "./Component/Business/Deposit/DepositBuyProduct";
    export default {
        name: "BuyProducts",
        components: {DepositBuyProduct},
        data: () => ({
            nagDrawer: true,
            selected: '购买产品',
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
