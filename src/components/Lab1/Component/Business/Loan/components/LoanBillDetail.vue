<template>
    <v-container class="d-flex flex-column justify-start align-center" fluid style="padding-left: 0;padding-right: 0">
        <v-row style="width: 100%">
            <div style="padding:10px;font-size: small;color: #2E7D32;cursor: pointer" @click="changeShow">返回借据</div>
        </v-row>
        <div class="mt-5" style="width: 100%; min-width: 950px">
            <v-data-table :headers="headers" :items="[currentItem]" hide-default-footer class="elevation-1">
            </v-data-table>
        </div>
        <v-expansion-panels :value="openIndex" accordion flat class="mt-5">
            <v-expansion-panel :disabled="loanDetail.paid.length === 0">
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-x="-2" offset-y="7" color="green darken-1" :value="loanDetail.paid.length !== 0" :content="loanDetail.paid.length">
                        已还款账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="item in loanDetail.paid" :key="item.num" cols="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.planNum }}期
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
            <v-expansion-panel :disabled="loanDetail.rest.length === 0">
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge :value="loanDetail.rest.length !== 0" offset-x="-2" color="green darken-1" dot>
                        当前待还账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row class="d-flex flex-row justify-center align-center">
                        <v-col cols="12" sm="6" md="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ loanDetail.toPay.planNum }}期
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
            <v-expansion-panel :disabled="loanDetail.unpaid.length === 0">
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-x="-2" offset-y="7" color="green darken-1" :value="loanDetail.unpaid.length !== 0" :content="loanDetail.unpaid.length">
                        逾期未还账单
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="item in loanDetail.unpaid" :key="item.num" cols="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.planNum }}期
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
            <v-expansion-panel :disabled="loanDetail.rest.length === 0">
                <v-divider></v-divider>
                <v-expansion-panel-header>
                    <span style="color: #2E7D32" class="text-center">
                        <v-badge offset-y="7" offset-x="7" color="green darken-1" :value="loanDetail.rest.length !== 0" :content="loanDetail.rest.length" >
                        未还账单（还款计划）
                        </v-badge>
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="item in loanDetail.rest" :key="item.num" cols="3" lg="2">
                            <v-card min-width="200px">
                                <v-card-title style="color: #2E7D32" class="font-weight-bold">
                                    第{{ item.planNum }}期
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
                    <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>还款</div></v-toolbar>

                    <v-row class="pt-5" style="margin: 0">
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row" style="" v-for="(item, index) in repayHeaders" :key="index">
                            <div class="text-center" style="width: 45%; color: #777777">{{item.text}}</div>
                            <div style="width: 55%">{{currentRepayItem[item.value]}}</div>
                        </v-col>
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                            <v-text-field :rules="repayFormRules.hkje" color="green darken-3" min="0" :max="currentRepayItem.remainAmount" dense outlined label="还款金额" type="number" v-model="repayForm.hkje"></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                            <v-btn dark color="green" @click="repayForm.hkje = currentRepayItem.remainAmount" width="100%">全 额</v-btn>
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

        <v-dialog transition="dialog-bottom-transition" hide-overlay v-model="dialogPenalty" max-width="300px">
            <v-card>
                <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>需额外扣除逾期罚金</div></v-toolbar>

                <v-row class="pt-5" style="margin: 0">
                    <v-col cols="12" class="px-5 d-flex flex-row">
                        <div class="text-right" style="width: 50%; color: #777777">罚金（元）</div>
                        <div style="width: 50%">{{currentItem.penalty}}</div>
                    </v-col>
                </v-row>


                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-3" text @click="dialogPenalty = false">取消</v-btn>
                    <v-btn text color="green darken-3" @click="payPenalty">确认</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <!--还款等待条-->
        <v-dialog v-model="payProgress" hide-overlay persistent width="300">
            <v-card color="green lighten-2" dark>
                <v-card-text>
                    正在处理扣款
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
            }
        },
        watch: {
            currentItem (val) {
                if (val.penalty === 0) {
                    this.$emit('penaltyChange');
                }
            }
            // payProgress (val) {
            //     if (val) {
            //         setTimeout(() => (this.payProgress = false), 4000)
            //     }
            // }
        },
        data () {
            return {
                openIndex: "",
                payProgress: false,
                currentRepayItem: '',
                repayValid: false,
                dialogRepay: false,
                dialogPenalty: false,
                repayHeaders: [
                    { text: '计划利息(元)', value: 'planInterest' },
                    { text: '实际利息(元)', value: 'remainInterest' },
                    { text: '计划本金(元)', value: 'planPrincipal' },
                    { text: '实际本金(元)', value: 'remainPrincipal' },
                    { text: '计划总金额(元)', value: 'planAmount' },
                    { text: '实际总金额(元)', value: 'remainAmount' },
                    { text: '复利(元)', value: 'compoundInterest' },
                    { text: '罚息(元)', value: 'penaltyInterest' },
                ],
                repayForm: {
                    hkje: '',
                },
                repayFormRules: {
                    hkje: [
                        v => !!v || '请输入还款金额',
                        v => (v && v > 0 && v <= this.currentRepayItem.remainAmount) || '超出还款范围',
                    ]
                },
                loanDetail: {
                    paid: [],
                    toPay: false,
                    unpaid: [],
                    rest: []
                },
                paidHeader: [
                    { text: '归还本金', value: 'remainPrincipal', },
                    { text: '归还利息', value: 'remainInterest', },
                    { text: '复利', value: 'compoundInterest', },
                    { text: '罚息', value: 'penaltyInterest', },
                    { text: '总计', value: 'remainAmount', },
                    { text: '还款日期', value: 'planDate', },
                ],
                toPayHeader: [
                    { text: '本金', value: 'planPrincipal', },
                    { text: '利息', value: 'planInterest', },
                    { text: '总计', value: 'planAmount', },
                    { text: '还款日期', value: 'planDate', },
                ],
                unpaidHeader: [
                    { text: '归还本金', value: 'remainPrincipal', },
                    { text: '归还利息', value: 'remainInterest', },
                    { text: '复利', value: 'compoundInterest', },
                    { text: '罚息', value: 'penaltyInterest', },
                    { text: '总计', value: 'remainAmount', },
                    { text: '还款日期', value: 'planDate', },
                ],
                headers: [
                    { text: '借据号', value: 'iouNum', sortable: false, align: 'center' },
                    { text: '客户号', value: 'customerCode', sortable: false, align: 'center' },
                    { text: '客户名', value: 'customerName', sortable: false, align: 'center' },
                    { text: '贷款状态', value: 'loanStatus', sortable: false, align: 'center' },
                    { text: '贷款产品', value: 'productName', sortable: false, align: 'center' },
                    { text: '贷款产品编号', value: 'productCode', sortable: false, align: 'center' },
                    { text: '逾期金额（元）', value: 'overdueBalance', sortable: false, align: 'center' },
                    { text: '发放日期', value: 'loanDate', sortable: false, align: 'center' },
                ],
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo () {
                // this.currentItem.penalty = 1;
                // 获取item的贷款详情
                this.$axios.post(
                    '/plan/planDetail',
                    {},
                    {
                        params:{
                            // iouNum: "L2104071909521",
                            iouNum: this.currentItem.iouNum,
                            repaymentStatus: "2"
                        }
                    }
                )
                    .then(resp => {
                        this.loanDetail.paid = resp.data.data.result;
                        // console.log(this.loanDetail)
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$axios.post(
                    '/plan/planDetail',
                    {},
                    {
                        params:{
                            // iouNum: "L2104071909521",
                            iouNum: this.currentItem.iouNum,
                            repaymentStatus: "3"
                        }
                    }
                )
                    .then(resp => {
                        this.loanDetail.unpaid = resp.data.data.result;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$axios.post(
                    '/plan/planDetail',
                    {},
                    {
                        params:{
                            // iouNum: "L2104071909521",
                            iouNum: this.currentItem.iouNum,
                            repaymentStatus: "1"
                        }
                    }
                )
                    .then(resp => {
                        if (resp.data.data.result.length > 0) {
                            this.loanDetail.toPay = resp.data.data.result[0];
                            this.loanDetail.rest = resp.data.data.result;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            changeShow: function () {
                this.detailShow = !this.detailShow;
                this.$emit('sendShow', this.detailShow);
            },
            //展示还款对话框
            repay (item) {
                this.currentRepayItem = item;
                this.repayValid = false;
                this.$refs.repayForm.reset();
                this.repayForm.hkje = item.remainAmount;
                this.dialogRepay = true;
            },
            // 还指定金额
            repayBill () {
                this.payProgress = true;
                setTimeout(() => {
                    this.payProgress = false;
                    this.dialogRepay = false;
                    this.openIndex = "4";
                    this.getInfo();
                }, 2000);
                // this.payProgress = true;
                //全额还款
                // if (this.repayForm.hkje === this.currentRepayItem.remainAmount) {
                    // this.$axios.post(
                    //     '/plan/repayAll',
                    //     {},
                    //     {
                    //         params:{
                    //             compoundInterest: this.currentRepayItem.compoundInterest,
                    //             createTime: this.currentRepayItem.createTime,
                    //             creator: this.currentRepayItem.creator,
                    //             currentDate: this.getNowFormatDate(),
                    //             id: this.currentRepayItem.id,
                    //             iouNum: this.currentRepayItem.iouNum,
                    //             payMethod: "1",
                    //             penaltyInterest: this.currentRepayItem.penaltyInterest,
                    //             planAmount: this.currentRepayItem.planAmount,
                    //             planDate: this.currentRepayItem.planDate,
                    //             planInterest: this.currentRepayItem.planInterest,
                    //             planNum: this.currentRepayItem.planNum,
                    //             planPrincipal: this.currentRepayItem.planPrincipal,
                    //             remainAmount: this.currentRepayItem.remainAmount,
                    //             remainInterest: this.currentRepayItem.remainInterest,
                    //             remainPrincipal: this.currentRepayItem.remainPrincipal,
                    //             repaymentStatus: this.currentRepayItem.repaymentStatus,
                    //             transcationCode: "2006",
                    //             updateTime: this.currentRepayItem.updateTime,
                    //         }
                    //     }
                    // )
                    //     .then(resp => {
                    //         //Todo
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                // }
                // else {//部分还款
                    // this.$axios.post(
                    //     '/plan/repayPart',
                    //     {},
                    //     {
                    //         params:{
                    //             currentDate: this.getNowFormatDate(),
                    //             iouNum: this.currentRepayItem.iouNum,
                    //             paidAmount:this.repayForm.hkje,
                    //             payMethod: "1",
                    //             planDate: this.currentRepayItem.planDate,
                    //             planId: this.currentRepayItem.id,
                    //             remainAmount: this.currentRepayItem.remainAmount,
                    //             repaymentStatus: this.currentRepayItem.repaymentStatus,
                    //         }
                    //     }
                    // )
                    //     .then(resp => {
                    //         //Todo
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                // }
                this.$notify({
                    title: '余额不足，扣款失败',
                    type: 'error'
                });
                this.$message({
                    showClose: true,
                    message: '扣款成功',
                    type: 'success'
                });
            },
            payPenalty () {
                this.payProgress = true;
                setTimeout(() => {
                    this.payProgress = false;
                    this.dialogPenalty = false;
                }, 2000);
                // this.$axios.post(
                //     '/penalty/repay',
                //     {},
                //     {
                //         params:{
                //             amount: this.currentItem.penalty,
                //             customerCode: this.currentItem.customerCode,
                //             iouNum: this.currentRepayItem.iouNum,
                //             status: "1",
                //         }
                //     }
                // )
                //     .then(resp => {
                //         //Todo
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     });
                this.$notify({
                    title: '余额不足，扣款失败',
                    type: 'error'
                });
                this.$message({
                    showClose: true,
                    message: '扣款成功',
                    type: 'success'
                });
                this.currentItem.penalty = 0;
            },
            // 还款
            repayHandler () {
                if (this.$refs.repayForm.validate()) {
                    if (this.currentItem.penalty > 0) {
                        this.dialogPenalty = true;
                    }
                    else {
                        this.repayBill ();
                    }
                }
            },
            clearRepayForm () {
                this.$refs.repayForm.reset();
            },
            getNowFormatDate() {
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
        },
    }
</script>

<style scoped>

</style>
