<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div style="width: 100%" class="d-flex flex-row flex-fill">

            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />

            <div class="flex-fill">
                <BackBar :selected="selected" />
                <LoanClearing />
            </div>

        </div>
    </div>
</template>

<script>
    import LoanClearing from "./Component/Business/Loan/LoanClearing";
    export default {
        name: "DayEndBatch",
        components: {LoanClearing},
        data: () => ({
            nagDrawer: true,
            selected: '贷款日终批量',
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
