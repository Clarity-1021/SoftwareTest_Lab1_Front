<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div class="d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />
            <div style="flex: 1">
                <BackBar :selected="selected" />
                <LoanAccount />
            </div>
        </div>

    </div>

</template>

<script>
    import LoanAccount from "./Component/Business/Loan/LoanAccount";
    export default {
        name: "Bill",
        components: {LoanAccount},
        data: () => ({
            nagDrawer: true,
            selected: '贷款账户管理',
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
