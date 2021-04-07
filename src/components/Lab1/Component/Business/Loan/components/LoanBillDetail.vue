<template>
    <v-container class="d-flex flex-column justify-start align-center" fluid style="padding-left: 0;padding-right: 0">
        <v-row style="width: 100%">
            <div style="padding:10px;font-size: small;color: #2E7D32;cursor: pointer" @click="changeShow">返回借据</div>
        </v-row>
        <v-expansion-panels accordion flat class="mt-5">
            <v-expansion-panel>
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-x="-2" offset-y="7" color="green darken-1" :value="loanDetail.paid.length !== 0" :content="loanDetail.paid.length">
                        已还款账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content :v-if="loanDetail.paid.length !== 0">
                    <v-row>
                        <v-col v-for="item in loanDetail.paid" :key="item.num" cols="12" sm="6" md="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.num }}期
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-row style="margin: 4px 0">
                                    <v-col cols="12" class="d-flex flex-row" style="padding: 0;margin: 4px 0" v-for="(title, index) in paidHeader" :key="index">
                                        <div class="px-2" style="width: 45%; color: #777777">{{ title.text }}</div>
                                        <div style="width: 55%">{{ item[title.value] }}</div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge :value="loanDetail.toPay !== ''" offset-x="-2" color="green darken-1" dot>
                        当前待还账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content :v-if="loanDetail.toPay !== ''">
                    <v-row class="d-flex flex-row justify-center align-center">
                        <v-col cols="12" sm="6" md="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ loanDetail.toPay.num }}期
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-row style="margin: 4px 0">
                                    <v-col cols="12" class="d-flex flex-row" style="padding: 0;margin: 4px 0" v-for="(title, index) in toPayHeader" :key="index">
                                        <div class="px-2" style="width: 45%; color: #777777">{{ title.text }}</div>
                                        <div style="width: 55%">{{ loanDetail.toPay[title.value] }}</div>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="repay(loanDetail.toPay)" text color="green darken-3">还款</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-x="-2" offset-y="7" color="green darken-1" :content="loanDetail.unpaid.length">
                        逾期未还账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content :v-if="loanDetail.unpaid.length !== 0">
                    <v-row>
                        <v-col v-for="item in loanDetail.unpaid" :key="item.num" cols="12" sm="6" md="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.num }}期
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-row style="margin: 4px 0">
                                    <v-col cols="12" class="d-flex flex-row" style="padding: 0;margin: 4px 0" v-for="(title, index) in unpaidHeader" :key="index">
                                        <div class="px-2" style="width: 45%; color: #777777">{{ title.text }}</div>
                                        <div style="width: 55%">{{ item[title.value] }}</div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-y="7" offset-x="7" color="green darken-1" :content="loanDetail.rest.length" >
                        未还账单（还款计划）
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content :v-if="loanDetail.rest.length !== 0">
                    <v-row>
                        <v-col v-for="item in loanDetail.rest" :key="item.num" cols="12" sm="6" md="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.num }}期
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-row style="margin: 4px 0">
                                    <v-col cols="12" class="d-flex flex-row" style="padding: 0;margin: 4px 0" v-for="(title, index) in toPayHeader" :key="index">
                                        <div class="px-2" style="width: 45%; color: #777777">{{ title.text }}</div>
                                        <div style="width: 55%">{{ item[title.value] }}</div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
                <v-divider></v-divider>
            </v-expansion-panel>

        </v-expansion-panels>

        <!--还款弹窗-->
        <v-form lazy-validation ref="repayForm" v-model="repayValid">
            <v-dialog transition="dialog-bottom-transition" v-model="dialogRepay" max-width="700px">
                <v-card>
                    <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>还款{{payProgress}}</div></v-toolbar>

                    <v-row class="pt-5" style="margin: 0">
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row" style="" v-for="(item, index) in repayHeaders" :key="index">
                            <div class="text-center" style="width: 45%; color: #777777">{{item.text}}</div>
                            <div style="width: 55%">{{currentRepayItem[item.value]}}</div>
                        </v-col>

                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                            <v-select menu-props="auto" :rules="repayFormRules.kkfs" color="green darken-3" outlined item-text="state" item-value="num" :items="repaySelectors.kkfs" label="扣款方式" v-model="repayForm.kkfs" dense></v-select>
                        </v-col>

                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                            <v-select menu-props="auto" :rules="repayFormRules.jydm" color="green darken-3" outlined item-text="state" item-value="num" :items="repaySelectors.jydm" label="交易代码" v-model="repayForm.jydm" dense></v-select>
                        </v-col>
                    </v-row>


                    <v-card-actions>
                        <v-btn color="green darken-3" text @click="clearRepayForm">清空</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-3" text @click="dialogRepay = false">取消</v-btn>
                        <v-btn text :disabled="!repayValid" color="green darken-3" @click="repayHandler">还款</v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-form>

        <!--还款等待条-->
        <v-dialog v-model="payProgress" hide-overlay persistent width="300">
            <v-card color="green darken-1" dark>
                <v-card-text>
                    正在提交还款
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default {
        name: "LoanBillDetail",
        props: {
            currentItem: {
                type: Set,
                default: '',
            },
            detailShow: {
                type: Boolean,
                default: true
            },
        },
        watch: {
            payProgress (val) {
                if (val) {
                    setTimeout(() => (this.payProgress = false), 4000)
                }
            }
        },
        data () {
            return {
                payProgress: false,
                currentRepayItem: '',
                repayValid: false,
                dialogRepay: false,
                repayHeaders: [
                    { text: '计划利息(元)', value: 'bj' },
                    { text: '实际利息(元)', value: 'zj' },
                    { text: '计划本金(元)', value: 'zj' },
                    { text: '实际本金(元)', value: 'zj' },
                    { text: '计划总金额(元)', value: 'zj' },
                    { text: '实际总金额(元)', value: 'zj' },
                    { text: '复利(元)', value: 'zj' },
                    { text: '罚息(元)', value: 'zj' },
                ],
                repayForm: {
                    kkfs: '',
                    jydm: '',
                },
                repayFormRules: {
                    kkfs: [v => !!v || '请选择扣款方式'],
                    jydm: [v => !!v || '请选择交易代码'],
                },
                repaySelectors: {
                    kkfs:[
                        { state: '委托扣款', num: 1, },
                        { state: '现金', num: 2, },
                    ],
                    jydm:[
                        { state: '0001 银业单位开机作业', num: 1, },
                        { state: '0002 银业单位开机作业', num: 2, },
                        { state: '0003 银业单位开机作业', num: 3, },
                        { state: '0004 银业单位开机作业', num: 4, },
                        { state: '0005 银业单位开机作业', num: 5, },
                        { state: '0006 银业单位开机作业', num: 6, },
                        { state: '0020 银业单位开机作业', num: 20, },
                        { state: '0021 银业单位开机作业', num: 21, },
                        { state: '0032 银业单位开机作业', num: 32, },
                        { state: '0033 银业单位开机作业', num: 33, },
                    ],
                },
                loanDetail: '',
                paidHeader: [
                    { text: '归还本金', value: 'ghbj', },
                    { text: '归还利息', value: 'ghlx', },
                    { text: '复利', value: 'fl', },
                    { text: '罚息', value: 'fx', },
                    { text: '总计', value: 'zj', },
                    { text: '还款日期', value: 'hkrq', },
                ],
                toPayHeader: [
                    { text: '本金', value: 'bj', },
                    { text: '利息', value: 'lx', },
                    { text: '总计', value: 'zj', },
                    { text: '还款日期', value: 'hkrq', },
                ],
                unpaidHeader: [
                    { text: '本金', value: 'bj', },
                    { text: '利息', value: 'lx', },
                    { text: '复利', value: 'fl', },
                    { text: '罚息', value: 'fx', },
                    { text: '总计', value: 'zj', },
                    { text: '还款日期', value: 'hkrq', },
                ],
            }
        },
        mounted() {
            //Todo 获取item的贷款详情
            this.loanDetail = {
                jjh: this.currentItem.jjh,
                paid: [
                    {
                        num: 1,
                        ghbj: '1636.3344',
                        ghlx: '66.66',
                        fl: '0',
                        fx: '0',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                ],
                toPay: {
                    num: 2,
                    bj: '1636.3344',
                    lx: '66.66',
                    zj: '1702.9944',
                    hkrq: '2021-04-30'
                },
                unpaid: [
                    {
                        num: 0,
                        bj: '1636.3344',
                        lx: '66.66',
                        fl: '0',
                        fx: '0',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                ],
                rest: [
                    {
                        num: 2,
                        bj: '1636.3344',
                        lx: '66.66',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                    {
                        num: 3,
                        bj: '1636.3344',
                        lx: '66.66',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                    {
                        num: 4,
                        bj: '1636.3344',
                        lx: '66.66',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                    {
                        num: 5,
                        bj: '1636.3344',
                        lx: '66.66',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                    {
                        num: 6,
                        bj: '1636.3344',
                        lx: '66.66',
                        zj: '1702.9944',
                        hkrq: '2021-04-30'
                    },
                ],
            };
        },
        methods: {
            changeShow: function () {
                this.detailShow = !this.detailShow;
                this.$emit('sendShow', this.detailShow);
            },
            //展示还款对话框
            repay (item) {
                this.currentRepayItem = item;
                this.repayValid = false;
                this.$refs.repayForm.reset();
                this.dialogRepay = true;
            },
            //展示提前还款对话框
            repayAll (item) {
                this.currentRepayItem = item;
                this.repayValid = false;
                this.$refs.repayForm.reset();
                this.dialogRepay = true;
            },
            //Todo 还款
            repayHandler () {
                if (this.$refs.repayForm.validate()) {
                    this.payProgress = true;

                    this.$notify({
                        title: '还款失败，请重试',
                        type: 'error'
                    });
                }
            },
            clearRepayForm () {
                this.$refs.repayForm.reset();
            },
        },
    }
</script>

<style scoped>

</style>
